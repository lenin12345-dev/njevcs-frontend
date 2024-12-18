const isBrowser = typeof window !== "undefined"; // Check if running in the browser

const config = {
  API_URL: isBrowser
    ? `http://3.95.193.2
:8080` // Replace port 3000 with 8080
    : "http://localhost:8080", // Default fallback for server-side
};

export default config;
