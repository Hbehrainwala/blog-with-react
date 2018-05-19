import React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import Footer from './footer';
import './style.css';
import { logoutUser } from '../../actions'


const Home = (props) => {
  return (
    <div>
      <Header
      logoutUser={logoutUser}/>
      {props.children}
      <Footer />
    </div>
  );
};

const mapDispatchToProps = {
  logoutUser,
};

export default connect(null, mapDispatchToProps)(Home);
