import React from "react";
import {
  Box,
  Typography,
  Link,
  Container,
  Grid,
  IconButton,
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "#F76B1C",
        padding: { xs: "20px", sm: "30px", md: "40px 0" },
        color: "#fff",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              component="div"
              sx={{ marginBottom: 2, textAlign: { xs: "center", md: "left" } }}
            >
              NJ EVCS Awnings
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginBottom: 1, textAlign: { xs: "center", md: "left" } }}
            >
              Share our application with your friends!
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                gap: 2,
              }}
            >
              <IconButton
                color="inherit"
                href="https://facebook.com"
                size="small"
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://twitter.com"
                size="small"
              >
                <XIcon fontSize="small" />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://whatsapp.com"
                size="small"
              >
                <WhatsAppIcon fontSize="small" />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://instagram.com"
                size="small"
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{ marginBottom: 1, textAlign: { xs: "center", md: "left" } }}
            >
              About Us
            </Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: { xs: "center", md: "left" } }}
            >
              <Link
                href="https://www.google.com/maps?q=1+Normal+Ave,+Montclair,+NJ+07043"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                1 Normal Ave, Montclair, NJ 07043
              </Link>
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{ marginBottom: 1, textAlign: { xs: "center", md: "left" } }}
            >
              Policies
            </Typography>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Link
                href="/privacy"
                color="inherit"
                sx={{
                  textDecoration: "none",
                  display: "block",
                  marginBottom: 1,
                }}
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookies"
                color="inherit"
                sx={{
                  textDecoration: "none",
                  display: "block",
                  marginBottom: 1,
                }}
              >
                Cookie Policy
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                marginBottom: 1,
                textDecoration: "none",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Terms of Service
            </Typography>
            <Link
              href="/tou"
              sx={{
                textDecoration: "none",
                color: "white",
              }}
            >
              {" "}
              Terms
            </Link>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            marginTop: 4,
            fontSize: { xs: "12px", sm: "14px" },
          }}
        >
          Copyright © {new Date().getFullYear()} NJ EVCS Awnings. All rights
          reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
