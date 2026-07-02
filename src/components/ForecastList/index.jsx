import ForecastItem from "../ForecastItem";
import "./styles.css";

const ForecastList = ({ forecasts }) => {
 // console.log("Dados do Forecast:", forecasts); // Adicione isso

  return (
    <div className="forecast-list">
      {forecasts.map((forecast, index) => (
        <ForecastItem key={index} {...forecast} />
      ))}
    </div>
  );
};

export default ForecastList;