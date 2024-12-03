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
} from "@mui/material";
import * as turf from "@turf/turf";

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

  const inputRef = useRef(null); // Ref for the input field
  const autocompleteRef = useRef(null); // Ref for the autocomplete instance
  const mapRef = useRef(null); // Ref for the Google Map instance

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: key, // Replace with your actual API key
    libraries: ["places"],
  });

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
        // Create the polygon path based on the viewport
        await fetchCityBoundary(cityName);

        fetchPlaces(location, bounds, cityName, selectedCategory); // Fetch initial places based on category
      } else {
        setWarning(true);
      }
    }
  };
  const fetchCityBoundary = async (cityName) => {
    try {
      // Step 1: Fetch the place ID
      const placeIdUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        cityName
      )}&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658`;

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
      console.log("place_id", placeId);

      // Step 2: Fetch the boundary data using the place ID
      const boundaryUrl = `
https://api.geoapify.com/v2/place-details?id=${placeId}&features=details&apiKey=b8568cb9afc64fad861a69edbddb2658`;

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
      const coordinates = boundaryData.features[0].geometry.coordinates.flat(1);

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

    // Validate coordinates
    console.log("coordinates", coordinates);

    // Validate and format coordinates
    const path = coordinates
      .map(([lng, lat]) => ({ lat, lng })) // GeoJSON uses [lng, lat] format
      .filter(Boolean);

    if (path.length === 0) {
      console.error("No valid path coordinates to draw.");
      return;
    }

    // // Draw the polygon for the city boundary
    // const polygon = new google.maps.Polygon({
    //   paths: path,
    //   strokeColor: '#FF0000',
    //   strokeOpacity: 0.8,
    //   strokeWeight: 2,
    //   fillColor: '#FF0000',
    //   fillOpacity: 0.35,
    // });

    // polygon.setMap(mapInstance);
    setCityBoundary(path); // Optionally store the boundary on the map
  };

  const fetchPlaces = (location, bounds, cityName, category) => {
    cityName = cityName.replace(/ Township$/i, "").trim();
    let apiUrl;

    setLoading(true);

    if (category === "charging") {
      apiUrl = `http://localhost:8080/evcs/city/${cityName}`;
    } else if (category === "stores") {
      apiUrl = `http://localhost:8080/stores/city/${cityName}`;
    } else if (category === "economicZones") {
      apiUrl = `http://localhost:8080/economic-zones/city/${cityName}`;
    } else if (category === "demand") {
      apiUrl = `http://localhost:8080/demand-zones/city/${cityName}`;
    }

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${category} for ${cityName}`);
        }
        return response.json();
      })
      .then(({data}) => {
        setPlaces(data);
        setLoading(false);
        console.log(`${category} in ${cityName}:`, data);
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

    if (cityName !== "Unknown City") {
      fetchPlaces(cityCoordinates, null, cityName, category);
    }
  };
  const handleInputChange = (event) => {
    const value = event.target.value;

    // If input is cleared, reset place and location
    if (value === "") {
      setPlaces(null); // Clear selected place
      setSelectedCategory("charging");
    }
  };
  const resetFilters = () => {
   
    setShowFilter(false);
    setPlaces([]); 
    setCityCoordinates(center); // Reset the map to default center
     setCityBoundary(null)
     setSelectedCategory("charging");

     clearInput()
  };
  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ""; // Clear the input field
    }
   
  };

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
          zoom={12}
          onLoad={onLoad}
        >
          {cityBoundary && (
            <Polygon
              paths={cityBoundary} // The path for the city's boundary
              options={{
                strokeColor: "#FF0000", // Red color for the boundary line
                strokeOpacity: 1, // Fully opaque stroke
                strokeWeight: 2, // Line thickness
                strokeDasharray: "5, 5", // Dotted line (5px dash, 5px gap)
                fillColor: null, // No fill color
                fillOpacity: 0,
              }}
            />
          )}

          {places &&
            places.length > 0 &&
            places.map((place, index) => {
              // Define a mapping of store names to their respective logo URLs
              const storeIcons = {
                Costco:
                  "https://e7.pngegg.com/pngimages/378/178/png-clipart-costco-wholesale-united-kingdom-ltd-app-store-retail-others-miscellaneous-text.png",
                BJs: "https://pbs.twimg.com/profile_images/1696971074200592384/UZstsMwK_400x400.jpg",
                Walmart:
                  "https://wallpapers.com/images/hd/walmart-round-logo-7r8yqrjrr1e7nav1.jpg",
                Target:
                  "https://banner2.cleanpng.com/20180202/rfe/av2kg164h.webp",
                "Home Depot":
                  "https://i.pinimg.com/originals/3d/cf/2f/3dcf2fe5252d4e5233c2a334498661f8.png",
              };

              // Determine icon based on category or store name
              const isChargingStation = selectedCategory === "charging";
              const iconUrl = isChargingStation
                ? "https://energysolutions.homeserve.ca/wp-content/uploads/2022/02/BS_PD_2618_ev_icon_400px.png" // Charging station icon
                : storeIcons[place.name] || "https://via.placeholder.com/30"; // Store icon or fallback

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
                </Typography>

                {hoveredPlace.totalPoints && (
                  <Typography
                    variant="body2"
                    sx={{
                      marginBottom: 0.2,
                      fontSize: "0.75rem",
                      fontWeight: "normal",
                    }}
                  >
                    <strong>Total Points:</strong> {hoveredPlace.totalPoints}
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

                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: 0.2,
                    fontSize: "0.75rem", // Smaller text
                    fontWeight: "normal",
                  }}
                >
                  <strong>Zip Code:</strong> {hoveredPlace.zipCode}
                </Typography>

                {hoveredPlace.j1772 && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "success.main",
                      fontWeight: "normal",
                      fontSize: "0.75rem",
                    }}
                  >
                    ✅ Supports J1772
                  </Typography>
                )}

                {hoveredPlace.tesla && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "success.main",
                      fontWeight: "normal",
                      fontSize: "0.75rem",
                    }}
                  >
                    ✅ Tesla Destination
                  </Typography>
                )}
              </Box>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default EVChargingStationsMap;
