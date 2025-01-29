import { parseCoordinates } from "../../utils"; // Adjust the path based on your project structure

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { cityName } = req.query;

  if (!cityName) {
    return res.status(400).json({ error: "City name is required" });
  }

  try {
    // Step 1: Fetch the place ID
    const placeIdUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      `${cityName}, NJ`
    )}&format=json&apiKey=${process.env.NEXT_PUBLIC_BOUNDARY_API_KEY}`;

    const placeIdResponse = await fetch(placeIdUrl, { cache: 'no-store' });
    const placeIdData = await placeIdResponse.json();

    if (!placeIdData || !placeIdData.results || placeIdData.results.length === 0) {
      return res.status(404).json({ error: "Failed to fetch place ID" });
    }

    const placeId = placeIdData.results[0].place_id;
    console.log(`City: ${cityName}, Place ID:`, placeIdData.results[0]?.place_id);



    // Step 2: Fetch the boundary data using the place ID
    const boundaryUrl = `https://api.geoapify.com/v2/place-details?id=${placeId}&features=details&apiKey=${process.env.NEXT_PUBLIC_BOUNDARY_API_KEY}`;

    const boundaryResponse = await fetch(boundaryUrl,{ cache: 'no-store' });
    const boundaryData = await boundaryResponse.json();

    if (
      !boundaryData ||
      !boundaryData.features ||
      boundaryData.features.length === 0
    ) {
      return res.status(404).json({ error: "No boundary data found" });
    }

    // Parse boundary coordinates
    const coordinates = parseCoordinates(boundaryData.features[0].geometry);
    

    // Return coordinates as the response
    return res.status(200).json({ coordinates,placeId });
  } catch (error) {
    console.error("Error in city boundary API:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
