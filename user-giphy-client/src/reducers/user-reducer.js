import {USER_INFO_SUCCESS} from '../constants/action-types';

export default function(state = null, action) {
  //Each one creates a new object so we don't mutate state
  //Returns the information returned from the profile
  switch (action.type) {
    case USER_INFO_SUCCESS:
      //User information for profile, etc
      return action.response;
    default:
      return state;
  }
}
