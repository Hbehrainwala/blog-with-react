import { LOGIN_USER, SIGNUP_USER } from '../constant';

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

    case SIGNUP_USER:
      return { ...state, token : action.payload.headers, loginUser : action.payload.data};

    default:
      return state;
  }
}
