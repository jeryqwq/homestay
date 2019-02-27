import React from 'react';
import axios from 'axios';
import { Table, Divider, Tag,message} from 'antd'
import moment from 'moment'
import {Link } from 'react-router-dom'
class AdminOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        this.getData();
    }
    getData(){
        axios.get("/adminOrders").then((res)=>{
          if(res.data.state===0){
            this.setState({
              orderList:res.data.data
            })
          }
        })
      }
      allowOrder(id){
        axios.get("/allowOrders",{
            params:{
              id:id
            }
          }).then((res)=>{
            if(res.data.state===0){
              message.info("对方已收到通知！");
              this.getData()
            }
          })
      }
      delOrder(id){
        axios.get("/delOrder",{
          params:{
            id:id
          }
        }).then((res)=>{
          if(res.data.state===0){
            message.info("取消成功！");
            this.getData()
          }
        })
      }
    render() { 
        const { starts } = this.state;

        const columns = [{
            title: '民宿',
            dataIndex:'title',
            key: 'title',
            render: (text,record) =><Link key={record.orderId} to={"/HomeStay/"+record.orderId}>{record.title}</Link>,
          }, {
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
            render:startTime=>{
                let color="green",tip="";
                if(moment(startTime).endOf('day')>moment().endOf('day')){
                  tip="   还有"+(moment(startTime).endOf('day')-moment().endOf('day'))/86400000+"天"
                }else{
                  color="gray";
                  tip="该日期已过期"
                }
             return <Tag title={tip+"请做好准备"} color={color} key={startTime}>{moment(startTime).format("YYYY-MM-DD")+tip}</Tag> 
            }
          }, {
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
            render:endTime=>{
              let color="green",tip="";
              if(moment(endTime).endOf('day')>moment().endOf('day')){
              }else{
                color="gray";
                tip="已过期"
              }
           return <Tag title={tip} color={color} key={endTime}>{moment(endTime).format("YYYY-MM-DD")+tip}</Tag> 
          }
          },
          {
            title: '其他备注',
            dataIndex: 'other',
            key: 'other',
          }, 
          {
            title: '状态',
            dataIndex: 'ostatus',
            key: 'ostatus',
            render:ostatus=>ostatus===0?<Tag color="yellow"  title="等待房东确认">等待房东确认</Tag>:<Tag color="green"  title="等待房东确认">房东已同意</Tag>
          }, 
          {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <span>
                {
                   record.ostatus===0? <Tag color='green' onClick={()=>{
                       this.allowOrder(record.id);
                   }}>同意入住</Tag>: 
                   <Tag color='gray'>订单已同意</Tag>
                  
                }
                <Divider type="vertical" />
                <a onClick={()=>{
                  this.delOrder(record.id)
                }}>删除该用户的预订</a>
              </span>
            ),
          }];
        return (
            <div>
               <Table columns={columns} dataSource={this.state.orderList} />
            </div>
         );
    }
}
 
export default AdminOrder;