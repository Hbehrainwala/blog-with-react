import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, logoutUser } from '../actions';
import { Link, browserHistory } from 'react-router';

class PostsIndex extends Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchPosts();
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

  renderPosts() {
    return _.map(this.props.posts, post => {
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
    console.log(this.props.posts);
    return(
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/post/new">
            Add a Post
          </Link>
          <button className="btn btn-primary" onClick={this.logout} >Logout</button>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          { this.renderPosts() }
        </ul>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

const mapDispatchToProps = {
  fetchPosts,
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);
