import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../Home/index';
import User from '../User/index';
import Login from '../Login/index';
import Search from '../Search/index';
import SearchResult from '../SearchResult/index';
import ProductDetail from '../ProductDetail/index';
import PrivateRouter from '../PrivateRouter/index';
import './style.scss';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/detail/:id" component={ProductDetail}/>
          <Route path="/search_result" component={SearchResult}/>
          <Route path="/search" component={Search}/>
          <Route path="/login" component={Login}/>
          <PrivateRouter path="/user" component={User}/>
          <Route path="/" component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
