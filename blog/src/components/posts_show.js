import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { fetchPost, deletePost } from '../actions/posts.action';

class PostsShow extends Component {
  constructor(props){
    super(props);
    this.state = {
      post : this.props.post,
    };
  }
  async componentDidMount() {
    await this.props.fetchPost(this.props.routeParams.id);
  }


  deletePost = async () =>  {
    const {id} = this.props.post
    if(id) {
      await this.props.deletePost(id);
      browserHistory.push('/');
      }
  }

  likePost = () => {
    debugger;
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
        <h6>{post.likes}<button onClick={this.likePost}><i class="far fa-thumbs-up"></i></button></h6>
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
