import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PostsIndex from '../../components/posts_index';
import Header from './header';
import Footer from './footer';


const Home = (props) => {
  return (
    <div className="Home">
      <Header />
      {props.children}
    </div>
  );
};

export default connect(null, null)(Home);
