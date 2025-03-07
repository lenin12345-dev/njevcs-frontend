import j1772 from "../../public/j1772.png";
import tesla from "../../public/tesla.png";
import chademo from "../../public/chademo.png";
import nema1450 from "../../public/nema1450.png";
import nema515 from "../../public/nema515.png";
import nema520 from "../../public/nema520.png";
import combo from "../../public/combo.png";



export const counties = [
    "Atlantic",
    "Bergen",
    "Burlington",
    "Camden",
    "Cape May",
    "Cumberland",
    "Essex",
    "Gloucester",
    "Hudson",
    "Hunterdon",
    "Mercer",
    "Middlesex",
    "Monmouth",
    "Morris",
    "Ocean",
    "Passaic",
    "Salem",
    "Somerset",
    "Sussex",
    "Union",
    "Warren",
  ];

  export const supportedChargingTypes =[
        { key: "j1772", label: "J1772", icon: j1772 },
        { key: "tesla", label: "Tesla", icon: tesla },
        { key: "chademo", label: "CHAdeMO", icon: chademo },
        { key: "nema1450", label: "NEMA 1450", icon: nema1450 },
        { key: "nema515", label: "NEMA 5-15", icon: nema515 },
        { key: "nema520", label: "NEMA 5-20", icon: nema520 },
        { key: "j1772COMBO", label: "J1772 Combo", icon: combo },
  ]

  export const supportedChargingSpeeds = [
    { key: "dcFastPoints", label: "DC Fast Charging:" },
    { key: "level1Points", label: "Level 1 Points:" },
    { key: "level2Points", label: "Level 2 Points:" },
  ];

  export const heatMapColors = {
    Low: "#ff0000",
    Medium: "#ffa500",
    High: "#008000",
  };
   