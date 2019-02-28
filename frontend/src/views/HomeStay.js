import React from 'react';
import {Icon,DatePicker,Button,Input, message,Rate,Comment,Tag} from 'antd'
 import "./../statics/css/product.css"
 import moment from 'moment'
 import axios from 'axios';
import UserState from './../mobx/userState'
import HeaderWrap from './../components/HeaderWrap'


const { TextArea } = Input;

class HomeStay extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        curImg:'',
        Home:{},
        startTime:undefined,
        endTime:undefined,
        other:'',
        isOrder:false,
        commentList:[]
        }
    }
    componentDidMount(){
        this.getHomeInfo();
        this.addReview();
        this.getComment();
    }
    getComment(){
        axios.get('/getCommentsById',{
            params:{
                id:this.props.match.params.id
            }
        }).then((res)=>{
           if(res.data.state===0){
               this.setState({
                commentList:res.data.data
               })
           }
        })
    }
    addReview(){
        axios.get("/addReview",{
            params:{
                id:this.props.match.params.id
            }
        })
    }
    addOrder(){
        axios.get("/addOrder",{
            params:{
                homeId:this.props.match.params.id,
                userId:UserState.user.id,
                other:this.state.other,
                startTime:this.state.startTime,
                endTime:this.state.endTime
            }
        }).then((res)=>{
            if(res.data.state===0){
                message.info("预订成功");
                this.setState({
                    startTime:undefined,
                    endTime:undefined,
                    other:''
                })
            }
           
        })
    }
    getHomeInfo(){
        axios.get('/getProductById',{
            params:{
                id:this.props.match.params.id
            }
        }).then((res)=>{
            if(res.data.state===0){
                this.setState({
                    Home:res.data.data,
                    curImg:res.data.data.img
                })
            }
        })
    }
    render() {
        function disabledDate(current) {
            return current && current < moment().endOf('day');
          }
          const {Home}=this.state
        return (
            HeaderWrap(()=>  <div className="img-head-wrap">
            <img src={"/"+this.state.curImg} className="imgLeft"/>
            <div className="img-right">
                {
                    Home.subImgs?Home.subImgs.split(',').map((item,index)=>
                    <img  key={index} className="sub-img" src={"/"+item}
                    onClick={()=>{
                        this.setState({
                            curImg:item
                        })
                    }}
                    />
                    ):undefined
                }
                
            </div>
           <div className="content-wrap">
           <div className="home-title">{Home.title}</div>
            <p className="views-total">过去浏览量超过{Home.review}次。<Icon type="views"/></p>
            <p className="views-total">最多住{Home.count}人<Icon type="views"/></p>
            <p className="views-admin">房东：{} 共收到{}评论<Icon type="views"/></p>
            <div className="_y0ow8e3">
              
                <div className="_11abfxr">
                       
                    <span>{Home.desc}</span>   
                </div>
            </div>
            <div className="html-wrap" dangerouslySetInnerHTML={{__html:Home.richText}}></div>
           </div>
           <div className="content-wrap-right">
                <div className="right-inner">
                <p className="price">￥{Home.price}/每晚</p>
                <p className="starts"><Rate value={5} />*25</p>
                <br/>
                <p className="starts">地址:{Home.address}</p>
          <br/>
                <DatePicker 
          disabledDate={disabledDate}
          onChange={(val)=>{
              this.setState({
                  startTime:val.format("YYYY-MM-DD")
              })
          }} placeholder="入住日期" />
          ——<DatePicker
          disabledDate={disabledDate}
          onChange={(val)=>{
            this.setState({
                endTime:val.format("YYYY-MM-DD")
                })
            }}   placeholder="退房日期" />
          <br/>
          <br/>
          <TextArea value={this.state.other} placeholder="请输入其他备注信息！" onChange={(val)=>{
              this.setState({
                other:val.target.value
              })
          }} autosize={{ minRows: 2, maxRows: 6 }} />
          <br/>
          <br/>
          <Button  type="primary" size="large" style={{width:'300px'}}
          onClick={()=>{
              this.addOrder();
          }}
          >预订</Button>
          <div className="comments">
            <p style={{margin:'20px 10px',fontSize:20}}>当前民宿评论</p>
           {

               this.state.commentList.map((item,index)=>
               <div key={index}>
               {
                   item.cdesc.split(",").map((item1,index1)=>
                   <Tag color="green" key={index}>{item1}</Tag>)
               }
                   <Comment
               actions={item.actions}
               author={item.fromName}
               avatar='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
               content={item.content}
               datetime={moment(item.cTime).format('YYYY-MM-DD HH:mm:ss')}
             />
               </div>
               )
           }
          </div>
                </div>
           </div>
        </div>)
         );
    }
}
 
export default HomeStay;