import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, createTheme } from "@mui/material";

const queryClient = new QueryClient();
const theme = createTheme({
   typography: {
      fontFamily: ["Poppins, sans-serif"].join(","),
   },
});

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <ThemeProvider theme={theme}>
               <App />
            </ThemeProvider>
         </BrowserRouter>
      </QueryClientProvider>
   </React.StrictMode>
);
