import axios from "axios";
import type { SearchType /* Weather */ } from "../types";
// import { object, string, number, parse } from "valibot";
import { z } from "zod";
import { useMemo, useState } from "react";

// TYPE GUARD O ASSERTION
// function isWeatherResponse(weather: unknown): weather is Weather {
//   return (
//     Boolean(weather) &&
//     typeof weather === "object" &&
//     typeof (weather as Weather).name === "string" &&
//     typeof (weather as Weather).main.temp === "number" &&
//     typeof (weather as Weather).main.temp_max === "number" &&
//     typeof (weather as Weather).main.temp_min === "number"
//   );
// }

// ZOD
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});
export type Weather = z.infer<typeof Weather>;

// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_min: number(),
//     temp_max: number(),
//   }),
// });

// type Weather = Output<typeof WeatherSchema>;

const initialState = {
  name: "",
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
};

export default function useWeather() {
  const [weather, setWeather] = useState<Weather>(initialState);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchWeather = async (search: SearchType) => {
    const appId = import.meta.env.VITE_API_KEY;
    setWeather(initialState);
    setLoading(true);
    setNotFound(false);
    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;
      const { data } = await axios(geoUrl, { method: "get" });

      if (!data[0]) {
        setNotFound(true);
        return;
      }

      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      // ---------------------------- CASTEAR EL TYPE
      // const { data: weatherResult } = await axios<Weather>(weatherUrl, {
      //   method: "get",
      // });
      // console.log(weatherResult.main.temp);
      // console.log(weatherResult.name);

      // ---------------------------- TYPE GUARDS
      // const { data: weatherResult } = await axios(weatherUrl, {
      //   method: "get",
      // });
      // const result = isWeatherResponse(weatherResult);
      // if (result) {
      //   console.log(weatherResult.main);
      // }

      // ---------------------------- ZOD ---------------------------------//
      const { data: weatherResult } = await axios(weatherUrl);
      const result = Weather.safeParse(weatherResult);
      if (result.success) {
        setWeather(result.data);
      } else {
        console.log("Respuesta mal formada...");
      }

      // --------------------------- Valibot
      // const { data: weatherResult } = await axios(weatherUrl);
      // const result = parse(WeatherSchema, weatherResult);
      // if (result) console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
    console.log("consultando....");
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return {
    weather,
    loading,
    notFound,
    fetchWeather,
    hasWeatherData,
  };
}
