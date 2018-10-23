import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  constructor(props){
    super(props);
    this.state = {
      post : this.props.post,
    };
    this.deletePost = this.deletePost.bind(this);
  }
  async componentDidMount() {
    await this.props.fetchPost(this.props.routeParams.id);
  }


  async deletePost()  {
    const {id} = this.props.post
    if(id) {
      await this.props.deletePost(id);
      browserHistory.push('/');
      }
  }

  render() {
    const { post } = this.props;
    if(!post) {
      return <div>Loading...</div>;
    }

    return(
      <div>
        <button
          className="btn btn-danger"
          onClick={this.deletePost}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>{post.likes}<i class="far fa-thumbs-up"></i></h6>
        <p>{post.description}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts.post
  };
}

const mapDispatchToProps = {
  fetchPost,
  deletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsShow);
