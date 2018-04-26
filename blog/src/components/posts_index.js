import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from 'react-router';

class PostsIndex extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return(
        <li className="list-group-item" key={ post.id }>
          <Link to={`/post/${post.id}`}>
            { post.title }
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
  posts: state.posts
});

const mapDispatchToProps = {
  fetchPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);
