import React, { Component } from 'react';
import { connect } from 'react-redux';

import {browserHistory } from 'react-router';

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      token : sessionStorage.token,
    }
    this.logout = this.logout.bind(this);
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
      browserHistory.push('/');
  }

  render() {
  let login_status;
  if (this.state.token) {
    login_status = <button className="" onClick={this.logout} >Logout</button>;
  } else {
    login_status = <a className="nav-link" href="/login">Login</a>;
  }

    return (
      <div>
      <nav className="navbar navbar-expand-lg navbar navbar-light header_blog">
        <a className="navbar-brand" href="/post/">Blog</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Post<span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">My Post</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/post/new">Create Post  </a>
            </li>
          </ul>
          {login_status}
        </div>
        </nav>
      </div>
    );
  }
}



export default connect(null, null)(Header);
