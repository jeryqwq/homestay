import React,{useState} from 'react'
import {Icon,Skeleton} from 'antd'
import {Link} from 'react-router-dom';
import moment from 'moment';
export default function(props){
    const [loading,setLoading]=useState(true);
    setTimeout(()=>{
        setLoading(false)
    },1000)
    return(
            props.list.map((item,index)=>
            <li key={index}>
            <Skeleton loading={loading}>
            <img className="img-item" src={item.imgs.split(',')[0]}/>
            <div className="item-wrap">
                <Link to={"/story/"+item.id}><span>查看故事</span></Link>
                <Link to={"/HomeStay/"+item.homeId}><span>查看房源</span></Link>
            </div>
            <div className="item-info">
                <div className="story-info">{item.title}</div>
                创建时间:{moment(item.wTime).format("YYYY-MM-DD HH:mm:ss")}
            </div>
            </Skeleton>
        </li>
            )
        
    )
}