import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import j1772 from "../../../public/j1772.png";
import tesla from "../../../public/tesla.png";
import chademo from "../../../public/chademo.png";
import nema1450 from "../../../public/nema1450.png";
import nema515 from "../../../public/nema515.png";
import nema520 from "../../../public/nema520.png";
import combo from "../../../public/combo.png";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import ExpandButton from "../components/ExpandButton";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CityList from './CityList'

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Avatar,
  Grid,
  Button,
  List,
  ListItem,
  Skeleton,
} from "@mui/material";

const Sidebar = ({
  activeTab,
  cityInfo,
  visible,
  onClose,
  evsCount,
  isSidebarOpen,
  isMobile,
  theme,
  setIsShowArrowIcon,
  isShowArrowIcon,
  selectedCategory,
  setSidebarVisible,
  topCityData,
  topStateCityData,
  topCityLoading
}) => {
  const appBarHeight = (theme.mixins.toolbar.minHeight || 56) + 8;

  const [isExpanded, setIsExpanded] = useState(false);


  return (
    <>
      <Drawer
        anchor={isMobile ? "bottom" : "right"}
        variant="persistent"
        open={visible}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: isShowArrowIcon ? (isMobile ? "100%" : 350) : 0,
            height: isMobile ? (isExpanded ? "50vh" : "18vh") : "auto",
            maxHeight: isMobile ? "60vh" : "90vh",
            top: isMobile ? "auto" : `${appBarHeight}px`,
            padding: isMobile || (selectedCategory =="economicZones" ||  selectedCategory =="demand") ? 1.2 : 2,
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: isMobile ? "16px 16px 0 0" : "8px 0 0 8px",
            overflowY: "auto",
            overscrollBehavior: "contain",
          },
        }}
      >
        {/* Header Section */}
        {isMobile && (
          <Button
            onClick={() => setIsExpanded((prev) => !prev)}
            sx={{
              position: "absolute",
              top: 4,
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#ddd",
              borderRadius: "50%",
              minWidth: 32,
              height: 32,
              fontSize: "1rem",
              textTransform: "none",
            }}
          >
            {isExpanded ? "−" : "+"}
          </Button>
        )}
        {(selectedCategory === "demand" ||
          selectedCategory == "economicZones") && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: isMobile ? "4px" : 1,
              px: isMobile ? 1 : 0,
            }}
          >
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              fontWeight="bold"
              color="primary"
            >
              New Jersey State
            </Typography>
            <IconButton size="small" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        {(selectedCategory === "charging" || selectedCategory == "stores") && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: isMobile ? "4px" : 1,
              px: isMobile ? 1 : 0,
            }}
          >
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              fontWeight="bold"
              color="primary"
            >
              {activeTab === "county"
                ? `${cityInfo?.name} County`
                : cityInfo?.name || "Unknown City"}
            </Typography>
            <IconButton size="small" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}
     
          <Divider />
        

        {/* Content Section */}
        {(selectedCategory === "charging" || selectedCategory == "stores") && (
          <Box sx={{ mt: isMobile ? "5px" : 1, px: isMobile ? 1 : 0 }}>
            <Typography
              variant="body1"
              sx={{ mb: 1, fontSize: isMobile ? 14 : 16 }}
            >
              <strong>Average Income:</strong>{" "}
              {cityInfo?.income
                ? `${"$" + cityInfo.income.toLocaleString()}`
                : "N/A"}
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 1, fontSize: isMobile ? 14 : 16 }}
            >
              <strong>Number Of Electric Vehicles:</strong> {evsCount || "N/A"}
            </Typography>
          </Box>
        )}
        {(selectedCategory === "charging" || selectedCategory == "stores") && (
          <Box
            sx={{
              px: 1.5,
              py: 1,
              borderRadius: 2,
              backgroundColor: "#e3f2fd",
            }}
          >
            <Grid container alignItems={"center"} spacing={1}>
              <Grid item xs={7}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="primary"
                  sx={{ mb: 0.3 }}
                >
                  🔋Energy Overview
                </Typography>
              </Grid>
              <Grid item xs={5} textAlign="right">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.3 }}
                >
                  (Unit: kWh/day)
                </Typography>
              </Grid>

              <Grid item xs={9}>
                <Typography variant="body2" display="inline">
                  🌞 Store Solar Potential
                </Typography>
                <Tooltip title="The solar energy potential is based on data from 5 stores: Costco, BJs, Walmart, Target, and Home Depot.">
                  <InfoIcon
                    fontSize="small"
                    sx={{
                      ml: 0.5,
                      verticalAlign: "middle",
                      color: "primary.main",
                    }}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={3} textAlign="right">
                <Typography variant="body2" fontWeight="bold">
                  {cityInfo?.totalSolarKwhPerDay?.toLocaleString() || "N/A"}
                </Typography>
              </Grid>

              <Grid item xs={9}>
                <Typography variant="body2">🚗 EV Energy Demand</Typography>
              </Grid>
              <Grid item xs={3} textAlign="right">
                <Typography variant="body2" fontWeight="bold">
                  {cityInfo?.totalEVEnergyDemand?.toLocaleString() || "N/A"}
                </Typography>
              </Grid>

              <Grid item xs={9}>
                <Typography variant="body2">
                  🔌 Public Charging Demand
                </Typography>
              </Grid>
              <Grid item xs={3} textAlign="right">
                <Typography variant="body2" fontWeight="bold">
                  {cityInfo?.publicChargingDemand?.toLocaleString() || "N/A"}
                </Typography>
              </Grid>

              <Grid item xs={9}>
                <Typography variant="body2">
                  ⚡ Charging Station Capacity
                </Typography>
              </Grid>
              <Grid item xs={3} textAlign="right">
                <Typography variant="body2" fontWeight="bold">
                  {cityInfo?.chargingStationCapacity?.toLocaleString() || "N/A"}
                </Typography>
              </Grid>

              <Grid item xs={9}>
                <Typography variant="body2">
                  💡{" "}
                  {cityInfo?.excessEnergy >= 0
                    ? "Excess Energy"
                    : "Energy Deficit"}
                </Typography>
              </Grid>
              <Grid item xs={3} textAlign="right">
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  color={
                    cityInfo?.excessEnergy >= 0 ? "success.main" : "error.main"
                  }
                >
                  {cityInfo?.excessEnergy !== undefined &&
                  cityInfo?.excessEnergy !== null
                    ? Math.abs(cityInfo.excessEnergy).toLocaleString()
                    : "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
        {/* Chargers Section */}
        {(selectedCategory === "charging" || selectedCategory == "stores") &&
          (cityInfo?.publicDcFast > 0 ||
            cityInfo?.publicLevel1 > 0 ||
            cityInfo?.publicLevel2 > 0) && (
            <Box
              sx={{
                mt: 1,
                px: 1.5,
                py: 1,
                backgroundColor: "#e3f2fd", // Light blue background for differentiation
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="primary"
                sx={{ mb: 0.3 }}
              >
                ⚡ Charging Infrastructure
              </Typography>

              <Grid container spacing={1}>
                {/* Public DC Fast Chargers */}
                {cityInfo?.publicDcFast > 0 && (
                  <>
                    <Grid item xs={9}>
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        color="text.primary"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {/* Display both Tesla and CHAdeMO icons */}
                        <Image
                          src={tesla}
                          alt={"tesla"}
                          width={16}
                          height={16}
                        />
                        <Image
                          src={chademo}
                          alt={"CHAdeMO"}
                          width={16}
                          height={16}
                          style={{
                            marginRight: "4px",
                          }}
                        />
                        DC Fast Chargers
                      </Typography>
                    </Grid>
                    <Grid item xs={3} textAlign="right">
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="primary"
                      >
                        {cityInfo?.publicDcFast.toLocaleString() || "N/A"}
                      </Typography>
                    </Grid>
                  </>
                )}

                {/* Public Level 1 Chargers */}
                {cityInfo?.publicLevel1 > 0 && (
                  <>
                    <Grid item xs={9}>
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        color="text.primary"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          src={nema515}
                          alt="NEMA 5-15"
                          width={16}
                          height={16}
                        />
                        <Image
                          src={nema520}
                          alt="NEMA 5-20"
                          width={16}
                          height={16}
                          style={{
                            marginRight: "4px",
                          }}
                        />
                        Level 1 Chargers
                      </Typography>
                    </Grid>
                    <Grid item xs={3} textAlign="right">
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="primary"
                      >
                        {cityInfo?.publicLevel1.toLocaleString() || "N/A"}
                      </Typography>
                    </Grid>
                  </>
                )}

                {/* Public Level 2 Chargers */}
                {cityInfo?.publicLevel2 > 0 && (
                  <>
                    <Grid item xs={9}>
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        color="text.primary"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Image src={j1772} alt="j1772" width={16} height={16} />
                        <Image
                          src={combo}
                          alt="J1772 Combo"
                          width={16}
                          height={16}
                          style={{
                            marginRight: "4px",
                          }}
                        />
                        Level 2 Chargers
                      </Typography>
                    </Grid>
                    <Grid item xs={3} textAlign="right">
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="primary"
                      >
                        {cityInfo?.publicLevel2.toLocaleString() || "N/A"}
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          )}
        {/* Cities List */}
        {activeTab == "county" && (
          <Box
            sx={{
              mt: 1,
              px:(selectedCategory =="economicZones" ||  selectedCategory =="demand")?0.5: 1.2,
              py: 1.2,
              borderRadius: 2,
              backgroundColor: "#e3f2fd",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 0.5,
              }}
            >
              <Box display={"flex"} alignItems={"center"}>
                <LocationCityIcon
                  sx={{ color: "green", mr: 0.2, fontSize: "16px" }}
                />
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="primary"
                >
                  Top {(selectedCategory =="economicZones" ||  selectedCategory =="demand")?"10":""} Energy Deficit Cities 
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.3, fontSize: 11 }}
              >
                (Unit: kWh/day)
              </Typography>
            </Box>

            <CityList loading={topCityLoading} selectedCategory={selectedCategory} data={(selectedCategory =="economicZones" ||  selectedCategory =="demand")?topStateCityData:topCityData} />
          </Box>
        )}

        {/* Visual Section */}
        {!isMobile &&
          (selectedCategory === "charging" || selectedCategory == "stores") &&
          cityInfo?.incomeLevel && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: isSidebarOpen ? 2 : 1,
                p: isSidebarOpen ? 1 : 1.5,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                backgroundColor: "#f0f4f8",
              }}
            >
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor:
                    cityInfo?.incomeLevel === "High"
                      ? "green"
                      : cityInfo?.incomeLevel === "Medium"
                      ? "orange"
                      : "red",
                }}
              >
                {cityInfo?.incomeLevel.charAt(0)}
              </Avatar>
              <Typography
                variant="body2"
                sx={{
                  ml: 2,
                  color: "#555",
                  textAlign: "center",
                  fontSize: isSidebarOpen ? 12 : 13,
                }}
              >
                The income level of {cityInfo?.name} is categorized as{" "}
                <strong>{cityInfo?.incomeLevel}</strong>.
              </Typography>
            </Box>
          )}

        {/* Heatmap Legend Section */}
        <Box
          sx={{
            mt: isMobile ? 2 : 1,
            px: 2,
            py: 1,
            borderRadius: 2,
            backgroundColor: "#f0f4f8",
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
            Indicator Guide
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: "#008000",
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              <Typography variant="body2">High</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: "#ffa500",
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              <Typography variant="body2">Medium</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: "#ff0000",
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              <Typography variant="body2">Low</Typography>
            </Box>
          </Box>
          {(selectedCategory === "charging" ||
            selectedCategory == "stores") && (
            <Typography
              color="text.secondary"
              sx={{ mt: 0.8, fontSize: "12px" }}
            >
              <span style={{ color: "orangered" }}>Note:</span> The solar energy
              potential is currently based on data from 5 stores: Costco, BJs,
              Walmart, Target, and Home Depot.
            </Typography>
          )}
        </Box>
      </Drawer>
      {!isShowArrowIcon && (
        <ExpandButton
          setSidebarVisible={setSidebarVisible}
          setIsShowArrowIcon={setIsShowArrowIcon}
        />
      )}
    </>
  );
};
export default Sidebar;
