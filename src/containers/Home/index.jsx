import React, { Component } from 'react'
import { connect } from 'react-redux'
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

import { 
  actions,
  getProductsLikes,
  getProductsDiscounts,
  getProductsLikesPage,
  getProductsLikesLoading
} from '../../redux/modules/home'

export class Home extends Component {
  componentDidMount(){
    //this.props.laodProcutLikes();
    this.props.loadProcutDiscounts();
  }
  render() {
    return (
      <div>
        <HomeHeader/>
        <Banner/>
        <Category/>
        <Headline/>
        <Activity/>
        <Discount 
          data={this.props.discounts}
        />
        <LikeList 
          page={this.props.page}
          data={this.props.likes}
          loading={this.props.likesLoding}
          fetchData={this.props.laodProcutLikes}
        />
        <Footer/>
        {/* {loading ? "loading" : (errorText ? errorText : JSON.stringify(likes))} */}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  likes : getProductsLikes(state),
  likesLoding : getProductsLikesLoading(state),
  page : getProductsLikesPage(state),
  discounts : getProductsDiscounts(state),
})

const mapDispatchToProps = (dispatch) => ({
  laodProcutLikes : () => dispatch(actions.loadProcutLikes()),
  loadProcutDiscounts : () => dispatch(actions.loadProcutDiscounts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)






