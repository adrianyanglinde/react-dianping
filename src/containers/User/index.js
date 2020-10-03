import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UserMain from "./container/UserMain"
import UserHeader from "./components/UserHeader"
import { 
  actions as loginActions
} from '../../redux/modules/login'

class User extends Component {
  render() {
    return (
      <div>
        <UserHeader 
          onBack={this.handleBack} 
          onLogout={this.handleLogout}
        />
        <UserMain/>
      </div>
    );
  }

  handleBack = () => {
    this.props.history.goBack();
  }

  handleLogout = () => {
    this.props.loginActions.logout();
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    loginActions : bindActionCreators(loginActions,dispatch)
  }
}

export default connect(null, mapDispatchToProps)(User)