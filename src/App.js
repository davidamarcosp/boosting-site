import React from 'react';
import Landing from './Landing/Landing';
import Purchase1 from './Purchase/Purchase1';
import { Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/boosting/purchase" component={Purchase1} />
      </Switch>
    </div>
  );
}

export default App;
