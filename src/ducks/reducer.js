import axios from 'axios';

//CONSTANTS
const GET_USER = "GET_USER";
const GET_PINNED = "GET_PINNED";


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




//INITIAL STATE

const initialState = {
    user: {},
    isLoading: false,
    didErr: false,
    errMessage: null,
    pinned: ""
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
    default:
      return state;
  }
}