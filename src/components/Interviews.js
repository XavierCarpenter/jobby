import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { getUser, getInterviews } from "../ducks/reducer";
import { Link, withRouter } from "react-router-dom";
import Navigation from "./Navigation";

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
          <div key={i}>
            <tr>
              <td contenteditable="true">{obj.type}</td>
              <td contenteditable="true">{obj.date}</td>
              <td contenteditable="true">{obj.status}</td>
              <td contenteditable="true">{obj.Notes}</td>
            </tr>
          </div>
        );
      });

    return (
      <div className="Applications-wrapper">
        <Navigation />
        <h1>Interview View</h1>
        <table>
          <tr>
            <th>Type</th>
            <th>Date</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
          {interviews}
        </table>
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, {
    getUser,
    getInterviews
  })(Interviews)
);
