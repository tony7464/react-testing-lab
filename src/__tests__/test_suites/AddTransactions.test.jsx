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

describe("Add Transactions", () => {
  beforeEach(() => {
    global.fetch = vi.fn((url, options) => {
      if (options?.method === "POST") {
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
  });

  it("adds a new transaction to the frontend", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText("Paycheck from Bob's Burgers");

    await user.type(screen.getByPlaceholderText("Description"), "Coffee Shop");
    await user.type(screen.getByPlaceholderText("Category"), "Food");
    await user.type(screen.getByPlaceholderText("Amount"), "4.50");
    await user.click(screen.getByRole("button", { name: /add transaction/i }));

    expect(await screen.findByText("Coffee Shop")).toBeInTheDocument();
  });

  it("sends a POST request when a transaction is added", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText("Paycheck from Bob's Burgers");

    await user.type(screen.getByPlaceholderText("Description"), "Coffee Shop");
    await user.type(screen.getByPlaceholderText("Category"), "Food");
    await user.type(screen.getByPlaceholderText("Amount"), "4.50");
    await user.click(screen.getByRole("button", { name: /add transaction/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:6001/transactions",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
      );
    });
  });
});
