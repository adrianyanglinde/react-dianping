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
export const getProduct = (state,key) => {
  return state.entities.products[key];
}


export const getProductWithDetail = (state,key) => {
  let product = getProduct(state,key);
  if(product && product.detail && product.purchaseNotes){
    return state.entities.products[key];
  }else{
    return null
  }
}