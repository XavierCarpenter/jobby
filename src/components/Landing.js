import React, { Component } from "react";
// import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "../styles/Landing.css";

class App extends Component {
  render() {
    return( <div className="Landing-wrapper">
    <a href={process.env.REACT_APP_LOGIN}>
        <h1 className="title">Login</h1>
        </a>
      </div>)
  }
}

export default App;
