import React from "react";
import { Box, Typography, Card, CardContent, Icon } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import RecyclingIcon from "@mui/icons-material/Recycling";
import LightbulbCircleIcon from "@mui/icons-material/LightbulbCircle";
import ExtensionIcon from "@mui/icons-material/Extension";
import Image from 'next/image';

const cardData = [
  {
    icon: <AcUnitIcon fontSize="large" />,
    label: "Efficiency",
    description: "Optimizing energy use for maximum output.",
  },
  {
    icon: <OfflineBoltIcon fontSize="large"  />,
    label: "Power",
    description: "Harnessing robust energy solutions.",
  },
  {
    icon: <EnergySavingsLeafIcon fontSize="large"  />,
    label: "Eco-Friendly",
    description: "Promoting green and sustainable energy.",
  },
  {
    icon: <RecyclingIcon fontSize="large"  />,
    label: "Sustainability",
    description: "Ensuring resources for future generations.",
  },
  {
    icon: <LightbulbCircleIcon fontSize="large"  />,
    label: "Innovation",
    description: "Pioneering breakthroughs in clean energy.",
  },
  {
    icon: <ExtensionIcon fontSize="large"  />,
    label: "Renewable",
    description: "Tapping into limitless natural resources.",
  },
];

const SolarWaveSection = () => {
  return (
    <Box sx={{ padding: "50px 5%", display: "flex", flexDirection: "column" }}>
      {/* Heading */}
      <Box sx={{ textAlign: "center", marginBottom: "30px" }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: "bold",
            color: "#333",
            marginBottom: "10px", // Space between lines
          }}
        >
          Why <span style={{ color:"#4E9268"}}>Solar Wave?</span>
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#666",
            lineHeight: "1.6", // Improve readability
          }}
        >
          We bring clean energy to your doorstep <br />
          with the latest technology.
        </Typography>
      </Box>

      {/* Main content with left and right sections */}
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        {/* Left Section with 4 Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            width: "40%",
          }}
        >
          {cardData.map((card, index) => (
            <Card
              key={index}
              sx={{
                height: "220px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                backgroundColor: "#E8F6EE", // Light blue with transparency
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "#8ED1A8", // Solid light blue on hover
                },
              }}
            >
              {/* Icon at the top */}
              <Box
                sx={{
                  fontSize: "55px",
                  color: "#4E9268",
                  marginBottom: "10px",
                }}
              >
                {card.icon}
              </Box>
              {/* Label */}
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: "10px",
                }}
              >
                {card.label}
              </Typography>
              {/* Description */}
              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  textAlign: "center",
                  lineHeight: "1.5",
                }}
              >
                {card.description}
              </Typography>
            </Card>
          ))}
        </Box>

        {/* Right Section with Image */}
        <Box
  sx={{
    width: "55%",
    height: "auto",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    position: "relative", // Ensure the image is positioned correctly
    overflow: "hidden", // Hide any overflow
  }}
>
  <Image
    src="/section2.jpeg" // Replace with actual image path
    alt="Section Background"
    layout="fill" // This ensures the image covers the container
    objectFit="cover" // Makes sure the image covers the area without stretching
    objectPosition="center" // Centers the image
    style={{
      borderRadius: "10px",
    }}
    priority={true} // Optional: prioritize the image loading if it's above the fold
  />
</Box>
      </Box>
    </Box>
  );
};

export default SolarWaveSection;
