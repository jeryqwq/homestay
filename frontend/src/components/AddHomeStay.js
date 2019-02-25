import React from 'react';
import {Row,Col,Button,Input,InputNumber,Upload,Icon ,Select,Modal,message} from 'antd';
import  ReactQuill from 'react-quill';
import axios from 'axios'
import AllCategory from './AllCategory';
import 'react-quill/dist/quill.snow.css'; // ES6

const { TextArea } = Input;
const Option = Select.Option;
const provinceData = ['浙江', '杭州',"广州","福建","湖南","湖北","陕西","浙江","重庆","北京","上海","广州","深圳","南京"];

class AddHomeStay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: provinceData[0],
            text:'',
            fileList:[],
            mainImg:'',
            subImgs:[],
            title:'',
            categoryId:1,
            desc:'',
            status:1,
            price:0,
            count:'',
            subImg:'',
            address:'',
            city:''
         }
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
      insertCart(){
        let subImg="";
        //to 组装Img信息，从fileUpload回调的文件列表中
            for (const key in this.state.fileList) {
                if (this.state.fileList.hasOwnProperty(key)) {
                    if(this.state.fileList[key].response!==undefined){
                            subImg=subImg+this.state.fileList[key].response+","
                    }
                }
            }
            axios.get("/addProduct",{
                params:{
                    cateId:this.state.categoryId,
                    count:this.state.count,
                    title:this.state.title,
                    desc:this.state.desc,
                    status:this.state.status,
                    price:this.state.price,
                    mainImg:this.state.mainImg,
                    subImgs:subImg,
                    richText:this.state.text,
                    city:this.state.city,
                    provin:this.state.provin,
                    address:this.state.address
                }
            }).then((res)=>{
                if(res.data.state===0){
                    message.info("上传成功!")
                    this.setState({
                    text: '',
                    title:'',
                    categoryId:1,
                    desc:'',
                    status:1,
                    price:0,
                    pingpai:'',
                    img:'',
                    subImg:'',
                    fileList:[],
                    richText:'',
                    city:'',
                    provin:'',
                    address:''
                    })
                }
            })
    }
    render() { 
        const { cities } = this.state;
   
 
        
        return ( <div className="add-wrap">
        
            <Row gutter={15}>
                <Col >请输入民宿名称:<Input value={this.state.title} onChange={(val)=>{
                    this.setState({
                        title:val.target.value
                    })
                }}/></Col>
            </Row>
            <Row gutter={15}>
                <Col >请输入民宿描述:<TextArea value={this.state.desc} onChange={(val)=>{
                    this.setState({
                        desc:val.target.value
                    })
                }}/></Col>
            </Row>
            <Row gutter={15}>
            <br/>
                <Col span={4}>民宿价格：<InputNumber max={30000} min={0} onChange={(val)=>{
                    this.setState({
                        price:val
                    })
                }}
                    value={this.state.price}/>
                </Col>
                <Col span={4}>
                最多容纳人数：<InputNumber max={1000} min={0} value={this.state.count} onChange={(val)=>{
                    this.setState({
                        count:val
                    })}}
                    /></Col>
                <Col>民宿地址：请选择省：<Select
          defaultValue={provinceData[0]}
          style={{ width: 120 }}
          onChange={(value)=>{
            this.setState({
                city: value,
              });
          }}
        >
          {provinceData.map(province => <Option key={province}>{province}</Option>)}
        </Select>
        &nbsp;&nbsp;&nbsp;房屋类型：<AllCategory 
                     setCategoryId={(id)=>{
                         this.setState({categoryId:id})}}
                    cateId={this.state.categoryId}
                    />
        </Col>
            </Row>
            <Row gutter={15}>
                <Col >请输入详细地址:<Input  value={this.state.address} onChange={(val)=>{
                    this.setState({
                        address:val.target.value
                    })
                }}/></Col>
            </Row>
            <br/><br/>
            <Row>
                <Col span={7}>
                <Upload 
                 accept=".jpg,.png"
                 action="/fileupload"
                 defaultFileList={this.state.fileList}
                 listType="picture-card"
                 onChange={({ fileList })=>{
                    this.setState({ 
                    mainImg: fileList[0].response
                    });
                    // fileList[0].response  //图片地址
                }}
                >
                
                    {
                        this.state.mainImg!=""?"图片数量已达上限":<Button>
                        <Icon type="upload" /> 请上传民宿主图
                    </Button>
                    }
                </Upload>
                </Col>
                <Col span={8}>
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
                        <Icon type="upload" /> 请上传民宿副图
                    </Button>
                </Upload>
                </Col>
            </Row>
            <Modal visible={this.state.previewVisible} footer={null} onCancel={()=>{
                this.setState({
                    previewVisible:false
                })
            }}>
              <img alt="图片预览" style={{ width: '100%' }} src={this.state.previewImage} />
            </Modal>
            <ReactQuill value={this.state.text}
                 modules={this.modules}
                 formats={this.formats}
                  onChange={(val)=>{
                    this.setState({
                        text:val
                    })
                  }} />
                    <Button onClick={()=>{
                this.props.cartId===undefined? this.insertCart():this.updateInfo();
            }} 
             style={{float:"right",margin:"30px"}} type="primary" shape="round" icon="upload" size='large'>
             {this.props.cartId===undefined?'新增':'更新'}</Button>
        </div> );
    }
}
 
export default AddHomeStay;