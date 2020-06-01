import {
  GET_ACCOUNT
} from '../../constants/ActionTypes';

export const getAccount = () => async dispatch => {
  dispatch({type: GET_ACCOUNT});
}