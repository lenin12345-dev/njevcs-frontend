import React, { useState } from "react";
import {
  Box,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

const FilterBox = ({
  // showFilter,
  selectedCategory,
  handleCategoryChange,
  resetFilters,
  cityBoundary,
  handleCountyChange,
  selectedCounty,
  counties,
  handleTabChange,
  activeTab,
  countyBoundary,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const isCityBoundaryEmpty =
    activeTab == "city" && (cityBoundary == null || cityBoundary.length === 0);
  const isCountyBoundaryEmpty =
    activeTab == "county" &&
    (countyBoundary == null || countyBoundary.length === 0);

  return (
    <Box>
      <Button
        variant="contained"
        sx={{
          position: "fixed",
          left: 16,
          zIndex: isSidebarOpen ? 0 : 1000,
          display: { xs: "flex", md: "none" },
          backgroundColor: "#4E9268",
          color: "white",
          borderRadius: "16px", 
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
          width: "auto",
          height: 36, 
          padding: "6px 12px", 
          gap: "6px", 
          alignItems: "center",
          minWidth: "unset", 
          transition: "all 0.3s ease-in-out",
          transform: isSidebarOpen ? "translateY(0px)" : "translateY(-30px)", 
          fontSize: "14px",
          "&:hover": {
            backgroundColor: "#3a7550",
            transform: "scale(1.05)", 
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          },
          "&:active": {
            transform: "scale(0.95)", // Press effect
          },
        }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label={isSidebarOpen ? "Close Filter" : "Open Filter"}
      >
        <MenuIcon sx={{ fontSize: 20 }} /> 
        <span style={{ fontSize: "14px", fontWeight: "500" }}>Filter</span>{" "}
      
      </Button>

      <Box
        mt={{ md: 2 }}
        sx={{
          border: { md: "1px solid #ccc" },
          borderRadius: { md: "8px" },
          padding: "16px",
          boxShadow: { md: "0 2px 4px rgba(0, 0, 0, 0.1)" },
          maxWidth: { md: 500 },
          mx: { md: "auto" },
          backgroundColor: "#fff",

          // Mobile-Specific Styles
          position: { xs: "fixed", md: "static" },
          top: { xs: 0 },
          left: { xs: 0 },
          width: { xs: "75%", md: "auto" },
          height: { xs: "100vh", md: "auto" },
          zIndex: { xs: 999, md: "auto" },
          boxShadow: { xs: "2px 0 10px rgba(0,0,0,0.2)", md: "none" },
          transition: { xs: "transform 0.3s ease-in-out", md: "none" },
          transform: {
            xs: isSidebarOpen ? "translateX(0%)" : "translateX(-100%)",
            md: "none",
          },
          overflowY: { xs: "auto", md: "visible" },
        }}
      >
        {/* Close Button for Mobile Sidebar */}
        <IconButton
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            display: { xs: "block", md: "none" },
          }}
          onClick={() => setIsSidebarOpen(false)}
        >
          <CloseIcon />
        </IconButton>
        {/* Tabs for City and County */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            mb: 2,
            "& .MuiTabs-indicator": {
              backgroundColor: "#4E9268",
            },
          }}
        >
          <Tab label="County" value="county" />

          <Tab label="City" value="city" />
        </Tabs>

        {activeTab === "county" && (
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="county-label">Select County</InputLabel>
            <Select
              labelId="county-label"
              label="Select County"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 180,
                    overflowY: "auto",
                  },
                },
              }}
              value={selectedCounty}
              onChange={handleCountyChange}
            >
              {counties.map((county, index) => (
                <MenuItem key={index} value={county} sx={{ fontSize: "14px" }}>
                  {county}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Grid container spacing={2}>
          {(activeTab === "city" || activeTab === "county") && (
            <>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  onClick={() => handleCategoryChange("charging")}
                  variant={
                    selectedCategory === "charging" ? "contained" : "outlined"
                  }
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontSize: "0.875rem",
                    padding: "6px 12px",
                    backgroundColor:
                      selectedCategory === "charging" ? "#4E9268" : "",
                  }}
                  disabled={
                    selectedCategory === "economicZones" ||
                    selectedCategory === "demand" ||
                    isCityBoundaryEmpty ||
                    isCountyBoundaryEmpty
                  }
                >
                  Charging Stations
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  onClick={() => handleCategoryChange("stores")}
                  variant={
                    selectedCategory === "stores" ? "contained" : "outlined"
                  }
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontSize: "0.875rem",
                    padding: "6px 12px",
                    backgroundColor:
                      selectedCategory === "stores" ? "#4E9268" : "",
                  }}
                  disabled={
                    selectedCategory === "economicZones" ||
                    selectedCategory === "demand" ||
                    isCityBoundaryEmpty ||
                    isCountyBoundaryEmpty
                  }
                >
                  Stores
                </Button>
              </Grid>
              {activeTab === "city" && (
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    onClick={resetFilters}
                    variant="outlined"
                    size="small"
                    sx={{
                      textTransform: "none",
                      fontSize: "0.875rem",
                      padding: "6px 12px",
                    }}
                  >
                    Reset Filter
                  </Button>
                </Grid>
              )}
            </>
          )}

          <Grid item xs={4}>
            <Button
              fullWidth
              onClick={() => handleCategoryChange("economicZones")}
              variant={
                selectedCategory === "economicZones" ? "contained" : "outlined"
              }
              size="small"
              sx={{
                textTransform: "none",
                fontSize: "0.875rem",
                padding: "6px 12px",
                backgroundColor:
                  selectedCategory === "economicZones" ? "#4E9268" : "",
                visibility: activeTab === "county" ? "visible" : "hidden",
              }}
            >
              Economic Zones
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              onClick={() => handleCategoryChange("demand")}
              variant={selectedCategory === "demand" ? "contained" : "outlined"}
              size="small"
              sx={{
                textTransform: "none",
                fontSize: "0.875rem",
                padding: "6px 12px",
                backgroundColor: selectedCategory === "demand" ? "#4E9268" : "",
                visibility: activeTab === "county" ? "visible" : "hidden",
              }}
            >
              Demand
            </Button>
          </Grid>

          {activeTab === "county" && (
            <Grid item xs={6}>
              <Button
                fullWidth
                onClick={resetFilters}
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  fontSize: "0.875rem",
                  padding: "6px 12px",
                }}
              >
                Reset Filter
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default FilterBox;
