import React from "react";
import { Box, Typography, Grid,Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

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
              alignItems:{xs:"center",sm: "flex-start"},
            }}
          >
    
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: "bold",
                color: "#333",
                marginBottom: 4,
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                textAlign:{xs:"center",sm:"auto"}
              }}
            >
              How We <span style={{color:"#4E9268"}}>Help You</span>
            </Typography>

           
            <Box
              component="img"
              src="/h1.webp" 
              alt="Renewable Innovation"
              loading="lazy"
              sx={{
                width: "100%",
                borderRadius: "10px",
                height: "400px", 
                objectFit: "cover",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            />

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
             Explore our interactive mapping tool to identify optimal solar generation sites in cities. Gain insights into solar energy production potential and make informed decisions for installations.
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
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            component={Link}
            href="/solarpotential"
            sx={{
              marginTop: {xs:"12px",sm:"20px"},
              
              padding: { xs: "8px 16px", sm: "10px 20px" },
              background: "#4E9268",
              color: "#fff",
              fontWeight: "bold",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              borderRadius: "25px",
              textTransform: "none",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              "&:hover": {
                background: "linear-gradient(90deg, #FFA500, #FFD700)",
                boxShadow: "0 6px 15px rgba(0,0,0,0.5)",
              },
            }}
          >
            Get Started
          </Button>
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
       
            <Box
              component="img"
              src="/h2.webp" 
              alt="Clean Energy"
              loading="lazy"
              sx={{
                width: "100%",
                borderRadius: "10px",
                height: "400px", 
                objectFit: "cover",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            />

            <Typography
              variant="body2"
              sx={{
                color: "#666",
                lineHeight: "1.6",
             
                marginTop: "10px",
                maxWidth: "700px",
              }}
            >
            Discover how solar PV awnings can harness seasonal solar flux to power retail parking areas, driving both energy efficiency and environmental impact.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RenewableEnergySection;
