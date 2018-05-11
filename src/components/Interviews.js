import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { getUser, getInterviews } from "../ducks/reducer";
import { Link, withRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Buttons from "./Buttons";
import "../styles/Interviews.css";


class Interviews extends Component {
  constructor() {
    super();

  }
  componentDidMount() {
    this.props.getUser().then(() => {
      axios.get(`/api/interviews/${this.props.user.id}`).then(response => {
        this.props.getInterviews(response.data);
      });
    });
  }
  render() {
    console.log(this.props.interviews);
    let interviews =
      this.props.interviews &&
      this.props.interviews.map((obj, i) => {
        return (
          
            <tr  key={i}>
              <td contenteditable="true">{obj.type}</td>
              <td contenteditable="true">{obj.date}</td>
              <td contenteditable="true">{obj.status}</td>
              <td contenteditable="true">{obj.Notes}</td>
            </tr>
    
        );
      });

    return <div className="Interviews-wrapper">
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
          <h1 className="header int-title">My Interviews</h1>
          <table className="int-table">
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
            {interviews}
          </table>
          <Buttons />
        </div>
      </div>;
  }
}
const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, {
    getUser,
    getInterviews
  })(Interviews)
);
