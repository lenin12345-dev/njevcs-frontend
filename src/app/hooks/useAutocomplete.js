import { useEffect,useMemo,useCallback } from "react";

const useAutocomplete = ({
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
  setMessage
}) => {
  const defaultBounds = useMemo(() => ({
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
  }), [center]);
  
  const options = useMemo(() => ({
    bounds: defaultBounds,
    componentRestrictions: { country: "us" },
    types: ["(cities)"],
    fields: ["address_components", "geometry"],
    strictBounds: false,
  }), [defaultBounds]);

  
  const handlePlaceSelected = useCallback(async (place) => {
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
      if (cityName) {
        setSearchText(cityName +", NJ"); // Set the searchText to the selected city's name
      }

      const isInNewJersey = place.address_components.some(
        (component) =>
          component.types.includes("administrative_area_level_1") &&
          component.long_name === "New Jersey"
      );

      if (isInNewJersey) {
        setCityCoordinates(location); // Update the center of the map
        setWarning(false);

     
        const bounds = place.geometry.viewport; // Get the viewport (bounds) of the selected city
        // setShowFilter(true);
        setSelectedCategory("charging");
        

        try {
          setIsSidebarOpen(false);
          await fetchCityBoundary(cityName);
          await fetchEconomyAndEvDetails(cityName,'city');
          fetchCityPlaces(location, bounds, cityName, selectedCategory,'city');
          // setMessage(`Boundary created for ${cityName}.Hover over charging stations or store markers to see details.`); // Show message

        } catch (error) {
          console.error("Error fetching city data:", error);
          setWarning(true); // Notify the user about the error
        }
      } else {
        setWarning(true);
      }
    }
  },
  [
    cityBoundary,
    setCityCoordinates,
    setWarning,
    // setShowFilter,
    setSelectedCategory,
    fetchCityBoundary,
    fetchEconomyAndEvDetails,
    fetchCityPlaces,
    selectedCategory,
  ]);
  useEffect(() => {
    if (
      isLoaded &&
      typeof window !== "undefined" &&
      window.google &&
      inputRef.current &&
      !autocompleteRef.current
    ) {

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
  }, [isLoaded, inputRef,activeTab,autocompleteRef]);
  


  return inputRef;
};

export default useAutocomplete;
