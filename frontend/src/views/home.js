import React, { Component } from 'react';
import {Input  ,Carousel,Radio, Row, Col} from 'antd'
import HeaderWrap from './../components/HeaderWrap';
import HomeList from './../containers/HomeList'
import StoryList from './../containers/StoryList'
import axios from 'axios'
const Search = Input.Search;
export default class Home extends Component {
      state={
        loading:true,
        newList:[],
        cityInfo:'杭州',
        cityHomeList:[],
        storyList:[]
      }
      componentDidMount(){
        const that=this;
        this.getCartInfo('createTime  desc',function(res){
             if(res.data.state===0){
                 that.setState({
                  newList:res.data.data
                 })
             }
        },8,"1=1");
        this.getCityInfo();
        this.getStoryList()
      }
      getStoryList(){
        axios.get("/selectStory",{
          params:{
            pageSize:8,
            pageNum:1,
            where: "title like '%%'",
            orderBy:"wTime desc",
          }
        }).then((res)=>{
          if(res.data.state===0){
              this.setState({
                storyList:res.data.data
              })
          }
        })
      }
      getCityInfo(cityInfo){
        const that=this;
        this.getCartInfo('createTime  desc',function(res){
          if(res.data.state===0){
              that.setState({
                cityHomeList:res.data.data
              })
          }
     },8,"city "+" like "+"'%"+this.state.cityInfo+"%'");
      }
      getCartInfo(orderBy,fn,size,where){
        axios.get("/getProduct",{
            params:{
                pageSize:size,
                pageNum:1,
                where:where,
                orderBy:orderBy,
            }
        }).then((res)=>{
           fn(res);
        })
    }
       render(){
        return ( 
            <div>
        {HeaderWrap(()=><div className="banner-wrap">
          <Carousel autoplay>
            <div className="banner-item"><img src={require('./../statics/images/2.jpg')}/></div>
            <div className="banner-item"><img src={require('./../statics/images/1.jpg')}/></div>
            <div className="banner-item"><img src={require('./../statics/images/3.jpg')}/></div>
            <div className="banner-item"><img src={require('./../statics/images/4.jpg')}/></div>
          </Carousel>
            <div className="search-wrap">
                <Search
                placeholder="搜索下呗"
                enterButton="搜索"
                size="large"
                onSearch={value => console.log(value)}
                />
            </div>
            <p className="item-title">别住酒店，住我家</p>
            <p className="item-subtitle">莫愁前路无知己，天下谁人不识君</p>
            <ul className="home-list">
              <HomeList list={this.state.newList}/>
            </ul>
            <p className="item-title">精彩旅行故事</p>
            <p className="item-subtitle">我有故事，你有酒吗？</p>
            <ul className="home-list">
              <StoryList list={this.state.storyList}/>
            </ul>
            <div className="btn-wrap">
              <p className="item-title">热门旅行城市</p>
              <div className="radio-group">
                <Radio.Group 
                onChange={(value)=>{
                  this.setState({
                    cityInfo:value.target.value
                  },()=>{
                    this.getCityInfo()
                  })
                }}
                defaultValue="杭州" size='large' buttonStyle="solid">
                  <Radio.Button value="杭州">杭州</Radio.Button>
                  <Radio.Button value="上海">上海</Radio.Button>
                  <Radio.Button value="福建">福建</Radio.Button>
                  <Radio.Button value="广州">广州</Radio.Button>
                  <Radio.Button value="深圳">深圳</Radio.Button>
                  <Radio.Button value="云南">云南</Radio.Button>
                  <Radio.Button value="广西">广西</Radio.Button>
                  <Radio.Button value="湖南">湖南</Radio.Button>
                  <Radio.Button value="湖北">湖北</Radio.Button>
                </Radio.Group>
              </div>
            </div>
            <ul className="home-list">
              <HomeList list={this.state.cityHomeList}/>
              </ul>
              <div className="footer"  >
                
              </div>
        </div>,'item_0')}  
            </div>
         )
       }
    
}
 