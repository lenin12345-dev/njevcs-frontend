import React from "react";
import { Box, Typography, Link, Container, Grid, IconButton } from "@mui/material";

import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box
      sx={{
        background: "#F76B1C",
        padding: "40px 0",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Column 1: Website Name, Share Section, and Social Media Icons */}
          <Grid item xs={12} md={3}>
            <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
              NJ EVCS Awnings
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              Share our application with your friends!
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton color="inherit" href="https://facebook.com">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" href="https://twitter.com">
                <XIcon />
              </IconButton>
              <IconButton color="inherit" href="https://whatsapp.com">
                <WhatsAppIcon />
              </IconButton>
              <IconButton color="inherit" href="https://instagram.com">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Column 2: About Us and Address */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              About Us
            </Typography>
            <Typography variant="body2">
            1 Normal Ave, Montclair, NJ 07043
            </Typography>
          </Grid>

          {/* Column 3: Privacy Policy and Cookie Policy */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Policies
            </Typography>
            <Box>
              <Link href="/privacy-policy" color="inherit" sx={{ textDecoration: "none", display: "block", marginBottom: 1 }}>
                Privacy Policy
              </Link>
              <Link href="/cookie-policy" color="inherit" sx={{ textDecoration: "none", display: "block", marginBottom: 1 }}>
                Cookie Policy
              </Link>
            </Box>
          </Grid>

          {/* Column 4: Terms of Service */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Terms of Service
            </Typography>
           
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Typography variant="body2" sx={{ textAlign: "center", marginTop: 4 }}>
          Copyright © 2024 NJ EVCS Awnings. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
