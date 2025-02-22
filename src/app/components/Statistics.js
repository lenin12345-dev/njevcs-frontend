"use client";
import { useEffect, useState, useRef } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

const Counter = ({ value, label, duration = 4000, startCounting }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (startCounting) {
      let start = 0;
      const increment = Math.ceil(value / (duration / 30));

      const animateCount = () => {
        if (start < value) {
          start += increment;
          setCount(Math.min(start, value));
          requestAnimationFrame(animateCount);
        }
      };

      animateCount();
    }
  }, [value, duration, startCounting]);

  return (
    <motion.div whileHover={{ scale: 1.05 }} aria-label={`${label} counter`}>
      <Card
        sx={{
          width: 200,
          textAlign: "left",
          boxShadow: 5,
          borderRadius: 3,
          backgroundColor: "#f4f8f4", 
          padding: 1,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)", 
            boxShadow: 10,
          },
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            padding: "14px",
          }}
        >
          <Box
            sx={{
              width: 3,
              backgroundColor: "#4E9268",
              marginRight: 2,
              alignSelf: "stretch",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5" color="#4E9268" fontWeight="bold">
              {label === "Counties"
                ? count.toLocaleString()
                : `${count.toLocaleString()}+`}
            </Typography>
            <Typography variant="body2" color="textSecondary" fontWeight="bold">
              {label}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Statistics = () => {
  const [startCounting, setStartCounting] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true); // Start the counter animation when the section is in view
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        minHeight: "35vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(243, 241, 250);", 
        padding: "30px 5%",
        my: 7,
        borderRadius: 2,
        boxShadow: 4,
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: "bold",
          color: "#333",
          marginBottom: 4,
          fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.3rem" },
          textAlign: { xs: "center", sm: "auto" },
        }}
      >
     New Jersey&apos;s <span style={{ color: "#4E9268" }}>Green Revolution</span>
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Counter
          value={500}
          label="Municipalities"
          startCounting={startCounting}
        />
        <Counter value={21} label="Counties" startCounting={startCounting} />
        <Counter
          value={170000}
          label="Electric Vehicles"
          startCounting={startCounting}
        />
        <Counter
          value={4500}
          label="EV Charging Points"
          startCounting={startCounting}
        />
      </Box>
    </Box>
  );
};

export default Statistics;
