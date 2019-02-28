import React from 'react'
import {Row,Col,Input,Upload,Button,Icon} from 'antd'
import  ReactQuill from 'react-quill';
import UserState from './../mobx/userState'
import HeaderWrap from './../components/HeaderWrap'
import Axios from 'axios';
class WriteStory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title:'',
        fileList:[],
        text:''
    }
    }
    addStory(){
        let subImg="";
        //to 组装Img信息，从fileUpload回调的文件列表中
            for (const key in this.state.fileList) {
                if (this.state.fileList.hasOwnProperty(key)) {
                    if(this.state.fileList[key].response!==undefined){
                            subImg=subImg+this.state.fileList[key].response+","
                    }
                }
            }
        Axios.get('/addStory',{
            params:{
                uName:UserState.user.name,
                title:this.state.title,
                imgs:subImg,
                richText:this.state.text,
                homeId:this.props.match.params.id,
            }
        }).then((res)=>{
            console.log(res);
        })
    }
    modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }
      formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]
    render() { 
        return ( 
            HeaderWrap(()=>
            <div style={{margin:"50px auto",width:'80%'}}>
            <Row gutter={15}>
                <Col >请输入文章标题:<Input value={this.state.title} onChange={(val)=>{
                    this.setState({
                        title:val.target.value
                    })
                }}/></Col>
            </Row>
            <br/>
            <Row gutter={15}>
            <Upload  accept=".jpg,.png"
                 action="/fileupload"
                 defaultFileList={this.state.fileList}
                 listType="picture-card"
                 onChange={({ fileList })=>{
                    this.setState({ 
                    fileList: fileList
                    });
                    // fileList[0].response  //图片地址
                }}
                 >
                  <Button>
                        <Icon type="upload" /> 请上传故事图片,可上传多张
                    </Button>
                </Upload>
            </Row>
            <ReactQuill value={this.state.text}
                 modules={this.modules}
                 formats={this.formats}
                  onChange={(val)=>{
                    this.setState({
                        text:val
                    })
                  }} />
                    <Button onClick={()=>{
               this.addStory();
            }}      style={{float:"right",margin:"30px"}} type="primary" shape="round" icon="upload" size='large'>新增</Button>
            </div>
            )
         );
    }
}

 
export default WriteStory;