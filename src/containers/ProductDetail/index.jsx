import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductOverview from "./components/ProductOverview";
import ShopInfo from "./components/ShopInfo";
import Detail from "./components/Detail";
import Remark from "./components/Remark";
import BuyButton from "./components/BuyButton";
import Header from "../../components/Header";

import { 
  actions,
  getProductDetail,
  getNearShopDetail,
} from '../../redux/modules/detail'

export class ProductDetail extends Component {
  handleBack = () => {
    this.props.history.go(-1);
  }
  
  componentDidMount(){
    /**切换页面缓存产品详细信息 */
    let {productDetail,nearShopDetail} = this.props;
    if(!productDetail){
      let productId = this.props.match.params.id;
      this.props.loadProcutDetail(productId).then(()=>{
        this.props.loadShopDetail(this.props.productDetail.nearestShop)
      });
    }else if(!nearShopDetail){
      this.props.loadShopDetail(this.props.productDetail.nearestShop)
    }
  }
  render() {
    let {productDetail,nearShopDetail} = this.props;
    return (
      <div>
        <Header title="团购详情" onBack={this.handleBack} grey />
        {productDetail && <ProductOverview data={productDetail} />}
        {nearShopDetail && 
          <ShopInfo 
            data={nearShopDetail} 
            total={productDetail.shopIds.length} 
          />
        }
        {productDetail && (
          <div>
            <Detail data={productDetail} />
            <Remark data={productDetail} />
            <BuyButton productId={productDetail.id} />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state,props) => {
  let productId = props.match.params.id;
  return {
    productDetail : getProductDetail(state,productId),
    nearShopDetail : getNearShopDetail(state,productId),
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadProcutDetail : (id) => dispatch(actions.loadProcutDetail(id)),
  loadShopDetail : (id) => dispatch(actions.loadShopDetail(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)




