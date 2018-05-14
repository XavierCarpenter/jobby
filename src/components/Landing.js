import React, { Component } from "react";
// import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "../styles/Landing.css";

class App extends Component {
  render() {
    return <div className="Landing-wrapper">
        {/* <a href={process.env.REACT_APP_LOGIN}>
          <h1 className="title">Login</h1>
        </a> */}
        <h1>Select a User</h1>
        <Link to="./dashboard">
        <h3>Xavier</h3>
        </Link>
        <h3>Guest</h3>
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
