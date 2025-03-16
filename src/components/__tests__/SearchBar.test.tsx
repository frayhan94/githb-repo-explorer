import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "@/components/SearchBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();
describe("SearchBar", () => {
  const RenderWithQueryClient = (ui: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <div className="w-full">{ui}</div>
      </QueryClientProvider>
    );
  };

  it("should render SearchBar component", () => {
    RenderWithQueryClient(<SearchBar />);
    const input = screen.getByPlaceholderText("Search Github Users...");
    expect(input).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("update input value when type", () => {
    RenderWithQueryClient(<SearchBar />);
    const input = screen.getByPlaceholderText("Search Github Users...");
    fireEvent.change(input, { target: { value: "react" } });
    expect(input).toHaveValue("react");
  });


  it("display error message when input validation fails", async () => {
    RenderWithQueryClient(<SearchBar />);
    const input = screen.getByPlaceholderText("Search Github Users...");
    fireEvent.change(input, { target: { value: "" } });

    const button = screen.getByRole("button", { name: "Search" });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Enter at least 3 characters")).toBeInTheDocument();
    });
  });
});
