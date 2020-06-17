import React from 'react';
import Landing from './Landing/Landing';
import Purchase from './Purchase/Purchase';
import { PurchaseProvider } from './Common/Context/PurchaseContext';
import { AuthProvider } from './Common/Context/AuthContext';
import { Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <AuthProvider>
          <Route exact path="/" component={Landing} />
          <PurchaseProvider>
            <Route exact path="/services/order-now" component={Purchase} />
          </PurchaseProvider>
        </AuthProvider>
      </Switch>
    </div>
  );
}

export default App;
