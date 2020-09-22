import React, { Component } from 'react'
import { connect } from 'react-redux'

import { 
  actions,
  getProductDetail,
  getNearShopDetail,
} from '../../redux/modules/detail'

export class ProductDetail extends Component {
  componentDidMount(){
    let productId = this.props.match.params.id;
    this.props.loadProcutDetail(productId);
    this.props.loadShopDetail(productId);
  }
  render() {
    return (
      <div>
        
        
      </div>
    )
  }
}

const mapStateToProps = (state,props) => {
  let productId = props.match.params.id;
  return {
    productDetail : getProductDetail(state,productId),
    nearShopDetail : getNearShopDetail(state,productId),
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadProcutDetail : (id) => dispatch(actions.loadProcutDetail(id)),
  loadShopDetail : (id) => dispatch(actions.loadShopDetail(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)






