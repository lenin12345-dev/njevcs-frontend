// CountyEvBoundaries.js
import React from "react";
import { Polygon } from "@react-google-maps/api";

const CountyEvBoundaries = ({
  countyBoundaries,
  getEvcsLevel,
  getEvcsCount,
  evcsColor,
  setHoveredEvCounty,
  setHoveredCounty,
}) => {
  const handleMouseOver = (county, coordinates) => {
    const countyName = county.name;
    const evsLevel = getEvcsLevel(countyName);
    const evsCountyCount = getEvcsCount(countyName);

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
    setHoveredCounty(null);   // Clear general hover data
  };

  return (
    <>
      {countyBoundaries.map((county, index) => {
        const countyName = county.name;
        const evsLevel = getEvcsLevel(countyName);
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
            onMouseOver={() => handleMouseOver(county, coordinates)}
            onMouseOut={handleMouseOut}
          />
        );
      })}
    </>
  );
};

export default CountyEvBoundaries;
