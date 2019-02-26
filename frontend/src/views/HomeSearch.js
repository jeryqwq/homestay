import React from 'react';
import {Select,Input,Radio,InputNumber,Pagination,DatePicker,message} from 'antd';
import  HeaderWrap from './../components/HeaderWrap' 
import HomeList from './../containers/HomeList'
import Category from './../components/AllCategory'
import moment from 'moment';
import axios from 'axios';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const provinceData = ['浙江', '杭州',"广州","福建","湖南","湖北","陕西","浙江","重庆","北京","上海","广州","深圳","南京"];

class HomeSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key:'globel',
            cateId:0,
            startTime:{},
            endTime:{},
            value:'1',
            pageSize:8,
            pageNum:1,
            homeList:[],
            orderBy:'createTime',
            total:0,
         }
    }
    componentDidMount(){
        this.getDate();
    }
    getDate(){
        axios.get('/getProduct',{
            params:{
                pageSize:this.state.pageSize,
                pageNum:this.state.pageNum,
                where:this.state.key==='globel'?"1 = 1":"`"+this.state.key+"`"+" like "+"'%"+this.state.value+"%'",
                orderBy:this.state.orderBy +" desc"
            }
        }).then((res)=>{
            if(res.data.state===0){
                this.setState({
                    homeList:res.data.data,
                    total:res.data.total
                })
            }else{
                message.info("没查到任何信息，切换写查询方式吧")
            }
        })
    }
    render() { 
 
        return ( 
            HeaderWrap(()=><div style={searchWrap}>
            <Category setCategoryId={(val)=>{
                this.setState({
                    cateId:val,
                    key:'cateId',
                    value:val
                },()=>{
                    this.getDate()
                })
            }}/>
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
              <div style={{height:50,margin:"25px 0  0 20%"}}>
             
              <span style={{margin:"0 20px"}}>人数:</span>
              <InputNumber min={1} max={50} defaultValue={1} onChange={(val)=>{
                  axios.get('/getProduct',{
                    params:{
                        pageSize:this.state.pageSize,
                        pageNum:this.state.pageNum,
                        where:"count >=" +val,
                        orderBy:this.state.orderBy +" desc"
                    }
                }).then((res)=>{
                    if(res.data.state===0){
                        this.setState({
                            homeList:res.data.data,
                            total:res.data.total
                        })
                    }else{
                        message.info("没查到任何信息，切换写查询方式吧")
                    }
                })
              }} />
              <span style={{margin:"0 20px"}}>地区:</span>
              <Select onChange={(val)=>{
                        this.setState({
                            key:'city',
                            value:val.label
                        },()=>{
                            this.getDate();
                        })
           }}
           labelInValue defaultValue={{key:provinceData[0]}} style={{width:120}}>
              {provinceData.map((province,index) => <Option key={index}>{province}</Option>)}
            </Select>
            <RadioGroup style={{float:"right"}}
            onChange={(event)=>{
                this.setState({
                    orderBy:event.target.value
                },()=>{
                    this.getDate()
                })
            }} value={this.state.orderBy}>
            排序方式:&nbsp;&nbsp;
                <Radio value={'createTime'}>上架时间</Radio>
                <Radio value={'review'}>浏览量</Radio>
                <Radio value={'price'}>价格</Radio>
            </RadioGroup>
            </div>
           
         <ul className="home-list">
              <HomeList list={this.state.homeList}/>
            </ul>
            <Pagination  onChange={(val)=>{this.setState({pageNum:val},()=>{
                this.getDate();
            })}} defaultCurrent={1} total={this.state.total} />,
        </div>,'item_1')
         );
    }
}
const searchWrap={
    margin:'100px  auto 0 auto',
    textAlign:'center'
}
export default HomeSearch;