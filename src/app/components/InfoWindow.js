import React from "react";
import { InfoWindow } from "@react-google-maps/api";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const PlaceInfoWindow = ({ place, supportedChargingSpeeds, supportedChargingTypes, selectedCategory, publicImage, privateImage }) => {
    console.log('place',place);
    
  if (!place) return null;

  return (
    <InfoWindow
      position={{ lat: place.latitude, lng: place.longitude }}
      options={{
        pixelOffset: new window.google.maps.Size(0, -30),
        closeBoxURL: "",
        disableAutoPan: true,
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
          {place.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginBottom: 0.2,
            fontSize: "0.75rem",
          }}
        >
          <strong>Address:</strong> {place.address}, {place?.zipCode?.city}, NJ {place?.zipCode?.zipCode}
        </Typography>
        {place.totalPoints &&
          supportedChargingSpeeds.map(({ key, label }) =>
            place[key] ? (
              <Typography
                key={key}
                variant="body2"
                sx={{
                  marginBottom: 0.2,
                  fontSize: "0.75rem",
                }}
              >
                <strong>{label}</strong> {place[key]}
              </Typography>
            ) : null
          )}
        {selectedCategory === "charging" && (
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
            <Image
              src={place.isPublic ? publicImage : privateImage}
              alt={place.isPublic ? "Public" : "Private"}
              width={16}
              height={16}
              style={{ marginRight: "8px" }}
            />
            {place.isPublic ? "Public" : "Private"}
          </Typography>
        )}
        {place.parkingArea && (
          <Typography
            variant="body2"
            sx={{
              marginBottom: 0.2,
              fontSize: "0.75rem",
            }}
          >
            <strong>Parking Area:</strong> {place.parkingArea} m²
          </Typography>
        )}
        {place.solarPotential && (
          <Typography
            variant="body2"
            sx={{
              color: "success.main",
              marginBottom: 0.2,
              fontSize: "0.75rem",
            }}
          >
            <strong>Solar Potential:</strong> {place.solarPotential} kWh/day
          </Typography>
        )}
        {selectedCategory === "charging" &&
          supportedChargingTypes.map(({ key, label, icon }) =>
            place[key] ? (
              <Box
                key={key}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: 0.2,
                }}
              >
                <Image src={icon} alt={label} width={16} height={16} />
                <Typography
                  variant="body2"
                  sx={{
                    color: "success.main",
                    fontSize: "0.75rem",
                  }}
                >
                  {label}
                </Typography>
              </Box>
            ) : null
          )}
      </Box>
    </InfoWindow>
  );
};

const CountyInfoWindow = ({ county }) => {
  if (!county) return null;

  return (
    <InfoWindow
      position={{ lat: county.latitude, lng: county.longitude }}
      options={{
        pixelOffset: new window.google.maps.Size(0, -30),
        closeBoxURL: "",
        disableAutoPan: true,
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
          {county.name} County
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginBottom: 0.2,
            fontSize: "0.75rem",
          }}
        >
          Income Level: {county.incomeLevel}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginBottom: 0.2,
            fontSize: "0.75rem",
          }}
        >
       Average Income: ${county.income.toLocaleString()}

        </Typography>
      </Box>
    </InfoWindow>
  );
};

const EvCountyInfoWindow = ({ evCounty }) => {
  if (!evCounty) return null;

  return (
    <InfoWindow
      position={{ lat: evCounty.latitude, lng: evCounty.longitude }}
      options={{
        pixelOffset: new window.google.maps.Size(0, -30),
        closeBoxURL: "",
        disableAutoPan: true,
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
          {evCounty.name} County
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginBottom: 0.2,
            fontSize: "0.75rem",
          }}
        >
          EV Charging Demand: {evCounty.evsLevel}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginBottom: 0.2,
            fontSize: "0.75rem",
          }}
        >
          Number of EVs: {evCounty.evsCountyCount.toLocaleString()}
        </Typography>
      </Box>
    </InfoWindow>
  );
};


export  { PlaceInfoWindow,CountyInfoWindow,EvCountyInfoWindow}
