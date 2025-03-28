import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider,
    Avatar,
    Grid,
    Button,
    List,
    ListItem,
    Skeleton,
  } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";



const SkeletonLoader = ({ itemCount = 5 }) => (
    <>
      {Array.from(new Array(itemCount)).map((_, index) => (
        <ListItem
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 0.5,
            px: 0.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", width: "70%" }}>
            <Skeleton variant="circular" width={16} height={16} sx={{ mr: 1 }} />
            <Skeleton variant="text" width="60%" height={20} />
          </Box>
          <Skeleton variant="text" width="30%" height={20} />
        </ListItem>
      ))}
    </>
  );
  
  const CityList = ({ loading, data, selectedCategory }) => (
    <List
      sx={{
        maxHeight:
          selectedCategory === "economicZones" || selectedCategory === "demand"
            ? "auto"
            : "100px",
        overflowY: "auto",
        p: 0,
      }}
    >
      {loading ? (
        <SkeletonLoader />
      ) : data.length > 0 ? (
        data.map((city, index) => (
          <ListItem
            key={index}
            sx={{
              minHeight: 30,
              py: 0.5,
              px: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #ddd",
            }}
          >
            {/* City Name with Icon */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PlaceIcon sx={{ color: "primary.main", fontSize: 16, mr: 0.5 }} />
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", fontSize: "0.8rem" }}
              >
                {city.city}
              </Typography>
              <Tooltip
                title={
                  <Box sx={{ p: 1 }}>
                      <Typography variant="body2">
                      <strong>City:</strong>  {city?.city}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Average Income:</strong> ${city.avgIncome.toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Total EVs:</strong> {city.totalEvs}
                    </Typography>
                    <Typography variant="body2">
                      <strong>EV Energy Demand:</strong>{" "}
                      {city?.totalEVEnergyDemand.toLocaleString()} kWh/day
                    </Typography>
                  </Box>
                }
                arrow
                placement="right"
              >
                <InfoIcon
                  fontSize="small"
                  sx={{
                    ml: 0.5,
                    verticalAlign: "middle",
                    color: "primary.main",
                  }}
                />
              </Tooltip>
            </Box>
  
            {/* Energy Deficit Display */}
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                fontSize: "0.75rem",
                color: "error.main",
                px: 1,
              }}
            >
              {Math.abs(city.excessEnergy).toLocaleString()}
            </Typography>
          </ListItem>
        ))
      ) : data.length === 0 && !loading ? ( // Only show "No data available" if loading is false
        <Typography
          sx={{ textAlign: "center", py: 2, fontSize: "0.9rem", color: "gray" }}
        >
          No data available
        </Typography>
      ) : null}
    </List>
  );

  export default CityList