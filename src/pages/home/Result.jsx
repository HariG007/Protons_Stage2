// Result.jsx
import "./result.css";

function Result({ nearestStations }) {
  return (
    <div className="result-container">
      {nearestStations.map((station) => (
        <div key={station.name} className="result-card">
          <h4>{station.name}</h4>
          <p>Description: {station.description}</p>
          <p>Location: Lat - {station.lat}, Lng - {station.lng}</p>
          <div className="button-container">
            <button style={{paddingLeft:'20px'}} onClick={() => handleGetDirection(station.lat, station.lng)}>Direction</button>
            <button style={{marginLeft:'5px'}} onClick={() => handleShowInfo(station)}>More Info</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Result;
