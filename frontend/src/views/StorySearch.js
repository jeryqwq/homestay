import React from 'react';
import {Select,Input,Pagination,message} from 'antd';
import HeaderWrap from './../components/HeaderWrap'
import StoryList from './../containers/StoryList'
import Axios from 'axios';

const Option = Select.Option;

class StorySearch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pageNum:1,
            storyList:[],
            orderBy:'wTime',
            total:0,
            pageSize:8,
            value:''
        }
    }
    componentDidMount(){
        this.getDate()
    }
    getDate(){
        Axios.get("/selectStory",{
            params:{
                pageSize:this.state.pageSize,
                pageNum:this.state.pageNum,
                where:" title like "+"'%"+this.state.value+"%'",
                orderBy:this.state.orderBy +" desc"
            }
        }).then((res)=>{
             if(res.data.state===0){
                this.setState({
                    storyList:res.data.data,
                    total:res.data.total
                })
            }else{
                message.info("没查到任何信息，切换写查询方式吧")
            }
        })
    }
    render() { 
        return ( HeaderWrap(()=>
        <div style={searchWrap}>
         <Input.Search onChange={(event)=>{
                    this.setState({
                        value:event.target.value,
                        pageNum:1,
                        key:'title'
                    })
                }} enterButton={true}
                onSearch={()=>{
                    this.getDate()
                }}
                style={{width:200,marginLeft:50}} placeholder="请输入关键词" />
            <ul className="home-list" style={searchWrap}>
              <StoryList list={this.state.storyList}/>
            </ul>
            <Pagination  onChange={(val)=>{this.setState({pageNum:val},()=>{
                this.getDate();
            })}} defaultCurrent={1} total={this.state.total} />

        </div>,'item_2'
        ));
    }
}
const searchWrap={
    margin:'100px  auto 0 auto',
    textAlign:'center'
}
export default StorySearch;