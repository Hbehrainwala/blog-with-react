import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUser } from '../actions/users.action';
import { browserHistory } from 'react-router';

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
      <div>
          <form onSubmit={this.handleSignup}>
              <input type="text" className="form-control" placeholder="Email" name="email" onChange={this.onChangeEmail} />
              <input type="text" className="form-control" placeholder="First Name" name="first_name" onChange={this.onChangeFirstName} />
              <input type="text" className="form-control" placeholder="Last Name" name="last_name" onChange={this.onChangeLastName} />
              <input type="text" className="form-control" placeholder="Username" name="username" onChange={this.onChangeUsername} />
              <input type="password" className="form-control" placeholder="password" name="password" onChange={this.onChangePassword} />
              {this.state.errors.general ? <p className="error">{this.state.errors.general.message}</p> : null}
              <button type="submit" className="btn btn-primary"><span>SignUp</span></button>
          </form>
      </div>
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
