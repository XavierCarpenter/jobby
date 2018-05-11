import React, {Component} from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { getUser, getApplications } from "../ducks/reducer";
import { Link, withRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Buttons from "./Buttons";
import "../styles/Applications.css";


class Applications extends Component {
  constructor() {
    super();
    this.state = {
      
    };
  }
  componentDidMount() {
    this.props.getUser().then(() => {
      axios.get(`/api/applications/${this.props.user.id}`).then(response => {
        this.props.getApplications(response.data);
      });
    });
  }
  render() {
  
    console.log(this.props.applications);
    let applications = this.props.applications && this.props.applications.map((obj, i) => {
      return (
          <tr key={i}>
            <td contenteditable="true">{obj.company}</td>
            <td contenteditable="true">{obj.position}</td>
            <td contenteditable="true">{obj.location}</td>
            <td contenteditable="true">{obj.date}</td>
            <td contenteditable="true">{obj.interview}</td>
          </tr>
      );
    })
   
    return <div className="Applications-wrapper">
        <div className="top-header">
        <h1>Jobby</h1>
        <h3>Logout</h3>
        </div>
        <div className="top-nav">
          <ul className="nav-items">
          <Link to= "/applications">
            <li>Applications</li>
            </Link>
            <Link to = "/interviews">
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
          <h1 className="header app-title">My Applications</h1>
          <table className="app-table">
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Location</th>
              <th>Date Applied</th>
              <th>Interview</th>
            </tr>
            {applications}
          </table>
    <Buttons solid={"#349c47"}  />
        </div>
      </div>;
  }
}
const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, {
    getUser, getApplications
  })(Applications)
);
