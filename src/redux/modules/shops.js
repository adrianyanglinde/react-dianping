export const schema = {
  key : "id",
  name : "shops"
}

export default (state = {}, { type, response , payload }) => {
  if(response && response.shops){
    return {...state,...response.shops}
  }
  return state;
}

export const getShop = (state,key) => {
  return state.entities.shops[key];
}

export const getAllShop = (state) => {
  return state.entities.shops;
}

