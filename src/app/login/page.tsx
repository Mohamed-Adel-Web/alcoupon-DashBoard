"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./login";
import { createTheme, ThemeProvider } from "@mui/material/styles"; // Updated import
import { useAuth } from "../context/AuthContext";
;
const theme = createTheme({
  palette: {
    primary: { main: "#F7845D" },
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
      
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
