import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

function renderWithProviders(children: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
  );
}
export { renderWithProviders };

export * from "@testing-library/react";
