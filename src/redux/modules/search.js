import { combineReducers } from 'redux';
import { createSelector } from "reselect";
import API from '../../utils/api';
import request from '../../utils/request';
import {
  schema as keywordsSchema,
  getKeyword,
  getAllKeyword
} from './keywords';
import {
  schema as shopsSchema,
  getAllShop
} from './shops';


export const types = {
  FETCH_RELATED_KEYWORDS_REQUEST : "SEARCH/FETCH_RELATED_KEYWORDS_REQUEST",
  FETCH_RELATED_KEYWORDS_SUCCESS : "SEARCH/FETCH_RELATED_KEYWORDS_SUCCESS",
  FETCH_RELATED_KEYWORDS_FAILURE : "SEARCH/FETCH_RELATED_KEYWORDS_FAILURE",

  FETCH_POPULAR_KEYWORDS_REQUEST : "SEARCH/FETCH_POPULAR_KEYWORDS_REQUEST",
  FETCH_POPULAR_KEYWORDS_SUCCESS : "SEARCH/FETCH_POPULAR_KEYWORDS_SUCCESS",
  FETCH_POPULAR_KEYWORDS_FAILURE : "SEARCH/FETCH_POPULAR_KEYWORDS_FAILURE",

  FETCH_SHOPS_BY_KEYWORD_REQUEST : "SEARCH/FETCH_SHOPS_BY_KEYWORD_REQUEST",
  FETCH_SHOPS_BY_KEYWORD_SUCCESS : "SEARCH/FETCH_SHOPS_BY_KEYWORD_SUCCESS",
  FETCH_SHOPS_BY_KEYWORD_FAILURE : "SEARCH/FETCH_SHOPS_BY_KEYWORD_FAILURE",

  CHANGE_INPUT_TEXT : "SEARCH/CHANGE_INPUT_TEXT",
  SET_HISTORY_KEYWORD : "SEARCH/SET_HISTORY_KEYWORD",
  CLEAR_HISTORY_KEYWORDS : "SEARCH/CLEAR_HISTORY_KEYWORDS"
}

const initialState = {
  inputText : "",
  relatedKeywords : {
    loading : false,
    keys : {}
  },
  popularKeywords : {
    loading : false,
    keys : []
  },
  historyKeywords : [],
  shopsByKeyword : {
    loading : false,
    keys : []
  }
}


/**
 * action仅作为更改state的动作
 * handle仅作为响应事件的动作
 */
export const actions = {
  changeInputText : (text) => ({
    type : types.CHANGE_INPUT_TEXT,
    text
  }),
  setHistoryKeyword : (keyword) => ({
    type : types.SET_HISTORY_KEYWORD,
    keyword
  }),
  clearHistoryKeywords : () => ({
    type : types.CLEAR_HISTORY_KEYWORDS,
  }),
  loadRelatedKeywords : (keyword) => {
    return (dispatch,getState) => {
      if(getState().search.relatedKeywords.keys[keyword]){
        return null;
      }
      return dispatch(actions.fetchRelatedKeywords(keyword))
    }
  },
  fetchRelatedKeywords : (keyword) => {
    return {
      types : [
        types.FETCH_RELATED_KEYWORDS_REQUEST,
        types.FETCH_RELATED_KEYWORDS_SUCCESS,
        types.FETCH_RELATED_KEYWORDS_FAILURE,
      ],
      callApi : () => request.get(`${API.GET_RELATED_KEYWORDS}?keyword=${keyword}`),
      payload : {keyword : keyword},
      schema : keywordsSchema
    }
  },
  loadPopularKeywords : () => {
    return (dispatch,getState) => {
      if(getState().search.popularKeywords.keys.length > 0){
        return null;
      }
      return dispatch(actions.fetchPopularKeywords())
    }
  },
  fetchPopularKeywords : () => {
    return {
      types : [
        types.FETCH_POPULAR_KEYWORDS_REQUEST,
        types.FETCH_POPULAR_KEYWORDS_SUCCESS,
        types.FETCH_POPULAR_KEYWORDS_FAILURE,
      ],
      callApi : () => request.get(`${API.GET_POPULAR_KEYWORDS}`),
      payload : {},
      schema : keywordsSchema
    }
  },
  loadShopsByKeyword : (keyword) => {
    return (dispatch,getState) => {
      if(getState().search.shopsByKeyword.keys[keyword]){
        return null;
      }
      return dispatch(actions.fetchShopsByKeyword(keyword))
    }
  },
  fetchShopsByKeyword : (keyword) => {
    return {
      types : [
        types.FETCH_SHOPS_BY_KEYWORD_REQUEST,
        types.FETCH_SHOPS_BY_KEYWORD_SUCCESS,
        types.FETCH_SHOPS_BY_KEYWORD_FAILURE,
      ],
      callApi : () => request.get(`${API.GET_SHOPS_BY_KEYWORD}?keyword=${keyword}`),
      payload : {keyword : keyword},
      schema : shopsSchema
    }
  }
}
  

