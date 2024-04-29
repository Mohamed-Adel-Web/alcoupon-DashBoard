"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./login";
import { createTheme, ThemeProvider } from "@mui/material/styles"; // Updated import
import AuthProvider from "../context/AuthContext";
const theme = createTheme({
  palette: {
    primary: { main: "#9A328B" },
  },
  typography: {
    fontFamily: ["Maven Pro", "sans-serif"].join(),
  },
});
const queryClient = new QueryClient();
export default function Page() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Login />
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-right"
          />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
