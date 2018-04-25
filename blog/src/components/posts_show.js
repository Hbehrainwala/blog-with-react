import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  constructor(props){
    super(props);
    this.state = {
      post : this.props.post,
    };
    // this.deletePost = this.deletePost.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }


  // deletePost = (postId) => {
  //   debugger;
  //   if(postId) {
  //     this.props.deletePost(postId, () => {
  //       this.props.history.push('/');
  //   });
  //   }
  // }

  render() {
    const { post } = this.state;

    if(!post) {
      return <div>Loading...</div>;
    }

    return(
      <div>
        <Link to="/">Home</Link>
        <button
          className="btn btn-danger"
          // onClick={this.deletePost(post.id)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Likes: {post.likes}</h6>
        <p>{post.description}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return {
    post: posts[ownProps.match.params.id]
  };
}

const mapDispatchToProps = {
  fetchPost,
  deletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsShow);
