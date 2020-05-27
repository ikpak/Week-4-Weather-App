import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      weatherResult: null
    }
  }

  getCurrentWeather = async(lon, lat) => {
    let apiKey = process.env.REACT_APP_APIKEY
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    
    let data = await fetch(url)
    let result = await data.json()
    this.setState({weatherResult: result})
  }

  getLocation  = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.getCurrentWeather(post.coords.longitude, post.coords.latitude)
    })
  }

  componentDidMount() {
    this.getLocation() // only call getLocation() because getCurrentWeather() is already inside the function
  }

  render() {
    if(this.state.weatherResult == null) {
      return (<div>Loading...</div>)
    }

    return (
      <div>
        <h1>Weather App</h1>
        <h2>{this.state.weatherResult.name}</h2>
        <h3>{this.state.weatherResult.main.temp}°C</h3>
        <h3>{this.state.weatherResult.weather[0].description}</h3>
        
        <Button type="submit">Button</Button>
      </div>
    )
  }
}

