
import { Container, Typography, Box } from '@mui/material';

export default function TermsOfService() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
         <Typography variant="h4"      sx={{
                fontWeight: "bold",
                color: "#333",
                textAlign: "center",
                marginBottom: 4,
                fontSize: { xs: "2rem", sm: "3rem", md: "2.5rem" },
              }}>
        
        <span style={{color:"#4E9268"}}>Terms of Service</span>
      </Typography>
      <Typography  variant="body1" >
        Welcome to NJ EVCS Awnings! By accessing or using our website and services, you agree to comply with and be bound by these Terms of Service . Please read them carefully, as they govern your use of our platform and the services we provide.
      </Typography>

      <Box mt={3}>
        <Typography style={{color:"#4E9268"}} variant="h6">Acceptance of Terms</Typography>
        <Typography variant="body1" >
          By using our website, you agree to these Terms, as well as our Privacy Policy and Cookie Policy. If you do not agree with any part of these Terms, you must not use our services.
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography style={{color:"#4E9268"}} variant="h6">Services Provided</Typography>
        <Typography variant="body1" >
          NJ EVCS Awnings offers data-driven solutions for optimizing parking areas, estimating solar canopy potential, and assessing EV charging requirements. Our platform may include analytics, recommendations, and installation services to support sustainable energy infrastructure.
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography style={{color:"#4E9268"}} variant="h6">User Accounts</Typography>
        <Typography variant="body1" >
          Certain features may require you to create an account with us. You agree to provide accurate, current, and complete information and to update it as necessary. You are responsible for maintaining the confidentiality of your account login information and for all activities under your account.
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography style={{color:"#4E9268"}} variant="h6">Use of the Platform</Typography>
        <Typography variant="body1" >
          You may use our platform only for lawful purposes and in accordance with these Terms. Prohibited activities include unauthorized access, data scraping, or harming the platform.
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography style={{color:"#4E9268"}} variant="h6">Intellectual Property</Typography>
        <Typography variant="body1" >
          All content, including text, graphics, logos, and software, is the property of NJ EVCS Awnings and is protected by copyright, trademark, and other intellectual property laws.
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography style={{color:"#4E9268"}} variant="h6">Limitation of Liability</Typography>
        <Typography variant="body1" >
          To the fullest extent permitted by law, NJ EVCS Awnings and its affiliates will not be liable for any indirect, incidental, or consequential damages arising from or related to your use of our platform.
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography style={{color:"#4E9268"}} variant="h6">Governing Law</Typography>
        <Typography variant="body1" >
          These Terms are governed by and construed in accordance with the laws of the State of New Jersey. Any disputes will be subject to the exclusive jurisdiction of the courts in New Jersey.
        </Typography>
      </Box>
    </Container>
  );
}
