import React from 'react';
import {Select,Input,Radio} from 'antd';
import  HeaderWrap from './../components/HeaderWrap' 
const Option = Select.Option;
const RadioGroup = Radio.Group;

class HomeSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            HeaderWrap(()=><div style={searchWrap}>
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
              <div style={{height:50,margin:"25px 0  0 50%"}}>
              <span style={{marginRight:20}}>地区:</span><Select onChange={(val)=>{
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
            <RadioGroup style={{float:"right"}}
            onChange={this.onChange} value={this.state.value}>
            排序方式:&nbsp;&nbsp;
                <Radio value={'createTime'}>上架时间</Radio>
                <Radio value={'review'}>浏览量</Radio>
                <Radio value={'price'}>价格</Radio>
            </RadioGroup>
            </div>
        </div>)
         );
    }
}
const searchWrap={
    margin:'100px  auto 0 auto',
    textAlign:'center'
}
export default HomeSearch;