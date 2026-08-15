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
  beforeEach(() => {
    // Mock GET /transactions so tests do not hit the live json-server
    setFetchResponse(mockTransactions);
  });

  it("displays transactions on startup", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
      expect(screen.getByText("Chipotle")).toBeInTheDocument();
    });

    expect(screen.getByText("Income")).toBeInTheDocument();
    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalled();
  });
});
