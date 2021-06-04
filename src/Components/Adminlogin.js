import React from 'react'
import { connect } from 'react-redux';
import { Link ,withRouter} from 'react-router-dom'
import { compose } from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types'
import {postingadminlogindata} from '../Actions/Actions'
import ContactMailIcon from '@material-ui/icons/ContactMail';
import {SyncLoader} from 'react-spinners'
import { css } from "@emotion/core";
import firebase from 'firebase'
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const mapStateToProps=state=>({
    user:state.user.userdetails
})
class Adminlogin extends React.Component{
    constructor(props){
        super(props);

        this.state={
            passwordview:true,
            passwordtype:'password',
            mail:'',
            password:'',
            loading:false,
            blur:'none',
            color:'',
        }

    }
    componentDidMount(){
        var color=sessionStorage.getItem("color")
        this.setState({color:color})
    }
    async componentWillReceiveProps(nextprops){
        this.setState({loading:false,blur:'none'})
        console.log(nextprops.user.secretaryof)
        if(nextprops.user){
            if(nextprops.user.message){
              return toast.error(nextprops.user.message)
            }
            await firebase.firestore().collection('clubs').get().then(async doc=>{
                var array=[]
                await doc.forEach(dat=>{
               
                  array.push(dat.data())
                })
                var user=localStorage.getItem('user')
                if(user){
                  localStorage.setItem('allclubs',JSON.stringify(array))
                }
                
                
              })
        this.props.history.push({
            pathname:`/Aboutclub/${nextprops.user.secretaryof}`,

        })

        }

    }
    post=()=>{
        if(this.state.mail.indexOf("cit.edu.in")==-1){
            return toast.warning("Invalid mail"  )
        }
        if(this.state.password.length<7){
           return toast.warning("Password must have 7 or more characters")
        }
        const postdata={
            mail:this.state.mail,
            password:this.state.password
        }
        this.setState({
            loading:true,
            blur:'blur(15px)'
        })
        this.props.postingadminlogindata(postdata)
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
      <Link class="nav-link" to="/Aboutus">About  us </Link>
      </li>

    </ul>
    <span class="navbar-text">
        <Link to="/Signup">Signup</Link>
     
    </span>
  </div>
</nav>
           <div className="bg-imae" style={{justifyContent:'center'}}>

               <ToastContainer hideProgressBar/>
               <div style={{filter:this.state.blur}}>
               <div className="card signup-card" style={{top:'50px'}}>
                   <div style={{textAlign:'center',color:'white'}}><img  style={{height:'120px',width:"120px",marginBottom:'20px',margin:'30px'}} src="https://upload.wikimedia.org/wikipedia/en/1/17/Coimbatore_Institute_of_Technology_logo.png"/>
                   </div>
                   <div style={{textAlign:'center',color:'white',marginBottom:'30px'}}>
                       <h1 className="head">Secretaries</h1> </div>
                       <div class="input-container">
                        <i class="fa fa-envelope icon" style={{background:this.state.color}}></i>
                        <input class="input-field" value={this.state.mail} type="text" placeholder="Email" name="email" onChange={(e)=>{
                            this.setState({mail:e.target.value})
                        }}/>
                    </div>                      <div class="input-container">
                        <i class="fa fa-key icon" style={{background:this.state.color}}></i>
                        <input class="input-field" type={this.state.passwordtype} placeholder="Password" name="psw" onChange={(e)=>{
                            this.setState({password:e.target.value})
                        }}/>
                    </div>

                    <div className="ckeckbox" style={{color:'blue',marginLeft:'20px'}}>
                       
                <input type="checkbox" id="box-input" class="form-check-input" value={this.state.password}  style={{marginRight:'10px'}}onClick={()=>{
                    this.setState({passwordview:!this.state.passwordview})
                    if(this.state.passwordview){
                        this.setState({passwordtype:"text"})
                    }
                    else{
                        this.setState({passwordtype:"password"})
                    }
                }} /><></><div style={{color:this.state.color}}>Show Password</div></div>
                     <div style={{textAlign:'center',color:'white',marginBottom:'40px',fontSize:'20px'}}>                   
                     <button className=" btn button-main" style={{backgroundColor:this.state.color,marginTop:'50px',width:'80%',color:'white'}} onClick={()=>this.post()}>Log in</button>
              
                   </div>
                   <div style={{textAlign:'center',color:'white'}}>Don't have an account ?<Link style={{color:this.state.color}} to="/Signup">Sign up</Link></div>
                   <div style={{textAlign:'center',color:this.state.color}}><Link style={{color:this.state.color}} to="/Forgotpass">Forgot password</Link></div>
            </div></div>
           </div>
           </div>
        )
    }
}
Adminlogin.proptype={
    postingadminlogindata:PropTypes.func.isRequired

}
export default compose(
    withRouter,
    connect(mapStateToProps,{postingadminlogindata})
)(Adminlogin)