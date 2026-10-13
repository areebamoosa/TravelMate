
"use client";

import { useEffect, useState } from "react";

type WeatherProps = {
  latitude: number;
  longitude: number;
};

export default function Weather({ latitude, longitude }: WeatherProps) {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:8080/admin/weather?latitude=${latitude}&longitude=${longitude}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch weather");
        }

        setWeather(data.weather.current);
      } catch (err) {
        setError("Unable to load weather.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p>{error}</p>;
  if (!weather) return null;

  return (
    <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-stone-900">
        Current Weather
      </h2>

      <p className="mt-4 text-3xl font-semibold text-teal-800">
        {weather.temperature_2m}°C
      </p>

      <p className="mt-2 text-stone-600">
        Feels like {weather.apparent_temperature}°C
      </p>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-stone-600">
        <p>Humidity: {weather.relative_humidity_2m}%</p>
        <p>Wind: {weather.wind_speed_10m} km/h</p>
      </div>
    </section>
  );
}
