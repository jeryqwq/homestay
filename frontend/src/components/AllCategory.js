import React from 'react'
import {Select} from 'antd'
import ajax from './../ajax'
const Option = Select.Option;
export default class Category extends React.Component{
  constructor(props){
      super(props);
      this.state={
        categoryList:[]
    }
  }
    componentDidMount(){
        const that=this
        ajax('/getCategory',function(res){
            if(res.data.state===0){
                that.setState({
                    categoryList:res.data.data
                })
            }
        })
    }
    render(){
        return   <Select placeholder="请选择一个分类" onChange={(val)=>{this.props.setCategoryId(val)}}
        style={{ width: 150,margin:'10px ' }}
        defaultValue={this.props.cateId}
         >
            {
                this.state.categoryList.length>0?this.state.categoryList.map((item,index)=>(
                    <Option key={item.id} value={item.id}>{item.cateName}</Option>
                )):<Option key={0} value={0}>无法获取分类数据</Option>
            }
        </Select>
    }
}