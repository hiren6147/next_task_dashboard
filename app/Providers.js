"use client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import MuiRegistry from "./MuiRegistry";

export default function Providers({ children }) {
  return (
    <MuiRegistry>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </MuiRegistry>
  );
}
