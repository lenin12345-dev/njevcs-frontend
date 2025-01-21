import { Marker } from "@react-google-maps/api";

const CustomMarker = ({ places, selectedCategory,setHoveredPlace }) => {
  const storeIcons = {
    Costco: "https://gottadeal.s3.amazonaws.com/logos/vignette/costco.png",
    BJs: "https://bjs.scene7.com/is/image/bjs/201215_FSA_Icon2?fmt=png-alpha",
    Walmart: "/Walmart.png",
    Target:
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Target_logo.svg",
    "Home Depot":
      "https://i.pinimg.com/originals/3d/cf/2f/3dcf2fe5252d4e5233c2a334498661f8.png",
  };

  return places.map((place, index) => {
    const isChargingStation = selectedCategory === "charging";
    const iconUrl = isChargingStation
      ? "https://energysolutions.homeserve.ca/wp-content/uploads/2022/02/BS_PD_2618_ev_icon_400px.png"
      : storeIcons[place.name] || "";

    const iconSize = isChargingStation
      ? new window.google.maps.Size(30, 30)
      : new window.google.maps.Size(40, 45);

    return (
      <Marker
        key={index}
        position={{ lat: place.latitude, lng: place.longitude }}
        title={place.name}
        icon={{ url: iconUrl, scaledSize: iconSize }}
        onMouseOver={() => setHoveredPlace(place)} // Show InfoWindow on hover
        onMouseOut={() => setHoveredPlace(null)} // Hide InfoWindow when not hovering
      />
    );
  });
};

export default CustomMarker;
