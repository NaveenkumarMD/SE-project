import React, { Component } from 'react'
import { withRouter,Link } from 'react-router-dom'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import firebase from 'firebase'
class Adminview extends Component {
    constructor(props){
        super(props)
        this.state={
            clubname:'',
            contestname:'',
            color:'',
            participants:[0],
            blur:'blur(40px)',
            loading:true,
            data:[{
              "name":'None'
            }]
        }
    }
    async componentDidMount(){
      var color=sessionStorage.getItem('color')
      this.setState({color})
      var user=localStorage.getItem('user')
      if(!user){
        this.props.history.push("/Login")
      }
      console.log(this.props.match.params)
      const { name,contest}=this.props.match.params
      console.log(name)
      var array=[]
      await firebase.firestore().collection('clubs').doc(name).get().then(doc=>{
        var data=doc.data()
        //console.log(data)
        for (var i =0;i<data.events.length;i++){
         // console.log(contest)
          if(data.events[i].title==contest){
            
            array=array.concat(data.events[i].participants)
     
          }
        }
      })
      console.log((array))
      var array1=[];
      
      if(array[0]==undefined){
        
        return this.setState({
          blur:'none',
          loading:false
        })
      }
      await firebase.firestore().collection('users').where('regno','in',array).get().then(query=>{
        query.forEach(doc=>{
          console.log(doc.data())
          var data=doc.data()
          array1.push({
            name:data.name,
            mobile:data.mobile,
            year:data.year,
            department:data.department,
            regno:data.regno,
          })
        })
      })
      this.setState({
        data:array1,
        blur:'none',
        loading:false
      })
             

    }
    render() {
 
        var a=0,b=0
        const mobileviewdata=this.state.data.map(datum=>{
          b+=1
          return(
            <tr>
              <td>{b}</td>
              <td>{datum.name}</td>
              <td>{datum.mobile}</td>
        </tr>
          ) 
        })
        const data=this.state.data.map(datum=>{
  
         a+=1
         return(
           <tr>
             <td>{a}</td>
             <td>{datum.name}</td>
             <td>{datum.regno}</td>
             <td>{datum.year}</td>
             <td>{datum.department}</td>
             <td>{datum.mobile}</td>
           </tr>
         )
        })
        if(this.state.loading){
          return(
            <h1 style={{color:'white'}}>Loading...</h1>
          )
        }
        return (

            <div>
              <Navbar/>
             
              
                <div className="card table-card" style={{marginTop:'90px',color:'white',backgroundColor:'rgb(18, 18, 18)'}}>
                  <h2 style={{textAlign:'center',marginBottom:'20px'}}>Contestants</h2> 
                  <table style={{top:'120px' ,backgroundColor:'rgb(18,18,18)',borderRadius:'2px',filter:this.state.blur}} id="table-to-xls">
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Reg No</th>
                      <th>year</th>
                      <th>Department</th>
                      <th>Mobile number</th>
                     
                    </tr>
                   {data}
                  </table>
                  <div style={{textAlign:'center',marginTop:'30px'}}>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS" className="btn download-button" style={{marginTop:'30px'}}/></div>
                </div>
                <div style={{color:'white',marginTop:'90px'}} className="test">
                  <h2 style={{textAlign:'center',paddingBottom:'40px'}}>Contestants </h2>
                <table style={{backgroundColor:'rgb(18,18,18)',borderRadius:'20px',filter:this.state.blur}}>
                  <tr>
                    <th>S no</th>
                    <th>name</th>
                    <th>Number</th>
                  </tr>
                  {mobileviewdata}
                  
                </table>
                <div style={{textAlign:'center',marginTop:'30px',color:'white'}}>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS" className="btn download-button" /></div>
                </div>
            
            </div>
        )
    }
}
const Navbar=()=>{
    return(
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style={{backgroundColor:'black',borderRadius:'20px'}}>
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
              <Link to="/Aboutclub">About</Link>

          </span>
        </div>
      </nav>
    )
}
export default withRouter(Adminview)
