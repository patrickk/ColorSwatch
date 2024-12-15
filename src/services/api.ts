import { ColorData } from "../types";

export const fetchColors = async (
  saturation: number,
  lightness: number
): Promise<ColorData[]> => {
  const url = `https://www.thecolorapi.com/scheme?count=45&format=json&hsl=0,${saturation}%,${lightness}%`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.colors || [];
  } catch (error) {
    console.error("Error fetching colors:", error);
    throw new Error("Failed to fetch colors");
  }
};
