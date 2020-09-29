import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ShopList from "./components/ShopList"
import SearchHeader from "./components/SearchHeader"
import KeywordBox from "./components/KeywordBox"
import Banner from "../../components/Banner"
import { 
  actions,
  getCurrentKeyword,
  getShopsByKeyword,
} from '../../redux/modules/search'

class SearchResult extends Component {
  render() {
    return (
      <div>
        <SearchHeader 
          onBack={this.handleBack} 
          onSearch={this.handleSearch}
        />
        <KeywordBox text={this.props.currentKeyword}/>
        <Banner dark />
        <ShopList shops={this.props.shops}/>
      </div>
    );
  }

  handleBack = () => {
    this.props.history.push('/')
  }

  handleSearch = () => {
    this.props.history.push('/search')
  }
}

const mapStateToProps = (state) => {
  return {
    currentKeyword : getCurrentKeyword(state),
    shops : getShopsByKeyword(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(actions,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult)