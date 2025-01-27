export  const parseCoordinates = (geometry) => {
    if (
      !geometry ||
      (geometry.type !== "MultiPolygon" && geometry.type == "Polygon")
    ) {
      return geometry.coordinates.flat(1);
    }
    // Flatten nested MultiPolygon coordinates into a single array
    const flattenedCoordinates = geometry.coordinates.flat(Infinity);

    if (flattenedCoordinates.length % 2 !== 0) {
      console.error(
        "Invalid coordinate data, missing pairs of longitude and latitude."
      );
      return [];
    }

    // Group flattened array into lat-lng pairs
    const latLngPairs = [];
    for (let i = 0; i < flattenedCoordinates.length; i += 2) {
      const lng = flattenedCoordinates[i];
      const lat = flattenedCoordinates[i + 1];
      latLngPairs.push([lng, lat]);
    }

    return latLngPairs;
  };