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
  {
    id: "2",
    date: "2019-12-06",
    description: "Chipotle",
    category: "Food",
    amount: -17.59,
  },
  {
    id: "3",
    date: "2019-12-07",
    description: "Lyft Ride",
    category: "Transportation",
    amount: -13.25,
  },
];

describe("Search and Sort Transactions", () => {
  beforeEach(() => {
    setFetchResponse(mockTransactions);
  });

  it("updates the page when a search change event is triggered", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText("Chipotle");

    const searchInput = screen.getByPlaceholderText(
      "Search your Recent Transactions"
    );
    await user.type(searchInput, "Chipotle");

    await waitFor(() => {
      expect(screen.getByText("Chipotle")).toBeInTheDocument();
      expect(
        screen.queryByText("Paycheck from Bob's Burgers")
      ).not.toBeInTheDocument();
      expect(screen.queryByText("Lyft Ride")).not.toBeInTheDocument();
    });
  });

  it("filters transactions by search text", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText("Lyft Ride");

    const searchInput = screen.getByPlaceholderText(
      "Search your Recent Transactions"
    );
    await user.type(searchInput, "ride");

    expect(await screen.findByText("Lyft Ride")).toBeInTheDocument();
    expect(screen.queryByText("Chipotle")).not.toBeInTheDocument();
  });

  it("sorts transactions by description", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText("Chipotle");

    await user.selectOptions(screen.getByRole("combobox"), "description");

    const rows = screen.getAllByRole("row").slice(1);
    const descriptions = rows.map((row) => row.cells[1].textContent);

    expect(descriptions).toEqual([
      "Chipotle",
      "Lyft Ride",
      "Paycheck from Bob's Burgers",
    ]);
  });

  it("sorts transactions by category", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText("Chipotle");

    await user.selectOptions(screen.getByRole("combobox"), "category");

    const rows = screen.getAllByRole("row").slice(1);
    const categories = rows.map((row) => row.cells[2].textContent);

    expect(categories).toEqual(["Food", "Income", "Transportation"]);
  });
});
