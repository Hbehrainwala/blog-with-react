import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Home from './components/home/Home';
import LoginPage from './components/login_page';
import SignUpPage from './components/signupPage';
import PostsIndex from './components/posts_index';
import PostsShow from './components/posts_show';
import PostsNew from './components/posts_new';
import PostUpdate from './components/postUpdate'



export default(
  <Route path="/" component={Home}>
    <IndexRedirect to="/post" />
    <Route path="post" component={PostsIndex} />
    <Route path="post/new" component={PostsNew} />
    <Route path="post/:id" component={PostsShow} />
    <Route path="post/update/:id" component={PostUpdate} />

    <Route path="login" component={LoginPage} />
    <Route path="signup" component={SignUpPage} />
  </Route>
)
