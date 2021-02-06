import React from 'react'
import { connect } from 'react-redux';
import { Link ,withRouter} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { compose } from 'redux';

import firebase from 'firebase'

class Signup extends React.Component{
  constructor(props){
    super(props);
    this.state={
      mail:'',
      password:'',
      name:'',
      mobile:'',
      year:'',
      color:''
    }
  }
  componentDidMount(){
    var color=sessionStorage.getItem("color")
    this.setState({color:color})
}
  post=()=>{
    if(this.state.mail.indexOf("cit.edu.in")==-1){
      return toast.warning(" only College mail id is allowed"  )
    }
    if ( parseInt(this.state.year)>4){
      return toast.warning("Enter valid year of studying")
    }
    if((this.state.mobile).length!=10){
      return toast.warning("Enter correct mobile number")
    }
    if(this.state.password.length<7){
      return toast.warning("Password must have 7 or more characters")
    }
    if(!this.state.name){
      return toast.warning("Enter a valid Name")
    }
      const postdata={
      mail:this.state.mail,
      password:this.state.password,
      name:this.state.name,
      mobile:this.state.mobile,
      year:this.state.year
    }
    this.postingdata(postdata)
  }
  postingdata=async(postdata)=>{
    await firebase.auth().createUserWithEmailAndPassword(postdata.mail,postdata.password).then(async data=>{
      const user=firebase.auth().currentUser
      user.sendEmailVerification().then(function() {
        toast.success("Check your mail for verifivation link")
      }).catch(function(error) {
        toast.error(error.message)
      });

      await firebase.firestore().collection('users').doc(user.uid).set({
          name:postdata.name,
          mobile:postdata.mobile,
          year:postdata.year,
          mail:postdata.mail,
          department:postdata.mail.substring(7,10),
          regno:postdata.mail.substring(0,7),
      }).then(res=>{
        toast.success("Signup successfull")
          console.log(res.data())

          localStorage.setItem("user",res.data())
      })
      
      

  
  }).catch(err=>{
    toast.error(err.message)
  })
  }
    render(){
        return(
          <div>
              <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style={{backgroundColor:'black'}}>
  <a class="navbar-brand" href="#" style={{color:'white'}}>Clubs</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>

    </ul>
    <span class="navbar-text">
        <Link to="/Login">Login</Link>
     
    </span>
  </div>
</nav>
           <div className="bg-mage1" style={{justifyContent:'center'}}>
             <ToastContainer hideProgressBar={true} />
               <div className="card signup-card" >
                   <div style={{textAlign:'center',color:'white'}}><img  style={{height:'120px',width:"120px",marginBottom:'20px',marginTop:'10px',margin:'30px'}} src="https://upload.wikimedia.org/wikipedia/en/1/17/Coimbatore_Institute_of_Technology_logo.png"/>
                   </div>
                   <div style={{textAlign:'center',color:'white',marginBottom:'30px'}}>
                       <h1 className="head">Sign up</h1> </div>
                       <div class="input-container">
                        <i style={{background:this.state.color}} class="fa fa-user icon"></i>
                        <input class="input-field" type="text" value={this.state.name} placeholder="Username" name="name" onChange={(e)=>{
                          this.setState({
                            name:e.target.value
                          })
                        }}/>
                      </div> 
                                        <div class="input-container">
                        <i style={{background:this.state.color}} class="fa fa-envelope icon"></i>
                        <input class="input-field" type="text" value={this.state.mail} placeholder="Email" name="mail"  onChange={(e)=>{
                          this.setState({
                            mail:e.target.value
                          })
                        }}/>
                      </div> 
                      <div class="input-container">
                        <i style={{background:this.state.color}} class="fa fa-mobile icon"></i>
                        <input class="input-field" type="text"  value={this.state.mobile} placeholder="Number" name="mobile"  onChange={(e)=>{
                          this.setState({
                            mobile:e.target.value
                          })
                        }}/>
                      </div>
                      <div class="input-container">
                        <i style={{background:this.state.color}} class="fa fa-calendar icon"></i>
                        <input class="input-field" type="text" placeholder="Year of study" value={this.state.year} name="year" onChange={(e)=>{
                          this.setState({
                            year:e.target.value
                          })
                        }}/>
                      </div>
                                        <div class="input-container">
                        <i style={{background:this.state.color}} class="fa fa-key icon"></i>
                        <input class="input-field" type="password" placeholder="Password" name="password" value={this.state.password}  onChange={(e)=>{
                          this.setState({
                            password:e.target.value
                          })
                        }}/>
                      </div>
                     <div style={{textAlign:'center',color:'white',marginBottom:'40px',fontSize:'20px'}}>                   
                     <button className=" btn  button-main" style={{backgroundColor:this.state.color,marginTop:'50px',width:'80%',color:'white'}} onClick={()=>this.post()}>Sign up</button>
              
                   </div>
                   <div style={{textAlign:'center',color:'white'}}>Already have an account ?<Link style={{color:this.state.color}}to="/Login">Log in</Link></div>

 </div>
           </div>
           </div>

        )
    }
}
export default compose(
  withRouter,
  
)(Signup)