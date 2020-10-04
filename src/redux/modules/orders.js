export const schema = {
  key : "id",
  name : "orders"
}
export const PAID_ORDER_TYPE = 1;
export const TOPAY_ORDER_TYPE = 2;
export const AVAILABLE_ORDER_TYPE = 3;
export const REFUND_ORDER_TYPE = 4;


export const types = {
  ADD_ORDER : "ORDERS/ADD_ORDER",
  DELETE_ORDER : "ORDERS/DELETE_ORDER",
  ADD_ORDER_COMMENT : "ORDERS/DELETE_ORDER_COMMENT"
}

export const actions = {
  deleteOrder : (key) => ({
    type : types.DELETE_ORDER,
    key
  }),
  addOrder : (order) => ({
    type : types.ADD_ORDER,
    order
  }),
  addOrderComment : (orderId,commentId) => ({
    type : types.ADD_ORDER_COMMENT,
    orderId,
    commentId
  })
}

export default (state = {}, { 
  type , 
  response , 
  key , 
  commentId,
  orderId,
  order
}) => {
  if(response && response.orders){
    return {...state,...response.orders}
  }
  if(type === types.DELETE_ORDER){
    const {
      [key] : deleteOrder,
      ...restOrder
    } = state;
    return {...restOrder}
  }
  if(type === types.ADD_ORDER){
    return {...state,[order.id] : order}
  }
  if(type === types.ADD_ORDER_COMMENT){
    let comments = state[orderId].comments;
    let newComments = (comments && comments.length > 0) ? 
    [...comments,commentId] 
    : 
    [commentId];
    return {
      ...state,
      [orderId] : {
        ...state[orderId],
        comments : newComments
      }
    }
  }
  return state;
}

export const getOrder = (state,key) => {
  return state.entities.orders[key];
}

export const getAllOrder = (state) => {
  return state.entities.orders;
}

