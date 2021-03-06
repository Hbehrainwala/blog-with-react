import React, { Component } from 'react';
import { connect } from 'react-redux';
import {browserHistory } from 'react-router';

class Header extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  render() {
    if(this.props.token){
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
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  MyPost
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/mypost">All Post</a>
                  <a className="dropdown-item" href="/mypublishpost">Publish Post</a>
                  <a className="dropdown-item" href="/myunpublishpost">UnPublish Post</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/myarchivepost">Archive Post</a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/post/new">Create Post  </a>
              </li>
            </ul>
            <button className="btn btn-default" onClick={this.props.logout} >Logout</button>
          </div>
          </nav>
        </div>
      );
    }else{
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
              <a className="nav-link" href="/post/new">Create Post  </a>
            </li>
          </ul>
          <button className="btn btn-default" onClick={this.props.signup} >Signup</button>
          <button className="btn btn-default" onClick={this.props.login} >Login</button>
        </div>
        </nav>
      </div>
    );
    }
  }
}



export default connect(null, null)(Header);
