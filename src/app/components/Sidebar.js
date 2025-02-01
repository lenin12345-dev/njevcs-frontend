import React from "react";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

import { Drawer, Box, Typography, IconButton, Divider, Avatar } from "@mui/material";

const Sidebar = ({activeTab, cityInfo, visible, onClose, evsCount }) => {
    const theme = useTheme(); 
    const appBarHeight = (theme.mixins.toolbar.minHeight || 56) + 8;

  return(
    
    <Drawer
      anchor="right"
      variant="persistent"
      open={visible}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 350,
          height: "auto", 
          maxHeight: "90vh", 
          top: `${appBarHeight}px`, 
          padding: 2,
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px 0 0 8px", 
        },
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="primary">
        {cityInfo?.cityName ? `${cityInfo.cityName} ${activeTab === 'county' ? 'County' : ''}` : "City Details"}

        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />

      {/* Content Section */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" sx={{ mb: 1, fontSize: 16 }}>
          <strong>Income Level:</strong> {cityInfo?.incomeLevel}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, fontSize: 16 }}>
          <strong>Average Income:</strong> ${cityInfo?.income.toLocaleString()}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, fontSize: 16 }}>
          <strong>Number Of Electric Vehicles:</strong> {evsCount}
        </Typography>
      </Box>

      {/* Visual Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 3,
          p: 2,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          backgroundColor: "#f0f4f8",
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor:
              cityInfo?.incomeLevel === "High"
                ? "green"
                : cityInfo?.incomeLevel === "Medium"
                ? "orange"
                : "red",
          }}
        >
          {cityInfo?.incomeLevel.charAt(0)}
        </Avatar>
        <Typography
          variant="body2"
          sx={{ ml: 2, color: "#555", textAlign: "center" }}
        >
          The income level of {cityInfo?.cityName} is categorized as{" "}
          <strong>{cityInfo?.incomeLevel}</strong>. The average income is
          approximately ${cityInfo?.income.toLocaleString()}.
        </Typography>
      </Box>

      {/* Footer Section */}
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "#888" }}>
          We will be adding more Solar Potential info for {cityInfo?.cityName}.
        </Typography>
      </Box>
    </Drawer>
    
  )
};
  export default Sidebar;