"use client"
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Solar Potential", href: "/solarpotential" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <Box sx={{ flexGrow: 1,   }}>
      <AppBar position="static" sx={{ background: "#F76B1C" }}>
        <Toolbar>
          <Box sx={{
  flexGrow: 1,
          }}>
          <Typography
            component={Link}
            href="/"
            variant="h6"
            sx={{
            
              textDecoration: "none",
              color: "inherit",
              ":hover": { color: "white" },
            }}
          >
            NJ EVCS Awnings
          </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.label}
                sx={{
                  textTransform: "none",
                  ":hover": {
                    color: "white",
                  },
                  fontWeight: "normal", // Set the default font weight
                  maxWidth: "140px",
                  transition: "color 0.3s, font-weight 0.3s", // Smooth the transition
                }}
                color="inherit"
                component={Link}
                href={item.href}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={handleMenuClose}
                  component={Link}
                  href={item.href}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
