import { combineReducers } from 'redux';
import app from './app';
import home from './home';
import detail from './detail';
import entities from './entities';

export default combineReducers({
  app,
  home,
  detail,
  entities
})

