import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import {Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import Create from '@material-ui/icons/Create'
import CallIcon from '@material-ui/icons/Call';
import BarChartIcon from '@material-ui/icons/BarChart';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import firebase from 'firebase'
import {ClimbingBoxLoader} from 'react-spinners'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
            name:'',
            mobile:'',
            year:'',
            mail:'',
            regno:'',
            department:'',
            clubs_joined:{},
            Clubs_joined:[],
            issec:false,
            edit:false,
            image:'',
            collection_name:'',
            photo:'',
            loading:true
        }
    }
    handleimage=(e)=>{
        console.log(e.target.files[0])
        this.setState({
            image:e.target.files[0]
        })
    }
    uploadprofile=()=>{
        if(this.state.image==undefined){
            return alert("Image not found")
        }
        console.log('uploadfing image...')

        const storage=firebase.storage()
       const uploadtask=storage.ref(`/profiles/${this.state.regno}`).put(this.state.image)      
       uploadtask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    (snapshot) => {
        this.setState({loading:true})
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      uploadtask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        firebase.firestore().collection(`${this.state.collection_name}`).where('regno','==',1905097).get().then(query=>{
            query.forEach(doc=>{
                console.log(doc.id)
                firebase.firestore().collection(`${this.state.collection_name}`).doc(doc.id).update({
                    photo:downloadURL
                },{merge:true}).then(()=>{
                    console.log("fuck")
                    toast.success("Updated..")
                    window.location.reload()
                }
                )
            })
        })

        
      });
    }
  );

    }
    async componentDidMount (){
        setTimeout(()=>{
            this.setState({loading:false})
        },3000)
        const data=await JSON.parse(localStorage.getItem('user'))
        if(!data){
            return this.props.history.push("/Login")
        }
        console.log(data)
        if(data.secretaryof){
            return this.setState({
                name:data.name,
                mobile:data.mobile1,
                mail:data.mail,
                year:data.year,
                regno:data.regno,
                department:data.department,
                issec:true,
                collection_name:'admins',
                photo:data.photo
            })
        }
        this.setState((prevstate,action)=>{
            return({
                name:data.name,
                mobile:data.mobile,
                mail:data.mail,
                year:data.year,
                regno:data.regno,
                department:data.department,
                clubs_joined:data.clubs_joined,
                Clubs_joined:data.Clubs_joined,
                collection_name:'users',
                photo:data.photo
            })
        })

    }
    render() {
        if(this.state.loading){
            return(
                <div class="wrapper" style={{textAlign:'center'}}>
                     <ToastContainer hideProgressBar/>
                <div style={{position:'absolute',top:'50%',left:'50%',textAlign:'center'}}>
                <ClimbingBoxLoader  color="rgb(15,233,188,100)" size={20}/>
                </div>
              </div>
            )
        }
        const clubs=this.state.Clubs_joined.map(data=>{
            console.log(data)
            if(data){
                return(
                    <li>
                        <h6>{data}</h6>
                    </li>
                )
            }

        })
        
        return (
            <div>
  
                <Navbar />

                <ToastContainer hideProgressBar/>
                <div className="profile-card card" style={{backgroundColor:'rgb(18, 18, 18)',color:"white",marginTop:'70px',cursor:'pointer'}}>
                <div style={{textAlign:'center',fontSize:'35px',paddingBottom:'30px',fontWeight:400}}>Personal info</div>
                    <div style={{display:"flex",justifyContent:'space-around'}}>
                        
                        <div>
                            <img src={this.state.photo} style={{height:'90px',width:'90px',borderRadius:'90px'}}/>
                            <div onClick={()=>this.setState({edit:!this.state.edit})} style={{marginLeft:'22px',marginTop:'20px',fontSize:'20px',fontWeight:'20px',cursor:'pointer'}} className="Edit-button">Edit<span style={{marginLeft:'6px'}}><Create size={8}/></span></div>
                        </div>

                        <div style={{marginTop:'20px'}}>
                            <h6>{this.state.name}</h6>
                            <h6>{this.state.regno}</h6>
                        </div>
                    </div>
                    {this.state.edit &&  <div> <div class="form-group" style={{marginTop:'30px'}}>
                        <label for="text">Upload Image</label>
                        <input type="file" class="form-control" id="text" onChange={this.handleimage}  />
                    </div>
                    <button style={{backgroundColor:'black',color:'white',fontWeight:'400',border:'2px solid black',fontSize:'18px',maxWidth:'600px'}} className="btn" onClick={()=>this.uploadprofile()}>Upload</button></div>}
                    <div style={{marginTop:"50px"}}>
                    <div style={{display:"flex",padding:"20px",cursor:'pointer'}}>
                        <ContactMailIcon/>
                        <h6 style={{marginLeft:"10px"}}>{this.state.mail}</h6>
                    </div>
                    <div style={{display:"flex",padding:"20px",cursor:'pointer'}}>
                        <CallIcon/>
                        <h6 style={{marginLeft:"10px"}}>{this.state.mobile}</h6>
                    </div>
                   
                    <div style={{display:"flex",padding:"20px",cursor:'pointer'}}>
                        <BarChartIcon/>
                        <h6 style={{marginLeft:"10px"}}>{this.state.department}</h6>
                    </div>
                    <div style={{display:"flex",padding:"20px",cursor:'pointer'}}>
                        <DateRangeIcon />
                        <h6 style={{marginLeft:"10px"}}>
                            {this.state.year}
                        </h6>
                    </div>
                    <div>
                    <div style={{padding:"20px"}}>
                        <h6>Clubs Enrolled</h6>
                    </div>

                        <ul style={{marginLeft:'10px'}}>
                            {clubs}

                        </ul>

                    </div>

                    <div style={{padding:"20px"}}>
                        
                        <button type="button" class="btn logout-button" style={{color:'white',fontSize:'13',padding:'7px'}} data-toggle="modal" data-target="#exampleModal">
                            Logout
                            </button>
                    </div>
                                        <div>
                        <h8>Note:You cannot edit these things</h8>
                    </div>



<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel" style={{color:'black'}}>Logout</h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" style={{color:'black',fontWeight:'bolder'}}>
        Are you sure?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger" onClick={()=>{
                            localStorage.clear()
                            this.props.history.push("/Login")
                            window.location.reload()
                        }}>Log out</button>
      </div>
    </div>
  </div>
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
        <a class="navbar-brand" href="#" style={{color:'white'}}>Profile</a>
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
              <Link to="/Allclubs">Allclubs</Link>
              
           
          </span>
        </div>
      </nav>
    )
}
export default compose(
    withRouter
)(Profile)
