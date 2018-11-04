import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMyPost } from '../actions/posts.action';
import { Link, browserHistory } from 'react-router';

class showMyPost extends Component {

  async componentDidMount(){
    if (sessionStorage.token) {
        var headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Token '+sessionStorage.token+''
        }
      await this.props.fetchMyPost(headers)
    }else{
      browserHistory.push("/login")
    }
  }

  renderMyPosts() {
    return _.map(this.props.mypost, post => {
      return(
        <li className="list-group-item" key={ post.id }>
          { post.title }
          <Link to={`/post/${post.id}`}>
            <i class="far fa-eye"></i>
          </Link>
          <Link to={`/post/update/${post.id}`}>
            <i className="far fa-edit"></i>
          </Link>
        </li>
      );
    });
  }

  render() {
    console.log(this.props.mypost);
    return(
      <div>
        <h3>My Post</h3>
        <ul className="list-group">
          { this.renderMyPosts() }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mypost : state.posts.mypost,
});

const mapDispatchToProps = {
  fetchMyPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(showMyPost);
