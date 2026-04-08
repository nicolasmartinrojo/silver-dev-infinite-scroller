import "@testing-library/jest-dom";
import { renderWithProviders, screen, waitFor } from "../test-utils.tsx";
import Page from "../app/page";

describe("Page", () => {
  it("renders a heading", () => {
    renderWithProviders(<Page />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });

  it("fetches houses and handles API failures intermittently", async () => {
    // Mock responses: alternate between success and failure
    const mockResponses = [
      {
        ok: true,
        houses: [
          {
            id: 1,
            address: "123 Main St",
            homeowner: "John Doe",
            photoURL: "photo1.jpg",
            price: 100000,
          },
        ],
      },
      { ok: false, houses: [] }, // Failure
      {
        ok: true,
        houses: [
          {
            id: 2,
            address: "456 Elm St",
            homeowner: "Jane Smith",
            photoURL: "photo2.jpg",
            price: 200000,
          },
        ],
      },
    ];
    let callCount = 0;

    // Mock fetch to return alternating responses
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve(mockResponses[callCount++ % mockResponses.length]),
      } as Response),
    );

    renderWithProviders(<Page />);

    // Wait for initial fetch and render
    await waitFor(() => {
      expect(screen.getByText("123 Main St")).toBeInTheDocument();
    });

    // Simulate intersection to trigger next page fetch
    const observerCallback = (global.IntersectionObserver as jest.Mock).mock
      .calls[0][0];
    observerCallback([{ isIntersecting: true }]);

    // Wait for next fetch (which should fail and retry)
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2); // Initial + next page
    });

    // Since failure, should not render new house, but retry logic is handled by react-query
    expect(screen.queryByText("456 Elm St")).not.toBeInTheDocument();

    // Clean up
    (global.fetch as jest.Mock).mockRestore();
  });
});
