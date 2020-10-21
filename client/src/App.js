import React, { useRef, useEffect } from 'react';
import { useLocation, Switch, } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';
//import { getToken, removeUserSession, setUserSession } from './utils/Common';
//import axios from 'axios';
 

// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views 
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';
import Dashboard from './views/Dashboard';
import verify from './views/Verify';

//Utilities
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import Index from './dashboard/index'




// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};




const App = () => {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <PublicRoute path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Index} />
          <PublicRoute exact path="/signup" component={Signup} />
          <AppRoute exact path="/verify" component={verify} />
        </Switch>
      )} />
  );
}

export default App;