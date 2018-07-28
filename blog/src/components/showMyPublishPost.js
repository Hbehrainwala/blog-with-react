import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMyPublishPost } from '../actions';
import { Link, browserHistory } from 'react-router';

class showMyPublishPost extends Component {

  async componentDidMount(){
    if (sessionStorage.token) {
        var headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Token '+sessionStorage.token+''
        }
      await this.props.fetchMyPublishPost(headers)
    }else{
      browserHistory.push("/login")
    }
  }

  renderMyPosts() {
    return _.map(this.props.mypublishpost, post => {
      return(
        <li className="list-group-item" key={ post.id }>
          <Link to={`/post/${post.id}`}>
            { post.title }
          </Link>
          <Link to={`/post/update/${post.id}`}>
            <i className="far fa-edit"></i>
          </Link>
        </li>
      );
    });
  }

  render() {
    console.log(this.props.mypublishpost);
    return(
      <div>
        <h3>My Publish Post</h3>
        <ul className="list-group">
          { this.renderMyPosts() }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mypublishpost : state.posts.mypublishpost,
});

const mapDispatchToProps = {
  fetchMyPublishPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(showMyPublishPost);
