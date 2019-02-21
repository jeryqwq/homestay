import React from "react";
import { BrowserRouter as Router, Route  } from "react-router-dom";
import Index from './views/Index'
import Home from './views/home'
import HomeSearch from './views/HomeSearch'
const AppRouter = () => (
       <Router>
       <span>
          <Route  path="/index/:status(login|register)"  component={Index} />
          <Route path="/"  exact component={Home}/>
          <Route path="/HomeSearch" component={HomeSearch}/>
       </span>
    </Router>  );
  
  export default AppRouter;