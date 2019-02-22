import React from 'react';
import {Select,Input,Pagination} from 'antd';
import HeaderWrap from './../components/HeaderWrap'
import StoryList from './../containers/StoryList'

const Option = Select.Option;

class StorySearch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() { 
        return ( HeaderWrap(()=>
        <div style={searchWrap}>
             <Select onChange={(val)=>{
               this.setState({
                   key:val.key
               })
           }}
           labelInValue defaultValue={{ key: 'global' }} style={{ width: 120 }} >
                <Option value="global">全局匹配</Option>
                <Option value="title">车辆名称</Option>
                <Option value="pingpai">车辆品牌</Option>
                <Option value="desc">车辆描述</Option>
            </Select>
            <Input.Search onChange={(event)=>{
                    console.log(event.target.value)
                    this.setState({
                        value:event.target.value,
                        pageNum:1
                    })
                }} enterButton={true}
                onSearch={()=>{
                    this.getCarts()
                }}
                style={{width:200,marginLeft:50}} placeholder="请输入关键词" />
                 <span style={{margin:"0 20px"}}>地区:</span><Select onChange={(val)=>{
               this.setState({
                   key:val.key
               })
           }}
           labelInValue defaultValue={{key:'global'}} style={{width:120}}>
                <Option value="global">福建</Option>
                <Option value="title">陕西</Option>
                <Option value="pingpai">车辆品牌</Option>
                <Option value="desc">车辆描述</Option>
            </Select>
            <ul className="home-list" style={searchWrap}>
              <StoryList list={[1,2,3,4,5,6,7,8]}/>
            </ul>
            <Pagination  onChange={(val)=>{console.log(val)}} defaultCurrent={1} total={500} />,

        </div>,'item_2'
        ));
    }
}
const searchWrap={
    margin:'100px  auto 0 auto',
    textAlign:'center'
}
export default StorySearch;