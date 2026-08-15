import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../components/App";

const mockTransactions = [
  {
    id: "1",
    date: "2019-12-01",
    description: "Paycheck from Bob's Burgers",
    category: "Income",
    amount: 1000,
  },
];

const newTransaction = {
  id: "99",
  date: "2020-01-15",
  description: "Coffee Shop",
  category: "Food",
  amount: "-4.50",
};

function mockFetch({ postOk = true } = {}) {
  global.fetch = vi.fn((url, options) => {
    if (options?.method === "POST") {
      if (!postOk) {
        return Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({}) });
      }

      return Promise.resolve({
        json: () => Promise.resolve(newTransaction),
        ok: true,
        status: 201,
      });
    }

    return Promise.resolve({
      json: () => Promise.resolve(mockTransactions),
      ok: true,
      status: 200,
    });
  });
}

async function fillAndSubmit(user, { description = "Coffee Shop" } = {}) {
  if (description) {
    await user.type(screen.getByPlaceholderText("Description"), description);
  }
  await user.type(screen.getByPlaceholderText("Category"), "Food");
  await user.type(screen.getByPlaceholderText("Amount"), "4.50");
  await user.click(screen.getByRole("button", { name: /add transaction/i }));
}

describe("Add Transactions", () => {
  it("adds a new transaction to the frontend", async () => {
    mockFetch();
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText("Paycheck from Bob's Burgers");
    await fillAndSubmit(user);

    expect(await screen.findByText("Coffee Shop")).toBeInTheDocument();
    expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
  });

  it("sends a POST request when a transaction is added", async () => {
    mockFetch();
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText("Paycheck from Bob's Burgers");
    await fillAndSubmit(user);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:6001/transactions",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: expect.stringContaining("Coffee Shop"),
        })
      );
    });
  });

  it("does not POST when the description is empty", async () => {
    mockFetch();
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText("Paycheck from Bob's Burgers");
    await fillAndSubmit(user, { description: "" });

    const posts = fetch.mock.calls.filter(([, options]) => options?.method === "POST");
    expect(posts).toHaveLength(0);
    expect(screen.queryByText("Coffee Shop")).not.toBeInTheDocument();
  });

  it("shows an error when the POST request fails", async () => {
    mockFetch({ postOk: false });
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText("Paycheck from Bob's Burgers");
    await fillAndSubmit(user);

    expect(await screen.findByText("Could not add transaction")).toBeInTheDocument();
    expect(screen.queryByText("Coffee Shop")).not.toBeInTheDocument();
  });
});
