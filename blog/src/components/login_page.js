import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { loginUser } from '../actions/users.action';
import { reduxForm , Field } from 'redux-form';
import { Button, Form } from 'reactstrap';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      token : ''
    };
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  onChangeEmail = ev => this.setState({ email: ev.target.value, errors: {} })
  onChangePassword = ev => this.setState({ password: ev.target.value, errors: {} })

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

  async handleLogin(ev) {
    // ev.preventDefault();
    let values = {'username' : this.state.email, 'password' : this.state.password }
    await this.props.loginUser(values);
    if(this.props.token){
      const { token } = this.props;
      this.setState({"token" : token });
      sessionStorage.setItem('token', this.props.token.access_token);
      browserHistory.push('/');
    }else{
      alert("Email or password is incorrect");
    }
  }



  render() {
    const { handleSubmit } = this.props;
    return (
      <div class="row">
        <div class="col-md-3"></div>
        <div className="container col-md-6 loginForm">
            <Form onSubmit={handleSubmit(this.handleLogin)}>
              <div className="container">
                <Field
                  label = "Email"
                  name = "email"
                  component = {this.renderField}
                  onChange = {this.onChangeEmail}
                />
              </div>
              <div className="container">
                <Field
                  label = "Password"
                  name = "password"
                  component = {this.renderField}
                  onChange = {this.onChangePassword}
                />
              </div>
                <Button type="submit">Login</Button>
            </Form>
        </div>
        <div class="col-md-3"></div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Enter a email";
  }

  if (!values.password) {
    errors.password = "Enter a password";
  }

  return errors;
}

const mapStateToProps = state =>({
  token : state.user.token,
  loggedInUser : state.user.loginUser,
});

const mapDispatchToProps = {
  loginUser,
};

export default reduxForm({
  validate,
  form: 'LoginForm'
})(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
