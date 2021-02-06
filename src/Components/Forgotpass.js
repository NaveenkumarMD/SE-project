import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from 'firebase'
import { Link ,withRouter} from 'react-router-dom'
class Forgotpass extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mail:'',
            color:''
        }
    }
    componentDidMount(){
        var color=sessionStorage.getItem("color")
        this.setState({color:color})
    }
    post=()=>{
        if(this.state.mail.indexOf("cit.edu.in")==-1){
            return toast.warning("Invalid mail"  )
        }
        firebase.auth().sendPasswordResetEmail(this.state.mail).then(()=>{
            toast.success("Password reset mail sent")
        }).catch(err=>{
            toast.error(err.message)
        })

    }
    render(){
        return(
            <div>
                <Navbar/>
            <div className="bg-imag" style={{justifyContent:'center'}}>
               <ToastContainer hideProgressBar/>
               <div className="card signup-card" style={{top:'50px'}}>
                   <div style={{textAlign:'center',color:'white'}}><img  style={{height:'120px',width:"120px",marginBottom:'20px',margin:'30px'}} src="https://upload.wikimedia.org/wikipedia/en/1/17/Coimbatore_Institute_of_Technology_logo.png"/>
                   </div>
                   <div style={{textAlign:'center',color:'white',marginBottom:'30px'}}>
                       <h1 className="head">Forgot password</h1> </div>
                       <div class="input-container">
                        <i style={{background:this.state.color}}class="fa fa-envelope icon"></i>
                        <input class="input-field" value={this.state.mail} type="text" placeholder="Email" name="email" onChange={(e)=>{
                            this.setState({mail:e.target.value})
                        }}/>
                    </div>                    

 
                     <div style={{textAlign:'center',color:'white',marginBottom:'40px',fontSize:'20px'}}>                   
                     <button className=" btn button-main" style={{backgroundColor:this.state.color,marginTop:'50px',width:'80%',color:'white'}} onClick={()=>this.post()}>Submit</button>
              
                   </div>

                </div>
           </div>
           </div>
        )
    }
}
const Navbar=()=>{
    return(
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style={{backgroundColor:'black'}}>
        <a class="navbar-brand" href="#" style={{color:'white'}}>Clubs</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
  
      
          </ul>

        </div>
      </nav>
    )
}
export default Forgotpass