import {GET_USER_REQUEST, GET_USER_SUCCESS} from '../constants/action-types';

export default function(
  state = {loggedIn: false, authenticating: false},
  action
) {
  //Each one creates a new object so we don't mutate state
  switch (action.type) {
    case GET_USER_SUCCESS:
      //If the payload doesn't come back empty (happens when user is not authenticated)
      //We set logged in to true, otherwise, we set to false
      let id = action.payload && action.payload.id ? action.payload.id : null;
      return Object.assign(
        {},
        {},
        {
          loggedIn: action.payload ? true : false,
          authenticating: false,
          id
        }
      );
    case GET_USER_REQUEST:
      return Object.assign(
        {},
        {},
        {
          authenticating: true,
          loggedIn: false
        }
      );
    default:
      return state;
  }
}
