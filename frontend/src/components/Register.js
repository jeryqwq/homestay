import React from 'react';
import './../statics/css/login.css'
import axios from 'axios'
import {
    Form, Icon, Input, Button,message
  } from 'antd';
  import {Link} from "react-router-dom"
  import './../statics/css/login.css'
import {Redirect} from 'react-router-dom'
 class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isRegister:false
         }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
              if(values.pwd===values.repwd){
                axios.get('/register',{
                    params:{
                        name:values.username,
                        pwd:values.pwd,
                        repwd:values.repwd,
                        phone:values.email,
                        email:values.phone
                    }
                }).then((res)=>{
                    if(res){
                        message.info('注册成功，请登录');
                       
                    }
                })
              }else{
            message.error("两次输入密码不一致")
        }
            
        }
        });
      }
    render() { 
        const { getFieldDecorator } = this.props.form;
        return (
            <div  className="form-wrap" style={{display:this.props.show?"inline-block":'none'}}>
                <h3 className="login-title">欢迎注册阿浪民宿</h3>
                {
                    this.state.isRegister?<Redirect to='/index/login'/>:undefined
                }
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('pwd', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('repwd', {
                        rules: [{ required: true, message: '请再次输入密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请再次输入密码" />
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: '请输入邮箱' }],
                    })(
                        <Input prefix={<Icon type="ie" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="请输入邮箱" />
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请输入电话' }],
                    })(
                        <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} type="phone" placeholder="请输入电话" />
                    )}
                    </Form.Item>
                    <Form.Item>
                    <Link className="login-form-trip" to="/index/login">返回登录</Link>
                    {/* <Link className="login-form-register" to="/index/register">现在注册</Link> */}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        注册
                    </Button>
                    </Form.Item>
                </Form>   
            </div>
          );
    }
}
 
export default  Form.create({ name: 'normal_register' })(Register);
