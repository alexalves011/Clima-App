import "./styles.css";

// formata data dia da semana
const getWeekday = (dateString) => {
  const [day, month] = dateString.split("/");
  const dateObj = new Date(new Date().getFullYear(), month - 1, day);
  const weekday = Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(
    dateObj
  );

  return weekday.charAt(0).toUpperCase() + weekday.split("-")[0].slice(1);
};

const ForecastItem = ({ date, min, max, condition, description }) => {
  return (
    <div className="forecast-item">
      <p className="forecast-day">
         {getWeekday(date)} ({date})
      </p>
      <img src={`./icons-weather/${condition}.svg`} alt={description} />
      <p className="forecast-temp">
        {min}/{max}°
      </p>
    </div>
  );
};

export default ForecastItem;