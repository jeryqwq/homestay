import React from 'react'
import {
   Form, Icon, Input, Button, Checkbox,
 } from 'antd';
 import {Link} from "react-router-dom"

 import './../statics/css/login.css'

class NormalLoginForm extends React.Component {
   constructor(props){
      super(props)
   }
   handleSubmit = (e) => {
     e.preventDefault();
     this.props.form.validateFields((err, values) => {
       if (!err) {
         console.log('Received values of form: ', values);
       }
     });
   }
 
   render() {
     const { getFieldDecorator } = this.props.form;
     return (
       <div className="form-wrap" style={{display:this.props.show?'inline-block':'none'}}>
       <h3 className="login-title">欢迎登录阿浪民宿</h3>
         <Form onSubmit={this.handleSubmit} className="login-form">
         <Form.Item>
           {getFieldDecorator('username', {
             rules: [{ required: true, message: '请输入用户名' }],
           })(
             <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
           )}
         </Form.Item>
         <Form.Item>
           {getFieldDecorator('password', {
             rules: [{ required: true, message: '请输入密码' }],
           })(
             <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
           )}
         </Form.Item>
         <Form.Item>
         <Link className="login-form-trip" to="/">游客登录</Link>
           <Link className="login-form-register" to="/index/register">现在注册</Link>
           <Button type="primary" htmlType="submit" className="login-form-button">
            登录
           </Button>
         </Form.Item>
       </Form>
       </div>
     );
   }
 }
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm