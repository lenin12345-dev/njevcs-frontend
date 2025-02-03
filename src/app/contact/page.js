"use client";
import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  Snackbar,
  styled,
  Alert,
} from "@mui/material";
import emailjs from "@emailjs/browser";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "4rem auto",
  padding: theme.spacing(2),
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
}));

const FormContainer = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    if (Object.keys(newErrors).length === 0) {
      return true;
    } else {
      setErrors(newErrors);
      return false;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
        formData,
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
      )
      .then(
        () => {
          setSnackbar({
            open: true,
            message: "Message sent successfully!",
            severity: "success",
          });
          setFormData({
            name: "",
            email: "",
            message: "",
          });
          setErrors({});
          setLoading(false);
        },
        (error) => {
          console.error("Email sending error:", error);
          setSnackbar({
            open: true,
            message: "Something went wrong. Please try again.",
            severity: "error",
          });
          setLoading(false);
        }
      );
  };

  return (
    <Container>
      <StyledCard>
        <CardContent>
          <Typography style={{color:"#4E9268"}} variant="h4" component={"h1"} gutterBottom align="center">
            Contact Us
          </Typography>
          <FormContainer onSubmit={handleSubmit} noValidate>
            <FormControl component={"fieldset"}>
              <TextField
                margin="normal"
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Message"
                multiline
                rows={4}
                name="message"
                variant="outlined"
                value={formData.message}
                error={Boolean(errors.message)}
                helperText={errors.message}
                onChange={handleChange}
              />
              <Button
           
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
                sx={{
                  marginTop: 3,
                  
                 
                  background: "#4E9268",
                  color: "#fff",
                  fontWeight: "bold",
               
                  textTransform: "none",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #FFA500, #FFD700)",
                    boxShadow: "0 6px 15px rgba(0,0,0,0.5)",
                  },
                }}
              >
                {loading ? "Sending..." : "Submit"}
              </Button>
            </FormControl>
          </FormContainer>
        </CardContent>
      </StyledCard>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Page;
