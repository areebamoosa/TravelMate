
exports.getWeather = async (req, res, next) => {
    const { latitude, longitude } = req.query;
  
    if (
      latitude === undefined ||
      longitude === undefined ||
      latitude.trim() === "" ||
      longitude.trim() === "" ||
      !Number.isFinite(Number(latitude)) ||
      !Number.isFinite(Number(longitude)) ||
      Number(latitude) < -90 ||
      Number(latitude) > 90 ||
      Number(longitude) < -180 ||
      Number(longitude) > 180
    ) {
      return res.status(400).json({
        message: "Valid latitude and longitude are required.",
      });
    }
  
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`
      );
  
      if (!response.ok) {
        const error = new Error("Unable to fetch weather data.");
        error.status = 502;
        return next(error);
      }
  
      const weather = await response.json();
  
      return res.status(200).json({ weather });
    } catch (err) {
      next(err);
    }
  };
  