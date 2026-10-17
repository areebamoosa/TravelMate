
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

  if (loading)
    return (
      <section className="flex h-full min-h-[220px] items-center rounded-2xl border border-stone-200 bg-white p-6 text-sm text-stone-500 shadow-sm">
        Loading weather...
      </section>
    );
  if (error)
    return (
      <section className="flex h-full min-h-[220px] items-center rounded-2xl border border-stone-200 bg-white p-6 text-sm text-red-600 shadow-sm">
        {error}
      </section>
    );
  if (!weather) return null;

  return (
    <section className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
        Current weather
      </p>
      <p className="mt-6 text-5xl font-semibold tracking-tight text-stone-900">
        {weather.temperature_2m}°
      </p>
      <p className="mt-2 text-sm text-stone-500">
        Feels like {weather.apparent_temperature}°
      </p>

      <div className="mt-auto grid gap-3 pt-8 text-sm">
        <div className="flex items-center justify-between rounded-xl bg-stone-50 px-4 py-3">
          <span className="text-stone-500">Humidity</span>
          <span className="font-medium text-stone-900">{weather.relative_humidity_2m}%</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-stone-50 px-4 py-3">
          <span className="text-stone-500">Wind</span>
          <span className="font-medium text-stone-900">{weather.wind_speed_10m} km/h</span>
        </div>
      </div>
    </section>
  );
}
