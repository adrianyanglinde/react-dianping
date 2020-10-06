import React , { Component } from 'react';

export default (importComponent) => {
  class asyncComponent extends Component {
    state = {
      Component : null
    }
    componentDidMount(){
      importComponent().then((mod) => {
        this.setState({
          Component : mod.default
        })
      }).catch(e => {
        console.log(e.message);
      })
    }
    render(){
      const C = this.state.Component;
      return C ? <C {...this.props}/> : null;
    }
  }
  return asyncComponent
}
