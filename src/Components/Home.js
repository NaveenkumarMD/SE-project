import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import firebase from 'firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
      blur: "blur(30px)",
      data1:[],
      data: [],
    };
  }
  async componentDidMount() {
    
    console.log("running")
  
    var user=localStorage.getItem('user')
    if(!user){
      this.props.history.push("/Login")
    }
    var color = sessionStorage.getItem("color");
    this.setState({ color: color });
    var dat = JSON.parse(localStorage.getItem("allclubs"));
    console.log(dat);
    var array = [];
    if(dat){
    for (var i = 0; i < dat.length; i++) {
      if (dat[i].events) {
        if (dat[i].events.length != 0) {
          console.log(dat[i].id);
          for (var j = 0; j < dat[i].events.length; j++) {
            array.push({
              id: dat[i].id,
              logo: dat[i].logo,
              post: dat[i].events[j],
              name: dat[i].name,
              date:dat[i].date
            });
          }
        }
      }
    }}
    console.log(array);
    this.setState({ data: array });
    //this.reload()
  }
  reload=()=>{
    return window.location.reload()
  }

  render() {
    const posts = this.state.data.map((data) => {
      
      let date1=new Date(data.post.date)
      let date2=new Date()
      const diffTime = (date2 - date1);
      console.log(diffTime)
      if(diffTime<0){
          return true;
      }
      return (
        <div
          class="card"
          style={{
            maxWidth: "500px",
            padding: "5px",
            margin: "20px",
            backgroundColor: "rgb(18,18,18,1)",
          }}
        >
          <div style={{ margin: "10px" }}>
            <span>
              <img
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "30px",
                  marginRight: "5px",
                }}
                src="https://drscdn.500px.org/photo/61785897/q%3D80_m%3D2000/v2?sig=91e837bb4c1d7fb7837b6e51400c53491b55ef52aad127f36ae7081377263a8b"
              />
            </span>
            <span className="navbar-brand">{data.name}</span>
          </div>
          <img
            class=""
            style={{ maxWidth: "490px", height: "auto", marginTop: "10px" }}
            src={data.post.url}
          />
          <div class="card-body">
            <h5 class="card-title">{data.post.title}</h5>
            <p class="card-text">{data.post.chiefguest}</p>
            <div style={{ textAlign: "center" }}>

              <Link style={{color:'white'}}to={{pathname:`/Aboutclub/${data.id}`,state:{
                      name:data.name
                    }}}>              <button
                    href=""
                    class="btn "
                    style={{ backgroundColor: "goldenrod" }}
                    
                    style={{
                      marginRight: "30px",
                      backgroundColor: "midnightblue",
                      color: "white",
                    }}
                  >
                    Join
                  </button></Link>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div style={{ color: "white" }}>
        <Navbar />
        <div className="about-events-card" style={{ marginTop: "80px" }}>
          {posts}
        </div>
      </div>
    );
  }
}
const Navbar = (props) => {
  return (
    <nav
      class="navbar navbar-expand-lg navbar-dark fixed-top"
      style={{ backgroundColor: "black" }}
    >
      <a class="navbar-brand" href="#" style={{ color: "white" }}>
        Clubs
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link class="nav-link" to="/Aboutus">
              About us{" "}
            </Link>
          </li>
          <li class="nav-item active">
            <Link class="nav-link" to="/Profile">
              Profile
            </Link>
          </li>
          <li class="nav-item active">
            <Link class="nav-link" to="/Allclubs">
              All Clubs
            </Link>
          </li>
          
        </ul>
        <span class="navbar-text">
          <Link to="/Allclubs" style={{ marginRight: "10px" }}>
            All clubs
          </Link>
          
        </span>
      </div>
    </nav>
  );
};
export default withRouter(Home);
