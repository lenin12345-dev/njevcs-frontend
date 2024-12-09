import React from "react";
import { Box, Typography } from "@mui/material";
import Image from 'next/image'

const RenewableEnergySection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "50px 5%",
        gap: "20px",
        alignItems: "flex-start", // Align for visual offset
        position: "relative",
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          paddingLeft: "20px",
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
          How We <span style={{ color:"#4E9268"}}>Help You</span>
        </Typography>

        {/* Image */}
        <Box
      sx={{
        width: "100%",
        maxWidth: "700px",
        height: "400px", // Adjusts height based on aspect ratio
        position: "relative", // Ensures the Image is positioned properly
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
      }}
    >
      <Image
        src="/h1.jpeg" // Replace with actual image path
        alt="Renewable Innovation"
        layout="fill" // This ensures the image fills the container while preserving the aspect ratio
        objectFit="cover" // Ensures the image covers the box without distortion
        objectPosition="center" // Keeps the image centered
        style={{borderRadius: "10px",}}
      />
    </Box>

        {/* Subtitle */}

        {/* Description */}
        <Box
          sx={{
            maxWidth: "650px",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              lineHeight: "1.6",
              marginTop: "15px",
              textAlign: "start",
            }}
          >
            Join the revolution of clean energy and sustainable development with
            cutting-edge renewable solutions. Explore how we bring innovation to
            every home and business.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "48%",
          transform: "translate(-50%, -50%)", // Ensure proper centering
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center align the content horizontally
          maxWidth: "300px",
        }}
      >
        {/* Quote Icon */}
    

 
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          flex: "1",
          marginTop: 18,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end", // Align content to the right
          justifyContent: "flex-end",
          marginRight: "20px", // Add spacing from the right edge if needed
        }}
      >
        {/* Image */}
        <Box
      sx={{
        width: "100%",
        maxWidth: "700px",
        height: "400px", // Adjusts height based on aspect ratio
        position: "relative", // Ensures the Image is positioned properly
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Image
        src="/h2.jpeg" // Replace with actual image path
        alt="Clean Energy"
        layout="fill" // This ensures the image fills the container while preserving the aspect ratio
        objectFit="cover" // Ensures the image covers the box without distortion
        objectPosition="center" // Keeps the image centered
        style={{borderRadius: "10px",}}
      />
    </Box>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: "#666",
            lineHeight: "1.6",
            textAlign: "right", // Align text to the right
            marginTop: "10px", // Add spacing between the image and the text
            maxWidth: "700px", // Match the max width of the image
          }}
        >
          Discover how innovation in renewable energy is paving the way for a
          sustainable future. Our solutions ensure a cleaner, brighter tomorrow.
        </Typography>
      </Box>
    </Box>
  );
};

export default RenewableEnergySection;
