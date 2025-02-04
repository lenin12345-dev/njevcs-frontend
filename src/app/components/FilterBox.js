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
} from "@mui/material";

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
  countyBoundary
}) => {

  const isCityBoundaryEmpty = activeTab=='city' && (cityBoundary == null || cityBoundary.length === 0);
  const isCountyBoundaryEmpty = activeTab=='county' && (countyBoundary == null || countyBoundary.length === 0);



  return (
 
      <Box
        mt={2}
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "16px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          maxWidth: 500,
          mx: "auto",
          backgroundColor: "#fff",
        }}
      >
        {/* Tabs for City and County */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ mb: 2,  "& .MuiTabs-indicator": {
            backgroundColor: "#4E9268", 
          }, }}
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
                  backgroundColor: selectedCategory === "charging"?"#4E9268":""

                  }}
                  
                  disabled={selectedCategory === "economicZones" || selectedCategory === "demand" || isCityBoundaryEmpty||isCountyBoundaryEmpty}
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
                       backgroundColor: selectedCategory === "stores"?"#4E9268":""
                  }}
                  disabled={selectedCategory === "economicZones" || selectedCategory === "demand"|| isCityBoundaryEmpty||isCountyBoundaryEmpty}
                >
                  Stores
                </Button>
              </Grid>
            </>
          )}

        
          <Grid item xs={4}>
          {activeTab === "county" && (      <Button
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
                backgroundColor: selectedCategory === "economicZones"?"#4E9268":""

              }}
            >
              Economic Zones
            </Button>)}
          </Grid>
          <Grid item xs={4}>
          {activeTab === "county" &&   (<Button
              fullWidth
              onClick={() => handleCategoryChange("demand")}
              variant={
                selectedCategory === "demand" ? "contained" : "outlined"
              }
              size="small"
              sx={{
                textTransform: "none",
                fontSize: "0.875rem",
                padding: "6px 12px",
                backgroundColor: selectedCategory === "demand"?"#4E9268":""

              }}
            >
              Demand
            </Button>)}
          </Grid>

        
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
        </Grid>
      </Box>
    
  );
};

export default FilterBox;
