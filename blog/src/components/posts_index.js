import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPublishPost } from '../actions';
import { Link } from 'react-router';

class PostsIndex extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts : {},
    }
  }
  async componentDidMount() {
    await this.props.fetchPublishPost();
    const { posts } = this.props;
    this.setState({ "posts" : posts });
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return(
        <li className="list-group-item" key={ post.id }>
          <Link to={`/post/${post.id}`}>
            { post.title }
          </Link>
          Posted by - { post.author }
        </li>
      );
    });
  }

  render() {
    console.log(this.props.posts);
    return(
      <div>
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
  fetchPublishPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);
