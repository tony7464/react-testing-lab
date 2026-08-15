import { render, screen, waitFor } from "@testing-library/react";
import App from "../../components/App";

const mockTransactions = [
  {
    id: "1",
    date: "2019-12-01",
    description: "Paycheck from Bob's Burgers",
    category: "Income",
    amount: 1000,
  },
  {
    id: "2",
    date: "2019-12-06",
    description: "Chipotle",
    category: "Food",
    amount: -17.59,
  },
];

describe("Display Transactions", () => {
  it("displays transactions on startup", async () => {
    setFetchResponse(mockTransactions);
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
      expect(screen.getByText("Chipotle")).toBeInTheDocument();
    });

    expect(screen.getByText("Income")).toBeInTheDocument();
    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("2019-12-01")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith("http://localhost:6001/transactions");
  });

  it("shows an empty state when there are no transactions", async () => {
    setFetchResponse([]);
    render(<App />);

    expect(
      await screen.findByText("No transactions to display")
    ).toBeInTheDocument();
    expect(screen.queryByText("Chipotle")).not.toBeInTheDocument();
  });

  it("shows an error when the transactions request fails", async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error("network")));
    render(<App />);

    expect(
      await screen.findByText("Could not load transactions")
    ).toBeInTheDocument();
    expect(screen.queryByText("Chipotle")).not.toBeInTheDocument();
  });
});
