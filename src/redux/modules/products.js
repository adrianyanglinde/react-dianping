export const schema = {
  key : "id",
  name : "products"
}

export default (state = {}, { type, response , payload }) => {
  /**判断action有没有相应的属性来做state的更新 */
  if(response && response.products){
    return {...state,...response.products}
  }
  return state;
}


/**selector */
export const getProduct = (state,productId) => {
  return state.entities.products[productId];
}

export const getAllProduct = (state) => {
  return state.entities.products;
}

export const getProductWithDetail = (state,productId) => {
  let product = getProduct(state,productId);
  if(product && product.detail && product.purchaseNotes){
    return state.entities.products[productId];
  }else{
    return null
  }
}