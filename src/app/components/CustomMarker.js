import { Marker } from "@react-google-maps/api";
import { useCallback } from "react";

const CustomMarker = ({ places, selectedCategory, setHoveredPlace }) => {
  const storeIcons = {
    Costco: "https://gottadeal.s3.amazonaws.com/logos/vignette/costco.png",
    BJs: "https://bjs.scene7.com/is/image/bjs/201215_FSA_Icon2?fmt=png-alpha",
    Walmart: "/Walmart.png",
    Target:
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Target_logo.svg",
    "Home Depot":
      "https://i.pinimg.com/originals/3d/cf/2f/3dcf2fe5252d4e5233c2a334498661f8.png",
  };

  const getIcon = useCallback(
    (place) => {
      const isChargingStation = selectedCategory === "charging";
      return isChargingStation
        ? {
            url: "https://energysolutions.homeserve.ca/wp-content/uploads/2022/02/BS_PD_2618_ev_icon_400px.png",
            scaledSize: new window.google.maps.Size(30, 30),
          }
        : {
            url: storeIcons[place.name] || "",
            scaledSize: new window.google.maps.Size(40, 45),
          };
    },
    [selectedCategory] // Dependency array to recalculate when selectedCategory changes
  );



  return places.length>0 && places.map((place, index) => {
    const { url, scaledSize } = getIcon(place); // Get the icon based on place and category
    

    return (
      <Marker
        key={index}
        position={{ lat: Number(place?.latitude), lng: Number(place?.longitude) }}
        title={place?.name}
        icon={{ url, scaledSize }}
        onMouseOver={() => setHoveredPlace(place)} // Show InfoWindow on hover
        onMouseOut={() => setHoveredPlace(null)} // Hide InfoWindow when not hovering
      />
    );
  });
};

export default CustomMarker;
