import {Layout, Menu, Icon,Calendar,Badge} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom'

import Axios from 'axios';
const {  Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
 export default class SiderDemo extends React.Component {
    state = {
      collapsed: false,
      key:'4',
      cartId:undefined,
      dateList:[]
    };
    componentDidMount(){
      this.getStatus()
    }
    getStatus(){
      Axios.get('/allStatus').then((res)=>{
        if(res.data.state===0){
          this.setState({dateList:res.data.data})
        }
      })
    }
    onCollapse = (collapsed) => {
      this.setState({ collapsed });
    }
  
render() {
    return (
    <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['4']} mode="inline"
            onClick={(e)=>{
               this.setState({
                   key:e.key
               })
               if(e.key==1){
                this.setState({
                  cartId:undefined
                })
               }
            }}
            >
            <SubMenu
                key="sub1"
                title={<span><Icon type="database"  /><span>民宿管理</span></span>}
              >
                <Menu.Item key="1"><Icon type="plus" /><span>上架民宿</span></Menu.Item>
                <Menu.Item key="2"><Icon type="hdd" /><span>我上架的民宿</span></Menu.Item>
              </SubMenu>
              <Menu.Item key="3">
              <Icon type="schedule" />
                <span>我的预约</span>
              </Menu.Item>
              <Menu.Item key="4">
              <Icon type="solution" />
                <span>民宿评论</span>
              </Menu.Item>
                <Menu.Item key="5"><Icon type="user" /><span>民宿故事</span></Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ margin: '0 16px' }}>
                <div style={{background:'white',minHeight:'90vh'}}>
                {this.state.key==="1"?1:undefined}
                {this.state.key==="2"?2:undefined}
               
                {this.state.key==="3"?3:undefined}
                {this.state.key==="4"?4:undefined}
                {this.state.key==="5"?5:undefined}
                </div>
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>
              LookCart看车网 ©2018 Created by LineWell UED
            </Footer> */}
          </Layout>
        </Layout>
        </div>
      );
    }
  }
  