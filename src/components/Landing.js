import React, { Component } from "react";
// import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "../styles/Landing.css";

class App extends Component {
  render() {
    return <div className="Landing-wrapper">
        <a href={process.env.REACT_APP_LOGIN}>
          <h1 className="title">Login</h1>
        </a>
        {/* <form action="/login" method="get">
          <div>
            <label>Username:</label>
            <input type="text" name="username" />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" />
          </div>
          <div>
            <input type="submit" value="Log In" />
          </div>
        </form> */}
      </div>;
  }
}

export default App;
