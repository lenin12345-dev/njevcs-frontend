import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const ExpandButton = ({
    setSidebarVisible,
    setIsShowArrowIcon,
    
}) => {
  const [showHint, setShowHint] = useState(true);

  return (
    <Box sx={{ position: "fixed", top: "50%", right: 10, transform: "translateY(-50%)" }}>
      {/* Animated Text Bubble */}
      {showHint && (
        <Typography
          sx={{
            position: "absolute",
            right: 50,
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: "6px",
            fontSize: "12px",
            whiteSpace: "nowrap",
            opacity: 0,
            animation: "fadeInOut 2.5s infinite",
            "@keyframes fadeInOut": {
              "0%": { opacity: 0 },
              "50%": { opacity: 1 },
              "100%": { opacity: 0 },
            },
          }}
        >
          Click here to expand →
        </Typography>
      )}

      {/* Expand Button */}
      <Button
        onClick={() => {
          setSidebarVisible(true);
          setIsShowArrowIcon(true);
          setShowHint(false); 
        }}
        sx={{
          backgroundColor: "rgba(50, 50, 50, 0.8)",
          color: "#fff",
          borderRadius: "50%",
          height: 45,
          minWidth: 45,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
          backdropFilter: "blur(4px)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "rgba(30, 30, 30, 0.9)",
            transform: "scale(1.1)",
            boxShadow: "0px 6px 16px rgba(0,0,0,0.4)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        <ChevronLeftIcon sx={{ fontSize: 28 }} />
      </Button>
    </Box>
  );
};

export default ExpandButton;
