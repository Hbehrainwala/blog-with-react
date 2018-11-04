import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { updatePost, fetchPost } from '../actions/posts.action'

class postUpdate extends Component {
  constructor(props){
    super(props);
    this.state = {
      post : this.props.post,
    }
  }
  async componentDidMount () {
    await this.props.fetchPost(this.props.routeParams.id);
    const {post} = this.props;
    this.props.initialize({ title: post.title, description : post.description });
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.title !== nextProps.title && this.props.title !== nextProps.title) {
      this.props.destroy();
      this.props.initialize({ title: nextProps.title, description : nextProps.description });
    }
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  async onSubmit(values) {
    var headers = {}
    if(sessionStorage.token){
      headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Token '+sessionStorage.token+''
          }
    }
    await this.props.updatePost(this.props.post.id, values, headers)
    browserHistory.push('/');
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Description"
          name="description"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title";
  }

  if (!values.description) {
    errors.description = "Enter a description";
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    post: state.posts.post
  };
}

const mapDispatchToProps = {
  updatePost,
  fetchPost,
};


export default reduxForm({
  validate,
  form: 'PostUpdateForm'
})(
  connect(mapStateToProps, mapDispatchToProps)(postUpdate)
);
