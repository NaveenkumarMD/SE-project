import React, { Component, createRef } from 'react'
import {Link,withRouter} from 'react-router-dom'
import firebase from 'firebase'
import CallIcon from '@material-ui/icons/Call';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Aboutclub extends Component {
    constructor(props){
        super(props)
        this.imageref=createRef()
        this.state={
            clubname:'',
            data:{},
            color:"",
            blur:'blur(30px)',
            name:'',
            fullname:'',
            about:'',
            events:[],
            secretaries:[],
            issec:false,
            secretariesinfo:[],
            motto:'',
            userdata:{},
         

        }
    }
    joinevent=async (eventname)=>{
        console.log(eventname)
        console.log(this.state.data.events)
        const unique = (value, index, self) => {
            return self.indexOf(value) === index
          }
        var statedata=this.state.data
        var array=statedata.events

        for(var i=0;i<(array).length;i++){
            if(array[i].title==eventname){
                console.log(array[i].participants)
                if(array[i].participants.includes(parseInt(this.state.userdata.regno))){
                    return toast.error("already applied")
                }
                array[i].participants.push(parseInt(this.state.userdata.regno))

            }
        }

        console.log(array)
        
        firebase.firestore().collection('clubs').doc(this.props.match.params.name).set( statedata,{merge:true}).then(res=>{
            console.log("done.....")
        })
    }
    async componentDidMount(){
        const data=await JSON.parse(localStorage.getItem('user'))

        if(data.secretaryof){
            this.setState({
                issec:true,
                userdata:data
            })
        }
        else{
            this.setState({
                issec:false,
                userdata:data
            })
        }
        const name=this.props.match.params.name
        this.setState({clubname:name})
        console.log(name)
        firebase.firestore().collection('clubs').doc(name).onSnapshot(doc=>{

            this.setState({
                data:doc.data(),
                name:name,
                fullname:doc.data().name,
                about:doc.data().about,
                events:doc.data().events,
                motto:doc.data().motto,
                secretaries:doc.data().secretaries
            })
            firebase.firestore().collection('admins').where('regno','in',doc.data().secretaries).get().then(querysnapshot=>{
                console.log("working")
                var array=[]
                querysnapshot.forEach(doc=>{
                    console.log(doc.data())
                    array.push(doc.data())
                })
                this.setState({
                    secretariesinfo:array,
                    blur:'none',
                })
            })
            console.log("working")

            this.imageref.current.focus()
        })
        var color=sessionStorage.getItem("color")
        this.setState({color:color})

    }
    render() {

        const secretaries=this.state.secretariesinfo.map(data=>{

            return(
                <div className="about-contact-card card" style={{textAlign:"center",maxWidth:"400px",backgroundColor:this.state.color}}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYPUECHsyQnTSk0yGIXtNF7jz7lD5DzKNyfg&usqp=CAU" style={{maxHeight:'auto',maxWidth:'400px'}}/>
                    <h6>{data.name}</h6>
                    <h9><span style={{marginRight:'4px'}}>{data.year}</span>year</h9>
                    <h9>{data.department}</h9>
                    <a href="tel:8870499146" style={{textDecoration:'none',color:'white'}}><span style={{marginRight:'10px',marginTop:'5px'}} ><CallIcon /></span>{data.mobile1}</a>

                </div>
            )
        })
        const posts=this.state.events.map(data=>{
          console.log("clubname",this.state.clubname)
          console.log(data.title)
            return(
                <div class="card" style={{maxWidth: '500px',padding:'5px',margin:'20px',backgroundColor:this.state.color}}>
                    <img class="" style={{maxWidth:'490px',height:'auto'}} src="https://drscdn.500px.org/photo/61785897/q%3D80_m%3D2000/v2?sig=91e837bb4c1d7fb7837b6e51400c53491b55ef52aad127f36ae7081377263a8b"/>
                    <div class="card-body">
                        <h5 class="card-title">{data.title}</h5>
                        <p class="card-text">{data.Description}</p>
                        <button href="" class="btn btn-success" onClick={()=>this.joinevent(data.title)} style={{marginRight:'30px'}}>Join</button>
                        <Viewdetails data={`/Aboutclub/${this.state.clubname}/${data.title}`} issec={this.state.issec}/>
                    </div>
                </div>
            )
        })
        return (
            <div style={{color:"white",filter:this.state.blur}}>
                <ToastContainer/>
                <Navbar  data={this.state.issec}/>
                <div className="top-bar" style={{backgroundColor:this.state.color}}>
                    <div>
                        <div style={{textAlign:"center"}}>
                        <img  ref={this.imageref} style={{height:'120px',width:"120px",marginBottom:'20px',marginTop:'10px',margin:'30px'}} src="https://upload.wikimedia.org/wikipedia/en/1/17/Coimbatore_Institute_of_Technology_logo.png"/>

                        </div>

                    </div>
                    <div style={{maxWidth:'700px'}}>
                        <h1>{this.state.name}</h1>
                        <h3>{this.state.fullname}</h3>
                        <div>
                            <h3>About</h3>
                            <p>{this.state.about}</p>
                        </div>
                    </div>
                </div>
                <div>
                </div>
                <div className="about-content">
                    <div className="about-content-topic">
                        <h3>Upcoming events</h3>
                    </div>
                    <div className="about-events-card">
                       {posts}

                    </div>
                    <div className="about-content-topic">
                        <h3>Secretaries</h3>
                    </div>
                    <div className="about-contact-content">
                        {secretaries}
                    </div>
                    <div className="about-content-topic">
                        <h3>Motto</h3>
                    </div>
                    <div style={{textAlign:"center",margin:"30px"}}>
                        <h5>{this.state.motto}</h5>

                    </div>

                </div>
            </div>
        )
    }
}
const Viewdetails=(props)=>{
    if(props.issec){

        return(
            <span style={{textAlign:'right'}}><Link to={{pathname:`${props.data}`

            }}style={{color:'white',textAlign:'right'}}>View contestants</Link></span>

        )
    }
    return(
        <span></span>
    )
}
const Navbar=(props)=>{
    if(props.data){
        return(
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
                  <Link to="/Profile" style={{textDecoration:'none'}}>Profile</Link>
                  <Link to="/Createpost" style={{padding:'5px',textDecoration:'none',marginLeft:'5px'}}>Create</Link>
                  <Link to="/Allclubs" style={{padding:'5px',textDecoration:'none',marginLeft:'5px'}}>Allclubs</Link>
              </span>
            </div>
          </nav>
        )
    }
    else{
        return(
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
                  <Link to="/Profile">Profile</Link>

              </span>
            </div>
          </nav>
        )
    }

}

export default withRouter(Aboutclub)
