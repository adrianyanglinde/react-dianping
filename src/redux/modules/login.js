import { combineReducers } from 'redux';
import API from '../../utils/api';
import request from '../../utils/request';
import { 
  setLocalStorage,
  getLocalStorage,
  clearAllLocalStorage
} from '../../utils/utils';

export const types = {
  LOGIN_REQUEST : "LOGIN/LOGIN_REQUEST",
  LOGIN_SUCCESS : "LOGIN/LOGIN_SUCCESS",
  LOGIN_FAILURE : "LOGIN/LOGIN_FAILURE",

  LOGOUT_SUCCESS : "LOGIN/LOGOUT_SUCCESS",

  SET_USERNAME : "LOGIN/SET_USERNAME",
  SET_PASSWORD : "LOGIN/SET_PASSWORD",
}

const initialState = {
  username : getLocalStorage("USER_NAME") || "",
  password : "",
  isLogin : getLocalStorage("IS_LOGIN") === "true" ? true : false,
  loading : false
}


export const actions = {
  setUsername(username){
    return {
      type : types.SET_USERNAME,
      username
    }
  },
  setPassword(password){
    return {
      type : types.SET_PASSWORD,
      password
    }
  },
  loginRequest(){
    return {
      type : types.LOGIN_REQUEST
    }
  },
  loginSuccess(){
    return {
      type : types.LOGIN_SUCCESS
    }
  },
  loginFailure(){
    return {
      type : types.LOGIN_FAILURE
    }
  },
  logoutSuccess(){
    return {
      type : types.LOGOUT_SUCCESS
    }
  },
  logout(){
    return (dispatch,getState) => {
      dispatch(actions.logoutSuccess());
      clearAllLocalStorage();
    }
  },
  login(username,password){
    return (dispatch,getState) => {
      dispatch(actions.loginRequest());
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          dispatch(actions.loginSuccess());
          setLocalStorage("IS_LOGIN",true);
          setLocalStorage("USER_NAME",username);
        }, 1000);
      });
    }
  }
}


const login = (state = initialState, { 
  type , 
  error,
  username,
  password
}) => {
  switch (type) {
    case types.SET_USERNAME:
      return {
        ...state,
        username : username
      };
    case types.SET_PASSWORD:
      return {
        ...state,
        password : password
      };
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loading : true
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading : false,
        isLogin : true
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isLogin : false,
        username : "",
        password : ""
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loading : false,
        isLogin : false
      };
    default:
      return state;
  }
}

export default login


//selector
export const getUsername = (state) => {
  return state.login.username;
}

export const getPassword = (state) => {
  return state.login.password;
}

export const isLogin = (state) => {
  return state.login.isLogin;
}


