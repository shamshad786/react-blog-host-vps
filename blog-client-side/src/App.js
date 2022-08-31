import Home from "./Pages/Home/Home";
import TopBar from "./components/TopBar/TopBar";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Settings from "./Pages/Settings/Settings";
import Write from "./Pages/Write/Write";
import Single from './Pages/SinglePage/Single';
import {BrowserRouter,Switch, Route} from "react-router-dom";
import React, { useContext } from "react";
import { Context } from "./context/Context";




function App() {

   
 const {user} =  useContext(Context)

  console.log(user)

  return (
    
  <BrowserRouter>
      <TopBar/>

      <Switch>

      <Route exact path="/" component={Home}/>

      <Route path="/write" component={user ? Write : Register}/>

      <Route path="/post/:postId" component={Single}/>

      <Route path="/settings" component={user ? Settings : Register}/>

      <Route path="/register" component={user ? Home : Register}/>
      
      <Route path="/login" component={user ? Home : Login}/>

      </Switch>
     
     
  </BrowserRouter>
    
  );
  
}

export default App;
