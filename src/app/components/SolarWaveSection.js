import React from "react";
import { Box, Typography, Card } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import RecyclingIcon from "@mui/icons-material/Recycling";
import LightbulbCircleIcon from "@mui/icons-material/LightbulbCircle";
import ExtensionIcon from "@mui/icons-material/Extension";
import Image from "next/image";

const cardData = [
  {
    icon: <AcUnitIcon fontSize="large" />,
    label: "Efficiency",
    description: "Optimizing energy use for maximum output.",
    backDescription:
      "Our systems are designed to minimize waste and deliver maximum performance with minimal input. Experience energy-smart living at its finest.",
  },
  {
    icon: <OfflineBoltIcon fontSize="large" />,
    label: "Power",
    description: "Harnessing robust energy solutions.",
    backDescription:
      "Get reliable, uninterrupted energy supply with cutting-edge power technologies tailored to your needs — strong, stable, and sustainable.",
  },
  {
    icon: <EnergySavingsLeafIcon fontSize="large" />,
    label: "Eco-Friendly",
    description: "Promoting green and sustainable energy.",
    backDescription:
      "Our eco-first approach minimizes your carbon footprint by integrating clean, renewable energy into your everyday life without compromise.",
  },
  {
    icon: <RecyclingIcon fontSize="large" />,
    label: "Sustainability",
    description: "Ensuring resources for future generations.",
    backDescription:
      "We focus on long-term solutions that prioritize the planet. Sustainability is not just a goal — it's embedded in everything we do.",
  },
  {
    icon: <LightbulbCircleIcon fontSize="large" />,
    label: "Innovation",
    description: "Pioneering breakthroughs in clean energy.",
    backDescription:
      "From AI-driven efficiency to smart grids, we innovate to ensure you're always ahead with future-ready energy solutions.",
  },
  {
    icon: <ExtensionIcon fontSize="large" />,
    label: "Renewable",
    description: "Tapping into limitless natural resources.",
    backDescription:
      "Utilize the endless power of sun. Our renewable solutions empower you to live cleaner, greener, and freer.",
  },
];


const SolarWaveSection = () => {
  return (
    <Box
      sx={{
        padding: {
          xs: "100px 5%",
          sm: "30px 5%",
          md: "70px 5%",
          lg: "30px 5%",
        },
        paddingBottom: { xs: "0px", sm: "auto" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Heading */}
      <Box
        sx={{
          textAlign: "center",
          marginBottom: "30px",
          marginTop: { xs: "14px", sm: "auto" },
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: "bold",
            color: "#333",
            marginBottom: "10px",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.3rem" },
          }}
        >
          Why <span style={{ color: "#4E9268" }}>Solar Wave?</span>
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#666",
            lineHeight: "1.6",
            fontSize: { xs: "1rem", sm: "1.2rem" },
          }}
        >
          We bring clean energy to your doorstep <br />
          with the latest technology.
        </Typography>
      </Box>

      {/* Main content with left and right sections */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {/* Left Section with Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: "20px",
            flex: 1,
          }}
        >
          {cardData.map((card, index) => (
            <Card
              key={index}
              sx={{
                perspective: "1000px",
                height: { xs: "200px", sm: "220px" },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.4s",
                  cursor:"pointer",
                  "&:hover": {
                    transform: "rotateY(180deg)",
                  },
                }}
              >
                {/* Front Face */}
                <Box
                  className="card-front"
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    backgroundColor: "#E8F6EE",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "15px",
                  }}
                >
                  <Box
                    sx={{
                      fontSize: "55px",
                      color: "#4E9268",
                      marginBottom: "10px",
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      color: "#333",
                      marginBottom: "10px",
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                    }}
                  >
                    {card.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      textAlign: "center",
                      lineHeight: "1.5",
                      fontSize: { xs: "0.8rem", sm: "0.9rem" },
                    }}
                  >
                    {card.description}
                  </Typography>
                </Box>

                {/* Back Face */}
                <Box
                  className="card-back"
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    backgroundColor: "#8ED1A8",
                    borderRadius: "10px",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "15px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
           
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      lineHeight: "1.6",
                      fontSize: { xs: "0.8rem", sm: "0.9rem",fontWeight:"bold" },
                    }}
                  >
                 {card.backDescription}
                  </Typography>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>

        {/* Right Section with Image */}
        <Box
          sx={{
            flex: 1,
            position: "relative",
            height: { xs: "200px", sm: "300px", md: "auto" },
            width: "100%",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Image
            src="/section2.webp"
            alt="Section Background"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            placeholder="blur"
            blurDataURL="https://miro.medium.com/v2/resize:fit:720/format:webp/1*dwCdhO17ahhsgLMdSs8LXA.png"
            style={{
              borderRadius: "10px",
            }}
            priority={true}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SolarWaveSection;
