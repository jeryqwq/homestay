import React from "react";
import { BrowserRouter as Router, Route  } from "react-router-dom";
import Index from './views/Index'
import Home from './views/home'
import HomeSearch from './views/HomeSearch'
import StorySearch from './views/StorySearch'
import MyStatus from './views/MyStatus'
import Admin from './views/Admin'
import HomeStay from './views/HomeStay'
import WhiteStory from './views/WriteStory'
import Story from './views/Story'
const AppRouter = () => (
       <Router>
       <span>
          <Route  path="/index/:status(login|register)"  component={Index} />
          <Route path="/"  exact component={Home}/>
          <Route path="/HomeSearch" component={HomeSearch}/>
          <Route path="/StorySearch" component={StorySearch}/>
          <Route path="/MyStatus" component={MyStatus}/>
          <Route path="/Admin" component={Admin}/>
          <Route path="/HomeStay/:id" component={HomeStay}/>
          <Route path="/writeStory/:id" component={WhiteStory}/>
          <Route path="/story/:id" component={Story}/>
       </span>
    </Router>  );
  
  export default AppRouter;