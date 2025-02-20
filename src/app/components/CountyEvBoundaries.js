import React from "react";
import { Polygon } from "@react-google-maps/api";

const CountyEvBoundaries = ({
  countyBoundaries,
  getCountyData,
  setHoveredEvCounty,
  setHoveredCounty,
  getColorBasedOnDemand
}) => {
  const handleMouseOver = (countyName, coordinates) => {
  
    const {evcsLevel,evcsCount,totalEVEnergyDemand} = getCountyData(countyName);
 


    const bounds = new google.maps.LatLngBounds();
    coordinates.forEach(({ lat, lng }) =>
      bounds.extend(new google.maps.LatLng(lat, lng))
    );

    const center = bounds.getCenter();
    setHoveredEvCounty({
      name: countyName,
      evcsLevel,
      evcsCount,
      totalEVEnergyDemand,
      latitude: center.lat(),
      longitude: center.lng(),
    });
  };

  const handleMouseOut = () => {
    setHoveredEvCounty(null); // Clear hover data
    setHoveredCounty(null);   // Clear general hover data
  };

  return (
    <>
      {countyBoundaries.map((county, index) => {
        const countyName = county.name;
        const coordinates = county.geo_shape.geometry.coordinates[0].map(
          ([lng, lat]) => ({
            lat,
            lng,
          })
        );

      

   ; // Determining color based on energy demand
        
        return (
          <Polygon
            key={index}
            paths={coordinates}
            options={{
              strokeColor: "#0000FF",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: getColorBasedOnDemand(countyName), // Color based on energy demand
              fillOpacity: 0.4,
            }}
            onMouseOver={() => handleMouseOver(countyName, coordinates)}
            onMouseOut={handleMouseOut}
          />
        );
      })}
    </>
  );
};

export default CountyEvBoundaries;