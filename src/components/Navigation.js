import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../ducks/reducer";
import { Link, withRouter } from "react-router-dom";
import "../styles/Navigation.css";

class Navigation extends Component {
  render() {
    console.log(this.props.pinned);
    return <div className="Navigation-wrapper">
        <div className="top-nav">
          <ul className="nav-items">
          <Link to="/applications">
            <li>Applications</li>
          </Link>
          <Link to="/interviews">
            <li>Interviews</li>
          </Link>
          <Link to="/companies">
            <li>Companies</li>
            </Link>
            <Link to="/connections">
            <li>Connections</li>
            </Link>
          </ul>
        </div>
        <div className="bottom-nav">
          <ul className="nav-items">
            <li>Resumes</li>
            <li>Cover Letters</li>
            <li>Notes</li>
          </ul>
        </div>
      </div>;
  }
}
const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, {
    getUser,
  })(Navigation)
);