const relatedKeywords = (state = initialState.relatedKeywords, { 
  type , 
  error,
  response,
  keyword
}) => {
  switch (type) {
    case types.FETCH_RELATED_KEYWORDS_REQUEST:
      return {...state,loading : true};
    case types.FETCH_RELATED_KEYWORDS_SUCCESS:
      return {
        ...state,
        keys : {
          ...state.keys,
          [keyword] : response.keys
        },
        loading : false
      };
    case types.FETCH_RELATED_KEYWORDS_FAILURE:
      return {...state,loading : false};
    default:
      return state;
  }
}

const popularKeywords = (state = initialState.popularKeywords, { 
  type , 
  error,
  response
}) => {
  switch (type) {
    case types.FETCH_POPULAR_KEYWORDS_REQUEST:
      return {...state,loading : true
      };
    case types.FETCH_POPULAR_KEYWORDS_SUCCESS:
      return {...state,keys : response.keys,loading : false};
    case types.FETCH_POPULAR_KEYWORDS_FAILURE:
      return {...state,loading : false};
    default:
      return state;
  }
}

const historyKeywords = (state = initialState.historyKeywords, { 
  type , 
  error,
  keyword
}) => {
  switch (type) {
    case types.SET_HISTORY_KEYWORD:
      let data = state.filter((item) => item !== keyword)
      return [keyword,...data]
    case types.CLEAR_HISTORY_KEYWORDS:
      return [];
    default:
      return state;
  }
}

const inputText = (state = initialState.inputText, { 
  type , 
  error,
  text
}) => {
  if(type === types.CHANGE_INPUT_TEXT){
    return text;
  }
  return state;
}

const shopsByKeyword = (state = initialState.shopsByKeyword, { 
  type , 
  error,
  response,
  keyword
}) => {
  switch (type) {
    case types.FETCH_SHOPS_BY_KEYWORD_REQUEST:
      return {...state,loading : true};
    case types.FETCH_SHOPS_BY_KEYWORD_SUCCESS:
      return {
        ...state,
        keys : {
          ...state.keys,
          [keyword] : response.keys
        },
        loading : false
      };
    case types.FETCH_SHOPS_BY_KEYWORD_FAILURE:
      return {...state,loading : false};
    default:
      return state;
  }
}

export default combineReducers({
  relatedKeywords,
  popularKeywords,
  historyKeywords,
  shopsByKeyword,
  inputText
})


//selector
export const getInputText = (state) => {
  return state.search.inputText
}

export const getRelatedKeywordsIdsByText = (state) => {
  return state.search.relatedKeywords.keys;
}

export const getRelatedKeywords = createSelector(
  [
    getRelatedKeywordsIdsByText,
    getAllKeyword,
    getInputText
  ],(relatedKeywordsIdsByText,keywords,text) => {
    const relatedKeywordsIds = relatedKeywordsIdsByText[text];
    if(!relatedKeywordsIds){
      return [];
    }
    return relatedKeywordsIds.map(keywordId => {
      return keywords[keywordId]
    })
  }
)

export const getPopularKeywordsIds = (state) => {
  return state.search.popularKeywords.keys;
}

export const getPopularKeywords = createSelector(
  [
    getPopularKeywordsIds,
    getAllKeyword,
  ],(popularKeywordsIds,keywords) => {
    return popularKeywordsIds.map(keywordId => {
      return keywords[keywordId]
    })
  }
)

export const getHistoryKeywordsIds = (state) => {
  return state.search.historyKeywords;
}

export const getHistoryKeywords = createSelector(
  [
    getHistoryKeywordsIds,
    getAllKeyword,
  ],(historyKeywordsIds,keywords) => {
    return historyKeywordsIds.map(keywordId => {
      return keywords[keywordId]
    })
  }
)

export const getLatestKeywordId = (state) => {
  return state.search.historyKeywords[0];
}

export const getShopIdsByKeywordIds = (state) => {
  return state.search.shopsByKeyword.keys;
}

export const getShopsByKeyword = createSelector(
  [
    getLatestKeywordId,
    getShopIdsByKeywordIds,
    getAllShop
  ],(keywordId,shopIdsByKeywordIds,shops) => {
    const shopIds = shopIdsByKeywordIds[keywordId];
    if(!shopIds){
      return []
    }
    return shopIds.map(shopId => {
      return shops[shopId]
    })
  }
)

export const getCurrentKeyword = (state) => {
  const keywordId = getLatestKeywordId(state);
  if(!keywordId){
    return "";
  }
  return getKeyword(state,keywordId).keyword
}

