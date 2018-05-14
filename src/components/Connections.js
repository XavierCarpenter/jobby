import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser, getConnections } from "../ducks/reducer";
import { Link, withRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Buttons from "./Buttons";
import "../styles/Connections.css";

class Connections extends Component {
  constructor() {
    super();
    this.state = {
      newConn: false,
      name: "",
      job_title: "",
      email: "",
      linkedin: ""
    };
  }
  componentDidMount() {
    // this.props.getUser().then(() => {
    //   axios.get(`/api/connections/${this.props.user.id}`).then(response => {
    //     this.props.getConnections(response.data);
    //   });
    // });
  }
  newConnActive() {
    this.setState({ newConn: true });
  }
  newConnInActive() {
    this.setState({ newConn: false });
  }
  saveInfo() {
    let obj = {
      name: this.state.name,
      job_title: this.state.job_title,
      email: this.state.email,
      linkedin: this.state.linkedin
    };
    this.props.connections.push(obj);
    this.newConnInActive();
    alert("Connection Added");
  }
  render() {
    console.log(this.props.connections);
    let connections =
      this.props.connections &&
      this.props.connections.map((obj, i) => {
        return (
          <tr key={i}>
            <td contenteditable="true">{obj.name}</td>
            <td contenteditable="true">{obj.job_title}</td>
            <td contenteditable="true">{obj.email}</td>
            <td contenteditable="false">
              <a href={obj.linkedin}>{obj.linkedin}</a>
            </td>
          </tr>
        );
      });

    return <div className="Connections-wrapper">
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
          <h1 className="header conn-title">My Connections</h1>
          <table className="conn-table">
            <tr>
              <th>Name</th>
              <th>Job Title</th>
              <th>Email</th>
              <th>linkedin</th>
            </tr>
            {connections}
          </table>
          <div className="buttons">
            <button className="btn btn1" onClick={() => this.newConnActive()}>
              Add
            </button>
            <button className="btn btn2">Edit</button>
          </div>;
        </div>
        {this.state.newConn === true ? <div className="newInfo-container">
            <form className="newInfo">
              <h1 className="form-title">New Application</h1>
              <div>
                <label>Name</label>
                <input type="text" name="username" onChange={e => this.setState(
                      { name: e.target.value }
                    )} />
              </div>
              <div>
                <label>Job Title</label>
                <input type="text" name="password" onChange={e => this.setState(
                      { job_title: e.target.value }
                    )} />
              </div>
              <div>
                <label>Email</label>
                <input type="text" name="password" onChange={e => this.setState(
                      { email: e.target.value }
                    )} />
              </div>
              <div>
                <label>Linkedin</label>
                <input type="text" name="password" onChange={e => this.setState(
                      { linkedin: e.target.value }
                    )} />
              </div>
              <button onClick={() => this.saveInfo()}>Save</button>
              <button onClick={() => this.newConnInActive()}>Cancel</button>
            </form>
          </div> : null}
      </div>;
  }
}
const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, {
    getUser,
    getConnections
  })(Connections)
);
