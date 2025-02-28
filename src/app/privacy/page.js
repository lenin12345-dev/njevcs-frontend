import { Container, Typography } from "@mui/material";

export default function PrivacyPolicy() {
  return (
    <Container maxWidth="md"  sx={{ py: 1.8 }}>
   <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "#333",
                textAlign: "center",
                marginTop:"4px",
                
                fontSize: { xs: "2rem", sm: "3rem", md: "2.5rem" },
              }}
            >
            <span style={{color:"#4E9268"}}>Privacy Policy</span>
            </Typography>
      <Typography  >
        At NJ EVCS Awnings, your privacy is our top priority. We are committed to
        protecting your personal information and ensuring transparency about how
        we collect, use, and share data. This Privacy Policy outlines how we handle
        user data, including location history, search history, and other personal
        information, in a secure and responsible way.
      </Typography>
      <Typography variant="h5" sx={{ color: "#4E9268",mt: 2 }} >
        Information We Collect
      </Typography>
      <Typography  >
        <b>Personal Information:</b> When you use our services, we may collect information
        like your name, email address, and other contact details to provide you with a
        personalized experience.
      </Typography>
      <Typography  >
        <b>Location History:</b> With your permission, we may collect and store your location
        data to offer relevant services, such as finding nearby EV charging stations or
        calculating parking space utilization.
      </Typography>
      <Typography  >
        <b>Search History and Usage Data:</b> We collect information about your interactions
        with our platform, including search queries, page visits, and feature usage.
      </Typography>
      <Typography variant="h5" sx={{ color: "#4E9268",mt: 2 }} >
        How We Use Your Information
      </Typography>
      <Typography >
        We use the information collected to enhance service quality, personalize your
        experience, improve platform security, and conduct analytics.
      </Typography>
      <Typography variant="h5" sx={{ color: "#4E9268",mt: 2 }} >
        Data Sharing and Disclosure
      </Typography>
      <Typography  >
        Your data is never shared with third parties for marketing purposes without
        your explicit consent. However, we may share information with service
        providers, for legal compliance, or in the event of business transfers.
      </Typography>
      <Typography variant="h5" sx={{ color: "#4E9268",mt: 2 }} >
        Data Retention
      </Typography>
      <Typography  >
        We retain personal information only for as long as necessary to fulfill the
        purposes outlined in this policy.
      </Typography>
      <Typography variant="h5" sx={{ color: "#4E9268",mt: 2 }} >
        Your Privacy Choices and Rights
      </Typography>
      <Typography  >
        You have the right to access, update, or delete your personal information. You
        can opt out of location tracking or usage data collection at any time.
      </Typography>
      <Typography variant="h5" sx={{ color: "#4E9268",mt: 2 }} >
        Security of Your Information
      </Typography>
      <Typography  >
        We prioritize the security of your personal information, implementing
        industry-standard practices.
      </Typography>
      <Typography variant="h5" sx={{ color: "#4E9268",mt: 2 }} >
        Updates to This Privacy Policy
      </Typography>
      <Typography  >
        We may update this Privacy Policy from time to time. You will be notified
        of significant changes.
      </Typography>
    </Container>
  );
}
