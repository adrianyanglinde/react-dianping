export const schema = {
  key : "id",
  name : "comments"
}

export const types = {
  ADD_COMMENT : "COMMENT/ADD_COMMENT",
}

export const actions = {
  addComment(commentObj){
    return {
      type : types.ADD_COMMENT,
      commentObj
    }
  }
}

export default (state = {}, { 
  type, 
  response , 
  payload ,
  commentObj,
}) => {
  if(response && response.comments){
    return {...state,...response.comments}
  }
  if(type === types.ADD_COMMENT){
    return {
      ...state,
      [commentObj.id]:commentObj
    }
  }
  return state;
}

export const getComment = (state,key) => {
  return state.entities.comments[key];
}

export const getAllComment = (state) => {
  return state.entities.comments;
}

