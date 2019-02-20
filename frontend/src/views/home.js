import React, { Component } from 'react';
import {Input  ,Carousel, Button} from 'antd'
import HeaderWrap from './../components/HeaderWrap';
import HomeList from './../containers/HomeList'
import StoryList from './../containers/StoryList'
const Search = Input.Search;
export default class Home extends Component {
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
              <HomeList list={[1,2,3,4,5,6,7,8]}/>
                
            </ul>
            <p className="item-title">精彩旅行故事</p>
            <p className="item-subtitle">我有故事，你有酒吗？</p>
            <ul className="home-list">
              <StoryList list={[1,2,3,4,5,6,7,8]}/>
            </ul>
        </div>)}  
            </div>
         )
       }
    
}
 