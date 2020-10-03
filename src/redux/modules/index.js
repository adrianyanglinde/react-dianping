import { combineReducers } from 'redux';
import app from './app';
import login from './login';
import home from './home';
import user from './user';
import detail from './detail';
import search from './search';
import perchase from './perchase';
import entities from './entities';

export default combineReducers({
  app,
  login,
  home,
  user,
  detail,
  search,
  perchase,
  entities
})

