import type { Weather } from "../../hooks/useWeather";
import { formatTempeture } from "../../utils";
import styles from "./WeatherDetails.module.css";

type WeatherDetailsProps = {
  weather: Weather;
};

export default function WeatherDetails({ weather }: WeatherDetailsProps) {
  return (
    <div className={styles.container}>
      <h2>Clima de: {weather.name}</h2>
      <p>{formatTempeture(weather.main.temp)} &deg;C</p>

      <div>
        <p>
          Min: <span>{formatTempeture(weather.main.temp_min)} &deg;C</span>
        </p>
        <p>
          Max: <span>{formatTempeture(weather.main.temp_max)} &deg;C</span>
        </p>
      </div>
    </div>
  );
}
