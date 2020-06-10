import React from 'react';
import Landing from './Landing/Landing';
import Purchase from './Purchase/Purchase';
import { Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/services/order-now" component={Purchase} />
      </Switch>
    </div>
  );
}

export default App;
