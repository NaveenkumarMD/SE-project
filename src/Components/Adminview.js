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
            data:[{
              "name":'naveen'
            }]
        }
    }
    async componentDidMount(){
        var {clubname,contestname}=this.props.match.params
        this.setState({clubname,contestname})
        var color=sessionStorage.getItem('color')
        this.setState({color})
      
        await firebase.firestore().collection('clubs').doc(this.props.match.params.name).onSnapshot(async doc=>{
       
          await doc.data().events.forEach(async data=>{
            if(data.title===this.props.match.params.contest){
             
              firebase.firestore().collection('users').where("regno","in",[1905097,1905098,1905113]).get().then(async doc=>{
                var array=[]
                await doc.forEach(dot=>{
                
                  array.push(dot.data())
                })
                this.setState({data:array,blur:'none'})
              })
              this.setState((prev,action)=>{
               
                return({
                  participants:data.participants,
                  
                })
              })
            }
          })
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
        return (

            <div>
              <Navbar/>
             
              
                <div className="card table-card" style={{marginTop:'90px',color:'white',backgroundColor:'black'}}>
                  <h2 style={{textAlign:'center',marginBottom:'20px'}}>Contestants</h2> 
                  <table style={{top:'120px' ,backgroundColor:this.state.color,borderRadius:'2px',filter:this.state.blur}} id="table-to-xls">
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
                <table style={{backgroundColor:this.state.color,borderRadius:'2px',filter:this.state.blur}}>
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
              <Link to="/Allclubs">All clubs</Link>

          </span>
        </div>
      </nav>
    )
}
export default withRouter(Adminview)
