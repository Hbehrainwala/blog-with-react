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
    // this.deletePost = this.deletePost.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.params;;
    this.props.fetchPost(parseInt(id));
  }


  // deletePost = () => {
  //   const {id} = this.state.post
  //   // if(id) {
  //   //   this.props.deletePost(id, () => {
  //   //     browserHistory.push('/');
  //   // });
  //   // }
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
          // onClick={this.deletePost}
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
  debugger;
  return {
    post: posts[parseInt(ownProps.params.id)]
  };
}

const mapDispatchToProps = {
  fetchPost,
  deletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsShow);
