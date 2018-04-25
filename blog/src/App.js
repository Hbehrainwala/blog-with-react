import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
// import { routerMiddleware, push } from 'react-router-redux'

import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import LoginPage from './components/login_page';
import SignUpPage from './components/signupPage';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
// const middleware = routerMiddleware(browserHistory)

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route path="/posts/new" component={PostsNew} />
              <Route path="/posts/:id" component={PostsShow} />
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignUpPage} />
              <Route path="/" component={PostsIndex} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
