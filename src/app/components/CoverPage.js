"use client";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Container from "@mui/material/Container";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

export default function CoverPage() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: { xs: "100vh", sm: "80vh" }, 
        backgroundImage: "url('/cover.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: { xs: "20px", sm: "40px" },
        marginTop: 0,
        position: "relative",
        marginBottom: 20,
      }}
    >
      <Container maxWidth="xl">
        {/* Text Wrapper */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: "5%", sm: "10%" },
            left: { xs: "5%", sm: "5%" },
            maxWidth: { xs: "90%", sm: "700px" }, 
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              color: "#FFFFFF",
              fontWeight: "bold",
              textShadow: "2px 2px 5px rgba(0,0,0,0.7)",
              textAlign: "left",
              lineHeight: "1.2",
              fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Transform Your Future <br /> with Solar Wave&apos;s Clean Energy
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
              marginTop: "15px",
              textAlign: "left",
              lineHeight: "1.5",
              fontSize: { xs: "0.9rem", sm: "1.5rem" },
              minHeight: "50px", // Set a minimum height to prevent shifts
            }}
          >
            <TypeAnimation
              sequence={[
                "Harness the power of the sun with cutting-edge solutions",
                1000,
                "",
                2000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
            />
          </Typography>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            component={Link}
            href="/solarpotential"
            sx={{
              marginTop: {sx:"10px",sm:"20px"},
              
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
        </Box>

   
        <Box
          sx={{
            position: "absolute",
            bottom: "0",
            left: { xs: "5%", sm: "5%" },
            right: { xs: "5%", sm: "5%" },
            display: "flex",
            flexWrap: "wrap", 
            justifyContent: "center",
            gap: "20px",
            zIndex: 1,
            transform: {
              xs: "translateY(38%)", // Slight adjustment for mobile
              sm: "translateY(30%)", // Reduced overlap for small screens
              md: "translateY(50%)", // Original for larger screens
            },
          }}
        >
          {/* Card 1 */}
          <Card
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" }, 
              height:  "200px",
              width: { xs: "100%", sm: "500px" },
              borderRadius: "10px",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
              backgroundColor: "#4E9268",
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", sm: "60%" },
                height: {xs:"40%",sm:"auto"},
                backgroundImage: "url('/top1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                margin: { xs: 0, sm: "7px" },
                borderRadius: { xs: "10px 10px 0 0", sm: "10px" },
              }}
            ></Box>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: {xs:"10px",sm:"30px"},
                width: {xs:"auto",sm:"60%"},
                color: "#fff",
                height: {xs:"60%",sm:"auto"},
              }}
            >
              <Typography variant="h7" sx={{ fontWeight: "bold", color: "#fff" }}>
                Solar Canopy Potential
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.8rem", lineHeight: "1.5", color: "#fff" }}>
                Harnessing the power of the sun while providing shelter and energy efficiency to local businesses.
              </Typography>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card
            sx={{
              height: "200px",
              width: { xs: "100%", sm: "250px" },
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              backgroundColor: "#fff",
              overflow: "hidden",
            }}
          >
            <CardMedia
              sx={{ height: "100%" }}
              image="/top2.jpg"
              title="green iguana"
            />
          </Card>

          {/* Card 3 */}
          <Card
            sx={{
              height: "200px",
              width: { xs: "100%", sm: "250px" },
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              backgroundColor: "#4E9268",
              overflow: "hidden",
            }}
          >
            <CardMedia
              sx={{ height: 120 }}
              image="/top3.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: "#fff" }}>
                Our solar panels deliver maximum efficiency, ensuring you get the most out of it.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
