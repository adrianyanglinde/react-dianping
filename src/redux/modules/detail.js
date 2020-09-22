import { combineReducers } from 'redux';
import API from '../../utils/api';
import request from '../../utils/request';
import {schema as productsSchema,getProduct,getProductWithDetail} from './products';
import {schema as shopsSchema,getShop} from './shops';


export const types = {
  FETCH_PRODUCT_DETAIL_REQUEST : "DETAIL/FETCH_PRODUCT_DETAIL_REQUEST",
  FETCH_PRODUCT_DETAIL_SUCCESS : "DETAIL/FETCH_PRODUCT_DETAIL_SUCCESS",
  FETCH_PRODUCT_DETAIL_FAILURE : "DETAIL/FETCH_PRODUCT_DETAIL_FAILURE",
  FETCH_SHOP_DETAIL_REQUEST : "DETAIL/FETCH_SHOP_DETAIL_REQUEST",
  FETCH_SHOP_DETAIL_SUCCESS : "DETAIL/FETCH_SHOP_DETAIL_SUCCESS",
  FETCH_SHOP_DETAIL_FAILURE : "DETAIL/FETCH_SHOP_DETAIL_FAILURE",
}

const initialState = {
  product : {
    loading : false
  },
  nearstShop : {
    loading : false
  }
}
  

const product = (state = initialState.product, { type , error,response}) => {
  switch (type) {
    case types.FETCH_PRODUCT_LIKES_REQUEST:
      return {
        ...state,
        loading : true
      };
    case types.FETCH_PRODUCT_LIKES_SUCCESS:
      return {
        ...state,
        loading : false
      };
    case types.FETCH_PRODUCT_LIKES_FAILURE:
      return {
        ...state,
        loading : false
      };
    default:
      return state;
  }
}

const nearstShop = (state = initialState.nearstShop, { type , error,response}) => {
  switch (type) {
    case types.FETCH_SHOP_DETAIL_REQUEST:
      return {
        ...state,
        loading : true
      };
    case types.FETCH_SHOP_DETAIL_SUCCESS:
      return {
        ...state,
        loading : false
      };
    case types.FETCH_SHOP_DETAIL_FAILURE:
      return {
        ...state,
        loading : false
      };
    default:
      return state;
  }
}

export default combineReducers({
  product,
  nearstShop
})


export const actions = {
  loadProcutDetail(id){
    return (dispatch,getState) => {
      let productWithDetail = getProductWithDetail(getState(),id)
      if(productWithDetail){
        return null;
      }
      return dispatch(actions.fetchProcutDetail(id))
    }
  },
  fetchProcutDetail(id){
    return {
      types : [
        types.FETCH_PRODUCT_DETAIL_REQUEST,
        types.FETCH_PRODUCT_DETAIL_SUCCESS,
        types.FETCH_PRODUCT_DETAIL_FAILURE,
      ],
      callApi : () => request.get(`${API.GET_PRODUCT_DETAIL}${id}.json`),
      payload : {},
      schema : productsSchema
    }
  },
  loadShopDetail(id){
    return (dispatch,getState) => {
      let shop = getShop(getState(),id)
      if(shop){
        return null
      }
      return dispatch(actions.fetchShopDetail(id))
    }
  },
  fetchShopDetail(id){
    return {
      types : [
        types.FETCH_SHOP_DETAIL_REQUEST,
        types.FETCH_SHOP_DETAIL_SUCCESS,
        types.FETCH_SHOP_DETAIL_FAILURE,
      ],
      callApi : () => request.get(`${API.GET_PRODUCT_DETAIL}${id}.json`),
      payload : {},
      schema : shopsSchema
    }
  },
}


//selector
export const getProductDetail = (state,productId) => {
  return getProduct(state,productId)
}

export const getNearShopDetail = (state,productId) => {
  let product = getProduct(state,productId);
  let shopId = product ? product.nearestShop : null;
  if(!shopId){
    return null;
  }
  return getShop(state,shopId)
}

