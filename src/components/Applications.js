import React, {Component} from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { getUser, getApplications } from "../ducks/reducer";
import { Link, withRouter } from "react-router-dom";
import Navigation from "./Navigation";

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
      return <div key={i}>
          <tr>
            <td contenteditable="true">{obj.company}</td>
            <td contenteditable="true">{obj.position}</td>
            <td contenteditable="true">{obj.location}</td>
            <td contenteditable="true">{obj.date}</td>
            <td contenteditable="true">{obj.interview}</td>
          </tr>
        </div>;
    })
   
    return <div className="Applications-wrapper">
        <Navigation />
        <h1>Application View</h1>
        <table>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Location</th>
            <th>Date Applied</th>
            <th>Interview</th>
          </tr>
          {applications}
        </table>
      </div>;
  }
}
const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, {
    getUser, getApplications
  })(Applications)
);
