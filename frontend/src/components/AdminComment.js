import React from 'react'
import {Tag,Table, Divider,Rate} from 'antd'
import Axios from 'axios';
import {Link} from 'react-router-dom';
class AdminComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            commentList:[]
         }
    }
    componentDidMount(){
        this.getData();
    }
    getData(){
        Axios.get("/getAllComment").then((res)=>{
            if(res.data.state===0){
                this.setState({
                    commentList:res.data.data
                })
            }
        })
    }
    render() { 
        const columns = [{
            title: '民宿',
            dataIndex:'title',
            key: 'title',
            render: (text,record) =><Link key={record.orderId} to={"/HomeStay/"+record.homeId}>{record.title}</Link>,
          }, {
            title: '评论内容',
            dataIndex: 'content',
            key: 'content',
           
          }, {
            title: '星级',
            dataIndex: 'starts',
            key: 'starts',
            render:starts=>{
           return <Rate value={starts} />
          }
          },
          {
            title: '描述词',
            dataIndex: 'cdesc',
            key: 'cdesc',
            render: (text) => (
                <span>
                   {
                       text.split(',').map((item,index)=>
                           <Tag color="green" key={index}>{item}</Tag>
                       )
                   }
                </span>
               ),
          }, 
          {
            title: '来自用户',
            dataIndex: 'fromName',
            key: 'fromName',
          }, 
          {
            title: '操作',
            key: 'action',
            render: (text) => (
             <span style={{color:'red'}}>
                 评论系统秉承公开透<br/>明原则，故无法操作
             </span>
            ),
          }];
        return ( 
            <div>
               <Table columns={columns} dataSource={this.state.commentList} />
            </div>
         );
    }
}
 
export default AdminComment;