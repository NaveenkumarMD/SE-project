import './App.css';
import React from 'react'
import {Switch, Route,BrowserRouter, Link} from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { Provider } from 'react-redux';
import store from './store'
import {firebaseConfig} from './Firebase/initialize'
import firebase from 'firebase'
import Forgotpass from './Components/Forgotpass';
import Profile from './Components/Profile';
import Aboutclub from './Components/Aboutclub';
import Allclubs from './Components/Allclubs';
import Adminlogin from './Components/Adminlogin'
import Createpost from './Components/Createpost';
import Adminview from './Components/Adminview';
import AddToHomescreen from 'react-add-to-homescreen';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}else {
  firebase.app()
  firebase.analytics()
}
var colors = ['red', 'green', 'blue', 'orange', 'indigo','#877FE0','tomato','violet','purple']
sessionStorage.setItem("color",colors[Math.floor(Math.random() * colors.length)])
const Routing=()=>{
  return(
    <BrowserRouter>
      <Switch>
        
        <Route exact path="/">
          <Login/>
        </Route>
        <Route exact path="/Adminlogin">
          <Adminlogin />
        </Route>
        <Route exact path="/Allclubs">
          <Allclubs/>
        </Route>
        <Route exact path="/Login">
          <Login/>
        </Route>
        <Route exact path="/Signup">
          <Signup/>
        </Route>
        <Route exact path="/Forgotpass">
          <Forgotpass/>
        </Route>
        <Route exact path='/Profile'>
          <Profile/>
        </Route> 
        <Route exact path="/Aboutclub/:name">
          <Aboutclub/>
        </Route>
        <Route exact path="/Createpost">
          <Createpost/>
        </Route>
        <Route exact path="/Aboutclub/:name/:contest">
          <Adminview/>
        </Route>
        
     </Switch>
     </BrowserRouter>
  )
}
class App extends React.Component{
  constructor(props){
    super(props)

  }

   render(){
    return(

      <Provider store={store}>
        
        <Routing/>
      </Provider>
    )
  }
}
const errpage=()=>{
  return(
    <div className="body">
      <div class="noise"></div>
      <div class="overlay"></div>
      <div class="terminal">
        <h1>Error <span class="errorcode">404</span></h1>
        <p class="output">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
        <p class="output">Please try to <Link to="/">go back</Link> or <a href="#2">return to the homepage</a>.</p>
        <p class="output">Good luck.</p>
      </div>
    </div>
  )
}
export default App;
