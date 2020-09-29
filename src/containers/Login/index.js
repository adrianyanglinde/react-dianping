import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LoginHeader from "./components/LoginHeader"
import LoginForm from "./components/LoginForm"
import { 
  actions,
  getUsername,
  getPassword,
  isLogin
} from '../../redux/modules/login'

class Login extends Component {
  render() {
    const {isLogin,location:{state}} = this.props;
    if(isLogin){
      if(state && state.from){
        return <Redirect to={state.from}></Redirect>
      }
      return <Redirect to="/user"></Redirect>
    }else{
      return (
        <div>
          <LoginHeader/>
          <LoginForm
            username={this.props.username}
            password={this.props.password}
            onChangeUsername={this.handleChangeUsername}
            onChangePassword={this.handleChangePassword}
            onSubmit={this.handleSubmit}
          />
        </div>
      );
    }
  }
  handleChangeUsername = username => {
    this.props.actions.setUsername(username);
  }
  handleChangePassword = password => {
    this.props.actions.setPassword(password);
  }
  handleSubmit = () => {
    const {username,password} = this.props;
    if(!username || !password){
      return false;
    }
    this.props.actions.login(username,password);
  }
}

const mapStateToProps = (state) => {
  return {
    username : getUsername(state),
    password : getPassword(state),
    isLogin : isLogin(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(actions,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)