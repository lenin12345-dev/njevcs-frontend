import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Container from "@mui/material/Container";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link'; 


export default function CoverPage() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh", // Reduced height for the cover image
        backgroundImage: "url('/cover.jpeg')", // Replace with the actual path to your image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "40px",
        marginTop: "0",
        position: "relative",
        marginBottom: 20,
      }}
    >
      <Container maxWidth="xl">
        {/* Text Wrapper */}
        <Box
          sx={{
            position: "absolute",
            top: "10%", // Adjust this value to move the text closer to the navbar
            left: "5%", // Add some spacing from the left
            maxWidth: "700px", // Limit the width for better layout
          }}
        >
          {/* Main Heading */}
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: "#FFFFFF", // White for headings
              fontWeight: "bold",
              textShadow: "2px 2px 5px rgba(0,0,0,0.7)", // Shadow for readability
              textAlign: "left",
              lineHeight: "1.2",
            }}
          >
            Empower Your Future <br /> with Solar Wave
          </Typography>

          <Typography
  variant="h5"
  component="p"
  sx={{
    color: "#fff", // White for the text
    fontWeight: "bold",
    textShadow: "1px 1px 3px rgba(0,0,0,0.5)", // Shadow for clarity
    marginTop: "20px",
    textAlign: "left",
    lineHeight: "1.5",
    whiteSpace: "nowrap", // Prevent text wrapping
    overflow: "hidden", // Hide overflow for typing effect
    borderRight: "2px solid #4E9268", // Simulate cursor
    animation: "typing 4s steps(40, end), blink-caret 0.75s step-end infinite, reset-typing 8s infinite",
    "@keyframes typing": {
      "0%": { width: "0%" },
      "100%": { width: "100%" },
    },
    "@keyframes blink-caret": {
      "0%, 100%": { borderColor: "transparent" },
      "50%": { borderColor: "#4E9268" },
    },
    "@keyframes reset-typing": {
      "0%": { visibility: "visible" },
      "90%": { visibility: "visible" },
      "100%": { visibility: "hidden" }, // Hides text briefly to simulate reset
    },
  }}
>
  Harness the power of the sun with cutting-edge solutions
</Typography>





          {/* Stylish Button */}
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            component={Link} 
            href="/solarpotential"
            sx={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "#4E9268", // Gradient for stylish look
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1rem",
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

        {/* Cards Section */}
        <Box
          sx={{
            position: "absolute",
            bottom: "0", // Place cards at the bottom of the cover image
            left: "5%",
            right: "5%",
            display: "flex",
            justifyContent: "center",
            gap: "20px", // Gap between cards
            zIndex: 1,
            transform: "translateY(50%)", // Apply the transform to the parent Box
          }}
        >
          {/* Card 1 (bigger card) */}
          <Card
            sx={{
              position: "relative", // Needed for positioning
              display: "flex", // Align the image and text horizontally
              height: "200px", // Increased height to make room for both image and text
              width: "500px",
              borderRadius: "10px",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)", // Slightly larger shadow for visual appeal
              backgroundColor: "#4E9268",
              zIndex: 2,
            }}
          >
            {/* Image on the left */}
            <Box
              sx={{
                width: "60%", // 40% for the image part
                height: "93%",
                backgroundImage: "url('/top1.jpg')", // Replace with actual image path
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderTopLeftRadius: "10px", // Rounded corners on top-left
                borderBottomLeftRadius: "10px", // Rounded corners on bottom-left
                margin: "7px",
                borderRadius: "10px",
              }}
            ></Box>

            {/* Text/Description on the right */}
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "30px",
                width: "60%", // Occupy the remaining space
                color: "#fff",
              }}
            >
              <Typography
                variant="h7" // Larger font for the heading
                sx={{
                  fontWeight: "bold",
                  color: "#333", // Darker color for the heading
                  marginBottom: "10px", // Space below the heading
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Solar Canopy potential
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.8rem", // Slightly larger subtext
                  lineHeight: "1.5",
                  color: "#fff",
                }}
              >
                Harnessing the power of the sun while providing shelter and
                energy efficiency to local businesses.
              </Typography>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card
            sx={{
              position: "relative", // Needed for positioning
              height: "200px", // Increased height for the card
              width: "250px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              backgroundColor: "#fff",
              zIndex: 1,
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
              position: "relative", // Needed for positioning
              height: "200px", // Increased height for the card
              width: "250px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              backgroundColor: "#4E9268",
              zIndex: 0,
              overflow: "hidden",
            }}
          >
            <CardMedia
              sx={{ height: 120 }}
              image="/top3.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography
                variant="body2"
                sx={{
                  color: "#fff",
                  
                }}
                component="h2"
              >
                Our solar panel deliver maximum efiiciency ensuring you get the
                most out of it.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
