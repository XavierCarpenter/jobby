import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser, getPinned } from "../ducks/reducer";
import { Link, withRouter } from "react-router-dom";
import "../styles/Navigation.css";

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
   
    };
  }
  componentDidMount() {
    this.props.getUser().then(() => {
      axios.get(`/api/application/${this.props.user.pinned}`).then(response => {
        this.props.getPinned( response.data);
      });
    });
  }
  render() {
  
    console.log(this.props.pinned);
    return (
      <div className="Navigation-wrapper">
        <div className="side-menu">
          <div className="name-sec">
            <h3>{this.props.user.name}</h3>
          </div>
          <div className="nav">
            <ul>
              <li>Home</li>
              <li>Resumes</li>
              <li>Cover Letters</li>
            </ul>
          </div>
          <div className="logout">
            <p>logout</p>
          </div>
        </div>
        <div className="top-menu">
          <h1>{this.props.user.job}</h1>
          <div className="nav2">
          <ul>
            <Link to="/applications">
            <li>Applications</li>
            </Link>
            <Link to="/interviews">
            <li>Interviews</li>
            </Link>
            <li>Connections</li>
          </ul>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, {
    getUser, getPinned
  })(Navigation)
);
