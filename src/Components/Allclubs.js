import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux';
import {getclubs} from '../Actions/Actions'
const mapStateToProps=state=>({
  clubs:state.user.clubs
})
class Allclubs extends Component {
    constructor(props){
        super(props)
        this.state={
            color:'',
            blur:'blur(5px)',
            data:[]
        }
    }
    componentWillReceiveProps(nextprops){
      if(nextprops){
        this.setState({
          data:nextprops.clubs,
          blur:'none'
        })
      }
    }
    componentDidMount(){
        this.props.getclubs()
        this.setState({color:sessionStorage.getItem('color')})
    }
    render() {
      const data=this.state.data.map(data=>{
        console.log("rinning")
        return(
            <div className=" allclubs-card-card" style={{filter:this.state.blur,color:'white',textAlign:'center',backgroundColor:this.state.color,padding:'10px',marginBottom:'2px'}}>
                <div className="allclubs-card-image" >
                    <img  style={{height:'120px',width:"120px",marginBottom:'20px',marginTop:'30px',marginBottom:'30px'}} src="https://upload.wikimedia.org/wikipedia/en/1/17/Coimbatore_Institute_of_Technology_logo.png"/>
                </div>
                <div style={{marginTop:'20px'}} className="allclubs-card-names">
                    <h3>{data.name}</h3>
                    <h5>{data.fullname}</h5>
                    <br/>
                    <Link style={{color:'white'}}to={{pathname:`/Aboutclub/${data.name}`,state:{
                      name:data.name
                    }}}>View</Link>

                </div>
            </div>

        )
      })
        return (
            <div >
              <Navbar />
              <div style={{textAlign:"center",filter:this.state.blur}}>
                <h1 style={{marginTop:"70px",marginBottom:'40px',color:'white'}}>Clubs</h1>
              </div>
              <div>
                  <div className="allclubs-card-content" >
                    {data}
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
              <Link to="/Profile">Profile</Link>

          </span>
        </div>
      </nav>
    )
}
export default compose(
  connect(mapStateToProps,{getclubs}),
  withRouter
)(Allclubs)
