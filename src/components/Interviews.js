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
    this.state = {
      newInt: false,
      type: "",
      date: "",
      status: "",
      notes: ""
    };
  }

  newIntActive() {
    this.setState({ newInt: true });
  }
  newIntInActive() {
    this.setState({ newInt: false });
  }
  saveInfo() {
    let obj = {
      type: this.state.type,
      status: this.state.status,
      location: this.state.location,
      date: this.state.date
    };
    this.props.interviews.push(obj);
    this.newIntInActive();
    alert("Interview Added");
  }
  render() {
    console.log(this.props.interviews);
    let interviews =
      this.props.interviews &&
      this.props.interviews.map((obj, i) => {
        return (
          <tr key={i}>
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
          <div className="buttons">
            <button className="btn btn1" onClick={() => this.newIntActive()}>
              Add
            </button>
            <button className="btn btn2">Edit</button>
          </div>;
        </div>
        {this.state.newInt === true ? <div className="newInfo-container">
            <form className="newInfo">
              <h1 className="form-title">New Application</h1>
              <div>
                <label>Type</label>
                <input type="text" name="username" onChange={e => this.setState(
                      { type: e.target.value }
                    )} />
              </div>
              <div>
                <label>Date</label>
                <input type="text" name="password" onChange={e => this.setState(
                      { date: e.target.value }
                    )} />
              </div>
              <div>
                <label>Status</label>
                <input type="text" name="password" onChange={e => this.setState(
                      { status: e.target.value }
                    )} />
              </div>
              <div>
                <label>Notes</label>
                <input type="text" name="password" onChange={e => this.setState(
                      { notes: e.target.value }
                    )} />
              </div>

              <button onClick={() => this.saveInfo()}>Save</button>
              <button onClick={() => this.newIntInActive()}>Cancel</button>
            </form>
          </div> : null}
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
