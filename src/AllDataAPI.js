import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import {Card,Button} from 'react-bootstrap'


class AllDataAPI extends Component {
    constructor (props){
        super(props)
        this.state={
          emali:'',
          colorsArray:[],
          showColor:false
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
        addToFav =async(color)=>{
            let url=`${process.env.REACT_APP_SERVER}/color/userEmail=${this.state.emali}`
            await axios.post(url,color)
          }
    render() {
        return (
            <div>
                <h1>All Data from the API</h1>
                <h3>Select your favorites :)</h3>
                  <div>
                      { 
                           this.state.showColor &&
                          this.state.colorsArray.map(color=>{
                              return(
                                <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={color.imageUrl} />
                                <Card.Body>
                                  <Card.Title>{color.name}</Card.Title>
                                 
                                  <Button onClick={()=>{this.addToFav(color)}} variant="primary">Add To Fav</Button>
                                </Card.Body>
                              </Card>
                              )
                          })
                      }
                  </div>



            </div>

        )
    }
}

export default withAuth0(AllDataAPI);
