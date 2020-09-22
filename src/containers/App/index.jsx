import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../Home/index';
import ProductDetail from '../ProductDetail/index';
import './style.scss';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Home}/>
          <Route path="/detail:id" component={ProductDetail}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
