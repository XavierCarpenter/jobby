import React, { Component } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import {getUser} from "../ducks/reducer";
import { Link, withRouter } from "react-router-dom";
import "../styles/Dashboard.css";
import Navigation from "./Navigation";

class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      pinned: ""
    }
  }
  componentDidMount(){
    this.props.getUser().then(() => {
   
      axios.get(`/api/application/${this.props.user.pinned}`).then((response) => {
        this.setState({pinned: response.data[0]})
      })
    })
  }
  render() {
  console.log(this.props.user.pinned)
  console.log(this.state.pinned);
  let pinned = this.props.pinned && this.props.pinned.map((obj, i) => {
    return <div key={i}>
        <table>
          <tr>
            <th contenteditable="true">
              {obj.company} {obj.number}
            
            </th>
          </tr>
          <tr>
            <td>POSITION</td>
            <td contenteditable="true">{obj.position}</td>
          </tr>
          <tr>
            <td>TYPE</td>
            <td contenteditable="true">{obj.type}</td>
          </tr>
          <tr>
            <td>LOCATION</td>
            <td contenteditable="true">{obj.location}</td>
          </tr>
          <tr>
            <td>Date</td>
            <td contenteditable="true">{obj.date}</td>
          </tr>
          <tr>
            <td>DESCRIPTION</td>
            <td contenteditable="true">{obj.description}</td>
          </tr>
          <tr>
            <td>INTERVIEW</td>
            <td contenteditable="true">{obj.interview}</td>
          </tr>
          <tr>
            <td>SALARY</td>
            <td contenteditable="true">{obj.salary}</td>
          </tr>
        </table>
      </div>;
  })
    return (
      <div className="dashboard-wrapper" >
      <Navigation />
      <div className="form-container">{pinned}</div>
      
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, {
    getUser
  })(Dashboard)
);