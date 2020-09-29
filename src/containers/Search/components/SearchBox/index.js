import React, { Component } from 'react';
import './style.css'

class SearchBox extends Component {

  render() {
    return (
      <div className="searchBox">
        <div className="searchBox__container">
          <input className="searchBox__text" value={this.props.inputText} onChange={this.handleChange}/>
          <span className="searchBox__clear" onClick={this.handleClear}></span>
          <span className="searchBox__cancel" onClick={this.handleCancel}>取消</span>
        </div>
        {this.props.relatedKeywords.length > 0 ? this.renderSuggestList() : null}
      </div>
    );
  }

  renderSuggestList() {
    return (
      <ul className="searchBox__list">
        {
          this.props.relatedKeywords.map((item,index) => {
            return (
              <li className="searchBox__item" key={index} onClick={()=>this.handleClick(item)} >
                <span className="searchBox__itemKeyworkd">{item.keyword}</span>
                <span className="searchBox__itemQuantity">约{item.quantity}个结果</span>
              </li>
            )
          })
        }
      </ul>
    )
  }

  handleClick = (item) => {
    this.props.onClickItem(item);
  }

  handleChange = (e) => {
    this.props.onChangeInputText(e.target.value)
  }

  handleClear = () => {
    this.props.onClear();
  }

  handleCancel = () => {
    this.props.onCancel();
  }
}

export default SearchBox;