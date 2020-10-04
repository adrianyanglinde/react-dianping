import { combineReducers } from 'redux';
import { createSelector } from "reselect";
import API from '../../utils/api';
import request from '../../utils/request';
import {
  actions as userActions
} from './user';
import {
  actions as orderActions,
  AVAILABLE_ORDER_TYPE
} from './orders';
import {
  getProductWithDetail,
  getProduct
} from './products';


export const types = {
  PERCHASE_REQUEST : "PERCHASE/PERCHASE_REQUEST",
  PERCHASE_SUCCESS : "PERCHASE/PERCHASE_SUCCESS",
  PERCHASE_FAILURE : "PERCHASE/PERCHASE_FAILURE",

  CHANGE_QUANTITY : "PERCHASE/CHANGE_QUANTITY",

  SHOW_SUCCESS_MODALD : "PERCHASE/SHOW_SUCCESS_MODALD",
  HIDE_SUCCESS_MODALD : "PERCHASE/HIDE_SUCCESS_MODALD",
}

const initialState = {
  loading : false,
  quantity : 0,
  showSuccessModal : false
}


export const actions = {
  changeQuantity : (quantity) => ({
    type : types.CHANGE_QUANTITY,
    quantity
  }),
  showSuccessModal : () => ({
    type : types.SHOW_SUCCESS_MODALD,
  }),
  hideConfirmModal : () => ({
    type : types.HIDE_SUCCESS_MODALD,
  }),
  perchaseRequest : () => ({
    type : types.PERCHASE_REQUEST,
  }),
  perchaseSuccess : () => ({
    type : types.PERCHASE_SUCCESS,
  }),
  perchaseFailure : () => ({
    type : types.PERCHASE_FAILURE
  }),
  perchase(productId){
    return (dispatch,getState) => {
      if(!productId){
        return null;
      }
      const quantity = getQuantity(getState());
      const params = {
        productId,
        quantity
      }
      dispatch(actions.perchaseRequest())
      return request.get(`${API.PERCHACE_PRODUCT}?params=${JSON.stringify(params)}`).then(()=>{
        dispatch(actions.showSuccessModal())
        dispatch(actions.perchaseSuccess())
        const orderId = `o-${(new Date()).getTime()}`;
        const product = getProduct(getState(),productId)
        const totalPrice = (product.currentPrice * quantity).toFixed(1);
        const text1 = `${quantity}张 | 总价：${totalPrice}`;
        const text2 = product.validityPeriod;
        const order = {
          id: orderId,
          title: `${product.shop}:${product.product}`,
          orderPicUrl: product.picture,
          channel: "团购",
          statusText: "待消费",
          text: [text1, text2],
          type: AVAILABLE_ORDER_TYPE
        };
        dispatch(orderActions.addOrder(order))
        dispatch(userActions.addOrder(orderId))
      }).catch(()=>{
        dispatch(actions.perchaseFailure())
      })
    }
  },
}

const perchase = (state = initialState, { 
  type ,
  quantity
}) => {
  switch (type) {
    case types.SHOW_SUCCESS_MODALD:
      return {...state,showSuccessModal : true};
    case types.HIDE_SUCCESS_MODALD:
      return {...state,showSuccessModal : false};
    case types.CHANGE_QUANTITY:
      return {...state,quantity};
    case types.PERCHASE_REQUEST:
      return {...state,loading : true};
    case types.PERCHASE_SUCCESS:
      return {...state,quantity : 0,loading : false};
    case types.PERCHASE_FAILURE:
      return {...state,loading : false};
    default:
      return state;
  }
}

export default perchase


export const getQuantity = (state) => {
  return state.perchase.quantity;
}

export const isShowSuccessModal = (state) => {
  return state.perchase.showSuccessModal;
}

export const getTotalPrice = createSelector(
  [
    getQuantity,
    getProductWithDetail
  ],
  (quantity,product)=>{
    if(!product){
      return 0;
    }
    return (quantity * product.currentPrice).toFixed(1);
  }
)





