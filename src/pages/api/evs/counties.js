import config from "../../../config/config"; 

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Fetch evs data for counties 
    const response = await fetch(`${config.API_URL}/evs/counties`);

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData });
    }

    const data = await response.json();

   
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in evs counties API:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
