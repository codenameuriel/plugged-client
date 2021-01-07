import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from '../../hoc/Layout/Layout';
import Login from '../Forms/Login/Login';
import Signup from '../Forms/Signup/Signup';

class Auth extends Component {
  state = {
    login: {
      type: "login",
      title: "Log in",
      subtitle: "If you don't have an account, sign up!"
    },
    signup: {
      type: "signup",
      title: "Sign up",
      subtitle: "If you have an account, click to log in!"
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.authRedirect !== this.props.authRedirect) {
      console.log(this.props.authRedirect);
    }
  }
  

  renderLoginPage() {
    const { login } = this.state;
    const { type, title, subtitle } = login;
    return (
      <Layout type={type} title={title} subtitle={subtitle}>
        <Login/>
      </Layout>
    );
  }

  renderSignupPage() {
    const { signup } = this.state;
    const { type, title, subtitle } = signup;
    return (
      <Layout type={type} title={title} subtitle={subtitle}>
        <Signup/>
      </Layout>
    );
  }

  renderPage() {
    const type = this.props.location.pathname.split("/").join("");
    const { login, signup } = this.state;
    const { title: loginTitle, subtitle: loginSubtitle } = login;
    const { title: signupTitle, subtitle: signupSubtitle } = signup;

    switch(type) {
      case "login": 
        return (
          <Layout type={type} title={loginTitle} subtitle={loginSubtitle}>
            <Login/>
          </Layout>
        );
      case "signup":
        return (
          <Layout type={type} title={signupTitle} subtitle={signupSubtitle}>
            <Signup/>
          </Layout>
        );
      default: return;
    }
  }

  render() {
    const { authRedirect: redirectPath } = this.props;
    let authRedirect = null;
    if (redirectPath) authRedirect = (
      <Redirect to={redirectPath}/>
    );
      
    return (
      <>
        {authRedirect}
        {this.renderPage()}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    authRedirect: state.auth.authRedirect
  };
};

export default connect(mapStateToProps)(Auth);