// CountyBoundaries.js
import React from "react";
import { Polygon } from "@react-google-maps/api";
import { heatMapColors } from "../../constants";


const CountyBoundaries = ({
  countyBoundaries,
  getIncomeLevel,
  getAvgIncome,
  setHoveredCounty,
  setHoveredEvCounty,
}) => {
  const handleMouseOver = (county, coordinates) => {
    const countyName = county.name;
    const incomeLevel = getIncomeLevel(countyName);
    const income = getAvgIncome(countyName);

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
    setHoveredCounty(null);
    setHoveredEvCounty(null);
  };

  return (
    <>
      {countyBoundaries.map((county, index) => {
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
              fillColor: heatMapColors[incomeLevel],
              fillOpacity: 0.4,
            }}
            onMouseOver={() => handleMouseOver(county, coordinates)}
            onMouseOut={handleMouseOut}
          />
        );
      })}
    </>
  );
};

export default CountyBoundaries;
