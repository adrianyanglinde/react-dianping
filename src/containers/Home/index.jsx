import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../redux/modules/home'

import Category from './components/Category'
import Headline from './components/Headline'
import Discount from './components/Discount'
import LikeList from './components/LikeList'
import HomeHeader from './components/HomeHeader'
import Footer from '../../components/Footer'
import Banner from './components/Banner'
import Activity from './components/Activity'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export class Home extends Component {
  componentDidMount(){
    this.props.laodProcutLikes(1,10);
  }
  render() {
    let {loading,likes,errorText} = this.props;
    return (
      <div>
        <HomeHeader/>
        <Banner/>
        <Category/>
        <Headline/>
        <Activity/>
        <Discount/>
        <LikeList/>
        <Footer/>
        {/* {loading ? "loading" : (errorText ? errorText : JSON.stringify(likes))} */}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  likes : state.entities.products.keys,
  errorText : state.home.errorText,
  loading : state.home.loading,
})

const mapDispatchToProps = (dispatch) => ({
  laodProcutLikes : (start,end) => dispatch(actions.loadProcutLikes(start,end))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)



