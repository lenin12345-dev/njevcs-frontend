import React from "react";
import { Drawer, Box, Grid, Button} from "@mui/material";


const FilterBox = ({ showFilter, selectedCategory, handleCategoryChange, resetFilters }) => (
    showFilter && (
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
        <Grid container spacing={2}>
          {["charging", "stores", "economicZones", "demand", "other"].map((category, index) => (
            <Grid item xs={category === "other" ? 6 : 4} key={index}>
              <Button
                fullWidth
                onClick={() =>
                  category === "other" ? resetFilters() : handleCategoryChange(category)
                }
                variant={selectedCategory === category ? "contained" : "outlined"}
                size="small"
                sx={{ textTransform: "none", fontSize: "0.875rem", padding: "6px 12px" }}
              >
                {category === "other" ? "Reset Filter" :category === "economicZones" ? "Economic Zones":  category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  );

  export default FilterBox;