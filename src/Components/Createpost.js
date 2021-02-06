import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from 'firebase'
class Createpost extends Component {
    constructor(props){
        super(props)
        
        this.state={
            color:'',
            eventname:'',
            time:'',
            date:'',
            venue:'',
            chiefguest:'',
            description:'',
            contact:'',
            club:''
        }
    }
    componentWillMount(){
        var color=sessionStorage.getItem("color")
        this.setState({color:color})
    }
    async componentDidMount(){
       var issec=await JSON.parse(localStorage.getItem('user'))
       if(!issec.secretaryof){
        return this.props.history.push("/Error")
       }
       else{
        this.setState({club:issec.secretaryof})
       }
    }
    inputhandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    addevent=(e)=>{
        console.log("rin")
         e.preventDefault()
       // if(!this.state.eventname){
       //     toast.error("Please enter event name")
       // }
       // if(!this.state.date || this.state.time){
       //     toast.error("Please mention time and date")
       // }
       // if(!this.state.venue){
       //     toast.error("Please mention venue")
       // }
        const dataref=firebase.firestore().collection('clubs').doc(this.state.club)
        dataref.update({
            events: firebase.firestore.FieldValue.arrayUnion({
                eventname:this.state.eventname,
                time:this.state.time,
                date:firebase.firestore.Timestamp.fromDate(new Date(this.state.date)),
                chiefguest:this.state.chiefguest,
                venue:this.state.venue,
                url:'hjfewjwfgreg',
                description:this.state.description,
                contact:this.state.contact
            })
        },{merge:true})

    }
    render() {
        return (
            <div>
                <ToastContainer hideProgressBar/>
                <Navbar />
              <div className="card create-post-card" style={{padding:'50px',marginTop:'px',backgroundColor:'black',color:'white'}}>
                  <h1 style={{textAlign:'center',marginBottom:'20px'}}>Add event</h1>
                  <div>
                  <form action="">
                    <div class="form-group">
                        <label for="text">Event name:</label>
                        <input type="name" class="form-control" id="text" name="eventname" onChange={this.inputhandler} value={this.state.eventname}/>
                    </div>
                    <div class="form-group">
                        <label for="text">Time:</label>
                        <input type="time" class="form-control" id="text" name="time" value={this.state.time} onChange={this.inputhandler} />
                    </div>
                    <div class="form-group">
                        <label for="text">Date:</label>
                        <input type="date" class="form-control" id="text" name="date" value={this.state.date} onChange={this.inputhandler} />
                    </div>
                    <div class="form-group">
                        <label for="text">Venue:</label>
                        <input type="text" class="form-control" id="text" name="venue" value={this.state.venue} onChange={this.inputhandler} />
                    </div>
                    <div class="form-group">
                        <label for="text">Chief guest:</label>
                        <input type="text" class="form-control" id="text" name="chiefguest" value={this.state.chiefguest} onChange={this.inputhandler} />
                    </div>
                    <div class="form-group">
                        <label for="text">Description:</label>
                        <textarea style={{minHeight:'100px'}} type="text" class="form-control" id="text" name="description" value={this.state.description} onChange={this,this.inputhandler} />
                    </div>
                    <div class="form-group">
                        <label for="text">Organizers contact number:</label>
                        <input type="text" class="form-control" id="text" name="contact" value={this.state.contact} onChange={this.inputhandler} />
                    </div>
                    <div class="form-group">
                        <label for="text">Poster:</label>
                        <input type="file" class="form-control" id="text" />
                    </div>

                    <div style={{textAlign:'center'}}> 
                        <button type="submit" style={{margin:'30px',backgroundColor:this.state.color,color:'white'}} class="btn btn-default" onClick={this.addevent}>Submit</button>
                    </div>
                    </form>
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
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
      
          </ul>
          <span class="navbar-text">
              <Link to="/Aboutclub">About</Link>
           
          </span>
        </div>
      </nav>
    )
}
export default withRouter(Createpost)