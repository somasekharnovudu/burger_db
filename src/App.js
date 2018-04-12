import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
class App extends Component {
  
  render () {
    
    return (
      <BrowserRouter>
          <Layout>
            <Route path="/" component={BurgerBuilder} exact/>
            <Route path="/checkout" component={Checkout} exact/>
          </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
