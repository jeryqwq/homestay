import React from 'react';
import {Skeleton,message,Pagination} from 'antd'
import axios from 'axios'
import userState from '././../mobx/userState';
export default class AdminHomeList extends React.Component{
        state={
            homeList:[],
            pageSize:8,
            pageNum:1,
            where:'uId=' +userState.user.id,
            total:0,
            loading:true
        }
        componentDidMount(){
            this.getDate();
        }
        getDate(){
            axios.get('/getProduct',{
                params:{
                    pageSize:this.state.pageSize,
                    pageNum:this.state.pageNum,
                    where:this.state.where,
                    orderBy:'createTime'
                }
            }).then((res)=>{
                if(res.data.state===0){
                    this.setState({
                        homeList:res.data.data,
                        total:res.data.total,
                        loading:false
                    })
                }else{
                    message.info("已经没有数据啦")
                }
            })
        }
        tabStatus(status,id){
            axios.get('/tabStatus',{
                params:{
                    status,
                    id
                }
            }).then((res)=>{
                if(res.data.state===0){
                    this.getDate();
                    message.info("操作成功!")
                }
            })
        }
    render(){
        return(
            <ul className="home-list">
            {this.state.homeList.map((item,index)=>
            <li key={index}>
            <Skeleton loading={this.state.loading}>
              <img className="img-item" src={item.img}/>
            <div className="item-wrap">
                <span>编辑信息</span>
                <span onClick={()=>{
                    this.tabStatus(item.status===0?1:0,item.id);
                    
                }}>{item.status==0?"上架":"下架"}</span>
            </div>
            <div className="item-info">
                <div>￥{item.price} /天</div>
                <div>地区：{item.address}</div>
                <div>{item.desc}</div>
                <div>容纳人数:{item.count}</div>
            </div>
            </Skeleton>
            </li>
            )}
            <Pagination style={{textAlign:'center',padding:"40px 0 30px 0"}} 
                  onChange={(val)=>{
                   this.setState({
                       pageNum:val
                   },()=>{
                       this.getDate();
                   })
                  }}
            defaultCurrent={1} total={this.state.total} />
            </ul>
    )
    }
}