export const schema = {
  key : "id",
  name : "keywords"
}

export default (state = {}, { type, response , payload }) => {
  if(response && response.keywords){
    return {...state,...response.keywords}
  }
  return state;
}

export const getKeyword = (state,key) => {
  return state.entities.keywords[key];
}

export const getAllKeyword = (state) => {
  return state.entities.keywords;
}
