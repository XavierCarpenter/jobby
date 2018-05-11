import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser, getCompanies } from "../ducks/reducer";
import { Link, withRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Buttons from "./Buttons";
import "../styles/Companies.css";

class Companies extends Component {
  constructor() {
    super();
  }
    componentDidMount() {
      this.props.getUser().then(() => {
        axios.get(`/api/companies/${this.props.user.id}`).then(response => {
          this.props.getCompanies(response.data);
        });
      });
    }
  render() {
    console.log(this.props.companies);
    let companies =
      this.props.companies &&
      this.props.companies.map((obj, i) => {
        return (
      
            <tr key={i}>
              <td contenteditable="true">{obj.name}</td>
              <td contenteditable="true">{obj.city},{obj.state}</td>
              <td contenteditable="false"><a href={obj.website}>{obj.website}</a></td>
              <td contenteditable="false"><a href={obj.linkedin}>{obj.linkedin}</a></td>
            </tr>
   
        );
      });

    return <div className="Companies-wrapper">
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
          <h1 className="header comp-title">My Companies</h1>
          <table className="comp-table">
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Website</th>
              <th>linkedin</th>
            </tr>
            {companies}
          </table>
          <Buttons />
        </div>
      </div>;
  }
}
const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, {
    getUser, getCompanies
  })(Companies)
);
