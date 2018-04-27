import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { createPost } from '../actions';

class PostsNew extends Component {
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
    await this.props.createPost(values, headers)
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


const mapDispatchToProps = {
  createPost,
};


export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, mapDispatchToProps)(PostsNew)
);
