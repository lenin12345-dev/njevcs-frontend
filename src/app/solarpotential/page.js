"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  useJsApiLoader,
  Polygon,
} from "@react-google-maps/api";
import {
  Box,
  Snackbar,
  Alert,
  Typography,
  CircularProgress,
  Backdrop,
  ButtonGroup,
  Button,
  Grid,
  Drawer,
  IconButton,
  Divider,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import j1772 from "../../../public/j1772.png";
import tesla from "../../../public/tesla.png";
import chademo from "../../../public/chademo.png";
import nema1450 from "../../../public/nema1450.png";
import nema515 from "../../../public/nema515.png";
import nema520 from "../../../public/nema520.png";
import combo from "../../../public/combo.png";
import publicImage from "../../../public/public.png";
import privateImage from "../../../public/private.svg";
import config from '../../config/config';

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 40.0583, // New Jersey's central latitude
  lng: -74.4057, // New Jersey's central longitude
};
const key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const EVChargingStationsMap = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [places, setPlaces] = useState([]);
  const [cityCoordinates, setCityCoordinates] = useState(center);
  const [warning, setWarning] = useState(false);
  const [hoveredPlace, setHoveredPlace] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("charging");
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cityBoundary, setCityBoundary] = useState(null);
  const [polygonOptions, setPolygonOptions] = useState(null);
  const [cityInfo, setCityInfo] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [countyBoundaries, setCountyBoundaries] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [zoomLevel, setZoomLevel] = useState("12");
  const [hoveredCounty, setHoveredCounty] = useState(null);
  const [hoveredEvCounty, setHoveredEvCounty] = useState(null);

  const [evsCount, setEvsCount] = useState("");
  const [evcsData, setEvcsData] = useState([]);
  const [demand, setDemand] = useState([]);

  const inputRef = useRef(null); // Ref for the input field
  const autocompleteRef = useRef(null); // Ref for the autocomplete instance
  const mapRef = useRef(null); // Ref for the Google Map instance

  const theme = useTheme(); // Access the theme
  const appBarHeight = (theme.mixins.toolbar.minHeight || 56) + 8;

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: key, // Replace with your actual API key
    libraries: ["places"],
  });
  const incomeColors = {
    Low: "#ff0000", // Red for low income
    Medium: "#ffa500", // Orange for medium income
    High: "#008000", // Green for high income
  };
  const evcsColor = {
    Low: "orange",
    Medium: "grey",
    High: "blue",
  };
  const supportedChargingTypes = [
    { key: "j1772", label: "J1772", icon: j1772 },
    { key: "tesla", label: "Tesla", icon: tesla },
    { key: "chademo", label: "CHAdeMO", icon: chademo },
    { key: "nema1450", label: "NEMA 1450", icon: nema1450 },
    { key: "nema515", label: "NEMA 5-15", icon: nema515 },
    { key: "nema520", label: "NEMA 5-20", icon: nema520 },
    { key: "j1772COMBO", label: "J1772 Combo", icon: combo },
  ];

  const supportedChargingSpeeds = [
    { key: "dcFastPoints", label: "DC Fast Charging:" },
    { key: "level1Points", label: "Level 1 Points:" },
    { key: "level2Points", label: "Level 2 Points:" },
  ];

  // Initialize Autocomplete
  useEffect(() => {
    if (
      isLoaded &&
      typeof window !== "undefined" &&
      window.google &&
      inputRef.current &&
      !autocompleteRef.current
    ) {
      const defaultBounds = {
        north: center.lat + 0.1,
        south: center.lat - 0.1,
        east: center.lng + 0.1,
        west: center.lng - 0.1,
      };

      const options = {
        bounds: defaultBounds,
        componentRestrictions: { country: "us" },
        fields: ["address_components", "geometry"],
        strictBounds: false,
      };

      // Create Autocomplete instance
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );

      // Listen for place selection
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();
        handlePlaceSelected(place);
      });
    }
  }, [isLoaded, inputRef]);

  const handlePlaceSelected = async (place) => {
    if (cityBoundary) {
      cityBoundary.setMap(null); // Remove the previous boundary
    }
    if (place && place.geometry) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      // Extract the city name
      const cityComponent = place.address_components.find((component) =>
        component.types.includes("locality")
      );
      let cityName = cityComponent ? cityComponent.long_name : "Unknown City";

      const isInNewJersey = place.address_components.some(
        (component) =>
          component.types.includes("administrative_area_level_1") &&
          component.long_name === "New Jersey"
      );

      if (isInNewJersey) {
        setCityCoordinates(location); // Update the center of the map
        setWarning(false);

        // Use the city bounds for charging station search
        const bounds = place.geometry.viewport; // Get the viewport (bounds) of the selected city
        setShowFilter(true);
        setSelectedCategory("charging");

        // Create the polygon path based on the viewport
        await fetchCityBoundary(cityName);
        await fetchEconomyDetails(cityName);

        fetchPlaces(location, bounds, cityName, selectedCategory); // Fetch initial places based on category
      } else {
        setWarning(true);
      }
    }
  };
  const fetchEvCount = async (cityName) => {
    try {
      cityName = cityName.replace(/ Township$/i, "").trim();

      const response = await fetch(
        `${config.API_URL}/evs/city/${cityName}`
      );
      const data = await response.json();

      if (data && data.data) {
        const { numberOfEvs } = data.data;
        setEvsCount(numberOfEvs);
      } else {
        console.error("No economy details found for the city.");
      }
    } catch (error) {
      console.error("Error fetching economy details:", error);
    }
  };
  const parseCoordinates = (geometry) => {
    if (
      !geometry ||
      (geometry.type !== "MultiPolygon" && geometry.type == "Polygon")
    ) {
      return geometry.coordinates.flat(1);
    }
    // Flatten nested MultiPolygon coordinates into a single array
    const flattenedCoordinates = geometry.coordinates.flat(Infinity);

    if (flattenedCoordinates.length % 2 !== 0) {
      console.error(
        "Invalid coordinate data, missing pairs of longitude and latitude."
      );
      return [];
    }

    // Group flattened array into lat-lng pairs
    const latLngPairs = [];
    for (let i = 0; i < flattenedCoordinates.length; i += 2) {
      const lng = flattenedCoordinates[i];
      const lat = flattenedCoordinates[i + 1];
      latLngPairs.push([lng, lat]);
    }

    return latLngPairs;
  };
  const fetchCityBoundary = async (cityName) => {
    try {
      // Step 1: Fetch the place ID
      const placeIdUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        `${cityName}, NJ`
      )}&format=json&apiKey=${process.env.NEXT_PUBLIC_BOUNDARY_API_KEY}`;

      const placeIdResponse = await fetch(placeIdUrl);
      const placeIdData = await placeIdResponse.json();

      if (
        !placeIdData ||
        !placeIdData.results ||
        placeIdData.results.length === 0
      ) {
        console.error("Failed to fetch place ID.");
        return;
      }

      const placeId = placeIdData.results[0].place_id;

      // Step 2: Fetch the boundary data using the place ID
      const boundaryUrl = `
