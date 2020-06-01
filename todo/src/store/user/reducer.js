import {
  GET_ACCOUNT
} from '../../constants/ActionTypes';

import initialState from './initialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNT:
      return Object.assign({}, state, {
        loggedIn: true,
      });
    default:
      return state;
  }
}

export default reducer;