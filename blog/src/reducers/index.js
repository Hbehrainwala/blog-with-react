import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';
import UserReducer from './reducer_user';

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer,
  user : UserReducer,
});

export default rootReducer;
