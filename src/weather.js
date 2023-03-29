import React, { useState, useEffect } from "react";
import MorningBg from './assests/Morning.jpg';
import AftnBg from './assests/Afternoon.jpg';
import EvngBg from './assests/Evening.jpg';
import MdnBg from './assests/Midnight.jpg';
import NightBg from './assests/Night.jpg';
import Clear from './assests/Clear.png';
import Clouds from './assests/Clouds.png';
import Thunderstorm from './assests/Thunderstorm.png';
import Fog from './assests/Fog.png';
import Drizzle from './assests/Drizzle.png';
import Haze from './assests/Haze.png';
import Snow from './assests/Snow.png';
import Rain from './assests/Rain.png';

function Weather() {
  const [search, setSearch] = useState("Rajahmundry");
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');

  let componentMounted = true;

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=32e7a9d44328b80875530d35b7c40b6f`);
      if (componentMounted) {
        setData(await response.json());
      }
      return () => {
        componentMounted = false;
      }
    }
    fetchWeather();
  }, [search]);

  let emoji = null;

  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: 'long' });
  let day = d.toLocaleString("default", { weekday: 'long' });
  let t = d.getHours();

  let BgWall = null;
  if (t <= 5) {
    console.log('12am - 5am')
    BgWall = MdnBg
  } else if (t <= 6 || t <= 12) {
    console.log('6am - 12pm');
    BgWall = MorningBg
  } else if (t <= 13 || t <= 18) {
    console.log('1pm - 6pm')
    BgWall = AftnBg
  } else if (t <= 19 || t <= 21) {
    console.log('6pm - 9pm')
    BgWall = EvngBg
  } else {
    console.log('9pm - 12am')
    BgWall = NightBg
  }

  let time = d.toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
  }

  function refreshPage() {
    window.location.reload(false);
  }

  if (typeof data.main != 'undefined') {
    if (data.weather[0].main === "Clouds") {
      emoji = Clouds
    } else if (data.weather[0].main === "Thunderstorm") {
      emoji = Thunderstorm
    } else if (data.weather[0].main === "Haze") {
      emoji = Haze
    } else if (data.weather[0].main === "Fog") {
      emoji = Fog
    } else if (data.weather[0].main === "Drizzle") {
      emoji = Drizzle
    } else if (data.weather[0].main === "Rain") {
      emoji = Rain
    } else if (data.weather[0].main === "Snow") {
      emoji = Snow
    } else {
      emoji = Clear
    }
  } else {
    return (
      <div className="wrapper">
        <div className="container pt-2 pb-3">
          <div className="row justify-content-center border-0">
            <div className="col-md-5">
              <h4 className="heading">Weather Forecast</h4>
              <div className="card text-center">
                <img width={100} height={510} src={BgWall} className="card-img" />
                <div className="card-img-overlay">
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3 w-75 mx-auto">
                      <input
                        type="search"
                        class="form-control"
                        placeholder="Search City"
                        value={input}
                        name="search"
                        onChange={(e) => setInput(e.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        class="input-group-text"
                        id="basic-addon2"
                      >
                        <i class="fas fa-search"></i>
                      </button>
                    </div>
                  </form>

                  <div className="WrongData"> 
                    You Entered Wrong City Name...
                  </div>

                  <div className="RefreshButton">
                    <button onClick={refreshPage}> Back <i class='fas fa-redo'></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="wrapper">
      <div className="container pt-2 pb-3">
        <div className="row justify-content-center border-0">
          <h4 className="heading">Weather Forecast</h4>
          <div className="col-md-5">
            <div className="card text-center">
              <img src={BgWall} width={100} height={510} alt="" className="card-img" />

              <div className="card-img-overlay">
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-3 w-75 mx-auto">
                    <input
                      type="search"
                      class="form-control"
                      placeholder="Search City"
                      value={input}
                      name="search"
                      onChange={(e) => setInput(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      class="input-group-text"
                      id="basic-addon2"
                    >
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </form>


                <div className="bg-dark bg-opacity-50 py-2 maindata">
                  <h2><i class='fas fa-map-marker-alt'></i> {data.name}, {data.sys.country}</h2>
                  <p>{day} | {month} {date} {year}
                    <br />{time}
                  </p>
                  <hr />
                  <img className="Icon" src={emoji} alt='' />
                  <h4>{data.weather[0].main}</h4>
                  <h1>{(data.main.temp - 273.15).toFixed(2)}&deg;c</h1>

                  <div className="row info">
                    <div class="col p-1"><i class='fas fa-tint'></i> {data.main.humidity} % <p>Humidity</p></div>
                    <div class="col p-1"><i class='fas fa-wind'></i> {data.wind.speed} m/s <p>Wind</p></div>
                    <div class="col p-1"><i class='fas fa-temperature-low'></i> {(data.main.temp_min - 273.15).toFixed(2)}&deg;c <p>Low Temp</p></div>
                    <div class="col p-1"><i class='fas fa-temperature-high'></i> {(data.main.temp_max - 273.15).toFixed(2)}&deg;c <p>High Temp</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Weather;
