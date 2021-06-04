import './App.css';
import React, { useEffect ,} from 'react'
import {Switch, Route,BrowserRouter, Link,useHistory} from 'react-router-dom'
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
import Home from './Components/Home'
import Aboutus from './Components/Aboutus'


setTimeout(() => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }else {
    firebase.app()
    firebase.analytics()
  } 
}, 1000);
var colors = ['red', 'green', 'blue', 'orange', 'indigo','#877FE0','tomato','violet','purple']
sessionStorage.setItem("color",colors[Math.floor(Math.random() * colors.length)])
const Routing=()=>{
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home/>
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
        <Route exact path="/Aboutus">
          <Aboutus/>
        </Route>
        <Route exact path="/Err">
          <Errpage/>
        </Route>
        <Route component={Errpage}/>
     </Switch>
     </BrowserRouter>
  )
}
class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      isloading:false
    }
  }
  componentDidMount=async()=>{

    firebase.firestore().collection('clubs').get().then(async doc=>{
      var array=[]
      await doc.forEach(dat=>{
     
        array.push(dat.data())
      })
      var user=localStorage.getItem('user')
      if(user){
        localStorage.setItem('allclubs',JSON.stringify(array))
      }
      
      
    })
  }
   render(){
     if(!this.state.isloading){
      return(
        <Provider store={store}>
          <Routing/>
        </Provider>
      )

     }
     else{
      return(
        <div className="body">
        <div className="noise"></div>
        <div className="overlay"></div>
        <div className="terminal">
          <h1><span className="errorcode">Loading....</span></h1>

        </div>
      </div>
      )
    }

  }
}
const Errpage=()=>{
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
