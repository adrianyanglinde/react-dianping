import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from "../../components/Header"
import Tip from "../../components/Tip"
import "./style.scss"
import { 
  actions as perchaseActions,
  getTotalPrice,
  getQuantity,
  isShowSuccessModal
} from '../../redux/modules/perchase'
import { 
  getUsername
} from '../../redux/modules/login'
import { 
  actions as detailActions,
} from '../../redux/modules/detail'
import { 
  getProductWithDetail
 } from '../../redux/modules/products';

class Purchase extends Component {
  componentDidMount(){
    /**
     * 判断是否从新获取产品数据
     */
    if(!this.props.product){   
      let productId = this.props.match.params.id;
      this.props.detailActions.loadProcutDetail(productId);
    }
  }
  render() {
    return (
      <div>
        <Header title="下单" onBack={this.handleBack}/>
        <div className="purchaseForm">
          <div className="purchaseForm__wrapper">
            <div className="purchaseForm__row">
              <div className="purchaseForm__rowLabel">数量</div>
              <div className="purchaseForm__rowValue">
                <span
                  className="purchaseForm__counter--dec"
                  onClick={this.handleDescQuantity}
                >
                  -
                </span>
                <input
                  className="purchaseForm__quantity"
                  onChange={this.handleChangeQuantit}
                  value={this.props.quantity}
                />
                <span
                  className="purchaseForm__counter--inc"
                  onClick={this.handleIncrQuantity}
                >
                  +
                </span>
              </div>
            </div>
            <div className="purchaseForm__row">
              <div className="purchaseForm__rowLabel">小计</div>
              <div className="purchaseForm__rowValue">
                <span className="purchaseForm__totalPrice">¥{this.props.totalPrice}
                </span>
              </div>
            </div>
            <div className="purchaseForm__row">
              <div className="purchaseForm__rowLabel">手机号码</div>
              <div className="purchaseForm__rowValue">{this.props.phone}</div>
            </div>
          </div>
          <ul className="purchaseForm__remark">
            <li className="purchaseForm__remarkItem">
              <i className="purchaseForm__sign" />
              <span className="purchaseForm__desc">支持随时退</span>
            </li>
            <li>
              <i className="purchaseForm__sign" />
              <span className="purchaseForm__desc">支持过期退</span>
            </li>
          </ul>
          <a className="purchaseForm__submit" onClick={this.handleSubmit}>
            提交订单
          </a>
        </div>
        {this.props.isShowSuccessModal ? <Tip message="购买成功！" onClose={this.handleCloseTip} /> : null}
      </div>
    );
  }

  handleBack = () => {
    this.props.history.goBack();
  }

  handleCloseTip = () => {
    this.props.perchaseActions.hideConfirmModal();
    this.props.history.push("/user");
  }

  handleDescQuantity = () => {
    let quantity = this.props.quantity;
    quantity -= 1;
    this.handleQuantity(quantity);
  };

  handleIncrQuantity = () => {
    let quantity = this.props.quantity;
    quantity += 1;
    this.handleQuantity(quantity);
  };

  handleChangeQuantit = (e) => {
    this.handleQuantity(e.target.value);
  }
  
  handleQuantity = (quantity) => {
    if(quantity < 0){
      return false;
    }
    this.props.perchaseActions.changeQuantity(quantity);
  }

  handleSubmit = () => {
    this.props.perchaseActions.perchase(this.props.match.params.id);
  };
}

const mapStateToProps = (state,props) => {
  let productId = props.match.params.id;
  return {
    product : getProductWithDetail(state,productId),
    totalPrice : getTotalPrice(state,productId),
    quantity : getQuantity(state),
    isShowSuccessModal : isShowSuccessModal(state),
    phone : getUsername(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    perchaseActions : bindActionCreators(perchaseActions,dispatch),
    detailActions : bindActionCreators(detailActions,dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchase)