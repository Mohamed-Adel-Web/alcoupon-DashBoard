import React, { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const queryClient = new QueryClient();
const theme = createTheme({
  palette: {
    primary: { main: "#9A328B" },
  },
  typography: {
    fontFamily: ["Maven Pro", "sans-serif"].join(),
  },
});
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
