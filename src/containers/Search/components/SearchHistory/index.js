import React, { Component } from 'react';
import "./style.css"

class SearchHistory extends Component {
  render() {
    return (
      <div className="searchHistory">
        <div className="searchHistory__header">搜索记录</div>
        <ul className="searchHistory__list">
          {
            this.props.historyKeywords.map((item, index) =>{
              return <li 
                key={index} 
                onClick={()=>this.handleClick(item)} 
                className="searchHistory__item"
              >
                {item.keyword}
              </li>
            })
          }
        </ul>
        <div className="searchHistory__clear" onClick={this.handleClear}>清除搜索记录</div>
      </div>
    );
  }

  handleClick = (item) => {
    this.props.onClickItem(item);
  }

  handleClear = () => {
    this.props.onClear();
  }

}

export default SearchHistory;