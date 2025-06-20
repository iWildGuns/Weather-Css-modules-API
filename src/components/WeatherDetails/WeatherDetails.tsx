import type { Weather } from "../../hooks/useWeather";

type WeatherDetailsProps = {
  weather: Weather;
};

export default function WeatherDetails({ weather }: WeatherDetailsProps) {
  return (
    <div>
      <h2>Clima de: {weather.name}</h2>
    </div>
  );
}
