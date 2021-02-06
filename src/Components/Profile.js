import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import {Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import CallIcon from '@material-ui/icons/Call';
import BarChartIcon from '@material-ui/icons/BarChart';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ContactMailIcon from '@material-ui/icons/ContactMail';


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
            Clubs_joined:['none']
        }
    }

    async componentDidMount (){
        const data=await JSON.parse(localStorage.getItem('user'))
        if(!data){
            return this.props.history.push("/Login")
        }
        console.log(data.Clubs_joined)
        this.setState((prevstate,action)=>{
            return({
                name:data.name,
                mobile:data.mobile,
                mail:data.mail,
                year:data.year,
                regno:data.regno,
                department:data.department,
                clubs_joined:data.clubs_joined,
                Clubs_joined:data.Clubs_joined
            })
        })
    }
    render() {
        const clubs=()=>{
            return true
        }
        if(Array.isArray(this.state.Clubs_joined) && this.state.Clubs_joined.length){
            const clubs=this.state.Clubs_joined.map(data=>{
                console.log(data)
                
                return(
                    <li>
                        <h6>{data}</h6>
                    </li>
                )
            })
        }

        
        return (
            <div>
  
                <Navbar />

                <h1 style={{textAlign:"center",marginTop:'50px',color:'floralwhite'}}>Profile</h1>
                <div className="profile-card card" style={{backgroundColor:'black',color:"white",marginTop:'20px'}}>
                    <div style={{display:"flex",justifyContent:'space-around'}}>
                        <div>
                            <img src={logo} style={{height:'90px',width:'90px'}}/>
                        </div>
                        <div style={{marginTop:'20px'}}>
                            <h6>{this.state.name}</h6>
                            <h6>{this.state.regno}</h6>
                        </div>
                    </div>
                    <div style={{marginTop:"50px"}}>
                    <div style={{display:"flex",padding:"20px"}}>
                        <ContactMailIcon/>
                        <h6 style={{marginLeft:"10px"}}>{this.state.mail}</h6>
                    </div>
                    <div style={{display:"flex",padding:"20px"}}>
                        <CallIcon/>
                        <h6 style={{marginLeft:"10px"}}>{this.state.mobile}</h6>
                    </div>
                   
                    <div style={{display:"flex",padding:"20px"}}>
                        <BarChartIcon/>
                        <h6 style={{marginLeft:"10px"}}>{this.state.department}</h6>
                    </div>
                    <div style={{display:"flex",padding:"20px"}}>
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
                        <button className=" logout-button btn" style={{color:"white"}} onClick={()=>{
                            localStorage.clear()
                            this.props.history.push("/Login")
                        }}>Logout</button>
                    </div>
                                        <div>
                        <h8>Note:You cannot edit these things</h8>
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
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
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
