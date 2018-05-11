import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser, getConnections } from "../ducks/reducer";
import { Link, withRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Buttons from "./Buttons";
import "../styles/Connections.css";

class Connections extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getUser().then(() => {
      axios.get(`/api/connections/${this.props.user.id}`).then(response => {
        this.props.getConnections(response.data);
      });
    });
  }
  render() {
    console.log(this.props.connections);
    let connections =
      this.props.connections &&
      this.props.connections.map((obj, i) => {
        return (
            <tr key={i}>
              <td contenteditable="true">{obj.name}</td>
              <td contenteditable="true">{obj.job_title}</td>
              <td contenteditable="true">{obj.email}</td>
              <td contenteditable="false"><a href={obj.linkedin}>{obj.linkedin}</a></td>
            </tr>
        );
      });

    return <div className="Connections-wrapper">
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
        <div className="content-box">
          <h1 className="header conn-title">My Connections</h1>
          <table className="conn-table">
            <tr>
              <th>Name</th>
              <th>Job Title</th>
              <th>Email</th>
              <th>linkedin</th>
            </tr>
            {connections}
          </table>
          <Buttons />
        </div>
      </div>;
  }
}
const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, {
    getUser, getConnections
  })(Connections)
);
