import React from "react";
import { BrowserRouter as Router, Route  } from "react-router-dom";
import Index from './views/Index'
import Home from './views/home'
const AppRouter = () => (
       <Router>
       <span>
          <Route  path="/index/:status(login|register)"  component={Index} />
          <Route path="/"  exact component={Home}/>
       </span>
    </Router>  );
  
  export default AppRouter;