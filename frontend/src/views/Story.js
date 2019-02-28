import React from 'react'
import {} from 'antd';
import Axios from 'axios';
import moment from 'moment'


class Story extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            story:{}
         }
    }
    componentDidMount(){
        this.getData();
    }
    getData(){
        Axios.get("/getStoryById",{
            params:{
                id:this.props.match.params.id
            }
        }).then((res)=>{
            if(res.data.state===0){
                this.setState({
                    story:res.data.data[0]
                })
            }
        })
    }
    render() { 
      let  story=this.state.story
        return ( 
            <div style={{width:'80%',marginLeft:'10%'}}>
                {
                    story.imgs!==undefined?story.imgs.split(",").map((item,index)=>
                    item!==""?<img  src={"/"+item} key={index} />:undefined
                    ):undefined
                }     
                <p style={{fontSize:30}}>{story.title}</p>
                <p >上传时间:{moment(story).format("YYYY-MM-DD HH:mm:ss")}</p>
                <div className="html-wrap" dangerouslySetInnerHTML={{__html:story.richText}}></div>
            </div>  
         );
    }
}
 
export default Story;