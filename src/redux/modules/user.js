import { combineReducers } from 'redux';
import { createSelector } from "reselect";
import API from '../../utils/api';
import request from '../../utils/request';
import {
  schema as ordersSchema,
  actions as orderActions,
  types as orderTypes,
  getAllOrder,
  
  TOPAY_ORDER_TYPE,
  AVAILABLE_ORDER_TYPE,
  REFUND_ORDER_TYPE
} from './orders';
import {
  actions as commentActions,
  getAllComment
} from './comments';


export const types = {
  FETCH_ORDERS_REQUEST : "USER/FETCH_ORDERS_REQUEST",
  FETCH_ORDERS_SUCCESS : "USER/FETCH_ORDERS_SUCCESS",
  FETCH_ORDERS_FAILURE : "USER/FETCH_ORDERS_FAILURE",

  DELETE_ORDER_REQUEST : "USER/DELETE_ORDER_REQUEST",
  DELETE_ORDER_SUCCESS : "USER/DELETE_ORDER_SUCCESS",
  DELETE_ORDER_FAILURE : "USER/DELETE_ORDER_FAILURE",

  CHANGE_CURRENT_TAB : "USER/CHANGE_CURRENT_TAB",

  SHOW_DELETE_ORDER_MODALD : "USER/SHOW_DELETE_ORDER_MODALD",
  HIDE_DELETE_ORDER_MODALD : "USER/HIDE_DELETE_ORDER_MODALD",

  SHOW_ORDER_COMMENT : "USER/SHOW_ORDER_COMMENT",
  HIDE_ORDER_COMMENT : "USER/HIDE_ORDER_COMMENT",
  CHANGE_ORDER_COMMENT_TEXT : "USER/CHANGE_ORDER_COMMENT_TEXT",
  CHANGE_ORDER_COMMENT_STAR : "USER/CHANGE_ORDER_COMMENT_STAR",
  SUBMIT_ORDER_COMMENT_REQUEST : "USER/SUBMIT_ORDER_COMMENT_REQUEST",
  SUBMIT_ORDER_COMMENT_SUCCESS : "USER/SUBMIT_ORDER_COMMENT_SUCCESS",
  SUBMIT_ORDER_COMMENT_FAILURE : "USER/SUBMIT_ORDER_COMMENT_FAILURE",

  ADD_ORDER : "USER/ADD_ORDER",
}

const initialState = {
  orders : {
    loading : false,
    /**
     * 发现现有状态已不满足，
     * 新增订单数组不为空，所以不能根据数组长度来判断是否有获取过数据
     */
    fetched : false,
    keys : [],
    toPayKeys : [],
    availableKeys : [],
    refundKeys : []
  },
  currentTab : 0,
  deleteOrder : {
    orderId : null,
    showModal : false,
    loading : false,
  },
  commentOrder : {
    orderId : null,
    text : "",
    star : 0,
    loading : false
  }
}


export const actions = {
  changeCurrentTab : (index) => ({
    type : types.CHANGE_CURRENT_TAB,
    index
  }),
  addOrder : (orderId) => ({
    type : types.ADD_ORDER,
    orderId
  }),
  loadOrders : () => {
    return (dispatch,getState) => {
      if(getState().user.orders.fetched){
        return null;
      }
      return dispatch(actions.fetchOrders())
    }
  },
  fetchOrders : () => ({
    types : [
      types.FETCH_ORDERS_REQUEST,
      types.FETCH_ORDERS_SUCCESS,
      types.FETCH_ORDERS_FAILURE,
    ],
    callApi : () => request.get(`${API.GET_ORDERS}`),
    payload : {},
    schema : ordersSchema
  }),
  showDeleteOrderModal : (orderId) => ({
    type : types.SHOW_DELETE_ORDER_MODALD,
    orderId
  }),
  hideDeleteOrderModal : () => ({
    type : types.HIDE_DELETE_ORDER_MODALD,
  }),
  deleteOrderRequest : () => ({
    type : types.DELETE_ORDER_REQUEST,
  }),
  deleteOrderSuccess : orderId => ({
    type : types.DELETE_ORDER_SUCCESS,
    orderId
  }),
  deleteOrderFailure : () => ({
    type : types.DELETE_ORDER_FAILURE
  }),
  deleteOrder(){
    return (dispatch,getState) => {
      const orderId = getState().user.deleteOrder.orderId;
      if(!orderId){
        return null;
      }
      dispatch(actions.deleteOrderRequest())
      return request.get(`${API.DELETE_ORDER}?orderId=${orderId}`).then(()=>{
        dispatch(actions.hideDeleteOrderModal())
        dispatch(actions.deleteOrderSuccess(orderId))
        dispatch(orderActions.deleteOrder(orderId))
      }).catch(()=>{
        dispatch(actions.deleteOrderFailure())
      })
    }
  },
  showOrderComment : (orderId) => ({
    type : types.SHOW_ORDER_COMMENT,
    orderId
  }),
  hideOrderComment : () => ({
    type : types.HIDE_ORDER_COMMENT
  }),
  changeOrderCommentStar : (star) => ({
    type : types.CHANGE_ORDER_COMMENT_STAR,
    star
  }),
  changeOrderCommentText : (text) => ({
    type : types.CHANGE_ORDER_COMMENT_TEXT,
    text
  }),
  submitOrderCommentRequest : () => ({
    type : types.SUBMIT_ORDER_COMMENT_REQUEST,
  }),
  submitOrderCommentSuccess : () => ({
    type : types.SUBMIT_ORDER_COMMENT_SUCCESS,
  }),
  submitOrderCommentFailure : () => ({
    type : types.SUBMIT_ORDER_COMMENT_FAILURE
  }),
  submitOrderComment(){
    return (dispatch,getState) => {
      const {orderId,text,star} = getState().user.commentOrder;
      if(!orderId || !text){
        return null;
      }
      dispatch(actions.submitOrderCommentRequest())
      return request.get(`${API.SUBMIT_ORDER_COMMENT}?orderId=${orderId}`).then(()=>{
        const commentObj = {
          id : (new Date()).getTime(),
          text,
          star
        }
        dispatch(actions.submitOrderCommentSuccess(orderId))
        dispatch(commentActions.addComment(commentObj))
        dispatch(orderActions.addOrderComment(orderId,commentObj.id))
      }).catch(()=>{
        dispatch(actions.submitOrderCommentFailure())
      })
    }
  },
}
  
