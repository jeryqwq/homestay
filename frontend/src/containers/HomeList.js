import React from 'react';
export default function(props){
    return(
            props.list.map((item,index)=>
            <li key={index}>
                        <img src={require('./../statics/images/1.jpg')}/>

            <div className="item-wrap">
                <span>查看信息</span>
                <span>查看房主</span>
            </div>
            <div className="item-info">
                <div>地区：福建省三明县 </div>
                <div>漫漫|拿铁 楼下就是太古里春熙路/市中心双地铁/家庭影院/北欧风精致套房</div>
                <div>￥238 每晚</div>
                <div>星级</div>
            </div>
        </li>
            )
        
    )
}