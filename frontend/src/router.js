import React from "react";
import { BrowserRouter as Router, Route  } from "react-router-dom";
import Index from './views/Index'
import Home from './views/home'
import HomeSearch from './views/HomeSearch'
import StorySearch from './views/StorySearch'
import MyStatus from './views/MyStatus'
import Admin from './views/Admin'
const AppRouter = () => (
       <Router>
       <span>
          <Route  path="/index/:status(login|register)"  component={Index} />
          <Route path="/"  exact component={Home}/>
          <Route path="/HomeSearch" component={HomeSearch}/>
          <Route path="/StorySearch" component={StorySearch}/>
          <Route path="/MyStatus" component={MyStatus}/>
          <Route path="/Admin" component={Admin}/>
       </span>
    </Router>  );
  
  export default AppRouter;