/********
 * 1- Get Starwars ships information from Swapi api - DONE
 * 2- Display in Dom - DONE
 * 3- Store images on S3 bucket - 
 * 4- Get images from S3 bucket 
 * 5- Match the name of the Ship with Image name
 * 6- Display on Dom each image with its information
 */


import React from "react";
import "./App.css";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      apiData: [],
      loading: true
    };
  }

  componentDidMount() {
    fetch("https://swapi.co/api/starships/")
      .then(response => response.json())
      .then(data => {
        //settin state with results array
        this.setState({
          apiData: data.results,
          loading: false,

        });
      });

    fetch("http://www.splashbase.co/api/v1/images/random")
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
      })
  }

  render() {
    const allShips = this.state.apiData;
    const isLoading = this.state.loading;

    console.log(allShips);

    const newShipsArray = allShips.map(function(item, index) {
      if(!isLoading){
        return (
        <div>className=''> 
          <h3>{item.name}</h3>
          <p className='text-muted'>{item.model}</p>
        </div> 
        )
      } return 'loading....'
    });

    return (
      <div className="main-wrapper">
        <div className="main-container container">
          <h1>Starships</h1>
          {newShipsArray}
          <img width="200px" src="https://starwars-ships.s3.amazonaws.com/starwars-1.png" alt="Starwars here"/> 
        </div>
      </div>
    );
  }
}

export default App;
