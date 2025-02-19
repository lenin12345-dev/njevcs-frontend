import config from "../../config/config";



export default async function handler(req, res) {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  
    const { name, type } = req.query;
    if (!name || !type) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
  
    const backendUrl = `${config.API_URL}/demand/${type}/${encodeURIComponent(name)}`;
  
    try {
      const response = await fetch(backendUrl);
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data?.errorMessage || "Failed to fetch data");
      }
  
      return res.status(200).json(data);
    } catch (error) {
      console.error("API Fetch Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  