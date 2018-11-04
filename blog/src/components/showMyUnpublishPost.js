import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMyUnpublishPost } from '../actions/posts.action';
import { Link, browserHistory } from 'react-router';

class showMyUnpublishPost extends Component {

  async componentDidMount(){
    if (sessionStorage.token) {
        var headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Token '+sessionStorage.token+''
        }
      await this.props.fetchMyUnpublishPost(headers)
    }else{
      browserHistory.push("/login")
    }
  }

  renderMyPosts() {
    return _.map(this.props.myunpublishpost, post => {
      return(
        <li className="list-group-item" key={ post.id }>
          { post.title }
          <Link to={`/post/${post.id}`}>
            <i class="fal fa-eye"></i>
          </Link>
          <Link to={`/post/update/${post.id}`}>
            <i className="far fa-edit"></i>
          </Link>
        </li>
      );
    });
  }

  render() {
    console.log(this.props.myunpublishpost);
    return(
      <div>
        <h3>My UnPublish Posts</h3>
        <ul className="list-group">
          { this.renderMyPosts() }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  myunpublishpost : state.posts.myunpublishpost,
});

const mapDispatchToProps = {
  fetchMyUnpublishPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(showMyUnpublishPost);
