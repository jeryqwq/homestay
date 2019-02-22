import React from 'react';
import {Select,Input,Radio,InputNumber,Pagination,DatePicker} from 'antd';
import  HeaderWrap from './../components/HeaderWrap' 
import HomeList from './../containers/HomeList'
import moment from 'moment';

const Option = Select.Option;
const RadioGroup = Radio.Group;

class HomeSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        function disabledDate(current) {
            return current && current < moment().endOf('day');
          }
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
              <div style={{height:50,margin:"25px 0  0 20%"}}>
              <span style={{margin:"0 20px"}}>开始日期:</span><DatePicker 
              disabledDate={disabledDate}
              onChange={(val)=>{}} placeholder="请选择开始时间" />
              <span style={{margin:"0 20px"}}>结束日期:</span><DatePicker 
              disabledDate={disabledDate}
              onChange={()=>{}}  placeholder="请选择结束时间" />
              <span style={{margin:"0 20px"}}>人数:</span><InputNumber min={1} max={50} defaultValue={1} onChange={()=>{}} />
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
            <RadioGroup style={{float:"right"}}
            onChange={this.onChange} value={this.state.value}>
            排序方式:&nbsp;&nbsp;
                <Radio value={'createTime'}>上架时间</Radio>
                <Radio value={'review'}>浏览量</Radio>
                <Radio value={'price'}>价格</Radio>
            </RadioGroup>
            </div>
           
         <ul className="home-list">
              <HomeList list={[1,2,3,4,5,6,7,8]}/>
            </ul>
            <Pagination  onChange={(val)=>{console.log(val)}} defaultCurrent={1} total={500} />,

        </div>,'item_1')
         );
    }
}
const searchWrap={
    margin:'100px  auto 0 auto',
    textAlign:'center'
}
export default HomeSearch;