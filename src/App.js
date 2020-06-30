import React from 'react';
import Landing from './Landing/Landing';
import Purchase from './Purchase/Purchase';
import Dashboard from './Dashboard/Dashboard';
import Order from './Order/Order';
import PurchaseContextProvider from './Common/Context/PurchaseContextProvider';
import { AuthProvider } from './Common/Context/AuthContext';
import { Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <AuthProvider>
          <Route exact path="/" component={Landing} />
          <PurchaseContextProvider>
            <Route exact path="/services/order-now" component={Purchase} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/order/:id" component={Order} />
          </PurchaseContextProvider>
        </AuthProvider>
      </Switch>
    </div>
  );
}

export default App;