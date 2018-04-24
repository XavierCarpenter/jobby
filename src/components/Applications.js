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
      return(
        <div key={i}>
            <h1>{obj.company}</h1>
        </div>
      )
    })
   
    return (
      <div className="Applications-wrapper">
        <Navigation />
        <h1>Application View</h1>
      {applications}
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, {
    getUser, getApplications
  })(Applications)
);
