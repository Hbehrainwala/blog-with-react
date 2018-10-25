import React, { Component }  from 'react';
import { connect } from 'react-redux';
import {browserHistory } from 'react-router';
import Header from './header';
import Footer from './footer';
import './style.css';
import { logoutUser } from '../../actions'

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      token : sessionStorage.token,
    }
    this.logout = this.logout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (sessionStorage.token) {
      this.setState({"token" : sessionStorage.token})
    }
  }

  login = () => {
    browserHistory.push('/login');
  }

  signup = () => {
    browserHistory.push('/signup');
  }

  async logout(){
    var headers = {}
    if(sessionStorage.token){
      headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Token '+sessionStorage.token+''
      }
    }
    await this.props.logoutUser(headers);
    sessionStorage.removeItem("token");
    this.setState({"token" : ""})
    browserHistory.push('/');
  }

  render() {
    return (
      <div>
        <Header
          logoutUser={logoutUser}
          token={this.state.token}
          logout={this.logout}
          login={this.login}
          signup={this.signup}
        />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = {
  logoutUser,
};

export default connect(null, mapDispatchToProps)(Home);
