import React, { Component } from "react";
// import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "../styles/Landing.css";

class App extends Component {
  render() {
    return( <div className="App">
    <a href={process.env.REACT_APP_LOGIN}>
        <h1 className="title">Login</h1>
        </a>

        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Password" />
        <p>Continue as guest</p>
      </div>)
  }
}

export default App;
