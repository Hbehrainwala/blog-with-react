import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUser } from '../actions/users.action';
import { browserHistory } from 'react-router';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      first_name : '',
      last_name : '',
      errors: {},
    };
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }
  onChangeEmail = ev => this.setState({ email: ev.target.value, errors: {} })
  onChangePassword = ev => this.setState({ password: ev.target.value, errors: {} })
  onChangeUsername = ev => this.setState({ username : ev.target.value, errors: {} })
  onChangeFirstName = ev => this.setState({ first_name : ev.target.value, errors : {} })
  onChangeLastName = ev => this.setState({ last_name : ev.target.value, errors : {} })
  onChangeUsername = ev => this.setState({ username : ev.target.value, errors: {} })


  async handleSignup(ev) {
    ev.preventDefault();
    let values = {
      'username' : this.state.username,
      'password' : this.state.password ,
      'email' : this.state.email,
      'first_name' : this.state.first_name,
      'last_name' : this.state.last_name
    }
    await this.props.signupUser(values);
    if(this.props.token){
      browserHistory.push('/');
    }else{
      alert("Email or password is incorrect");
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSignup}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChangeEmail} />
        </FormGroup>
        <FormGroup>
          <Label for="first_name">First Name</Label>
          <Input type="text" name="email" id="first_name" onChange={this.onChangeFirstName}/>
        </FormGroup>
        <FormGroup>
          <Label for="last_name">Last Name</Label>
          <Input type="text" name="last_name" id="last_name" onChange={this.onChangeLastName}/>
        </FormGroup>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="text" name="username" id="username" onChange={this.onChangeUsername} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" onChange={this.onChangePassword}/>
        </FormGroup>
        {this.state.errors.general ? <p className="error">{this.state.errors.general.message}</p> : null}
        <Button type="submit">SignUp</Button>
      </Form>
    );
  }
}

const mapStateToProps = state =>({
  token : state.user.token,
  loggedInUser : state.user.loginUser,
});

const mapDispatchToProps = {
  signupUser,
};


export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
