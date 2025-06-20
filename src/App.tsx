import styles from "./App.module.css";
import Form from "./components/Form/Form";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";
import useWeather from "./hooks/useWeather";

function App() {
  const { fetchWeather, weather, hasWeatherData } = useWeather();
  return (
    <>
      <h1 className={styles.tittle}>Buscador de clima</h1>
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />

        {hasWeatherData && <WeatherDetails weather={weather} />}
      </div>
    </>
  );
}

export default App;
