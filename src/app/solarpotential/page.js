"use client";
import React, { useState, useRef } from "react";
import { GoogleMap, useJsApiLoader, Polygon } from "@react-google-maps/api";
import {
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  Backdrop,
  useMediaQuery,
  useTheme,
} from "@mui/material";

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
import { counties,heatMapColors } from "../../constants";


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
  // const [showFilter, setShowFilter] = useState(false);
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
  const [countyBoundary, setCountyBoundary] = useState([]);
  const [activeTab, setActiveTab] = useState("county");

  const theme = useTheme();
  const [selectedCounty, setSelectedCounty] = useState("");
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchText,setSearchText] =useState("")
  const [isShowArrowIcon,setIsShowArrowIcon] = useState(true);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPlaces([]);
    // setCityCoordinates(center); // Reset the map to default center
    setCityBoundary(null);
    setSelectedCategory("charging");
    setCountyBoundary([]);
    setSelectedCounty("");
    setCountyBoundaries([]);
    setIncomeData([]);
    clearInput();
    setSidebarVisible(false);
    setIsShowArrowIcon(true)
    setSearchText("");
    autocompleteRef.current = null;
  };
  const zoomToBoundary = (coordinates) => {
    const mapInstance = mapRef.current;
    if (!mapInstance) return;

    const bounds = new window.google.maps.LatLngBounds();

    coordinates.forEach(({ lat, lng }) => {
      bounds.extend(new window.google.maps.LatLng(lat, lng));
    });

    // Fit the map to the new boundary
    mapInstance.fitBounds(bounds);
  };

  const handleCountyChange = async (e) => {
    const county = e.target.value;
    setSelectedCounty(county);
    setLoading(true);
    setCountyBoundaries([]);
    setIsSidebarOpen(false);
    setIsShowArrowIcon(true)

    try {
      const response = await fetch(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/us-county-boundaries/records?limit=20&refine=stusab%3A%22NJ%22&refine=name%3A%22${county}%22`
      );
      const data = await response.json();

      if (data?.results && data.results.length > 0) {
        const boundaryData =
          data.results[0]?.geo_shape?.geometry?.coordinates[0];
        const formatBoundaryData = boundaryData.map(([lng, lat]) => ({
          lat,
          lng,
        }));

        // Call zoom function to focus on county boundary
        zoomToBoundary(formatBoundaryData);

        setCountyBoundary(formatBoundaryData);
        countyView();
        await fetchEconomyAndEvDetails(county, "county");
        const category =
          selectedCategory == "economicZones" || selectedCategory == "demand"
            ? "charging"
            : selectedCategory;

        await fetchCountyPlaces(null, null, county, category);
      }
    } catch (error) {
      console.error("Error fetching county boundary data:", error);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setOpenSnackbar(true);
  };

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: key,
    libraries: ["places"],
  });
 
  const fetchCityBoundary = async (cityName) => {
    try {
      const response = await fetch(
        `/api/city-boundary?cityName=${encodeURIComponent(
          cityName
        )}&t=${Date.now()}`,
        { cache: "no-store" }
      );
      const data = await response.json();

      if (data?.coordinates) {
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
      setCityBoundary(null);
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

  const fetchEconomyAndEvDetails = async (name, type) => {
    try {
      name = name.replace(/ Township$/i, "").trim();
      const apiUrl = `/api/demand?name=${encodeURIComponent(
        name
      )}&type=${type}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data?.data) {
        const { totalEvs, avgIncome, incomeLevel } = data.data;

        setCityInfo({ name, income: avgIncome, incomeLevel, ...data.data });
        updatePolygonFillColor(incomeLevel);
        setSidebarVisible(true);
        
        setEvsCount(totalEvs);
      } else {
        console.error("No economy or EV details found.");
      }
    } catch (error) {
      console.error("Error fetching economy and EV details:", error);
    }
  };

  const fetchCityPlaces = (location, bounds, cityName, category) => {
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
        setIsSidebarOpen(false);
        setPlaces(data);
        setLoading(false);
        setCountyBoundaries([]);
        setIncomeData([]);

        setZoomLevel("12");

        showMessage(
          `Boundary created for ${cityName}.Hover over charging stations or store markers to see details.`
        );
      })
      .catch((error) => {
        console.error(`Error fetching ${category} for ${cityName}:`, error);
      });
  };
  const fetchCountyPlaces = (location, bounds, cityName, category) => {
    cityName = cityName.replace(/ Township$/i, "").trim();
    let apiUrl;

    setLoading(true);

    if (category === "charging") {
      let countyName = cityName;
      apiUrl = `api/evcsLevel/${countyName}`;
      setSelectedCategory("charging");
    } else if (category === "stores") {
      let countyName = cityName;
      apiUrl = `api/storesLevel/${countyName}`;
      setSelectedCategory("stores");
    }

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${category} for ${cityName}`);
        }
        return response.json();
      })
      .then(({ data }) => {
        setIsSidebarOpen(false);

        setPlaces(data);
        setLoading(false);
        setCountyBoundaries([]);
        setIncomeData([]);
        showMessage(
          `Boundary created for ${cityName}.Hover over charging stations or store markers to see details.`
        );
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
    // setShowFilter,
    setSelectedCategory,
    fetchCityBoundary,
    fetchEconomyAndEvDetails,
    fetchCityPlaces,
    selectedCategory,
    activeTab,
    setIsSidebarOpen,
    setSearchText,
    setMessage: showMessage,
  });

  const updatePolygonFillColor = (incomeLevel) => {
    setPolygonOptions((prevOptions) => ({
      ...prevOptions,
      fillColor: heatMapColors[incomeLevel] || "#FFFFFF",
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
      showMessage("Hover over a county to see the income details.");
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPlaces([]);

    const cityName = autocompleteRef.current
      ? autocompleteRef.current
          .getPlace()
          ?.address_components?.find((component) =>
            component.types.includes("locality")
          )?.long_name
      : "Unknown City";

    if (category === "economicZones") {
      fetchCountyData();
      setHoveredEvCounty(null);
      setHoveredCounty(null);
      setEvcsData([]);
      setSidebarVisible(false);
      setIsShowArrowIcon(true)
      setCountyBoundary([]);
      setSelectedCounty("");
      setPlaces([]);
      setIsSidebarOpen(false);

      // setCountyBoundaries([]);
    } else if (category === "demand") {
      fetchCountyEvData();
      setHoveredCounty(null);
      setHoveredEvCounty(null);
      setIncomeData([]);
      setSidebarVisible(false);
      setIsShowArrowIcon(true)
      setCountyBoundary([]);
      setSelectedCounty("");
      setPlaces([]);

      setIsSidebarOpen(false);

      // setCountyBoundaries([]);

      setDemand(true);
    } else {
      if (activeTab === "city") {
        fetchCityPlaces(cityCoordinates, null, cityName, category);
      } else {
        fetchCountyPlaces(cityCoordinates, null, selectedCounty, category);
      }
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
      showMessage("Hover over a county to see the demand details.");
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
      setPlaces([]);
      setSelectedCategory("charging");
      setCityBoundary(null);
      setSidebarVisible(false);
      setPolygonOptions(null);
      setIsShowArrowIcon(true)
    }
  };
  const stateView = () => {
    setPlaces([]);
    setCityCoordinates(center); // Reset the map to default center
    setCityBoundary(null);
    clearInput();
    setZoomLevel("8");
  };
  const countyView = () => {
    setPlaces([]);

    setCityBoundary(null);
    clearInput();
    setZoomLevel("10");
  };

  const resetFilters = () => {
    // setShowFilter(false);
    setPlaces([]);
    // setCityCoordinates(center); // Reset the map to default center
    setCityBoundary(null);
    setSelectedCategory("charging");
    setCountyBoundaries([]);
    setIncomeData([]);
    clearInput();
    setSidebarVisible(false);
    setIsShowArrowIcon(true)
    setCountyBoundary([]);
    setSelectedCounty("");
    setActiveTab("county");
  };
  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ""; 
    }
  };
  // Combine income level data with county boundaries
  const getIncomeLevel = (countyName) => {
    const countyIncome = incomeData.find((item) => item.county === countyName);
    return countyIncome ? countyIncome.incomeLevel : "Medium";
  };

  const getCountyData = (countyName) => {
    const countyEvcs = evcsData.find((item) => item.county === countyName);

    if (!countyEvcs) {
      return {
        evcsLevel: "Medium",
        evcsCount: 0,
        totalEVEnergyDemand: 0,
      };
    }

    return {
      evcsLevel: countyEvcs.incomeLevel || "Medium",
      evcsCount: countyEvcs.totalEvs || 0,
      totalEVEnergyDemand: countyEvcs.totalEVEnergyDemand || 0,
    };
  };

  const getColorBasedOnDemand = (name) => {
    let county = evcsData.find((item) => item.county === name);
    const { totalEVEnergyDemand } = county;
    if (totalEVEnergyDemand < 50000) {
      return "red"; // Low demand
    } else if (totalEVEnergyDemand >= 50000 && totalEVEnergyDemand < 150000) {
      return "orange"; // Medium demand
    } else {
      return "green"; // High demand
    }
  };
  const getAvgIncome = (countyName) => {
    const countyIncome = incomeData.find((item) => item.county === countyName);
    return countyIncome ? countyIncome.income : 0;
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
    setIsShowArrowIcon(false);
  }

  const onLoad = (map) => {
    mapRef.current = map;
    setIsMapLoaded(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh"}}>
      {isLoaded && (
        <Box
          sx={{
            position: "absolute",
            top: "150px",
            left: "40px",
            zIndex: 10,
            width: "300px",
          }}
        >
          {activeTab == "city" && (
            <div
              style={{
                position: isMobile?"absolute":"relative",
                width: isMobile ? "80%" : "100%",
                marginTop:isMobile?2:"auto"
              }}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Enter a city in New Jersey"
                value={searchText} 
                onChange={(e) => {
                  setSearchText(e.target.value);
                  handleInputChange(e); 
                }}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  position: isMobile ? "absolute" : "static",
                  zIndex: isMobile ? 9999 : "auto",
                  top: isMobile ? "10px" : "auto",
                  left: isMobile ? "0" : "auto",
                  transform: isMobile ? "translateX(-25px)" : "none",
                  paddingRight: "35px", 
                }}
              />
              {searchText && (
                <span
                  onClick={() => {
                    setSearchText(""); 
                    handleInputChange({ target: { value: "" } }); 
                  }}
                  style={{
                    position: "absolute",
                    right: isMobile?"36px":"10px",
                    top: "50%",
                    transform: isMobile?"translateY(81%)":"translateY(-50%)",
                    cursor: "pointer",
                    fontSize: "20px",
                    color: "black",
                    zIndex:isMobile?9999:"auto"
                  }}
                >
                  ×
                </span>
              )}
            </div>
          )}
          <FilterBox
            // showFilter={showFilter}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            resetFilters={resetFilters}
            cityBoundary={cityBoundary}
            selectedCounty={selectedCounty}
            handleCountyChange={handleCountyChange}
            counties={counties}
            handleTabChange={handleTabChange}
            activeTab={activeTab}
            countyBoundary={countyBoundary}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </Box>
      )}

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

      {(!isLoaded || loading) && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={!isLoaded || loading} // Open the backdrop while the map is loading
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

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
          {countyBoundary && (
            <Polygon
              paths={countyBoundary}
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
              selectedCategory={selectedCategory}
              publicImage={publicImage}
              privateImage={privateImage}
            />
          )}
          {hoveredCounty && <CountyInfoWindow county={hoveredCounty} />}
          {hoveredEvCounty && <EvCountyInfoWindow evCounty={hoveredEvCounty} />}
          {countyBoundaries.length > 0 && incomeData.length > 0 && (
            <CountyBoundaries
              countyBoundaries={countyBoundaries}
              getIncomeLevel={getIncomeLevel}
              getAvgIncome={getAvgIncome}
              setHoveredCounty={setHoveredCounty}
              setHoveredEvCounty={setHoveredEvCounty}
            />
          )}

          {countyBoundaries.length > 0 && evcsData.length > 0 && (
            <CountyEvBoundaries
              countyBoundaries={countyBoundaries}
              getCountyData={getCountyData}
              setHoveredEvCounty={setHoveredEvCounty}
              setHoveredCounty={setHoveredCounty}
              getColorBasedOnDemand={getColorBasedOnDemand}
            />
          )}
          <Sidebar
            activeTab={activeTab}
            cityInfo={cityInfo}
            visible={sidebarVisible}
            onClose={closeSidebar}
            evsCount={evsCount}
            isSidebarOpen={isSidebarOpen}
            isMobile={isMobile}
            theme={theme}
            setIsShowArrowIcon={setIsShowArrowIcon}
            isShowArrowIcon={isShowArrowIcon}
            selectedCategory={selectedCategory}
            setSidebarVisible = {setSidebarVisible}
          />
        </GoogleMap>
      )}
    </div>
  );
};

export default EVChargingStationsMap;
