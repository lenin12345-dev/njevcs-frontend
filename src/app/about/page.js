import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

export default function About() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: 3, sm: 2 },
        paddingBottom: 3,
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Gradient Heading */}
  <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "#333",
                textAlign: "center",
                marginBottom: 4,
                fontSize: { xs: "2rem", sm: "3rem", md: "2.5rem" },
              }}
            >
            <span style={{color:"#4E9268"}}>About Us</span>
            </Typography>

      {/* Content */}
      <Box
        sx={{
          maxWidth: "800px",
          margin: "20px auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            fontSize: { xs: "0.9rem", sm: "1.1rem" },
          }}
        >
          Welcome to NJ EVCS Awnings, where we’re committed to driving
          sustainable energy solutions for urban spaces. Our mission is to
          transform mall parking areas into productive, green spaces by
          installing photovoltaic (PV) canopies that harness the power of solar
          energy while meeting the growing demand for electric vehicle (EV)
          infrastructure.
        </Typography>

        {/* Our Vision Section */}
        <Box sx={{ textAlign: "center" }}>
          <img
            alt=""
            src="https://www.google.com/get/sunroof/images/about/1-why.png"
            style={{ maxWidth: "170px", width: "100%" }}
          />
    <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
              textAlign: "center",

              marginTop: "20px",
              fontSize: { xs: "1.5rem", sm: "2rem" },
                }}
              >
             <span style={{color:"#4E9268"}}>Our Vision</span>
              </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              marginTop: 3,
              fontSize: { xs: "0.9rem", sm: "1.1rem" },
            }}
          >
            As the world shifts toward clean energy, we aim to be at the
            forefront of this transformation by creating smart, solar-powered
            solutions that cater to both today’s and tomorrow’s needs. We
            believe parking spaces can do more than provide convenience—they can
            power our communities and support a cleaner, greener future.
          </Typography>
        </Box>

        {/* What We Do Section */}
        <Box sx={{ textAlign: "center" }}>
          <img
            alt=""
            src="https://www.kindpng.com/picc/m/302-3026906_we-are-icon-hd-png-download.png"
            style={{ maxWidth: "160px", width: "100%" }}
          />
        <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  textAlign: "center",
                  marginTop: "20px",
                  fontSize: { xs: "1.5rem", sm: "2rem" }
                }}
              >
             <span style={{color:"#4E9268"}}>What We Do</span>
              </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              marginTop: 2,
              fontSize: { xs: "0.9rem", sm: "1.1rem" },
            }}
          >
            Using a combination of advanced data analytics and local insights,
            we assess the parking areas of malls and other large commercial
            spaces to maximize their potential for solar energy generation.
            Here’s how we bring our vision to life:
          </Typography>

          <Grid container spacing={3} sx={{ marginTop: 3 }}>
            <Grid item xs={12} sm={6}>
              <Card sx={{ boxShadow: 3, height: { xs: 200, sm: 180 } }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                    }}
                  >
                    Parking Area Assessment
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: "0.85rem", sm: "1rem" },
                    }}
                  >
                    Our team conducts a thorough analysis of parking lots,
                    determining the optimal layout and potential capacity for PV
                    canopies to harness maximum solar energy.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{ boxShadow: 3, height: { xs: 200, sm: 180 } }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                    }}
                  >
                    EV Demand Analysis
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: "0.85rem", sm: "1rem" },
                    }}
                  >
                    By analyzing the number of electric vehicles in specific
                    regions, we strategically design the number and placement of
                    EV charging stations to support current and anticipated
                    demand.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{ boxShadow: 3, height: { xs: 200, sm: 180 } }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                    }}
                  >
                    Economic and Regional Analysis
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: "0.85rem", sm: "1rem" },
                    }}
                  >
                    We assess the economic profile of each region to offer
                    solutions that align with local sustainability goals,
                    community engagement, and economic viability.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{ boxShadow: 3, height: { xs: 200, sm: 180 } }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                    }}
                  >
                    Custom PV Canopy Solutions
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: "0.85rem", sm: "1rem" },
                    }}
                  >
                    Our canopies provide shade, reduce carbon footprint, and
                    power EV charging stations—all while helping property owners
                    reduce energy costs and carbon emissions.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Why Choose Us Section */}
        <Box sx={{ textAlign: "center" }}>
          <img
            alt=""
            src="https://www.johnolivant.com/wp-content/uploads/2022/06/Next-Level-New-Logo-e1656427733314.png"
            style={{ maxWidth: "215px", width: "100%" }}
          />
       
          <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  textAlign: "center",
                  marginTop: "20px",
                  fontSize: { xs: "1.5rem", sm: "2rem" },
                }}
              >
             <span style={{color:"#4E9268"}}>Why Choose Us?</span>
              </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              marginTop: 2,
              fontSize: { xs: "0.9rem", sm: "1.1rem" },
            }}
          >
            Data-Driven Decisions: We utilize the latest data on electric
            vehicle trends and economic insights to deliver optimized,
            high-impact solutions for each project.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              marginTop: 2,
              fontSize: { xs: "0.9rem", sm: "1.1rem" },
            }}
          >
            Sustainability and Savings: With our PV canopy solutions, malls not
            only reduce their environmental footprint but also achieve
            significant long-term energy savings.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              marginTop: 2,
              fontSize: { xs: "0.9rem", sm: "1.1rem" },
            }}
          >
            Future-Ready Infrastructure: By providing scalable and adaptable EV
            charging infrastructure, we help future-proof malls and other large
            parking areas for the continued growth of electric mobility.
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "20px",
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          At NJ EVCS Awnings, we believe that the spaces we create today are the
          foundations of a more sustainable tomorrow. Join us in our mission to
          empower communities through clean energy and intelligent
          infrastructure.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "primary.main",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: { xs: "1rem", sm: "1.2rem" },
          }}
        >
          Let’s build a greener future—one parking lot at a time.
        </Typography>
      </Box>
    </Box>
  );
}
