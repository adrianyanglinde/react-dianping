import React, { Component } from "react";
import "./style.css"

class OrderItem extends Component {
  render() {
    const {
      data: { id, title, statusText, orderPicUrl, channel, text, type ,comments}
    } = this.props;
    return (
      <div className="orderItem">
        <div className="orderItem__title">
          <span>{title}</span>
        </div>
        <div className="orderItem__main">
          <div className="orderItem__imgWrapper">
            <div className="orderItem__tag">{statusText}</div>
            <img alt="" className="orderItem__img" src={orderPicUrl} />
          </div>
          <div className="orderItem__content">
            <div className="orderItem__line">{text[0]}</div>
            <div className="orderItem__line">{text[1]}</div>
          </div>
        </div>
        <div className="orderItem__bottom">
          <div className="orderItem__type">{channel}</div>
          <div>
            {type === 1 ? <div className="orderItem__btn" onClick={()=>{this.handleShowComment(id)}}>评价</div> : null}
            <div className="orderItem__btn" onClick={()=>this.handleDelete(id)}>删除</div>
          </div>
        </div>
        {comments ? comments.map((comment,index) => 
          <div key={index}>
            {comment.text}{comment.star}
          </div>
        ) : null}
        {this.props.currentComment ? this.renderEditArea() : null}
      </div>
    );
  }

  //渲染订单评价区域的DOM
  renderEditArea() {
    return (
      <div className="orderItem__commentContainer">
        <textarea
          className="orderItem__comment"
          onChange={this.handleChangeComment}
          value={this.props.currentComment.text}
        />
        {this.renderStars()}
        <button className="orderItem__commentBtn" onClick={this.handleSubmitComment}>
          提交
        </button>
        <button className="orderItem__commentBtn" onClick={this.handleCancelComment}>
          取消
        </button>
      </div>
    );
  }

  renderStars() {
    return (
      <div>
        {[1, 2, 3, 4, 5].map((item, index) => {
          const lightClass = this.props.currentComment.star >= item ? "orderItem__star--light" : "";
          return (
            <span
              className={"orderItem__star " + lightClass}
              key={index}
              onClick={() => this.handleChangeStar(item)}
            >
              ★
            </span>
          );
        })}
      </div>
    );
  }

  

  handleShowComment = (orderId) => {
    this.props.onShowComment(orderId)
  };

  handleChangeComment = (e) => {
    this.props.onChangeComment(e.target.value)
  };

  handleSubmitComment = () => {
    this.props.onSubmitComment()
  };

  handleCancelComment = () => {
    this.props.onCancelComment()
  };

  handleChangeStar = (star) => {
    this.props.onChangeStar(star)
  };

  handleDelete = (orderId) => {
    this.props.onDelete(orderId)
  };

  

}

export default OrderItem;
