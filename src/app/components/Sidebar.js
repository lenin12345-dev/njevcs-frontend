import React from "react";
import CloseIcon from "@mui/icons-material/Close";

import { Drawer, Box, Typography, IconButton, Divider, Avatar } from "@mui/material";

const Sidebar = ({activeTab, cityInfo, visible, onClose, evsCount,isSidebarOpen,isMobile,theme }) => {
    const appBarHeight = (theme.mixins.toolbar.minHeight || 56) + 8;

  return(
    
    <Drawer
    anchor={isMobile ? "bottom" : "right"} 
      variant="persistent"
      open={visible}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: isMobile ? "100%" : 350, 
          height: isMobile ? "18vh" : "auto",
          maxHeight: isMobile ? "60vh" : "90vh",
          top: isMobile ? "auto" : `${appBarHeight}px`,
          padding: isMobile ? 1 : 2,
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: isMobile ? "16px 16px 0 0" : "8px 0 0 8px",
        },
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: isMobile ? "4px" : 2,
          px: isMobile ? 1 : 2,
        }}
      >
        <Typography       variant={isMobile ? "subtitle1" : "h6"} fontWeight="bold" color="primary">
        {cityInfo?.cityName ? `${cityInfo.cityName} ${activeTab === 'county' ? 'County' : ''}` : "City Details"}

        </Typography>
        <IconButton  size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />

      {/* Content Section */}
      <Box sx={{ mt:isMobile?"5px": 2, px: isMobile ? 1 : 2 }}>
        <Typography variant="body1"  sx={{ mb: 1, fontSize: isMobile ? 14 : 16 }}>
          <strong>Income Level:</strong> {cityInfo?.incomeLevel}
        </Typography>
        <Typography variant="body1"  sx={{ mb: 1, fontSize: isMobile ? 14 : 16 }}>
          <strong>Average Income:</strong> ${cityInfo?.income.toLocaleString()}
        </Typography>
        <Typography variant="body1"  sx={{ mb: 1, fontSize: isMobile ? 14 : 16 }}>
          <strong>Number Of Electric Vehicles:</strong> {evsCount}
        </Typography>
      </Box>

      {/* Visual Section */}
  {  !isMobile &&  <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: isSidebarOpen ? 2 : 3,
          p: isSidebarOpen ? 1 : 2,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          backgroundColor: "#f0f4f8",
        }}
      >
        <Avatar
            sx={{
              width: isSidebarOpen ? 50 : 80,
              height: isSidebarOpen ? 50 : 80,
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
          sx={{ ml: 2, color: "#555", textAlign: "center",    fontSize: isSidebarOpen ? 12 : 14, }}
        >
          The income level of {cityInfo?.cityName} is categorized as{" "}
          <strong>{cityInfo?.incomeLevel}</strong>. The average income is
          approximately ${cityInfo?.income.toLocaleString()}.
        </Typography>
      </Box>}
           {/* Heatmap Legend Section */}
           <Box sx={{ mt: isMobile ? 2 : 1, px: 2, py: 1, borderRadius: 2, backgroundColor: "#f0f4f8" }}>
        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
        Indicator Guide
        </Typography>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Box sx={{ width: 20, height: 20, backgroundColor: "#ff0000", borderRadius: "50%", mr: 1 }} />
          <Typography variant="body2">High</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Box sx={{ width: 20, height: 20, backgroundColor: "#ffa500", borderRadius: "50%", mr: 1 }} />
          <Typography variant="body2">Medium</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: 20, height: 20, backgroundColor: "#008000", borderRadius: "50%", mr: 1 }} />
          <Typography variant="body2">Low</Typography>
        </Box>
        </Box>
      </Box>

      {/* Footer Section */}
      <Box sx={{ mt:isMobile?0: 3, textAlign: "center" }}>
        <Typography variant="caption"       sx={{ color: "#888", fontSize: isMobile ? 10 : 12 }}>
          We will be adding more Solar Potential info for {cityInfo?.cityName}.
        </Typography>
      </Box>
    </Drawer>
    
  )
};
  export default Sidebar;