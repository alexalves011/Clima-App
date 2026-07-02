import { useState } from "react";
import { useLocalWeather } from "./hooks/useLocalWeather";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import Loading from "./components/Loading";
import "./App.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  // 1. Estado para busca manual
  const [searchedWeather, setSearchedWeather] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  
  // 2. Hook de geolocalização (dados automáticos)
  const { weather: localWeather, loading: localLoading, error } = useLocalWeather();

  // Função para buscar por cidade
  const handleSearch = async (city) => {
    setLoadingSearch(true);
    try {
      const response = await fetch(
        `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&city_name=${city}`
      );
      const data = await response.json();
      if (data.results) {
        setSearchedWeather(data.results);
      }
    } catch (err) {
      console.error("Erro", err);
    } finally {
      setLoadingSearch(false);
    }
  };

  // Define o que mostrar: se buscou uma cidade, mostra ela. Senão, mostra o local.
  const displayWeather = searchedWeather || localWeather;
  const isLoading = loadingSearch || localLoading;

  return (
    <div className="app-container">
      <SearchBar onSearch={handleSearch} />
      
      {isLoading ? (
        <Loading />
      ) : displayWeather ? (
        <>
          <h1>{displayWeather.city}</h1>
          <WeatherCard weather={displayWeather} />
          <ForecastList forecasts={displayWeather.forecast.slice(1, 4)} />
        </>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
}

export default App;