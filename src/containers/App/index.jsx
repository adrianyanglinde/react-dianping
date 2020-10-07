import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import asyncComponent from '../../utils/asyncComponent';
import PrivateRouter from '../PrivateRouter/index';
import './style.scss';

const Home = asyncComponent(() => import('../Home/index'));
const User = asyncComponent(() => import('../User/index'));
const Login = asyncComponent(() => import('../Login/index'));
const Purchase = asyncComponent(() => import('../Purchase/index'));
const Search = asyncComponent(() => import('../Search/index'));
const SearchResult = asyncComponent(() => import('../SearchResult/index'));
const ProductDetail = asyncComponent(() => import('../ProductDetail/index'));

function App() {
  return (
    <div className="App">
      <Router basename="/dianping">
        <Switch>
          <Route path="/detail/:id" component={ProductDetail}/>
          <Route path="/search_result" component={SearchResult}/>
          <Route path="/search" component={Search}/>
          <Route path="/login" component={Login}/>
          <PrivateRouter path="/purchase/:id" component={Purchase}/>
          <PrivateRouter path="/user" component={User}/>
          <Route path="/" component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
