import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'

const cities = {
  sakhalin: {
    lon: 142.7337,
    lat: 46.9581
  },

  sapporo: {
    lon: 141.3469,
    lat: 43.0642
  },

  okinawa: {
    lon: 127.8014,
    lat: 26.3358,
  },

  cebu: {
    lon: 123.8907,
    lat: 10.3167
  },

  lyon: {
    lon: 4.8467,
    lat: 45.7485
  }
}

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      weatherResult: null
    }
  }

  getCurrentWeather = async(lon, lat) => {
    try {
      let apiKey = process.env.REACT_APP_APIKEY
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    
      let data = await fetch(url)

      if(data.status !== 200) {throw new Error("There is no data")}

      let result = await data.json()
      this.setState({weatherResult: result})
    } catch(err) {
      alert(err.message)
    }
  }

  getLocation  = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.getCurrentWeather(post.coords.longitude, post.coords.latitude)
    })
  }

  componentDidMount() {
    this.getLocation() // only call getLocation() because getCurrentWeather() is already inside the function
  }

  getCity = (cityChoice) => {
    this.getCurrentWeather(cityChoice.lon, cityChoice.lat)
  }

  render() {
    if(this.state.weatherResult == null) {
      return (<Loader
        className="loader"
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000}
      />)
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 nav flex-column">
            <button className="yuzBtn" onClick={() => this.getCity(cities.sakhalin)}>Yuzhno-Sakhalinsk, Russia</button>
            <button className="sapBtn" onClick={() => this.getCity(cities.sapporo)}>Sapporo, Japan</button>
            <button className="okiBtn" onClick={() => this.getCity(cities.okinawa)}>Okinawa, Japan</button>
            <button className="cebBtn" onClick={() => this.getCity(cities.cebu)}>Cebu, Philippines</button>
            <button className="hocBtn" onClick={() => this.getLocation()}>Ho Chi Minh, Vietnam</button>
            <button className="lyoBtn" onClick={() => this.getCity(cities.lyon)}>Lyon, France</button>
          </div>
          <div className="col-10">
            <div className="container main-container">
              <div className="column">
                <h2>{this.state.weatherResult.name}</h2>
                <h3 className="temp">{this.state.weatherResult.main.temp}°C</h3>
                <h3>{this.state.weatherResult.weather[0].description}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

