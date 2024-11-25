"use client";

import { Box, Typography, Grid } from "@mui/material";
import Container from '@mui/material/Container';


export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "40px", // Reduced padding for a more compact layout
        marginTop: "0", // Remove top margin to reduce spacing from the navbar
      }}
    >
           <Container maxWidth="xl">
      <Grid container spacing={6} alignItems="center"> {/* Reduced spacing */}
        {/* Left Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Align to the start
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              NJ EVCS Awnings
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Explore the solar potential in retail areas across New Jersey and
              analyze the demand for electric vehicle charging station (EVCS)
              awnings. Discover how sustainable infrastructure can transform
              retail spaces.
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Explore the solar potential in retail areas across New Jersey and
              analyze the demand for electric vehicle charging station (EVCS)
              awnings. Discover how sustainable infrastructure can transform
              retail spaces.
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Explore the solar potential in retail areas across New Jersey and
              analyze the demand for electric vehicle charging station (EVCS)
              awnings. Discover how sustainable infrastructure can transform
              retail spaces.
            </Typography>
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/New_Jersey_Counties_by_metro_area_labeled.svg/316px-New_Jersey_Counties_by_metro_area_labeled.svg.png"
              alt="New Jersey Map"
              height={700} // Adjusted height to make the image fit better
              style={{
                background: "none",
                borderRadius: "8px",
                objectFit: "cover", // Ensures the map fills the container properly.
                display: "block", // Prevents extra space below the image caused by inline display.
              }}
            />
          </Box>
        </Grid>
      </Grid>
      </Container>  
    </Box>
  );
}
