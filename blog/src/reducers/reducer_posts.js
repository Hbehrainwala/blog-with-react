import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST, FETCH_MY_POST, FETCH_PUBLISH_POST } from '../constant';

const initialState = {
  post : {},
  posts : {},
  mypost : {},
  msg: ""
}

export default function (state = initialState, action) {
  switch (action.type) {
    case DELETE_POST:
      return _.omit(...state, 'msg' : action.payload);

    case FETCH_POST:
      return { ...state, 'post': action.payload.data };

    case FETCH_POSTS:
      return { ...state, 'posts': action.payload.data };

    case FETCH_MY_POST:
        return { ...state, 'mypost' : action.payload.data};

    case FETCH_PUBLISH_POST:
        return { ...state, 'posts' : action.payload.data};

    default:
      return state;
  }
}
