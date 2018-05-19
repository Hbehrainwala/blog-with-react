import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Footer extends Component {

  render() {

    return (
      <div className="footer">
        <span>Footer</span>
      </div>
    );
  }
}



export default connect(null, null)(Footer);
