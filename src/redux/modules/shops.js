export const schema = {
  key : "id",
  name : "shops"
}

const initialState = {

}

export default (state = initialState, { type, response , payload }) => {
  if(response && response.shops){
    return {...state,...response.shops}
  }
  return state;
}

/**selector */
export const getShop = (state,key) => {
  return state.entities.shops[key];
}

