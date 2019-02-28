import React from 'react';
import {Table, Divider, Tag, message,Modal,Rate, Input,Select} from 'antd';
import HeaderWrap from './../components/HeaderWrap'
import axios from 'axios'
import moment from 'moment';
import {Link} from 'react-router-dom'
import UserState from './../mobx/userState'
const Option = Select.Option;
const desc = ['极差', '差', '一般', '好', '非常好'];
const often=["体验极好","环境不错","有厨房","支持带孩子去","可以带狗狗","适合一家子","交通方便","有地铁","娱乐设施齐全"
,"房东超好","还会再来"
]

class MyStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          orderList:[],
          visible:false,
          currentId:0,
          starts:5,
          content:'',
          cdesc:[]
         };
    }
    componentDidMount(){
      this.getData()
    }
    getData(){
      axios.get("/getOrders").then((res)=>{
        if(res.data.state===0){
          this.setState({
            orderList:res.data.data
          })
        }else{
          message.error("请登录")
        }
      })
    }
    comment(){
      axios.get('/addComment',{
        params:{
          homeId:this.state.currentId,
          starts:this.state.starts,
          content:this.state.content,
          cdesc:this.state.cdesc.join(","),
          fromName:UserState.user.name
        }
      }).then((res)=>{
       if(res.data.state===0){
         message.info('评论成功！');
         this.setState({
           cdesc:[],
           content:''
         })
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
            render: (text,record) =><Link key={record.orderId} to={"/HomeStay/"+record.homeId}>{record.title}</Link>,
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
                tip="祝您旅行愉快"
              }
           return <Tag title={tip+"请做好准备"} color={color} key={endTime}>{moment(endTime).format("YYYY-MM-DD")+tip}</Tag> 
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
                   moment(record.endTime).endOf('day')>moment().endOf('day')||record.ostatus===0? <Tag color='gray'>当前无法评论</Tag>: <Tag color='green'
                   onClick={()=>{
                    this.setState({
                      currentId:record.homeId,
                      visible:true
                    })
                   }}
                   >点击评论</Tag>
                  
                }
                <Divider type="vertical" />
               {
                 record.ostatus===0? <a onClick={()=>{
                  this.delOrder(record.orderId)
                }}>取消预订</a>:<Link to={"/writeStory/"+record.homeId}><Tag color="green" >我要写故事</Tag></Link>
               }
              </span>
            ),
          }];
       
        return ( 
            HeaderWrap(()=>
                <div style={{textAlign:'center',paddingTop:1}}>
                 <Table style={{marginTop:100}} columns={columns} dataSource={this.state.orderList} />
                 <Modal
                    title="评论该民宿"
                    visible={this.state.visible}
                    onOk={()=>{
                      this.comment()
                    }}
                    onCancel={()=>this.setState({visible:false})}
                >
                <Rate tooltips={desc} onChange={(val)=>{
                  this.setState({starts:val})
                }} value={starts} />
                {starts ? <span className="ant-rate-text">
                {desc[starts - 1]}</span> : ''}
                <br/>
                <br/>
                <Select
                mode="tags"
                placeholder="请选择一些描述词"
                defaultValue={[]}
                onChange={(val)=>{this.setState({cdesc:val})}}
                style={{ width: '100%' }}
                >
                  {
                    often.map((item,index)=>
                    <Option key={item}>{item}</Option>
                    )
                  }
                </Select>
                <br/>
             
                <br/>
                <Input.TextArea placeholder="请输入评论内容！" onChange={(event)=>{
                  this.setState({
                    content:event.target.value
                  })
                }}/>
                </Modal>
                </div>
            ,"item_3")
         );
    }
}
 
export default MyStatus;