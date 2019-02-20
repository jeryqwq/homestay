import React,{useState} from 'react'
import {Icon,Skeleton} from 'antd'
export default function(props){
    const [loading,setLoading]=useState(true);
    setTimeout(()=>{
        setLoading(false)
    },1000)
    return(
            props.list.map((item,index)=>
            <li key={index}>
            <Skeleton loading={loading}>
            <img className="img-item" src={require('./../statics/images/1.jpg')}/>
            <div className="item-wrap">
                <span>查看故事</span>
                <span>查看房源</span>
            </div>
            <div className="item-info">
                <div className="story-info">房源厦门在鬧中取靜的「家」，感受廈門的美好和治癒在鬧中取靜的「家」，感受廈門的美好和治癒</div>
               <div className="icon"><Icon type="eye" />532  <Icon type="like" />6333<Icon type="message" />620</div>
            </div>
            </Skeleton>
        </li>
            )
        
    )
}