const currentTab = (state = initialState.currentTab, { 
  type ,
  index
}) => {
  if(type === types.CHANGE_CURRENT_TAB){
    return index;
  }
  return state;
};

const orders = (state = initialState.orders, { 
  type , 
  error,
  response,
  orderId
}) => {
  switch (type) {
    case orderTypes.DELETE_ORDER:
    case types.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        keys : deleleOrderIdFromKeys(state,'keys',orderId),
        toPayKeys : deleleOrderIdFromKeys(state,'toPayKeys',orderId),
        availableKeys : deleleOrderIdFromKeys(state,'availableKeys',orderId),
        refundKeys : deleleOrderIdFromKeys(state,'refundKeys',orderId)
      };
    case types.FETCH_ORDERS_REQUEST:
      return {...state,loading : true};
    case types.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        keys : [...state.keys,...response.keys],
        toPayKeys : [...state.toPayKeys,...getOrdersByType(response,TOPAY_ORDER_TYPE)],
        availableKeys : [...state.availableKeys,...getOrdersByType(response,AVAILABLE_ORDER_TYPE)],
        refundKeys : [...state.refundKeys,...getOrdersByType(response,REFUND_ORDER_TYPE)],
        loading : false,
        fetched : true
      };
    case types.FETCH_ORDERS_FAILURE:
      return {...state,loading : false};
    case types.ADD_ORDER:
      return {
        ...state,
        keys : [...state.keys,orderId],
        availableKeys : [...state.availableKeys,orderId]
      };
    default:
      return state;
  }
};
const deleleOrderIdFromKeys = (state,key,orderId) => {
  return state[key].filter(id => id !== orderId);
};
const getOrdersByType = (response,TYPE) => {
  return response.keys.filter(id => response.orders[id].type === TYPE)
};

const deleteOrder = (state = initialState.deleteOrder, { 
  type ,
  orderId
}) => {
  switch (type) {
    case types.SHOW_DELETE_ORDER_MODALD:
      return {...state,orderId : orderId,showModal : true};
    case types.HIDE_DELETE_ORDER_MODALD:
      return {...state,orderId : null,showModal : false};
    case types.DELETE_ORDER_REQUEST:
      return {...state,loading : true};
    case types.DELETE_ORDER_SUCCESS:
      return {...state,loading : false};
    case types.DELETE_ORDER_FAILURE:
      return {...state,loading : false};
    default:
      return state;
  }
}

const commentOrder = (state = initialState.commentOrder, { 
  type ,
  orderId,
  text,
  star
}) => {
  switch (type) {
    case types.SHOW_ORDER_COMMENT:
      return {...state,orderId};
    case types.HIDE_ORDER_COMMENT:
      return {
        ...state,text : "",star : 0,orderId : null};
    case types.CHANGE_ORDER_COMMENT_TEXT:
      return {...state,text};
    case types.CHANGE_ORDER_COMMENT_STAR:
      return {...state,star};
    case types.SUBMIT_ORDER_COMMENT_REQUEST:
      return {...state,loading : true};
    case types.SUBMIT_ORDER_COMMENT_SUCCESS:
      return {...state,text : "",star : 0,orderId : null,loading : false};
    case types.SUBMIT_ORDER_COMMENT_FAILURE:
      return {...state,loading : false};
    default:
      return state;
  }
}

export default combineReducers({
  orders,
  currentTab,
  deleteOrder,
  commentOrder
})



export const getCurrentTab = (state) => {
  return state.user.currentTab;
}

export const getUserOrders = (state) => {
  return state.user.orders;
}

/**
 * reSelect 减少无关状态变更的select计算
 */
export const getCurrentOrders = createSelector([
  getCurrentTab,
  getUserOrders,
  getAllOrder,
  getAllComment,
],(currentTab,userOrders,orders,comments)=>{
  const type = [
    'keys',
    'toPayKeys',
    'availableKeys',
    'refundKeys'
  ][currentTab];
  return userOrders[type].map(orderId => {
    let order = orders[orderId];
    let orderComments = order.comments ? order.comments.map(commentId => {
      return comments[commentId];
    }) : []
    return {
      ...order,
      comments : orderComments
    };
  })
})

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






