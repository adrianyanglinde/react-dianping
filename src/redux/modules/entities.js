import { combineReducers } from 'redux';
import products from './products';
import comments from './comments';
import orders from './orders';
import shops from './shops';
import keywords from './keywords';

export default combineReducers({
  products,
  comments,
  orders,
  shops,
  keywords
})