"use client";

import { Box, Typography } from "@mui/material";

export default function About() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Gradient Heading */}
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          background: "linear-gradient(90deg, #0048FF 0%, #D6008D 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        About Us
      </Typography>

      {/* Content */}
      <Box
        sx={{
          maxWidth: "800px",
          margin: "20px auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Welcome to NJ EVCS Awnings, where we’re committed to driving sustainable energy solutions for urban spaces. Our mission is to transform mall parking areas into productive, green spaces by installing photovoltaic (PV) canopies that harness the power of solar energy while meeting the growing demand for electric vehicle (EV) infrastructure.
        </Typography>

        <Typography variant="h5" component="h2"         sx={{
          fontWeight: "bold",
          textAlign: "start",
          background: "linear-gradient(90deg, #0048FF 0%, #D6008D 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Our Vision
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          As the world shifts toward clean energy, we aim to be at the forefront of this transformation by creating smart, solar-powered solutions that cater to both today’s and tomorrow’s needs. We believe parking spaces can do more than provide convenience—they can power our communities and support a cleaner, greener future.
        </Typography>

        <Typography variant="h5" component="h2" sx={{
          fontWeight: "bold",
          textAlign: "start",
          background: "linear-gradient(90deg, #0048FF 0%, #D6008D 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          What We Do
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Using a combination of advanced data analytics and local insights, we assess the parking areas of malls and other large commercial spaces to maximize their potential for solar energy generation. Here’s how we bring our vision to life:
        </Typography>

        <ul>
          <li>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              <strong>Parking Area Assessment:</strong> Our team conducts a thorough analysis of parking lots, determining the optimal layout and potential capacity for PV canopies to harness maximum solar energy.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              <strong>EV Demand Analysis:</strong> By analyzing the number of electric vehicles in specific regions, we strategically design the number and placement of EV charging stations to support current and anticipated demand.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              <strong>Economic and Regional Analysis:</strong> We assess the economic profile of each region to offer solutions that align with local sustainability goals, community engagement, and economic viability.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              <strong>Custom PV Canopy Solutions:</strong> Our canopies provide shade, reduce carbon footprint, and power EV charging stations—all while helping property owners reduce energy costs and carbon emissions.
            </Typography>
          </li>
        </ul>

        <Typography variant="h5" component="h2" sx={{
          fontWeight: "bold",
          textAlign: "start",
          background: "linear-gradient(90deg, #0048FF 0%, #D6008D 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Why Choose Us?
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Data-Driven Decisions: We utilize the latest data on electric vehicle trends and economic insights to deliver optimized, high-impact solutions for each project.
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Sustainability and Savings: With our PV canopy solutions, malls not only reduce their environmental footprint but also achieve significant long-term energy savings.
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Future-Ready Infrastructure: By providing scalable and adaptable EV charging infrastructure, we help future-proof malls and other large parking areas for the continued growth of electric mobility.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          At NJ EVCS Awnings, we believe that the spaces we create today are the foundations of a more sustainable tomorrow. Join us in our mission to empower communities through clean energy and intelligent infrastructure.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "primary.main",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Let’s build a greener future—one parking lot at a time.
        </Typography>
      </Box>
    </Box>
  );
}
