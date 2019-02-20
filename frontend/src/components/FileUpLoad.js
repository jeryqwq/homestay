import React from 'react';
import {Upload, Button, Icon,Modal} from 'antd'
export default class FileUpLoad extends React.Component{
    constructor(props){
        super(props)
        this.state={
               //图片上传
        previewVisible: false,
        previewImage: '',
        fileList:[],
        subImgs:"",
        //  [{
        //   uid: '-1',
        //   name: 'xxx.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // }],
        }
    }
    render(){
        return(
            <div className="clearfix" style={{float:"left"}}>
            <Upload
            accept=".jpg,.png"
              action="/fileupload"
              listType="picture-card"
              fileList={this.state.fileList}
              onPreview={(file)=>{
                this.setState({
                    previewImage: file.url || file.thumbUrl,
                    previewVisible: true,
                  });
              }}
              onChange={({ fileList })=>{
             
                this.setState({ fileList });
                this.props.setImg(fileList);
                // fileList[0].response  //图片地址
              }}
            >
              {this.state.fileList.length >= this.props.imgCount ? undefined :  <span>
            <Icon type="plus" />
            <div className="ant-upload-text">{this.props.title}</div>
          </span>}
            </Upload>
            <Modal visible={this.state.previewVisible} footer={null} onCancel={()=>{
                this.setState({
                    previewVisible:false
                })
            }}>
              <img alt="图片预览" style={{ width: '100%' }} src={this.state.previewImage} />
            </Modal>
          </div>
        )
    }
}