import React, { Component } from 'react';
import {
  Button,
  Jumbotron,
  Table
} from 'react-bootstrap'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    let today = new Date()
    this.state = {
      apiKey: "QrNBEYX5lCjPMyZsooK5uPmR6SQHfa1X6MBruvJC",
      startDate: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
      apiUrl: "https://api.nasa.gov/neo/rest/v1/feed",
      asteroids: []
    }
  }

  componentWillMount(){
    fetch(`${this.state.apiUrl}?start_date=${this.state.startDate}&api_key=${this.state.apiKey}`).then((rawResponse)=>{
      return rawResponse.json();
    }).then((parsedResponse) => {

      let neoData = parsedResponse.near_earth_objects;
      let newAsteroids = [];
      Object.keys(neoData).forEach((date) =>{
        neoData[date].forEach((asteroid) => {
          newAsteroids.push({
            id: asteroid.neo_reference_id,
            name: asteroid.name,
            date: asteroid.close_approach_data[0].close_approach_date,
            diameterMin: asteroid.estimated_diameter.feet.estimated_diameter_min.toFixed(0),
            diameterMax: asteroid.estimated_diameter.feet.estimated_diameter_max.toFixed(0),
            closestApproach: asteroid.close_approach_data[0].miss_distance.miles,
            velocity: parseFloat(asteroid.close_approach_data[0].relative_velocity.miles_per_hour).toFixed(0),
            distance: asteroid.close_approach_data[0].miss_distance.miles
          })
        });
      })

      this.setState({asteroids: newAsteroids})
    })
  }

  render() {
    return ( [
      <div class="wrapper">
        <Jumbotron>
          <h1>Meteors Coming to a Sky Near You</h1>
          <p>
            Live updates on meteor locations as they pass by Earth
          </p>
          <p>
            <a href="https://www.nasa.gov/"><Button bsStyle="primary">Visit NASA</Button></a>
          </p>
        </Jumbotron>

        <div class="container">
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Estimated Diameter (ft)</th>
                <th>Closest Approach </th>
                <th>Distance (mi)</th>
                <th>Velocity (mph)</th>
              </tr>
            </thead>
            <tbody>
              {this.state.asteroids.map((asteroid) => {
                return (
                  <tr key={asteroid.id}>
                    <td>{asteroid.name}</td>
                    <td>{asteroid.diameterMin} - {asteroid.diameterMax}</td>
                    <td>{asteroid.closestApproach}</td>
                    <td>{asteroid.distance}</td>
                    <td>{asteroid.velocity}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>

        <div class="footer-bar">Created using NASA's Near Earth Objects API 2018</div>
      </div>
    ]);
  }
}

export default App;
