"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthStore } from "@/store/useAuthStore";

export default function Header() {
  const { user, logout } = useAuthStore();
  console.log(user);
  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        borderRadius: "10px",
        // backdropFilter: "saturate(180%) blur(8px)",
        backgroundColor: "#ffffff",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.3 }}>
            Task Manager
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Typography variant="body2" sx={{ mr: 2 }} color="text.secondary">
            Hi, {user?.displayName ?? user?.email ?? "User"}
          </Typography>
          <Button
            size="small"
            variant="outlined"
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={logout}
          >
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
