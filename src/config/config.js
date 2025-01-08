const isBrowser = typeof window !== "undefined"; // Check if running in the browser
console.log("process.env.NEXT_PUBLIC_BACKEND_API_URL:::::",process.env.NEXT_PUBLIC_BACKEND_API_URL)
const config = {
  API_URL: process.env.NEXT_PUBLIC_BACKEND_API_URL?.trim() 
    ? process.env.NEXT_PUBLIC_BACKEND_API_URL.trim() // No port appended for ngrok URL
    : isBrowser
    ? `http://3.95.193.2:8080`
    : "http://localhost:8080",
};
export default config; // Export the config object

