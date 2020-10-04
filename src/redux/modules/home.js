import { combineReducers } from 'redux';
import { createSelector } from "reselect";
import API from '../../utils/api';
import request from '../../utils/request';
import {
  schema as productsSchema,
  getAllProduct
} from './products';


export const types = {
  FETCH_PRODUCT_LIKES_REQUEST : "HOME/FETCH_PRODUCT_LIKES_REQUEST",
  FETCH_PRODUCT_LIKES_SUCCESS : "HOME/FETCH_PRODUCT_LIKES_SUCCESS",
  FETCH_PRODUCT_LIKES_FAILURE : "HOME/FETCH_PRODUCT_LIKES_FAILURE",
  FETCH_PRODUCT_DISCOUNTS_REQUEST : "HOME/FETCH_PRODUCT_DISCOUNTS_REQUEST",
  FETCH_PRODUCT_DISCOUNTS_SUCCESS : "HOME/FETCH_PRODUCT_DISCOUNTS_SUCCESS",
  FETCH_PRODUCT_DISCOUNTS_FAILURE : "HOME/FETCH_PRODUCT_DISCOUNTS_FAILURE",
}

const initialState = {
  likes : {
    keys : [],
    loading : false,
    page : 0
  },
  discounts : {
    keys : [],
    loading : false,
  }
}

export const actions = {
  loadProcutLikes : () => {
    return (dispatch,getState) => {
      /**thunk 控制反转，条件判断，分发action */
      let page = getState().home.likes.page + 1;
      let start = (page - 1) * 6;
      return dispatch(actions.fetchProcutLikes(start,6))
    }
  },
  fetchProcutLikes : (start,end) => ({
    types : [
      types.FETCH_PRODUCT_LIKES_REQUEST,
      types.FETCH_PRODUCT_LIKES_SUCCESS,
      types.FETCH_PRODUCT_LIKES_FAILURE,
    ],
    callApi : () => request.get(`${API.GET_PRODUCT_LIKES}?start=${start}&end=${end}`),
    payload : {},
    schema : productsSchema
  }),
  loadProcutDiscounts : () => {
    return (dispatch,getState) => {
      if(getState().home.likes.keys.length > 0){
        return null;
      }
      return dispatch(actions.fetchProcutDiscounts())
    }
  },
  fetchProcutDiscounts : () => ({
    types : [
      types.FETCH_PRODUCT_DISCOUNTS_REQUEST,
      types.FETCH_PRODUCT_DISCOUNTS_SUCCESS,
      types.FETCH_PRODUCT_DISCOUNTS_FAILURE,
    ],
    callApi : () => request.get(`${API.GET_PRODUCT_DISCOUNTS}`),
    payload : {},
    schema : productsSchema
  }),
}
  

const likes = (state = initialState.likes, { 
  type , 
  error,
  response
}) => {
  switch (type) {
    case types.FETCH_PRODUCT_LIKES_REQUEST:
      return {...state,loading : true};
    case types.FETCH_PRODUCT_LIKES_SUCCESS:
      return {
        ...state,
        keys : [...state.keys,...response.keys],
        page : state.page + 1,
        loading : false
      };
    case types.FETCH_PRODUCT_LIKES_FAILURE:
      return {...state,loading : false};
    default:
      return state;
  }
}

const discounts = (state = initialState.discounts, { 
  type , 
  error,
  response
}) => {
  switch (type) {
    case types.FETCH_PRODUCT_DISCOUNTS_REQUEST:
      return {...state,loading : true};
    case types.FETCH_PRODUCT_DISCOUNTS_SUCCESS:
      return {
        ...state,
        keys : state.keys.concat(response.keys),
        loading : false
      };
    case types.FETCH_PRODUCT_DISCOUNTS_FAILURE:
      return {...state,loading : false};
    default:
      return state;
  }
}

export default combineReducers({
  likes,
  discounts
})

export const getProductsLikesIds = (state) => {
  return state.home.likes.keys
}

export const getProductsLikes = createSelector(
  [
    getAllProduct,
    getProductsLikesIds
  ],(products,productsLikesIds) => {
    return productsLikesIds.map(productId => {
      return products[productId];
    })
  }
)

export const getProductsLikesLoading = (state) => {
  return state.home.likes.loading
}

export const getProductsLikesPage = (state) => {
  return state.home.likes.page
}

export const getProductsDiscountsIds = (state) => {
  return state.home.discounts.keys
}

export const getProductsDiscounts = createSelector(
  [
    getAllProduct,
    getProductsDiscountsIds
  ],(products,productsDiscountsIds) => {
    return productsDiscountsIds.map(productId => {
      return products[productId];
    })
  }
)

