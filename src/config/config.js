const isBrowser = typeof window !== "undefined"; // Check if running in the browser
console.log("process.env.NEXT_PUBLIC_BACKEND_API_URL:::::",process.env.NEXT_PUBLIC_BACKEND_API_URL)
const config = {
  API_URL:
    process.env.NEXT_PUBLIC_BACKEND_API_URL && process.env.NEXT_PUBLIC_BACKEND_API_URL.trim() !== ""
      ? process.env.NEXT_PUBLIC_BACKEND_API_URL+`:8080` // Use the custom API URL from environment variable if not empty
      : isBrowser
      ? `http://107.22.68.106`+`:8080` // Replace port 3000 with 8080
      : "http://localhost"+`:8080`, // Default fallback for server-side
};

export default config;
