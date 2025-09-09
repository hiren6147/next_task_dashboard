"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuthStore } from "@/store/useAuthStore";
import { useMemo, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Header() {
  const { user, logout } = useAuthStore();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const displayName = useMemo(
    () => user?.displayName ?? user?.email ?? "User",
    [user?.displayName, user?.email]
  );
  const avatarLabel = useMemo(
    () => displayName?.[0]?.toUpperCase() ?? "U",
    [displayName]
  );

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
          {isMdUp ? (
            <>
              <Typography variant="body2" sx={{ mr: 2 }} color="text.secondary">
                Hi, {displayName}
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
            </>
          ) : (
            <>
              <Tooltip title={`Hi, ${displayName}`}>
                <IconButton
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  size="small"
                  sx={{ ml: 1 }}
                  aria-controls={menuOpen ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={menuOpen ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>{avatarLabel}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={menuOpen}
                onClose={() => setAnchorEl(null)}
                onClick={() => setAnchorEl(null)}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem disabled>
                  <Avatar sx={{ width: 24, height: 24 }}>{avatarLabel}</Avatar>
                  {displayName}
                </MenuItem>
                <Divider />
                <MenuItem onClick={logout}>
                  <LogoutIcon fontSize="small" style={{ marginRight: 8 }} />{" "}
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
