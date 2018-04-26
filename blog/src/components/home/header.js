import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Header extends Component {

  render() {

    return (
      <div>
        <h1>Header</h1>
      </div>
    );
  }
}



export default connect(null, null)(Header);
