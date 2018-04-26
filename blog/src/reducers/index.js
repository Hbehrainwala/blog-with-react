import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';
import UserReducer from './reducer_user';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer,
  user : UserReducer,
  routing: routerReducer,
});

export default rootReducer;
