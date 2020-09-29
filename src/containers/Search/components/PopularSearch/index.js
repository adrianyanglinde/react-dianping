import React, { Component } from 'react';
import "./style.css"

class PopularSearch extends Component {
  render() {
    return (
      <div className="popularSearch">
        {
          this.props.popularKeywords.map((item,index) => {
            return (
              <span 
                key={index} 
                className="popularSearch__item"
                onClick={()=>this.handleClick(item)} 
              >{item.keyword}</span>
            )
          })
        }
      </div>
    );
  }
  handleClick = (item) => {
    this.props.onClickItem(item);
  }
}

export default PopularSearch;