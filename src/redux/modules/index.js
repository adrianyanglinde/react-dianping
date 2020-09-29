import { combineReducers } from 'redux';
import app from './app';
import login from './login';
import home from './home';
import detail from './detail';
import search from './search';
import entities from './entities';

export default combineReducers({
  app,
  login,
  home,
  detail,
  search,
  entities
})

