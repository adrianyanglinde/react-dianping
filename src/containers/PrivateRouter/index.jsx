import React from 'react';
import { connect } from 'react-redux'
import { Route,Redirect} from 'react-router-dom';
import { 
  isLogin
} from '../../redux/modules/login'

const PrivateRouter = ({isLogin,component:Component,...restProps}) => {
  return <Route
    {...restProps}
    render={props => {
      if(isLogin){
        return <Component {...props}/>
      }
      return <Redirect to={{
        pathname : '/login',
        state : {
          from : props.location
        }
      }}/>
    }
  }/>
}

const mapStateToProps = (state) => {
  return {
    isLogin : isLogin(state)
  }
}

export default connect(mapStateToProps,null)(PrivateRouter);
