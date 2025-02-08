import { Container, Typography } from "@mui/material";

const CookiePolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
          marginBottom: 4,
          fontSize: { xs: "2rem", sm: "3rem", md: "2.5rem" },
        }}
      >
        <span style={{ color: "#4E9268" }}>Cookie Policy</span>
      </Typography>

      <Typography>
        At NJ EVCS Awnings, we use cookies and similar tracking technologies to
        enhance your experience, understand usage patterns, and personalize the
        content and services we provide. This Cookie Policy explains what
        cookies are, how we use them, and your options regarding their usage on
        our platform.
      </Typography>

      <Typography variant="h5" sx={{ color: "#4E9268", mt: 3 }}>
        What Are Cookies?
      </Typography>
      <Typography>
        Cookies are small text files stored on your device when you visit a
        website. They help us remember your preferences, improve site
        functionality, and understand how you interact with our platform.
        Cookies may be classified as either &quot;session&quot; (temporary) cookies, which
        expire when you close your browser, or &quot;persistent&quot; cookies, which
        remain on your device for a set period.
      </Typography>

      <Typography variant="h5" sx={{ color: "#4E9268", mt: 3 }}>
        How We Use Cookies
      </Typography>
      <Typography>We use cookies for the following purposes:</Typography>
      <ul>
        <li>
          <Typography>
            Session Management: To maintain your session while you navigate our
            platform, ensuring smooth transitions between pages and functions.
          </Typography>
        </li>
        <li>
          <Typography>
            Search History Tracking: Temporary cookies help us store recent
            search queries and preferences.
          </Typography>
        </li>
        <li>
          <Typography>
            Performance and Analytics: Cookies allow us to analyze how users
            interact with our site.
          </Typography>
        </li>
        <li>
          <Typography>
            Personalization: Cookies help us remember your preferences, such as
            language and location settings.
          </Typography>
        </li>
      </ul>

      <Typography variant="h5" sx={{ color: "#4E9268", mt: 3 }}>
        Your Choices Regarding Cookies
      </Typography>
      <Typography>You can control and manage cookies in several ways:</Typography>
      <ul>
        <li>
          <Typography>
            Browser Settings: Most browsers allow you to view, manage, delete,
            and block cookies for specific sites.
          </Typography>
        </li>
        <li>
          <Typography>
            Opt-Out of Analytics Cookies: To opt out of third-party analytics
            cookies, you may adjust your settings on the relevant provider’s
            website.
          </Typography>
        </li>
      </ul>

      <Typography variant="h5" sx={{ color: "#4E9268", mt: 3 }}>
        Changes to This Cookie Policy
      </Typography>
      <Typography>
        We may occasionally update this Cookie Policy to reflect changes in
        legal requirements or to better explain our practices. Any updates will
        be posted here, and we encourage you to review this policy periodically.
      </Typography>
    </Container>
  );
};

export default CookiePolicy;
