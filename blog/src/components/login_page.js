import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { loginUser } from '../actions';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  onChangeEmail = ev => this.setState({ email: ev.target.value, errors: {} })
  onChangePassword = ev => this.setState({ password: ev.target.value, errors: {} })

  async handleLogin(ev) {
    ev.preventDefault();
    let values = {'username' : this.state.email, 'password' : this.state.password }
    await this.props.loginUser(values);
    if(this.props.token){
      this.props.history.push('/');
    }else{
      debugger;
      alert("Email or password is incorrect");
    }
  }



  render() {
    return (
      <div>
          <form onSubmit={this.handleLogin}>
              <input type="text" placeholder="Email" name="email" onChange={this.onChangeEmail} />
              <input type="password" placeholder="password" name="password" onChange={this.onChangePassword} />
              {this.state.errors.general ? <p className="error">{this.state.errors.general.message}</p> : null}
              <button type="submit" className="btn btn-primary"><span>Log in</span></button>
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
  loginUser,
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
