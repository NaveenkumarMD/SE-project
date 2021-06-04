import React, { Component, createRef } from 'react'
import {Link,withRouter} from 'react-router-dom'
import firebase from 'firebase'
import CallIcon from '@material-ui/icons/Call';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {SkewLoader,ClimbingBoxLoader, MoonLoader} from 'react-spinners'
class Aboutclub extends Component {
    constructor(props){
        super(props)
        this.imageref=createRef()
        this.state={
            clubname:'',
            data:{},
            color:"rgb(18, 18, 18)",
            blur:'blur()',
            name:'',
            fullname:'',
            about:'',
            events:[],
            secretaries:[],
            issec:false,
            secretariesinfo:[],
            motto:'',
            userdata:{},
            loading:true,
            showall:false

        }
    }
    joinevent=async (eventname)=>{
       // console.log(eventname)
        //console.log(this.state.data.events)
        const unique = (value, index, self) => {
            return self.indexOf(value) === index
          }
        var statedata=this.state.data
        var array=statedata.events
          if(!this.state.userdata){
              toast.error("Contact admin")
          }
        for(var i=0;i<(array).length;i++){
            if(array[i].title==eventname){
             //   console.log(array[i].participants)
                console.log("no is",this.state.userdata.regno)
                var regno=parseInt(this.state.userdata.regno)
                console.log("no final is ",regno)
                console.log(array[i].participants==undefined)
                if(array[i].participants===undefined){
                    return array[i].participants.push(regno)
                }
                if(array[i].participants.includes(parseInt(this.state.userdata.regno))){
                    return toast.error("already applied")
                }
                array[i].participants.push(parseInt(this.state.userdata.regno))

            }
        }

       // console.log(array)
        
        firebase.firestore().collection('clubs').doc(this.props.match.params.name).set( statedata,{merge:true}).then(res=>{
         //   console.log("done.....")
            return toast.success("joined")
        })
    }
    async componentDidMount(){
        var usera=localStorage.getItem('user')
        if(!usera){
          this.props.history.push("/Login")
        }
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
        //console.log(name)
        var dat=JSON.parse(localStorage.getItem('allclubs'))
        //console.log(dat)
        for(var i=0;i<dat.length;i++){
            
            if(dat[i].id==name){
           //     console.log(dat[i].id)
                this.setState({
                    data:dat[i],
                    name:dat[i].id,
                    fullname:dat[i].name,
                    about:dat[i].about,
                    events:dat[i].events,
                    mott:dat[i].motto,
                    secretaries:dat[i].secretaries
                })
                if(dat[i].secretaries){
                firebase.firestore().collection('admins').where('regno','in',dat[i].secretaries).get().then(querysnapshot=>{
                    //console.log("working")
                    var array=[]
                    querysnapshot.forEach(doc=>{
                        console.log(doc.data())
                        array.push(doc.data())
                    })
                    this.setState({
                        secretariesinfo:array,
                        blur:'none',
                    })
                })}
            }
        }
        //console.log("info"+this.state.secretariesinfo)
        var color=sessionStorage.getItem("color")
        //this.setState({color:color})
        setTimeout(()=>{
            this.setState({loading:false})
        },3000)

    }
    render() {
        if(this.state.loading){
            return(
                <div class="wrapper" style={{textAlign:'center'}}>
                <div style={{position:'absolute',top:'50%',left:'50%',textAlign:'center'}}>
                <ClimbingBoxLoader  color="rgb(15,233,188,100)" size={20}/>
                </div>
              </div>
            )
        }
        const secretaries=this.state.secretariesinfo.map(data=>{
            //console.log("secreatries"+data)
            if(!data){
                return true;
            }
            return(
                <div className="about-contact-card card" style={{textAlign:"center",maxWidth:"400px",backgroundColor:this.state.color}}>
                    <img src={data.photo} style={{maxHeight:'300px',maxWidth:'300px'}}/>
                    <h6 style={{marginTop:'10px'}}>{data.name}</h6>
                    <h9><span style={{marginRight:'4px'}}>{data.year}</span>year</h9>
                    <h9>{data.department}</h9>
                    <a  href={"tel:"+data.mobile1} style={{textDecoration:'none',color:'white'}}><span style={{marginRight:'10px',marginTop:'5px'}} ><CallIcon /></span>{data.mobile1}</a>

                </div>
            )
        })
        var posts=()=>{
            return(
                <div></div>
            )
        }
        if(this.state.events){
        posts=this.state.events.map(data=>{
            let date1=new Date(data.date)
            let date2=new Date()
            const diffTime = (date2 - date1);
            console.log(diffTime)
            if(diffTime<0 ){
                if(!this.state.showall){
                    return true;
                }
                
            }
            return(
                <div class="card" style={{maxWidth: '500px',padding:'5px',margin:'20px',backgroundColor:this.state.color}}>
                    <img class="" style={{maxWidth:'490px',height:'auto'}} src={data.url} onClick={()=>window.open(data.url,"_blank")} alt="Image not Found"/>
                    <div class="card-body">
                        <h5 class="card-title">{data.title}</h5>
                        <a href={"tel:"+data.contact} style={{textDecoration:'none',color:'white'}}><p className="card-text">contact:{data.contact}</p></a>
                        
                        
                        

                        <p class="card-text">{data.description}</p>
                        {!this.state.issec && <button href="" class="btn btn-success" onClick={()=>this.joinevent(data.title)} style={{marginRight:'30px'}}>Join</button>
        }
                        <Viewdetails data={`/Aboutclub/${this.state.clubname}/${data.title}`} issec={this.state.issec} secretaries={this.state.secretaries} />
                    </div>
                </div>
            )
        })}
        return (
            <div style={{color:'white'}}>
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
                        <h3>{!this.state.showall?' Upcoming events':'All events'}</h3>
                    </div>
                    <div className="about-events-card">
                       {posts}

                    </div>
                    <div style={{textAlign:'center',fontWeight:'600'}} className="show-all-events-head">
                        <p onClick={()=>this.setState({showall:!this.state.showall})}>{this.state.showall?'Show only upcoming events':'show all events'}</p>
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
   //console.log("this",props)
    const user=JSON.parse(localStorage.getItem('user'))
    //console.log("regno",user.regno)
    if(props.secretaries){
        if(props.issec && props.secretaries.includes(user.regno)){

            return(
                <span style={{textAlign:'right'}}><Link to={{pathname:`${props.data}`
    
                }}style={{color:'white',textAlign:'right'}}>View contestants</Link></span>
    
            )
        }
        return(
            <span></span>
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
                <Link class="nav-link" to="/Aboutus">About  us </Link>
                </li>
                <li class="nav-item active">
                <Link to="/Profile" style={{textDecoration:'none'}} class="nav-link">Profile</Link>
                </li>
                <li class="nav-item active">
                <Link to="/" style={{textDecoration:'none'}} class="nav-link">Home</Link>
                </li>
                <li class="nav-item active">
                <Link to="/Allclubs" class="nav-link">Allclubs</Link>
                </li>

              </ul>
              

              <span class="navbar-text">
                  
                  
                  <Link to="/Createpost" style={{padding:'5px',textDecoration:'none',marginLeft:'5px'}}>Create</Link>
                 
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
                  <Link class="nav-link" to="/Aboutus">About  us </Link>
                </li>

              </ul>

              <span class="navbar-text">
                  <Link to="/Profile">Profile</Link>
                    <Link to="/Allclubs" style={{marginLeft:'10px'}}>Allclubs</Link>
              </span>
            </div>
          </nav>
        )
    }

}

export default withRouter(Aboutclub)
