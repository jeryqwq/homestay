import React from 'react';
import { Divider,Menu, Icon,Dropdown,message,Drawer,Col, Row } from 'antd';
import { Avatar } from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';
import {observer} from 'mobx-react';
import "./../statics/css/content.css"
import userState from './../mobx/userState'


class Header extends React.Component{
    constructor(props){
        super(props);
            this.state = {
                current: this.props.current?this.props.current:'item_0',
                visible: false
              }
    }
    componentDidMount(){
        if(!userState.user.isLogin){
        axios.get("/autoLogin").then((res)=>{
            if(res.data.data.state===0){
                userState.login(res.data.data.data)
            }
        })
        }
    }
    logout(){
        axios.get("/logout").then((res)=>{
            if(res.data.data.state===0){
                userState.logout();
                message.info('注销成功');  
            }else{
                message.error('注销失败')  
            }
        })
    }
    render(){
       
        const menu = (
            <Menu>
              <Menu.Item>
                <Icon type="user" />用户:{userState.user.name}
              </Menu.Item>
              <Menu.Item onClick={()=>{
                  this.setState({
                    visible:true
                  })
              }}>
              <Icon type="info-circle"/>我的信息
              </Menu.Item>
              <Menu.Item onClick={()=>{this.logout()}}>
              <Icon type="logout" />注销登录
              </Menu.Item>
            </Menu>
          )
         
        return(
            <div className="fixed-title">
              <span className="head-title">阿浪民宿<span>你的诗和远方</span></span>
            {userState.user.isLogin?<Dropdown overlay={menu} placement="bottomCenter">
            <div >
            <Avatar   icon="user"  />
            {"欢迎您，用户"+userState.user.name}
            </div></Dropdown>:<span><Link className="userInfo" to='/index/register'>注册</Link><Link className="userInfo" to='/index/login'>登录</Link></span>}
            <Menu
            onClick={(e)=>{
            this.setState({
            current: e.key,
            });}}
            theme="dark"
            selectedKeys={[this.state.current]}
            mode="horizontal"
             >
            <Menu.Item   >
                <Icon type="home" /><Link style={{display:'inline'}} to="/MainPage">阿浪民宿</Link>
            </Menu.Item>
            <Menu.Item  >
            <Icon type="exception" /><Link style={{display:'inline'}} to="/CartInfo">房源</Link>
            </Menu.Item>
            <Menu.Item  >
            <Icon type="search" /><Link style={{display:'inline'}} to="/Search">故事</Link>
            </Menu.Item>
            <Menu.Item  >
            <Icon type="schedule" /><Link style={{display:'inline'}} to="/Status">我的预约</Link>
            </Menu.Item>
            {
              userState.user.isAdmin===1?<Menu.Item >
             <Icon type="lock" /><Link style={{display:'inline'}} to="/BackEnd">后台管理</Link>
              </Menu.Item>:undefined
            }
            </Menu>
        
            </div>
        )
    }
}
export default observer(Header)