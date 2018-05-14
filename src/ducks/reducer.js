import axios from 'axios';

//CONSTANTS
const GET_USER = "GET_USER";
const GET_PINNED = "GET_PINNED";
const GET_APP = "GET_APP";
const GET_INTS = "GET_INTS";
const GET_COMPS = "GET_COMPS";
const GET_CONNS = "GET_CONNS";




//ACTION CREATORS
export function getUser() {
  return {
    type: GET_USER,
    payload: axios
      .request({ url: "/api/me" })
      .then(response => response.data)
      .catch(err => err.message)
  };
}
export function getPinned(e){
  return {
    type: GET_PINNED,
    payload: e
  };
}
export function getApplications(e){
  return {
    type: GET_APP,
    payload: e
  };
}
export function getInterviews(e){
  return {
    type: GET_INTS,
    payload: e
  };
}
export function getCompanies(e){
  return {
    type: GET_COMPS,
    payload: e
  };
}
export function getConnections(e){
  return {
    type: GET_CONNS,
    payload: e
  };
}




//INITIAL STATE

const initialState = {
  user: {},
  isLoading: false,
  didErr: false,
  errMessage: null,
  pinned: "",
  applications: [
    {
      company: "Apple",
      position: "Front-End Developer",
      location: "Dallas, Texas",
      date: "3/24/2018",
      interview: "yes"
    },
    {
      company: "Google",
      position: "Back-End Developer",
      location: "Austin, Texas",
      date: "5/1/2018",
      interview: "yes"
    }
  ],
  interviews: [
    {
      type: "In Person",
      status: "Completed",
      location: "Dallas, Texas",
      date: "3/30/2018"
    },
    {
      type: "Phone",
      status: "Coming up",
      location: "Austin, Texas",
      date: "5/13/2018"
    }
  ],
  companies: [
    {
      name: "Apple",
      website: "https://apple.com",
      city: "Dallas, Texas",
      linkedin: "https://www.linkedin.com/company/162479/"
    },
    {
      name: "Google",
      website: "https://google.com",
      city: "Austin, Texas",
      linkedin: "https://www.linkedin.com/company/1441/"
    }
  ],
  connections: [
    {
      name: "Connor F",
      job_title: "Web Developer",
      email: "connor@apple,caom",
      linkedin: "https://www.linkedin.com/in/connor-freeman/"
    },
    {
      name: "Grace McKoy",
      job_title: "Technical Recruiter",
      email: "grace@google.com",
      linkedin: "https://www.linkedin.com/in/gracefarmer/"
    }
  ]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GET_USER}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
      });

    case `${GET_USER}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });

    case GET_PINNED:
      return Object.assign({}, state, { pinned: action.payload });

    case GET_APP:
      return Object.assign({}, state, { applications: action.payload });

    case GET_INTS:
      return Object.assign({}, state, { interviews: action.payload });

    case GET_COMPS:
      return Object.assign({}, state, { companies: action.payload });
    case GET_CONNS:
      return Object.assign({}, state, { connections: action.payload });
    default:
      return state;
  }
}