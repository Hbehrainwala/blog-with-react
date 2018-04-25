import { LOGIN_USER, SIGNUP_USER } from '../actions';

const initialStateUser = {
    token : '',
    loginUser : {},
    isLoading: false,
    errors: {},
};

export default function (state = initialStateUser, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, token : action.payload.headers, loginUser : action.payload.data};
      break;

    case SIGNUP_USER:
    debugger;
      return { ...state, token : action.payload.headers, loginUser : action.payload.data};
      break;

    default:
      return state;
  }
}
