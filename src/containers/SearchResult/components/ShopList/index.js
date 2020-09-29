import React, { Component } from "react";
import ShopItem from "../ShopItem"
import "./style.css"

class ShopList extends Component {
  render() {
    return (
      <div className="shopList">
        <div className="shopList__filter">
          <span className="shopList__filterItem">全部商区</span>
          <span className="shopList__filterItem">全部分类</span>
          <span className="shopList__filterItem">智能排序</span>
        </div>
        <div className="shopList__list">
          {this.props.shops.map((item, index) => {
            return (
              <div key={item.id}>
                <ShopItem data={item} />
                {index < this.props.shops.length - 1 ? (
                  <div className="shopList__divider" />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ShopList;
