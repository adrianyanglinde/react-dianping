import React, { Component } from 'react';
import "./style.css"

class LoginForm extends Component {
  render() {
    return (
      <div className="loginForm">
        <div className="loginForm__inputContainer">
          <div className="loginForm__row">
            <label className="loginForm__mobileLabel">86</label>
            <input className="loginForm__input"
              name="username"
              value={this.props.username}
              onChange={e=>{this.props.onChangeUsername(e.target.value)}}
            ></input>
          </div>
          <div className="loginForm__row">
            <label className="loginForm__passwordLabel">密码</label>
            <input className="loginForm__input"
              name="password"
              type="password"
              value={this.props.password}
              onChange={e=>{this.props.onChangePassword(e.target.value)}}
            ></input>
          </div>
        </div>
        <div className="loginForm__btnContainer">
          <button className="loginForm__btn"
            onClick={this.props.onSubmit}
          >
            登录
          </button>
        </div>
      </div>
    );
  }
}

export default LoginForm;