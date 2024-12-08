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
        <Box
          component="img"
          src="data:image/png;base64,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" // Replace with the path to your quote icon/image
          alt="Quote Icon"
          sx={{
            width: "40px", // Set a suitable size for the icon
            height: "40px",
            marginBottom: "10px", // Add spacing below the icon
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
            fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" }, // Responsive font size
            letterSpacing: "0.5px",
          }}
        >
          Leading the way in Renewable Energy Innovation
        </Typography>
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
