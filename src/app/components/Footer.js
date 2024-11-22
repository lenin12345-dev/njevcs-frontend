import React from "react";
import { Box, Typography, Link, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #FAD961 0%, #F76B1C 100%)",
        padding: "40px 0",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
 
      <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
        NJ EVCS Awnings
      </Typography>

      <Box sx={{ display: "flex", gap: 3, marginBottom: 2 }}>
        <Link href="/privacy-policy" color="inherit" sx={{ textDecoration: "none" }}>
          Privacy Policy
        </Link>
        <Link href="/cookie-policy" color="inherit" sx={{ textDecoration: "none" }}>
          Cookie Policy
        </Link>
        <Link href="/terms-of-service" color="inherit" sx={{ textDecoration: "none" }}>
          Terms of Service
        </Link>
        <Link href="/share" color="inherit" sx={{ textDecoration: "none" }}>
          Share
        </Link>
      </Box>


      <Typography variant="body2" sx={{ textAlign: "center" }}>
        Copyright © 2024 NJ EVCS Awnings. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
