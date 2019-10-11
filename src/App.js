import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      shipInfo: {}
    };
  }

  componentDidMount() {
    fetch("https://swapi.co/api/starships/9/")
      .then(response => response.json())
      .then(data => {
        this.setState({
          shipInfo: data,
          loading: false
        });
      });
  }

  render() {
    console.log(this.state.shipInfo);
    const shipName = this.state.loading
      ? "loading...."
      : this.state.shipInfo.name;

    return (
      <div className="main-wrapper">
        <div className="main-container">
          <h1>Starships</h1>
          <p>{shipName}</p>
          <p>{this.state.shipInfo.model}</p>
        </div>
      </div>
    );
  }
}

export default App;
