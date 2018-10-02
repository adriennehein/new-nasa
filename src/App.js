import React, { Component } from 'react';
import neoData from './sample-neo';
import {
  Button,
  PageHeader,
  Jumbotron,
  Table
} from 'react-bootstrap'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rawData: neoData,
      asteroids: ''
    }
  }

  componentWillMount(){
    let neoData = this.state.rawData.near_earth_objects;
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
  }

  render() {
    return ( [
      <Jumbotron>
        <h1>Meteors Coming to a Sky Near You</h1>
        <p>
          Live updates on meteor locations
        </p>
        <p>
          <Button bsStyle="primary">Visit NASA</Button>
        </p>
      </Jumbotron>,
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Estimated Diameter (ft)</th>
            <th>Date of Approach </th>
            <th>Distance (mi)</th>
            <th>Velocity (mph)</th>
          </tr>
        </thead>
        <tbody>
          {this.state.asteroids.map((asteroid) => {
            return (
              <tr key={asteroid.id}>
                <td>{asteroid.name}</td>
                <td>{asteroid.diameterMax} - {asteroid.diameterMin}</td>
                <td>{asteroid.closestApproach}</td>
                <td>{asteroid.distance}</td>
                <td>{asteroid.velocity}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    ]);
  }
}

export default App;
