export const schema = {
  key : "id",
  name : "keywords"
}

const initialState = {

}

export default (state = initialState, { type, response , payload }) => {
  if(response && response.keywords){
    return {...state,...response.keywords}
  }
  return state;
}


/**selector */
export const getKeyword = (state,key) => {
  return state.entities.keywords[key];
}
