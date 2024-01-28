import "./search.css";
import { useState } from "react";
import { useAppStore } from "../../stores/appStore";
import { useUserStore } from "../../stores/userStore";
import AsyncSelect from "react-select/async";
import debounce from "lodash.debounce";
import Select from "react-select";
import Result from "./Result"; // Import the Result component

function Search() {
  const { setView, setLocation } = useAppStore();
  const { currPosition } = useUserStore();
  const [milage, setMilage] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState(50);
  const [source, setSource] = useState(currPosition);
  const [destination, setDestination] = useState();
  const [nearestStations, setNearestStations] = useState(null); // State to store the nearest charging stations

  // const handleNearestSearch = async () => {
  //   // Make a POST request to the /findNearest endpoint
  //   const response = await fetch("/findNearest", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       lat: source[0],
  //       lng: source[1],
  //     }),
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     setNearestStations(data);
  //     setView(1); // Assuming you want to show the Result component after receiving the data
  //   } else {
  //     // Handle error
  //     console.error("Error fetching nearest charging stations");
  //   }
  // };
  const handleNearestSearch = async () => {
    const sampleResponse = [
      {
        "name": "Charging Station 1",
        "description": "This is a charging station",
        "lat": 37.7749,
        "lng": -122.4194,
        "chargers": [
          {
            "chargetype": "Fast Charger",
            "status": "Available",
            "availability": [
              {
                "bookedtime": "10:00 AM - 11:00 AM"
              },
              {
                "bookedtime": "1:00 PM - 2:00 PM"
              }
            ]
          },
          {
            "chargetype": "Standard Charger",
            "status": "Occupied",
            "availability": [
              {
                "bookedtime": "2:30 PM - 3:30 PM"
              }
            ]
          }
        ]
      },
      {
        "name": "Charging Station 2",
        "description": "Another charging station nearby",
        "lat": 37.7731,
        "lng": -122.4185,
        "chargers": [
          {
            "chargetype": "Supercharger",
            "status": "Available",
            "availability": [
              {
                "bookedtime": "9:00 AM - 10:00 AM"
              }
            ]
          }
        ]
      }
    ];
  
    setNearestStations(sampleResponse);
  
    

  };
  

  const handleGetDirection = () => {
    setLocation([source, destination]);
    setView(2);
  };

  const promiseOptions = debounce((inputValue, callback) => {
    new Promise((resolve) => {
      setTimeout(async () => {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${inputValue}`
        );
        const data = await res.json();
        const options = data.map((i) => {
          return {
            label: i.display_name,
            value: [+i.lat, +i.lon],
          };
        });
        resolve(options);
      }, 500); // delay of 500ms
    }).then((options) => {
      callback(options);
    });
  }, 500); // delay of 500ms
  
  return (
    <div className="search-container">
      <h2>Protons</h2>
      <div>
        <AsyncSelect
          placeholder="Current Location"
          cacheOptions
          loadOptions={promiseOptions}
          onChange={(res) => setSource(res.value)}
        />
        <br />
        <AsyncSelect
          placeholder="Enter Destination"
          cacheOptions
          loadOptions={promiseOptions}
          onChange={(res) => setDestination(res.value)}
        />
        <br />
        <Select
          options={[{ value: 150, label: "TATA Nexon EV" }]}
          placeholder="Choose Vehicle"
          onChange={(res) => setMilage(res.value)}
        />
        <br />
        Battery Level :{" "}
        <input
          type="range"
          min="0"
          max="100"
          onChange={(e) => setBatteryLevel(e.target.value)}
        />{batteryLevel}%

        <br />
        <div className="div_btn">
        <button onClick={handleGetDirection}>Get Direction</button>
        <br />
        <button onClick={handleNearestSearch}>
          Nearest Stations
        </button>
        </div>
        {nearestStations && <Result nearestStations={nearestStations} />}
      </div>
    </div>
  );
}

export default Search;
