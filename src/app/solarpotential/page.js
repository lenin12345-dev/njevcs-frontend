"use client";
import React, { useState, useRef } from "react";
import { GoogleMap, useJsApiLoader, Polygon } from "@react-google-maps/api";
import {
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import j1772 from "../../../public/j1772.png";
import tesla from "../../../public/tesla.png";
import chademo from "../../../public/chademo.png";
import nema1450 from "../../../public/nema1450.png";
import nema515 from "../../../public/nema515.png";
import nema520 from "../../../public/nema520.png";
import combo from "../../../public/combo.png";
import publicImage from "../../../public/public.png";
import privateImage from "../../../public/private.svg";
import Sidebar from "../components/Sidebar";
import FilterBox from "../components/FilterBox";
import CustomMarker from "../components/CustomMarker";
import {
  PlaceInfoWindow,
  CountyInfoWindow,
  EvCountyInfoWindow,
} from "../components/InfoWindow";
import useAutocomplete from "../hooks/useAutocomplete";
import CountyBoundaries from "../components/CountyBoundaries";
import CountyEvBoundaries from "../components/CountyEvBoundaries";

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
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const showMessage = (msg) => {
    setMessage(msg);
    setOpenSnackbar(true);
  };


  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: key,
    libraries: ["places"],
  });
  const incomeColors = {
    Low: "#ff0000",
    Medium: "#ffa500",
    High: "#008000",
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

  const fetchEvCount = async (cityName) => {
    try {
      cityName = cityName.replace(/ Township$/i, "").trim();

      const response = await fetch(`api/evs/${cityName}`);
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

  const fetchCityBoundary = async (cityName) => {
    try {
      const response = await fetch(
        `/api/city-boundary?cityName=${encodeURIComponent(cityName)}`
      );
      const data = await response.json();

      if (data && data.coordinates) {
        // Create and render the boundary on the map
        createDottedBoundary(data.coordinates);
      } else {
        console.error("Failed to fetch city boundary.");
      }
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

    setCityBoundary(path);
  };
  const fetchEconomyDetails = async (cityName) => {
    try {
      cityName = cityName.replace(/ Township$/i, "").trim();
      const response = await fetch(`api/economy/${cityName}`);
      const data = await response.json();

      if (data?.data) {
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
  const fetchPlaces = (location, bounds, cityName, category) => {
    cityName = cityName.replace(/ Township$/i, "").trim();
    let apiUrl;

    setLoading(true);

    if (category === "charging") {
      apiUrl = `api/evcs/${cityName}`;
    } else if (category === "stores") {
      apiUrl = `api/stores/${cityName}`;
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
        setCountyBoundaries([]);
        setIncomeData([]);
        setZoomLevel("12");
        showMessage(`Boundary created for ${cityName}.Hover over charging stations or store markers to see details.`);
      })
      .catch((error) => {
        console.error(`Error fetching ${category} for ${cityName}:`, error);
      });
  };

  useAutocomplete({
    isLoaded,
    center,
    inputRef,
    autocompleteRef,
    cityBoundary,
    setCityCoordinates,
    setWarning,
    setShowFilter,
    setSelectedCategory,
    fetchCityBoundary,
    fetchEconomyDetails,
    fetchPlaces,
    selectedCategory,
    setMessage:showMessage
  });
  const updatePolygonFillColor = (incomeLevel) => {
    let fillColor = "#FFFFFF";

    switch (incomeLevel) {
      case "Low":
        fillColor = "#ff0000";
        break;
      case "Medium":
        fillColor = "#ffa500";
        break;
      case "High":
        fillColor = "#008000";
        break;
      default:
        console.warn(`Unknown income level: ${incomeLevel}`);
    }

    setPolygonOptions((prevOptions) => ({
      ...prevOptions,
      fillColor,
      fillOpacity: 0.5,
    }));
  };
  const fetchCountyData = async () => {
    setLoading(true);

    try {
      if (countyBoundaries && countyBoundaries.length == 0) {
        // Fetch county boundaries from the API
        const countyBoundariesResponse = await fetch(
          "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/us-county-boundaries/records?limit=20&refine=stusab%3A%22NJ%22"
        );
        const countyBoundariesData = await countyBoundariesResponse.json();
        setCountyBoundaries(countyBoundariesData.results);
      }

      // Fetch income data from your local API
      const incomeResponse = await fetch(`api/economy/counties`);
      const incomeDataResponse = await incomeResponse.json();

      setIncomeData(incomeDataResponse.data);
      stateView();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
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
      fetchCountyData();
      setHoveredEvCounty(null);
      setHoveredCounty(null);
      setEvcsData([]);
      setSidebarVisible(false);
      // setCountyBoundaries([]);
    } else if (category === "demand" && cityName !== "Unknown City") {
      fetchCountyEvData();
      setHoveredCounty(null);
      setHoveredEvCounty(null);
      setIncomeData([]);
      setSidebarVisible(false);
      // setCountyBoundaries([]);

      setDemand(true);
    } else {
      fetchPlaces(cityCoordinates, null, cityName, category);
    }
  };
  const fetchCountyEvData = async () => {
    setLoading(true);

    try {
      if (countyBoundaries && countyBoundaries.length == 0) {
        // Fetch county boundaries from the API
        const countyBoundariesResponse = await fetch(
          "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/us-county-boundaries/records?limit=20&refine=stusab%3A%22NJ%22"
        );
        const countyBoundariesData = await countyBoundariesResponse.json();
        setCountyBoundaries(countyBoundariesData.results);
      }

      // Fetch EVCS data from your local API
      const evcsResponse = await fetch(`api/evs/counties`);
      const evcsDataResponse = await evcsResponse.json();

      // Update state with the fetched data

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
      setPlaces(null);
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
    setCountyBoundaries([]);
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
    return countyIncome ? countyIncome.incomeLevel : "Medium";
  };

  const getEvcsLevel = (countyName) => {
    const countyEvcs = evcsData.find((item) => item.county === countyName);

    if (!countyEvcs) {
      return "Medium";
    }

    return countyEvcs.evsLevel || "Medium";
  };

  const getEvcsCount = (countyName) => {
    const countyEvcs = evcsData.find((item) => item.county === countyName);
    return countyEvcs ? countyEvcs.numberOfEvs : 0;
  };
  const getAvgIncome = (countyName) => {
    const countyIncome = incomeData.find((item) => item.county === countyName);
    return countyIncome ? countyIncome.income : 0;
  };

  const closeSidebar = () => setSidebarVisible(false);

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
        <FilterBox
          showFilter={showFilter}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          resetFilters={resetFilters}
        />
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={45000} // Show for 45 seconds
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="info" onClose={() => setOpenSnackbar(false)}>
          {message}
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
              paths={cityBoundary}
              options={{
                ...polygonOptions,
                strokeColor: "#FF0000",
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
          )}

          {places?.length > 0 && (
            <CustomMarker
              places={places}
              selectedCategory={selectedCategory}
              setHoveredPlace={setHoveredPlace}
            />
          )}

          {hoveredPlace && (
            <PlaceInfoWindow
              place={hoveredPlace}
              supportedChargingSpeeds={supportedChargingSpeeds}
              supportedChargingTypes={supportedChargingTypes}
              selectedCategory={selectedCategory}
              publicImage={publicImage}
              privateImage={privateImage}
            />
          )}
          {hoveredCounty && <CountyInfoWindow county={hoveredCounty} />}
          {hoveredEvCounty && <EvCountyInfoWindow evCounty={hoveredEvCounty} />}
          {countyBoundaries?.length && incomeData?.length && (
            <CountyBoundaries
              countyBoundaries={countyBoundaries}
              getIncomeLevel={getIncomeLevel}
              getAvgIncome={getAvgIncome}
              incomeColors={incomeColors}
              setHoveredCounty={setHoveredCounty}
              setHoveredEvCounty={setHoveredEvCounty}
            />
          )}

          {countyBoundaries?.length && evcsData?.length && (
            <CountyEvBoundaries
              countyBoundaries={countyBoundaries}
              getEvcsLevel={getEvcsLevel}
              getEvcsCount={getEvcsCount}
              evcsColor={evcsColor}
              setHoveredEvCounty={setHoveredEvCounty}
              setHoveredCounty={setHoveredCounty}
            />
          )}
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
