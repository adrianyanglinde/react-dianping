import { combineReducers } from 'redux';
import API from '../../utils/api';
import request from '../../utils/request';
import {
  schema as ordersSchema,
  actions as orderActions,
  types as orderTypes,
  getOrder,
  TOPAY_ORDER_TYPE,
  AVAILABLE_ORDER_TYPE,
  REFUND_ORDER_TYPE
} from './orders';


export const types = {
  PERCHASE_REQUEST : "PERCHASE/PERCHASE_REQUEST",
  PERCHASE_SUCCESS : "PERCHASE/PERCHASE_SUCCESS",
  PERCHASE_FAILURE : "PERCHASE/PERCHASE_FAILURE",

  CHANGE_QUANTITY : "PERCHASE/CHANGE_QUANTITY",

  SHOW_CONFIRM_MODALD : "PERCHASE/SHOW_CONFIRM_MODALD",
  HIDE_CONFIRM_MODALD : "PERCHASE/HIDE_CONFIRM_MODALD",
}

const initialState = {
  loading : false,
  quantity : 0,
  showConfirmModal : false
}


export const actions = {
  changeQuantity : (quantity) => ({
    type : types.CHANGE_QUANTITY,
    quantity
  }),
  showConfirmModal : () => ({
    type : types.SHOW_CONFIRM_MODALD,
  }),
  hideConfirmModal : () => ({
    type : types.HIDE_CONFIRM_MODALD,
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
  perchase(productObj){
    const {productId} = productObj;
    return (dispatch,getState) => {
      if(!productId){
        return null;
      }
      dispatch(actions.perchaseRequest())
      return request.get(`${API.PERCHACE_PRODUCT}?productInfo=${JSON.stringify(productObj)}`).then(()=>{
        dispatch(actions.hideConfirmModal())
        dispatch(actions.perchaseSuccess())
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
    case types.SHOW_CONFIRM_MODALD:
      return {...state,showConfirmModal : true};
    case types.HIDE_CONFIRM_MODALD:
      return {...state,showConfirmModal : false};
    case types.CHANGE_QUANTITY:
      return {...state,quantity};
    case types.PERCHASE_REQUEST:
      return {...state,loading : true,showConfirmModal : false};
    case types.PERCHASE_SUCCESS:
      return {...state,quantity : 0,loading : false};
    case types.PERCHASE_FAILURE:
      return {...state,loading : false};
    default:
      return state;
  }
}

export default perchase



export const getCurrentTab = (state) => {
  return state.user.currentTab;
}

export const getIsShowDeleteOrderModal = (state) => {
  return state.user.deleteOrder.showModal;
}

export const getCurrentOrderCommentOrderId = (state) => {
  return state.user.commentOrder.orderId
}

export const getCurrentOrderCommentText = (state) => {
  return state.user.commentOrder.text;
}

export const getCurrentOrderCommentStar = (state) => {
  return state.user.commentOrder.star;
}






