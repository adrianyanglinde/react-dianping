import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { 
  actions as userActions,
  getCurrentOrders,
  getCurrentTab,
  getCurrentOrderCommentOrderId,
  getCurrentOrderCommentText,
  getCurrentOrderCommentStar,
  getIsShowDeleteOrderModal
} from '../../../../redux/modules/user'
import OrderItem from "../../components/OrderItem"
import Confirm from "../../../../components/Confirm";
import "./style.css"


const tabTitles = ["全部订单", "待付款", "可使用", "退款/售后"];

class UserMain extends Component {
  componentDidMount(){
    this.props.userActions.loadOrders();
  }
  componentWillUnmount(){
    if(this.props.currentOrderComment.orderId){
      this.props.userActions.hideOrderComment();
    }
  }
  render() {
    const { currentTab , currentOrders , isShowDeleteOrderModal} = this.props;
    return (
      <div className="userMain">
        <div className="userMain__menu">
          {tabTitles.map((item, index) => {
            return (
              <div 
                key={index} 
                className="userMain__tab" 
                onClick={() => this.handleClickTab(index)}
              >
                <span
                  className={
                    currentTab === index
                      ? "userMain__title userMain__title--active"
                      : "userMain__title"
                  }
                >
                  {item}
                </span>
              </div>
            );
          })}
        </div>
        <div className="userMain__content">
          {currentOrders && currentOrders.length > 0
            ? this.renderOrderList(currentOrders)
            : this.renderEmpty()}
        </div>
        {isShowDeleteOrderModal ? this.renderConfirmDialog() : null}
      </div>
    );
  }

  renderOrderList = data => {
    const {
      currentOrderComment
    } = this.props;
    return data.map(item => {
      return (
        <OrderItem 
          key={item.id} 
          data={item}
          currentComment={(item.id === currentOrderComment.orderId) ? currentOrderComment : null}
          onShowComment={this.props.userActions.showOrderComment}
          onSubmitComment={this.props.userActions.submitOrderComment}
          onChangeComment={this.props.userActions.changeOrderCommentText}
          onCancelComment={this.props.userActions.hideOrderComment}
          onChangeStar={this.props.userActions.changeOrderCommentStar}
          onDelete={this.props.userActions.showDeleteOrderModal}
        />
      )
    })
  }

  renderEmpty = () => {
    return (
      <div className="userMain__empty">
        <div className="userMain__emptyIcon"/>
        <div className="userMain__emptyText1">您还没有相关订单</div>
        <div className="userMain__emptyText2">去逛逛看有哪些想买的</div>
      </div>
    )
  }

  renderConfirmDialog = () => {
    return (
      <Confirm
        content="确定删除该订单吗？"
        cancelText="取消"
        confirmText="确定"
        onCancel={this.props.userActions.hideDeleteOrderModal}
        onConfirm={this.props.userActions.deleteOrder}
      />
    );
  };

  handleClickTab = (index) => {
    this.props.userActions.changeCurrentTab(index);
  }

}

const mapStateToProps = (state) => {
  const currentOrderComment = getCurrentOrderCommentOrderId(state) ? {
    orderId : getCurrentOrderCommentOrderId(state),
    text : getCurrentOrderCommentText(state),
    star : getCurrentOrderCommentStar(state)
  } : {};
  return {
    currentTab : getCurrentTab(state),
    currentOrders : getCurrentOrders(state),
    isShowDeleteOrderModal : getIsShowDeleteOrderModal(state),
    currentOrderComment : currentOrderComment
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userActions : bindActionCreators(userActions,dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMain)

