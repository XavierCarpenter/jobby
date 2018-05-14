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
      newApp: false,
      company: "",
      location: "",
      position: "",
      date: "",
      interview: ""
    };
  }
  componentDidMount() {
    // this.props.getUser().then(() => {
    //   axios.get(`/api/applications/${this.props.user.id}`).then(response => {
    //     this.props.getApplications(response.data);
    //   });
    // });
  }
  newAppActive() {
    this.setState({ newApp: true });
  }
  newAppInActive() {
    this.setState({ newApp: false });
  }
  saveInfo(){
    let obj= {
      company: this.state.company,
      position: this.state.position,
      location: this.state.location,
      date: this.state.date,
      interview: this.state.interview
    }
    this.props.applications.push(obj);
    this.newAppInActive()
    alert('Application Added');
  }
  render() {
    console.log(this.state.company);
    console.log(this.state.location);
    console.log(this.state.position);
    
    console.log(this.props.applications);
    let applications =
      this.props.applications &&
      this.props.applications.map((obj, i) => {
        return (
          <tr key={i}>
            <td contenteditable="true">{obj.company}</td>
            <td contenteditable="true">{obj.position}</td>
            <td contenteditable="true">{obj.location}</td>
            <td contenteditable="true">{obj.date}</td>
            <td contenteditable="true">{obj.interview}</td>
          </tr>
        );
      });

    return <div className="Applications-wrapper">
        <div className="top-header">
          <h1>Jobby</h1>
          <h3>Logout</h3>
        </div>
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
          <div className="buttons">
            <button className="btn btn1" onClick={() => this.newAppActive()}>
              Add
            </button>
            <button className="btn btn2">Edit</button>
          </div>;
        </div>

        {this.state.newApp === true ? <div className="newInfo-container">
            <form className="newInfo">
              <h1 className="form-title">New Application</h1>
              <div>
                <label>Company</label>
                <input type="text" name="username" onChange={e => this.setState(
                      { company: e.target.value }
                    )} />
              </div>
              <div>
                <label>Position</label>
                <input type="text" name="password" onChange={e => this.setState(
                      { position: e.target.value }
                    )} />
              </div>
              <div>
                <label>Location</label>
                <input type="text" name="password" onChange={e => this.setState(
                      { location: e.target.value }
                    )} />
              </div>
              <div>
                <label>Date Appllied</label>
                <input type="text" name="password" onChange={e => this.setState(
                      { date: e.target.value }
                    )} />
              </div>
              <div>
                <label>Interview</label>
                <input type="text" name="password" onChange={e => this.setState(
                      { interview: e.target.value }
                    )} />
              </div>
              <button onClick={() => this.saveInfo()}>Save</button>
              <button onClick={() => this.newAppInActive()}>Cancel</button>
            </form>
          </div> : null}
      </div>;
  }
}
const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, {
    getUser, getApplications
  })(Applications)
);
