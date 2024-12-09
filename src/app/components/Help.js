import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const RenewableEnergySection = () => {
  return (
    <Box
      sx={{
        padding: "30px 5%",
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Left Section */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {/* Section Title */}
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: "bold",
                color: "#333",
                marginBottom: 4,
              }}
            >
              How We <span style={{color:"#4E9268"}}>Help You</span>
            </Typography>

            {/* Image */}
            <Box
              component="img"
              src="/h1.jpeg" // Replace with actual image path
              alt="Renewable Innovation"
              sx={{
                width: "100%",
                borderRadius: "10px",
                height: "400px", // Maintain consistent height
                objectFit: "cover",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            />

            {/* Description */}
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                lineHeight: "1.6",
                marginTop: "15px",
                textAlign: "start",
                maxWidth: "650px",
              }}
            >
              Join the revolution of clean energy and sustainable development with
              cutting-edge renewable solutions. Explore how we bring innovation to
              every home and business.
            </Typography>
          </Box>
        </Grid>

        {/* Center Section (Quote) */}
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {/* Quote Icon */}
          <Box
            component="img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4huM9RARVto1VYaN8H07r6xdVl5lxIWN8Sg&s"
            sx={{
              width: "40px",
              height: "40px",
            }}
          />

          {/* Subtitle */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#4E9268",
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontStyle: "italic",
              lineHeight: "1.6",
              fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
              letterSpacing: "0.5px",
            }}
          >
            Leading the way in Renewable Energy Innovation
          </Typography>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            {/* Image */}
            <Box
              component="img"
              src="/h2.jpeg" // Replace with actual image path
              alt="Clean Energy"
              sx={{
                width: "100%",
                borderRadius: "10px",
                height: "400px", // Maintain consistent height
                objectFit: "cover",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            />

            {/* Description */}
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                lineHeight: "1.6",
                textAlign: "right",
                marginTop: "10px",
                maxWidth: "700px",
              }}
            >
              Discover how innovation in renewable energy is paving the way for a
              sustainable future. Our solutions ensure a cleaner, brighter tomorrow.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RenewableEnergySection;
