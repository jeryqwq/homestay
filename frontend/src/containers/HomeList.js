import React, { useState } from 'react';
import {Skeleton} from 'antd';
import {Link} from 'react-router-dom'
export default function(props){
    const [loading,setLoading]=useState(true);
    setTimeout(()=>{
        setLoading(false)
    },1000)
    return(
            props.list.map((item,index)=>
            <li key={index}>
            <Skeleton loading={loading}>
              <img className="img-item" src={item.img}/>
            <div className="item-wrap">
                <Link to={"/HomeStay/"+item.id}><span>查看信息</span></Link>
                <span>查看房主</span>
            </div>
            <div className="item-info">
                <div>地区：{item.address}</div>
                <div>{item.desc}</div>
                <div>￥{item.price} 每晚</div>
                <div>星级</div>
            </div>
            </Skeleton>
        </li>
            )
        
    )
}