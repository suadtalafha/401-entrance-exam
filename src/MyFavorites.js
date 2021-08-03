import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyFavorites.css';
import { withAuth0 } from '@auth0/auth0-react';
import {Card,Button} from 'react-bootstrap'
import axios from 'axios';
import UpdateModal from './Component/UpdateModal';

class MyFavorites extends React.Component {
  constructor (props){
    super(props)
    this.state={
      emali:'',
      colorsArray:[],
      showColor:false,
      showForm:false,
      showUpdateForm:false,
     index:0,
     updateName:'',
     updatUrl:''
    }
  }
  componentDidMount =async()=>{
  const {user,isAuthenticated}=this.props.auth0;
  this.setState({
    emali:`${user.emali}`
  })
  let url =`${process.env.REACT_APP_SERVER}/color/userEmail=${this.state.emali}`
  let responseData=await axios.get(url);
  this.setState({
    colorsArray:responseData.data,
    showColor:true

  })
  }
 showFormHandelar =async ()=>{
   await this.setState({
    showForm:true
   })
 }
 handelClose = async()=>{
   await this.setState({
    showForm:false
   })
 }
 handelForm =async (e)=>{
   e.preventDefault();
   await this.setState({
    showForm:false
   })
   let addColorObj={
     emali:this.state.userEmail,
     nameColor:nameColor,
     imageUrl:imageUrl
    
   }
   let url=`${process.env.REACT_APP_SERVER}/color`
   let responseData =await axios.post(url,addColorObj)
   await this.setState({
    colorsArray=responseData.data
   })
 }
deleteColor =async (index)=>{
  let deleteObj={
    email:this.state.userEmail,
  }
  let url=`${process.env.REACT_APP_SERVER}/delete/${index}`
  let responseData =await axios.post(url,deleteObj)
  await this.setState({
   colorsArray=responseData.data
  })
}
showUpdate=async(index)=>{
  await this.setState({
    showUpdateForm:true,
    updateName:this.state.colorsArray[index].nameColor,
    updatUrl:this.state.colorsArray[index].imageUrl,

  })
}
 UpdateColor=async(e)=>{
  e.preventDefault();
  let updateColorObj={
    updateName:e.target.name.value,
    updatUrl:e.target.img.value,
    emali:this.props.auth0.user.email
  }
  let url=`${process.env.REACT_APP_SERVER}/update/${index}`
  let responseData =await axios.post(url, updateColorObj)
    
  await this.setState({
   colorsArray=responseData.data
  })
 }
  render() {
    return(
      <>
        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>
        <div>
    
        <UpdateModal show={this.state.showForm} handelClose={this.handelClose} />
        { 
                           this.state.showColor &&
                          this.state.colorsArray.map((color,index)=>{
                              return(
                                <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={color.imageUrl} />
                                <Card.Body>
                                  <Card.Title>{color.name}</Card.Title>
                                 
                                  <Button onClick={()=>{this.deleteColor(index)}} variant="primary">delete</Button>
                                  <Button onClick={()=>{this.showUpdate(index)}} variant="primary">delete</Button>
                                </Card.Body>
                              </Card>
                              )
                          })
                      }
        </div>
      </>
    )
  }
}

export default withAuth0(MyFavorites);