https://api.geoapify.com/v2/place-details?id=${placeId}&features=details&apiKey=${process.env.NEXT_PUBLIC_BOUNDARY_API_KEY}`;

      const boundaryResponse = await fetch(boundaryUrl);
      const boundaryData = await boundaryResponse.json();

      if (
        !boundaryData ||
        !boundaryData.features ||
        boundaryData.features.length === 0
      ) {
        console.error("No boundary data found.");
        return;
      }

      // Parse boundary coordinates
      const coordinates = parseCoordinates(boundaryData.features[0].geometry);

      // Create and render the boundary on the map
      createDottedBoundary(coordinates);
    } catch (error) {
      console.error("Error fetching city boundary:", error);
    }
  };

  const createDottedBoundary = (coordinates) => {
    const mapInstance = mapRef.current;
    if (!mapInstance) return;

    // Clear previous boundary
    if (cityBoundary) {
      cityBoundary.setMap(null);
    }

    // Validate and format coordinates

    const path = coordinates
      .map((coord) =>
        Array.isArray(coord) && coord.length >= 2
          ? { lat: parseFloat(coord[1]), lng: parseFloat(coord[0]) }
          : null
      )
      .filter((point) => point && !isNaN(point.lat) && !isNaN(point.lng));

    if (path.length === 0) {
      console.error("No valid path coordinates to draw.");
      return;
    }

    setCityBoundary(path); // Optionally store the boundary on the map
  };
  const fetchEconomyDetails = async (cityName) => {
    try {
      cityName = cityName.replace(/ Township$/i, "").trim();
      const response = await fetch(
        `${config.API_URL}/economy/city/${cityName}`
      );
      const data = await response.json();

      if (data && data.data) {
        const { income, incomeLevel } = data.data;
        setCityInfo({ cityName, income, incomeLevel });
        updatePolygonFillColor(incomeLevel);
        setSidebarVisible(true);
        await fetchEvCount(cityName);
      } else {
        console.error("No economy details found for the city.");
      }
    } catch (error) {
      console.error("Error fetching economy details:", error);
    }
  };
  const updatePolygonFillColor = (incomeLevel) => {
    let fillColor = "#FFFFFF"; // Default to white (no fill)

    switch (incomeLevel) {
      case "Low":
        fillColor = "#ff0000"; // Light red for low income
        break;
      case "Medium":
        fillColor = "#ffa500"; // Light yellow for medium income
        break;
      case "High":
        fillColor = "#008000"; // Light green for high income
        break;
      default:
        console.warn(`Unknown income level: ${incomeLevel}`);
    }

    setPolygonOptions((prevOptions) => ({
      ...prevOptions,
      fillColor, // Update the fill color dynamically
      fillOpacity: 0.5, // Adjust fill opacity
    }));
  };
  const fetchCountyData = async () => {
    setLoading(true);

    try {
      // Fetch county boundaries from the API
      const countyBoundariesResponse = await fetch(
        "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/us-county-boundaries/records?limit=20&refine=stusab%3A%22NJ%22"
      );
      const countyBoundariesData = await countyBoundariesResponse.json();

      // Fetch income data from your local API
      const incomeResponse = await fetch(
        `${config.API_URL}/economy/counties`
      );
      const incomeDataResponse = await incomeResponse.json();

      setCountyBoundaries(countyBoundariesData.results);
      setIncomeData(incomeDataResponse.data);
      stateView();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaces = (location, bounds, cityName, category) => {
    cityName = cityName.replace(/ Township$/i, "").trim();
    let apiUrl;

    setLoading(true);

    if (category === "charging") {
      apiUrl = `${config.API_URL}/evcs/city/${cityName}`;
    } else if (category === "stores") {
      apiUrl = `${config.API_URL}/stores/city/${cityName}`;
    }

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${category} for ${cityName}`);
        }
        return response.json();
      })
      .then(({ data }) => {
        setPlaces(data);
        setLoading(false);
        setCountyBoundaries(null);
        setIncomeData([]);
        setZoomLevel("12");
      })
      .catch((error) => {
        console.error(`Error fetching ${category} for ${cityName}:`, error);
      });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const cityName = autocompleteRef.current
      ? autocompleteRef.current
          .getPlace()
          ?.address_components?.find((component) =>
            component.types.includes("locality")
          )?.long_name
      : "Unknown City";

    if (category === "economicZones" && cityName !== "Unknown City") {
      // Trigger fetching of county data for New Jersey
      fetchCountyData();
      setHoveredEvCounty(null);
      setHoveredCounty(null);
      setEvcsData([]);
      setSidebarVisible(false);
      setCountyBoundaries([]);
    } else if (category === "demand" && cityName !== "Unknown City") {
      fetchCountyEvData();
      setHoveredCounty(null);
      setHoveredEvCounty(null);
      setIncomeData([]);
      setSidebarVisible(false);
      setCountyBoundaries([]);

      setDemand(true);
    } else {
      // Handle other categories
      fetchPlaces(cityCoordinates, null, cityName, category);
    }
  };
  const fetchCountyEvData = async () => {
    setLoading(true);

    try {
      // Fetch county boundaries from the API
      const countyBoundariesResponse = await fetch(
        "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/us-county-boundaries/records?limit=20&refine=stusab%3A%22NJ%22"
      );
      const countyBoundariesData = await countyBoundariesResponse.json();

      // Fetch EVCS data from your local API
      const evcsResponse = await fetch(`${config.API_URL}/evs/counties`);
      const evcsDataResponse = await evcsResponse.json();

      // Update state with the fetched data
      setCountyBoundaries(countyBoundariesData.results);

      setEvcsData(evcsDataResponse.data);

      stateView();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (event) => {
    const value = event.target.value;

    // If input is cleared, reset place and location
    if (value === "") {
      setPlaces(null); // Clear selected place
      setSelectedCategory("charging");
      setCityBoundary(null);
      setSidebarVisible(false);
    }
  };
  const stateView = () => {
    setPlaces([]);
    setCityCoordinates(center); // Reset the map to default center
    setCityBoundary(null);
    clearInput();
    setZoomLevel("8");
  };
  const resetFilters = () => {
    setShowFilter(false);
    setPlaces([]);
    // setCityCoordinates(center); // Reset the map to default center
    setCityBoundary(null);
    setSelectedCategory("charging");
    setCountyBoundaries(null);
    setIncomeData([]);
    clearInput();
    setSidebarVisible(false);
  };
  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ""; // Clear the input field
    }
  };
  // Combine income level data with county boundaries
  const getIncomeLevel = (countyName) => {
    const countyIncome = incomeData.find((item) => item.county === countyName);
    return countyIncome ? countyIncome.incomeLevel : "Medium"; // Default to "Medium" if not found
  };

  // Render polygons with color-coding
  const renderCountyBoundaries = () => {
    return countyBoundaries.map((county, index) => {
      const handleMouseOver = (county, polygon) => {
        // Set the county data when hovering over a county
        const countyName = county.name;
        const incomeLevel = getIncomeLevel(countyName);
        const income = getAvgIncome(countyName); // Fetch EVCS count
        const coordinates = county.geo_shape.geometry.coordinates[0].map(
          ([lng, lat]) => ({
            lat,
            lng,
          })
        );

        const bounds = new google.maps.LatLngBounds();
        coordinates.forEach(({ lat, lng }) =>
          bounds.extend(new google.maps.LatLng(lat, lng))
        );

        const center = bounds.getCenter();
        setHoveredCounty({
          name: countyName,
          incomeLevel,
          income,
          latitude: center.lat(),
          longitude: center.lng(),
        });
      };

      const handleMouseOut = () => {
        setHoveredCounty(null); // Clear the hovered county when mouse leaves
        setHoveredEvCounty(null);
      };
      const countyName = county.name;
      const incomeLevel = getIncomeLevel(countyName);
      const coordinates = county.geo_shape.geometry.coordinates[0].map(
        ([lng, lat]) => ({
          lat,
          lng,
        })
      );

      return (
        <Polygon
          key={index}
          paths={coordinates}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: incomeColors[incomeLevel],
            fillOpacity: 0.4,
          }}
          onMouseOver={() => handleMouseOver(county)}
          onMouseOut={handleMouseOut}
        />
      );
    });
  };
  const getEvcsLevel = (countyName) => {
    const countyEvcs = evcsData.find((item) => item.county === countyName);

    if (!countyEvcs) {
      return "Medium"; // Default when EVCS data is not found
    }

    return countyEvcs.evsLevel || "Medium";
  };

  const getEvcsCount = (countyName) => {
    const countyEvcs = evcsData.find((item) => item.county === countyName);
    return countyEvcs ? countyEvcs.numberOfEvs : 0; // Return count or 0
  };
  const getAvgIncome = (countyName) => {
    const countyIncome = incomeData.find((item) => item.county === countyName);
    return countyIncome ? countyIncome.income : 0; // Return count or 0
  };
  const renderCountyEvBoundaries = () => {
    return countyBoundaries.map((county, index) => {
      const handleMouseOver = () => {
        const countyName = county.name;
        const evsLevel = getEvcsLevel(countyName); // Fetch EVCS level
        const evsCountyCount = getEvcsCount(countyName); // Fetch EVCS count

        const coordinates = county.geo_shape.geometry.coordinates[0].map(
          ([lng, lat]) => ({
            lat,
            lng,
          })
        );

        const bounds = new google.maps.LatLngBounds();
        coordinates.forEach(({ lat, lng }) =>
          bounds.extend(new google.maps.LatLng(lat, lng))
        );

        const center = bounds.getCenter();
        setHoveredEvCounty({
          name: countyName,
          evsLevel,
          evsCountyCount,
          latitude: center.lat(),
          longitude: center.lng(),
        });
      };

      const handleMouseOut = () => {
        setHoveredEvCounty(null); // Clear hover data
        setHoveredCounty(null);
      };

      const countyName = county.name;
      const evsLevel = getEvcsLevel(countyName); // Get EVCS level
      const coordinates = county.geo_shape.geometry.coordinates[0].map(
        ([lng, lat]) => ({
          lat,
          lng,
        })
      );

      return (
        <Polygon
          key={index}
          paths={coordinates}
          options={{
            strokeColor: "#0000FF",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: evcsColor[evsLevel],
            fillOpacity: 0.6,
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
      );
    });
  };

  const closeSidebar = () => setSidebarVisible(false);

  const Sidebar = ({ cityInfo, visible, onClose, evsCount }) => (
    <Drawer
      anchor="right"
      variant="persistent"
      open={visible}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 350,
          height: "auto", // Auto height based on content
          maxHeight: "90vh", // Optional: Cap height to prevent overflow
          top: `${appBarHeight}px`, // Align with navbar,
          padding: 2,
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px 0 0 8px", // Rounded edges for better style
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
          {cityInfo?.cityName || "City Details"}
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
  );

  const onLoad = (map) => {
    mapRef.current = map;
    setIsMapLoaded(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box
        sx={{
          position: "absolute",
          top: "150px",
          left: "40px",
          zIndex: 10,
          width: "300px",
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter a city in NJ"
          onChange={handleInputChange}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />
        {showFilter && (
          <Box
            mt={2}
            sx={{
              border: "1px solid #ccc", // Border for card-like appearance
              borderRadius: "8px", // Rounded corners
              padding: "16px", // Padding inside the box
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
              maxWidth: 500,
              mx: "auto", // Center horizontally
              backgroundColor: "#fff", // Optional: Background color
            }}
          >
            <Grid container spacing={2}>
              {/* First Row */}
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
                  }}
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
                  }}
                >
                  Stores
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  onClick={() => handleCategoryChange("economicZones")}
                  variant={
                    selectedCategory === "economicZones"
                      ? "contained"
                      : "outlined"
                  }
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontSize: "0.875rem",
                    padding: "6px 12px",
                  }}
                >
                  Economic Zones
                </Button>
              </Grid>

              {/* Second Row */}
              <Grid item xs={6}>
                <Button
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
                  }}
                >
                  Demand
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  onClick={() => resetFilters()}
                  variant={
                    selectedCategory === "other" ? "contained" : "outlined"
                  }
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
        )}
      </Box>

      <Snackbar
        open={warning}
        autoHideDuration={6000}
        onClose={() => setWarning(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setWarning(false)}>
          Please select a city within New Jersey.
        </Alert>
      </Snackbar>

      {/* Google Map */}

      {!isLoaded ||
        (loading && (
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={!isLoaded || loading} // Open the backdrop while the map is loading
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ))}

      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={cityCoordinates}
          zoom={Number(zoomLevel)}
          onLoad={onLoad}
        >
          {cityBoundary && (
            <Polygon
              paths={cityBoundary} // The path for the city's boundary
              options={{
                ...polygonOptions, // Spread dynamically updated polygon options
                strokeColor: "#FF0000", // Red color for the boundary line
                strokeOpacity: 1, // Fully opaque stroke
                strokeWeight: 2, // Line thickness
              }}
            />
          )}

          {places &&
            places.length > 0 &&
            places.map((place, index) => {
              // Define a mapping of store names to their respective logo URLs
              const storeIcons = {
                Costco:
                  "https://gottadeal.s3.amazonaws.com/logos/vignette/costco.png",
                BJs: "https://bjs.scene7.com/is/image/bjs/201215_FSA_Icon2?fmt=png-alpha",
                Walmart: "http://localhost:3000/Walmart.png",
                Target:
                  "https://upload.wikimedia.org/wikipedia/commons/9/9a/Target_logo.svg",
                "Home Depot":
                  "https://i.pinimg.com/originals/3d/cf/2f/3dcf2fe5252d4e5233c2a334498661f8.png",
              };

              // Determine icon based on category or store name
              const isChargingStation = selectedCategory === "charging";
              const iconUrl = isChargingStation
                ? "https://energysolutions.homeserve.ca/wp-content/uploads/2022/02/BS_PD_2618_ev_icon_400px.png" // Charging station icon
                : storeIcons[place.name] || ""; // Store icon or fallback

              // Set size dynamically
              const iconSize = isChargingStation
                ? new window.google.maps.Size(30, 30) // Charging stations: smaller size
                : new window.google.maps.Size(40, 45); // Stores: larger size

              return (
                <Marker
                  key={index}
                  position={{ lat: place.latitude, lng: place.longitude }}
                  title={place.name}
                  icon={{
                    url: iconUrl,
                    scaledSize: iconSize, // Adjust size as needed
                  }}
                  onMouseOver={() => setHoveredPlace(place)} // Show InfoWindow on hover
                  onMouseOut={() => setHoveredPlace(null)} // Hide InfoWindow when not hovering
                />
              );
            })}

          {hoveredPlace && (
            <InfoWindow
              position={{
                lat: hoveredPlace.latitude,
                lng: hoveredPlace.longitude,
              }}
              options={{
                pixelOffset: new window.google.maps.Size(0, -30), // Adjust InfoWindow position
                closeBoxURL: "", // This hides the close button
                disableAutoPan: true, // Optional: Disable auto panning when the InfoWindow is opened
              }}
            >
              <Box
                sx={{
                  maxWidth: "150px",
                  backgroundColor: "white",
                  boxShadow: 2,
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 0.2,
                    color: "primary.main",
                    fontWeight: "bold",
                    fontSize: "0.75rem",
                  }}
                >
                  {hoveredPlace.name}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 0.2,
                    fontSize: "0.75rem",
                    fontWeight: "normal",
                  }}
                >
                  <strong>Address:</strong> {hoveredPlace.address}
                  {","} {hoveredPlace?.zipCode?.city}, NJ{" "}
                  {hoveredPlace?.zipCode?.zipCode}
                </Typography>

                {hoveredPlace.totalPoints &&
                  supportedChargingSpeeds.map(({ key, label }) => {
                    return (
                      hoveredPlace[key] && (
                        <Typography
                          key={key}
                          variant="body2"
                          sx={{
                            marginBottom: 0.2,
                            fontSize: "0.75rem",
                            fontWeight: "normal",
                          }}
                        >
                          <span style={{ fontWeight: "bold" }}>{label}</span>{" "}
                          {hoveredPlace[key]}
                        </Typography>
                      )
                    );
                  })}

                {selectedCategory == "charging" && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontWeight: "bold",
                      fontSize: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 0.2,
                    }}
                  >
                    {hoveredPlace.isPublic ? (
                      <>
                        <Image
                          src={publicImage} // Replace with the actual path to your public icon
                          alt="Public Charging Station"
                          width={16} // Adjust the width and height based on your design
                          height={16}
                          style={{
                            marginRight: "8px", // Increased space for better separation
                          }}
                        />
                        Public
                      </>
                    ) : (
                      <>
                        <Image
                          src={privateImage} // Replace with the actual path to your private icon
                          alt="Private Charging Station"
                          width={16} // Adjust the width and height based on your design
                          height={16}
                          style={{
                            marginRight: "8px", // Increased space for better separation
                          }}
                        />
                        Private
                      </>
                    )}
                  </Typography>
                )}

                {hoveredPlace.parkingArea && (
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: 0.2,
                      fontSize: "0.75rem",
                      fontWeight: "normal",
                    }}
                  >
                    <strong>Parking Area:</strong> {hoveredPlace.parkingArea}{" "}
                    <span>m²</span>
                  </Typography>
                )}
                {hoveredPlace.solarPotential && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "success.main",
                      marginBottom: 0.2,
                      fontSize: "0.75rem",
                      fontWeight: "normal",
                    }}
                  >
                    <strong>Solar Potential:</strong>{" "}
                    {hoveredPlace.solarPotential} <span>kWh/day</span>
                  </Typography>
                )}
                {selectedCategory === "charging" &&
                  supportedChargingTypes.map(({ key, label, icon }) => {
                    return (
                      hoveredPlace[key] && ( // Only render if hoveredPlace[key] is true
                        <Box
                          key={key}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px", // Add some spacing between the image and label
                            marginBottom: 0.2, // Optional: Add spacing between rows
                          }}
                        >
                          <Image
                            src={icon} // Path to the image
                            alt={label} // Alt text for the image
                            width={16} // Set width of the image
                            height={16} // Set height of the image
                            style={{
                              objectFit: "contain", // Ensures the image fits well inside the box
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: "success.main",
                              fontWeight: "normal",
                              fontSize: "0.75rem",
                            }}
                          >
                            {label}
                          </Typography>
                        </Box>
                      )
                    );
                  })}
              </Box>
            </InfoWindow>
          )}
          {hoveredCounty && (
            <InfoWindow
              position={{
                lat: hoveredCounty.latitude,
                lng: hoveredCounty.longitude,
              }}
              options={{
                pixelOffset: new window.google.maps.Size(0, -30), // Adjust InfoWindow position
                closeBoxURL: "", // This hides the close button
                disableAutoPan: true, // Optional: Disable auto panning when the InfoWindow is opened
              }}
            >
              <Box
                sx={{
                  maxWidth: "150px",
                  backgroundColor: "white",
                  boxShadow: 1,
                  borderRadius: 1,
                  padding: 0.4,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 0.2,
                    color: "primary.main",
                    fontWeight: "bold",
                    fontSize: "0.75rem",
                  }}
                >
                  {hoveredCounty.name} County
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 0.2,
                    color: "primary",
                    fontWeight: "normal",
                    fontSize: "0.75rem",
                  }}
                >
                  Income Level: {hoveredCounty.incomeLevel}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 0.2,
                    color: "primary",
                    fontWeight: "normal",
                    fontSize: "0.75rem",
                  }}
                >
                  Average Income: {hoveredCounty.income}$
                </Typography>
              </Box>
            </InfoWindow>
          )}
          {hoveredEvCounty && (
            <InfoWindow
              position={{
                lat: hoveredEvCounty.latitude,
                lng: hoveredEvCounty.longitude,
              }}
              options={{
                pixelOffset: new window.google.maps.Size(0, -30), // Adjust InfoWindow position
                closeBoxURL: "", // This hides the close button
                disableAutoPan: true, // Optional: Disable auto panning when the InfoWindow is opened
              }}
            >
              <Box
                sx={{
                  maxWidth: "150px",
                  backgroundColor: "white",
                  boxShadow: 1,
                  borderRadius: 1,
                  padding: 0.3,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 0.2,
                    color: "primary.main",
                    fontWeight: "bold",
                    fontSize: "0.75rem",
                  }}
                >
                  {hoveredEvCounty.name} County
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 0.2,
                    color: "primary",
                    fontWeight: "normal",
                    fontSize: "0.75rem",
                  }}
                >
                  EV Charging Demand: {hoveredEvCounty.evsLevel}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 0.2,
                    color: "primary",
                    fontWeight: "normal",
                    fontSize: "0.75rem",
                  }}
                >
                  Number of EVs: {hoveredEvCounty.evsCountyCount}
                </Typography>
              </Box>
            </InfoWindow>
          )}
          {countyBoundaries?.length &&
            incomeData?.length &&
            renderCountyBoundaries()}
          {countyBoundaries?.length &&
            evcsData?.length &&
            renderCountyEvBoundaries()}
          <Sidebar
            cityInfo={cityInfo}
            visible={sidebarVisible}
            onClose={closeSidebar}
            evsCount={evsCount}
          />
        </GoogleMap>
      )}
    </div>
  );
};

export default EVChargingStationsMap;
