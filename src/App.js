/********
 * 1- Get Starwars ships information from Swapi api - DONE
 * 2- Display in Dom - DONE
 * 3- Store images on S3 bucket - DONE
 * 4- Get images from S3 bucket - DONE
 * 5- Match the name of the Ship with Image name - not needed for now
 * 6- Display on Dom each image with its information - DONE
 */

import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      apiData: [],
      loading: true,
      images: [
        { imageUrl: "https://starwars-ships.s3.amazonaws.com/starwars-1.png" },
        { imageUrl: "https://starwars-ships.s3.amazonaws.com/starwars-2.png" },
        { imageUrl: "https://starwars-ships.s3.amazonaws.com/starwars-3.png" },
        { imageUrl: "https://starwars-ships.s3.amazonaws.com/starwars-4.png" },
        { imageUrl: "https://starwars-ships.s3.amazonaws.com/starwars-5.png" },
        { imageUrl: "https://starwars-ships.s3.amazonaws.com/starwars-2.png" },
        { imageUrl: "https://starwars-ships.s3.amazonaws.com/starwars-7.png" },
        { imageUrl: "https://starwars-ships.s3.amazonaws.com/starwars-3.png" },
        { imageUrl: "https://starwars-ships.s3.amazonaws.com/starwars-9.png" },
        { imageUrl: "https://starwars-ships.s3.amazonaws.com/starwars-10.png" }
      ]
    };
  }

  componentDidMount() {
    fetch("https://swapi.co/api/starships/")
      .then(response => response.json())
      .then(data => {
        console.log(data.results);
        //setting state with results array
        this.setState({
          apiData: data.results,
          loading: false
        });
      });
  }

  render() {
    const allShips = this.state.apiData;
    const isLoading = this.state.loading;

    // add image URL to the array
    allShips.forEach(element => {
      element.imageUrl = `https://starwars-ships.s3.amazonaws.com/starwars-${Math.floor(
        Math.random() * 10
      )}.png`;
    });

    const newShipsArray = allShips.map(function(item, index) {
      if (!isLoading) {
        return (
          <div className="card col-3 ship">
            <img
              src={item.imageUrl}
              alt="jons images"
              className="card-img-top"
            />
            <div className="card-body">
              <h3 className="card-title ship-name">{item.name}</h3>
              <div className="ship-model">
                <span className="text-secondary">Model: </span>
                <p className="text-muted">{item.model}</p>
              </div>
              <p> {item.manufacturer}</p>
            </div>
            <hr />
          </div>
        );
      }
      return newShipsArray;
    });

    return (
      <div className="main-wrapper">
        <div className="main-container container mt-5">
          <h1 className="text-center title">STARWARS SHIPS</h1>
          <p className="text-center">
            Quick and dirty <b> React</b> application, getting StarWars ships from https://swapi.co/ using <b> Fetch</b>, pulling the images from S3 AWS bucket displaying randomly upon refresh.... 
          </p>
          <div className="card-deck row justify-content-center">
            {!isLoading ? newShipsArray : "Loading..."}
          </div>
        </div>
        <div className="text-center" > 
          <p className="mt-5"> by Jonathan Sanchez </p>
          <a href="https://github.com/jso1919/StarWars-api-fetch-react" className='text-secondary' > https://github.com/jso1919/StarWars-api-fetch-react </a> 
        </div> 
      </div>
    );
  }
}

export default App;
