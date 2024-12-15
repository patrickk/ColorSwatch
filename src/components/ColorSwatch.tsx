import { useEffect, useRef, useState } from "react";
import { fetchColors } from "../services/api";
import "../styles/styles.css";
import { ColorData } from "../types";
import useDebounce from "../hooks";

export default function ColorSwatch() {
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);
  const [colors, setColors] = useState<ColorData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cache = useRef<Map<string, ColorData[]>>(new Map());

  const debouncedSaturation = useDebounce(saturation, 300);
  const debouncedLightness = useDebounce(lightness, 300);

  const loadColors = async (s: number, l: number) => {
    const cacheKey = `${s}-${l}`;
    if (cache.current.has(cacheKey)) {
      setColors(cache.current.get(cacheKey)!);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fetchedColors = await fetchColors(s, l);
      setColors(fetchedColors);
      cache.current.set(cacheKey, fetchedColors);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch colors. Please try again.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadColors(debouncedSaturation, debouncedLightness);
  }, [debouncedSaturation, debouncedLightness]);

  return (
    <div className="App">
      <header>
        <h1>HSL Color Swatches</h1>
        <div className="inputs">
          <label>
            Saturation: {saturation}%
            <input
              type="range"
              min="0"
              max="100"
              value={saturation}
              onChange={(e) => setSaturation(Number(e.target.value))}
            />
          </label>
          <label>
            Lightness: {lightness}%
            <input
              type="range"
              min="0"
              max="100"
              value={lightness}
              onChange={(e) => setLightness(Number(e.target.value))}
            />
          </label>
        </div>
      </header>
      <main>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="grid">
            {colors.map((color, index) => (
              <div
                key={index}
                className="swatch"
                style={{ backgroundColor: color.hex.value }}
              >
                <p>{color.name.value}</p>
                <p>{`Hex: ${color.hex.value}`}</p>
                <p>{`RGB(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`}</p>
                <p>{`HSL(${color.hsl.h}, ${color.hsl.s}, ${color.hsl.l})`}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
