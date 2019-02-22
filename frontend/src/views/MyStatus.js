import React from 'react';
import {Table, Divider, Tag} from 'antd';
import HeaderWrap from './../components/HeaderWrap'
class MyStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const columns = [{
            title: '民宿',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
          }, {
            title: '开始时间',
            dataIndex: 'age',
            key: 'age',
          }, {
            title: '结束时间',
            dataIndex: 'address',
            key: 'address',
          }, {
            title: '人数',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
              <span>
                {tags.map(tag => {
                  let color = tag.length > 5 ? 'geekblue' : 'green';
                  if (tag === 'loser') {
                    color = 'volcano';
                  }
                  return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
                })}
              </span>
            ),
          },{
            title: '其他备注',
            dataIndex: 'address',
            key: 'address',
          }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <span>
                <a href="javascript:;">修改信息</a>
                <Divider type="vertical" />
                <a href="javascript:;">取消预订</a>
              </span>
            ),
          }];
          const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
          }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
          }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
          }];
        return ( 
            HeaderWrap(()=>
                <div style={{textAlign:'center',paddingTop:1}}>
                 <Table style={{marginTop:100}} columns={columns} dataSource={data} />
                </div>
            ,"item_3")
         );
    }
}
 
export default MyStatus;