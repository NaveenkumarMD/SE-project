import React, { Component } from 'react'
import { withRouter,Link } from 'react-router-dom'
import CallIcon from '@material-ui/icons/Call';

class Aboutus extends Component {
    componentDidMount(){
        var user=localStorage.getItem('user')
        if(!user){
          this.props.history.push("/Login")
        }
    }
    render() {
        return (
            <div style={{color:'white'}}>
                <Navbar/>
                <div style={{marginTop:'100px'}}>
                    <div className="about-contact-content">
                    <div className="about-contact-card card" style={{textAlign:"center",maxWidth:"400px",backgroundColor:'violet'}}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYPUECHsyQnTSk0yGIXtNF7jz7lD5DzKNyfg&usqp=CAU" style={{maxHeight:'auto',maxWidth:'400px'}}/>
                    <h6>Sethubharathi</h6>
                    <h9><span style={{marginRight:'4px'}}>II</span>year</h9>
                    <h9>CSE</h9>
                    <a href="tel:8870499146" style={{textDecoration:'none',color:'white'}}><span style={{marginRight:'10px',marginTop:'5px'}} ><CallIcon /></span>Call</a>

                </div>
                <div className="about-contact-card card" style={{textAlign:"center",maxWidth:"400px",backgroundColor:'violet'}}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYPUECHsyQnTSk0yGIXtNF7jz7lD5DzKNyfg&usqp=CAU" style={{maxHeight:'auto',maxWidth:'400px'}}/>
                    <h6>Sethubharathi</h6>
                    <h9><span style={{marginRight:'4px'}}>II</span>year</h9>
                    <h9>CSE</h9>
                    <a href="tel:8870499146" style={{textDecoration:'none',color:'white'}}><span style={{marginRight:'10px',marginTop:'5px'}} ><CallIcon /></span>Call</a>

                </div>
                <div className="about-contact-card card" style={{textAlign:"center",maxWidth:"400px",backgroundColor:'violet'}}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYPUECHsyQnTSk0yGIXtNF7jz7lD5DzKNyfg&usqp=CAU" style={{maxHeight:'auto',maxWidth:'400px'}}/>
                    <h6>Sethubharathi</h6>
                    <h9><span style={{marginRight:'4px'}}>II</span>year</h9>
                    <h9>CSE</h9>
                    <a href="tel:8870499146" style={{textDecoration:'none',color:'white'}}><span style={{marginRight:'10px',marginTop:'5px'}} ><CallIcon /></span>Call</a>

                </div>
                <div className="about-contact-card card" style={{textAlign:"center",maxWidth:"400px",backgroundColor:'violet'}}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYPUECHsyQnTSk0yGIXtNF7jz7lD5DzKNyfg&usqp=CAU" style={{maxHeight:'auto',maxWidth:'400px'}}/>
                    <h6>Sethubharathi</h6>
                    <h9><span style={{marginRight:'4px'}}>II</span>year</h9>
                    <h9>CSE</h9>
                    <a href="tel:8870499146" style={{textDecoration:'none',color:'white'}}><span style={{marginRight:'10px',marginTop:'5px'}} ><CallIcon /></span>Call</a>

                </div>
                    </div>

                </div>
            </div>
        )
    }
}
const Navbar=(props)=>{
    return(
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style={{backgroundColor:'black'}}>
            <a class="navbar-brand" href="#" style={{color:'white'}}>Clubs</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">About  us <span class="sr-only">(current)</span></a>
                </li>

                </ul>
                <span class="navbar-text">
                    <Link to="/Allclubs" style={{marginRight:'10px'}}>Allclubs</Link>
                    <Link to="/">Home</Link>
                </span>
            </div>
            </nav>
    )
}
export default withRouter(Aboutus)
