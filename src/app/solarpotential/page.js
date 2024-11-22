"use client";
import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Box, Snackbar, Alert } from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 40.0583, // New Jersey's central latitude
  lng: -74.4057, // New Jersey's central longitude
};

const EVChargingStationsMap = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [places, setPlaces] = useState([]);
  const [cityCoordinates, setCityCoordinates] = useState(center);
  const [warning, setWarning] = useState(false); 

  const inputRef = useRef(null); // Ref for the input field
  const autocompleteRef = useRef(null); // Ref for the autocomplete instance
  const mapRef = useRef(null); // Ref for the Google Map instance


  console.log('places',places)

  // Initialize Autocomplete
  useEffect(() => {
    if (typeof window !== "undefined" && window.google && inputRef.current && !autocompleteRef.current) {
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
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, options);

      // Listen for place selection
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();
        handlePlaceSelected(place);
      });
    }
  }, [inputRef.current]);

  const handlePlaceSelected = (place) => {
    if (place && place.geometry) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

          // Extract the city name
    const cityComponent = place.address_components.find((component) =>
      component.types.includes("locality")
    );
    const cityName = cityComponent ? cityComponent.long_name : "Unknown City";
  
      
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
          console.log('bounds',bounds)

        getChargingStations(location, bounds,cityName); // Get EV charging stations within the bounds
      } else {
        setWarning(true); 
      }
    }
  };

  // Fetch Charging Stations
  const getChargingStations = (location, bounds, cityName) => {
    // Make API call to fetch charging station details by city name
    fetch(`http://localhost:8080/stores/city/${cityName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch charging stations for ${cityName}`);
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        // Assuming the API returns a list of charging station details
        setPlaces(data); // Update the charging station places
        console.log(`Charging stations in ${cityName}:`, data);
      })
      .catch((error) => {
        console.error(`Error fetching charging stations for ${cityName}:`, error);
      });
  };

  const onLoad = (map) => {
    mapRef.current = map;
    setIsMapLoaded(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
     
      <Box sx={{ position: "absolute", top: "150px", left: "40px", zIndex: 10, width: "300px" }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter a city in NJ"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </Box>

    
      <Snackbar
        open={warning}
        autoHideDuration={6000}
        onClose={() => setWarning(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error"  onClose={() => setWarning(false)}>
          Please select a city within New Jersey.
        </Alert>
      </Snackbar>

      {/* Google Map */}
      {!isMapLoaded && <p>Loading map...</p>}
      <LoadScript
        googleMapsApiKey="AIzaSyB2k4OWeX0_6QgYbQ6KsrkCeH4i_p-DzQ0" // Replace with your actual API key
        libraries={["places"]}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={cityCoordinates}
          zoom={12}
          onLoad={onLoad}
        >
          {places.map((place, index) => (
            <Marker
              key={index}
              position={place.geometry.location}
              title={place.name}
              icon={{
                url: "https://energysolutions.homeserve.ca/wp-content/uploads/2022/02/BS_PD_2618_ev_icon_400px.png",
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default EVChargingStationsMap;
