/********
 * 1- Get Starwars ships information from Swapi api - DONE
 * 2- Display in Dom - DONE
 * 3- Store images on S3 bucket - DONE
 * 4- Get images from S3 bucket - DONE
 * 5- Match the name of the Ship with Image name - not needed
 * 6- Display on Dom each image with its information - 
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
        {imageUrl: "https://starwars-ships.s3.amazonaws.com/starwars-1.png"},
        {imageUrl: "https://starwars-ships.s3.amazonaws.com/starwars-2.png"},
        {imageUrl: "https://starwars-ships.s3.amazonaws.com/starwars-3.png"},
        {imageUrl: "https://starwars-ships.s3.amazonaws.com/starwars-4.png"},
        {imageUrl: "https://starwars-ships.s3.amazonaws.com/starwars-5.png"},
        {imageUrl: "https://starwars-ships.s3.amazonaws.com/starwars-2.png"},
        {imageUrl: "https://starwars-ships.s3.amazonaws.com/starwars-7.png"},
        {imageUrl: "https://starwars-ships.s3.amazonaws.com/starwars-3.png"},
        {imageUrl: "https://starwars-ships.s3.amazonaws.com/starwars-9.png"},
        { imageUrl: "https://starwars-ships.s3.amazonaws.com/starwars-10.png"}
      ]
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

      if(!isLoading){
        return (
          <div className="row text-center">
            <h3>{item.name}</h3>
            <p className="text-muted">{item.model}</p>
            <img src={item.imageUrl} width="100px" alt="jons images"/>
          </div>
        );
      } return 'loading....'
    });


    return (
      <div className="main-wrapper">
        <div className="main-container container">
          <h1>Starships</h1>
          {newShipsArray}
          
        </div>
      </div>
    );
  }
}

export default App;
