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
    this.state = {
      newComp: false,
      name: "",
      location: "",
      website: "",
      linkedin: ""
    };
  }
  componentDidMount() {
    // this.props.getUser().then(() => {
    //   axios.get(`/api/companies/${this.props.user.id}`).then(response => {
    //     this.props.getCompanies(response.data);
    //   });
    // });
  }
  newCompActive() {
    this.setState({ newComp: true });
  }
  newCompInActive() {
    this.setState({ newComp: false });
  }
  saveInfo() {
    let obj = {
      name: this.state.name,
      website: this.state.website,
      city: this.state.location,
      linkedin: this.state.linkedin
    };
    this.props.companies.push(obj);
    this.newCompInActive();
    alert("Company Added");
  }
  render() {
    console.log(this.props.companies);
    let companies =
      this.props.companies &&
      this.props.companies.map((obj, i) => {
        return (
          <tr key={i}>
            <td contenteditable="true">{obj.name}</td>
            <td contenteditable="true">{obj.city}</td>
            <td contenteditable="false">
              <a href={obj.website}>{obj.website}</a>
            </td>
            <td contenteditable="false">
              <a href={obj.linkedin}>{obj.linkedin}</a>
            </td>
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
          <div className="buttons">
            <button className="btn btn1" onClick={() => this.newCompActive()}>
              Add
            </button>
            <button className="btn btn2">Edit</button>
          </div>;
        </div>
        {this.state.newComp === true ? <div className="newInfo-container">
            <form className="newInfo">
              <h1 className="form-title">New Company</h1>
              <div>
                <label>Name</label>
                <input type="text" name="username" onChange={e => this.setState(
                      { name: e.target.value }
                    )} />
              </div>
              <div>
                <label>Location</label>
                <input type="text" name="password" onChange={e => this.setState(
                      { location: e.target.value }
                    )} />
              </div>
              <div>
                <label>Website</label>
                <input type="text" name="password" onChange={e => this.setState(
                      { website: e.target.value }
                    )} />
              </div>
              <div>
                <label>Linkedin URL</label>
                <input type="text" name="password" onChange={e => this.setState(
                      { linkedin: e.target.value }
                    )} />
              </div>
              <button onClick={() => this.saveInfo()}>Save</button>
              <button onClick={() => this.newCompInActive()}>Cancel</button>
            </form>
          </div> : null}
      </div>;
  }
}
const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, {
    getUser, getCompanies
  })(Companies)
);
