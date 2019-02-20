import React from 'react'
import { Carousel} from 'antd';
import Login from './../components/Login'
import Register from './../components/Register'
import './../statics/css/login.css'
export default class NormalLoginForm extends React.Component {
   constructor(props){
      super(props);
   }
  
   render() {
     return (
       <div className="index-wrap">
         <Carousel autoplay>
          <div className="banner-item"><img src={require('./../statics/images/2.jpg')}/></div>
          <div className="banner-item"><img src={require('./../statics/images/1.jpg')}/></div>
          <div className="banner-item"><img src={require('./../statics/images/3.jpg')}/></div>
          <div className="banner-item"><img src={require('./../statics/images/4.jpg')}/></div>
        </Carousel>
         <Login show={this.props.match.params.status==="login"}/>
         <Register show={this.props.match.params.status==="register"}/>
       </div>
     );
   }
 }
 