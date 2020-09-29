import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SearchBox from './components/SearchBox'
import PopularSearch from './components/PopularSearch'
import SearchHistory from './components/SearchHistory'
import { 
  actions,
  getInputText,
  getRelatedKeywords,
  getPopularKeywords,
  getHistoryKeywords,
} from '../../redux/modules/search'

class Search extends Component {
  componentDidMount(){
    const {loadPopularKeywords} = this.props.actions;
    loadPopularKeywords();
  }
  componentWillUnmount(){
    const {changeInputText} = this.props.actions;
    changeInputText("");
  }
  render() {
    return (
      <div>
        <SearchBox
          relatedKeywords={this.props.relatedKeywords}
          inputText={this.props.inputText}
          onChangeInputText={this.handleChangeInputText}
          onClickItem={this.handleClickItem}
          onCancel={this.handleCancelSearch}
          onClear={this.handleClearSearchBox}
        />
        <PopularSearch
          popularKeywords={this.props.popularKeywords}
          onClickItem={this.handleClickItem}
        />
        <SearchHistory
          historyKeywords={this.props.historyKeywords}
          onClear={this.handleClearHistory}
          onClickItem={this.handleClickItem}
        />
      </div>
    );
  }
  handleChangeInputText = (text) => {
    const {changeInputText,loadRelatedKeywords} = this.props.actions;
    changeInputText(text);
    if(text){
      loadRelatedKeywords(text);
    }
  }
  handleClickItem = (item) => {
    const {
      changeInputText,
      setHistoryKeyword,
      loadShopsByKeyword
    } = this.props.actions;
    changeInputText(item.keyword);
    setHistoryKeyword(item.id);
    loadShopsByKeyword(item.id);
    this.props.history.push("/search_result");
  }
  handleClearHistory = () => {
    const {clearHistoryKeywords} = this.props.actions;
    clearHistoryKeywords();
  }
  handleCancelSearch = () => {
    const {changeInputText} = this.props.actions;
    changeInputText("");
    this.props.history.goBack();
  }
  handleClearSearchBox = () => {
    const {changeInputText} = this.props.actions;
    changeInputText("");
  }
}

const mapStateToProps = (state) => {
  return {
    inputText : getInputText(state),
    relatedKeywords : getRelatedKeywords(state),
    popularKeywords : getPopularKeywords(state),
    historyKeywords : getHistoryKeywords(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(actions,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
