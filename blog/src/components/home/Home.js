import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostsIndex from '../../components/posts_index';
import Header from './header';
import Footer from './footer';
import './style.css'


const Home = (props) => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default connect(null, null)(Home);
