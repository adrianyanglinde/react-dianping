import React, { Component } from "react";
import {Link} from 'react-router-dom';
import "./style.scss"

class Discount extends Component {
  render() {
    return (
      <div className="discount">
        <Link to="" className="discount__header">
          <span className="discount__title">超值特惠</span>
          <span className="discount__more">更多优惠</span>
          <span className="discount__arrow" />
        </Link>
        <div className="discount__content">
          {this.props.data.map((item, index) => {
            return (
              <Link to={`/detail/${item.id}`} key={item.id} className="discount__item" href={item.url}>
                <div className="discount__itemPic">
                  <img width="100%" height="100%" src={item.picture} alt=""/>
                </div>
                <div className="discount__itemTitle">{item.shop}</div>
                <div className="discount__itemPriceWrapper">
                  <ins className="discount__itemCurrentPrice">
                    {item.currentPrice}
                  </ins>
                  <del className="discount__itemOldPrice">{item.oldPrice}</del>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Discount;
