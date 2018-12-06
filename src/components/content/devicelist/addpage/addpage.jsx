import React from 'react'
import axios from 'axios';
import store from '../../../../store/store.js';
import { updata } from '../../../../store/actions/updata-actions'
import './addpage.css'
import { Modal, Button ,Form , Input ,Radio,notification } from 'antd'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class Addpage extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            visible: false,
            id:props.id
        }
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
        if(this.state.id){
          axios.get('http://106.12.22.249:4000/api/Getphone',{
            params:{
              id: this.state.id
           }
          }).then(res=>{
            if(res.data.success){
              this.props.form.setFieldsValue({    //设置值
                assetNum:res.data.data.assetNum,
                brand:res.data.data.brand,
                phoneType:res.data.data.phoneType,
                systemVersion:res.data.data.systemVersion,
                resolution:res.data.data.resolution,
                RAM:res.data.data.RAM,
                ROM:res.data.data.ROM,
                CPU:res.data.data.CPU,
                GPU:res.data.data.GPU,
                netSystem:res.data.data.netSystem,
                root:res.data.data.root,
                IMEI:res.data.data.IMEI,
                serialNum:res.data.data.serialNum,
                screenSize:res.data.data.screenSize,
                onLine:res.data.data.isDelete,
              });
            }
          })
        }
      }
    
      handleOk = (e) => {
        var paramDate = this.props.form.getFieldsValue()
        this.props.form.validateFields((err,succ)=>{
          if(err){
            console.log(err)
          }else{
            axios.post('http://106.12.22.249:4000/api/Addorchange',{
              id: this.state.id,
              assetNum: paramDate.assetNum,
              brand: paramDate.brand,
              phoneType: paramDate.phoneType,
              systemVersion: paramDate.systemVersion,
              resolution: paramDate.resolution,
              RAM: paramDate.RAM,
              ROM: paramDate.ROM,
              CPU: paramDate.CPU,
              GPU: paramDate.GPU,
              netSystem: paramDate.netSystem,
              root: paramDate.root,
              IMEI: paramDate.IMEI,
              serialNum: paramDate.serialNum,
              screenSize: paramDate.screenSize,
              isDelete:paramDate.onLine
            }).then(res=>{
              console.log(res)
              if(res.data.success){
                store.dispatch(updata({
                  bol:true
                 }))
                this.setState({
                  visible: false,
                });
                notification.open({
                  message: res.data.message,
                  description: '当前借出的设备资产编号为'+paramDate.assetNum,
                });
              }
            })
          }
        })
      }
    
      handleCancel = () => {
        this.setState({
          visible: false,
        }); 
      }
    

    render(){
        const { visible, lendNum,lendList } = this.state;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return(
            <div>
               <div className='child-addbtn' onClick={this.showModal}>
                 
                </div>
                <Modal title={this.state.id?"修改设备":"添加设备"}
                  visible={visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  width = '820px'
                >
                  <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <FormItem label="资产编号"  className='returnInput'>
                      {getFieldDecorator('assetNum', {
                        rules: [{ required: true, message: '请输入资产编号!' }],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label="品牌"  className='returnInput isFloat'>
                      {getFieldDecorator('brand', {
                      })(
                        <Input/>
                      )}
                    </FormItem>
                    <FormItem label="手机型号"  className='returnInput isFloat'>
                      {getFieldDecorator('phoneType', {
                        rules: [{ required: false}],
                      })(
                        <Input/>
                      )}
                    </FormItem>
                    <FormItem label="系统版本"  className='returnInput isFloat'>
                      {getFieldDecorator('systemVersion', {
                        rules: [{ required: false}],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label="是否在线"  className='returnInput isFloat'>
                      {getFieldDecorator('onLine', {
                        rules: [{ required: true,message: '请输入预计归还时间!' }],
                      })(
                        <RadioGroup>
                          <Radio value={0}>是</Radio>
                          <Radio value={1}>否</Radio>
                      </RadioGroup>
                      )}
                    </FormItem>
                    <FormItem label="CPU"  className='returnInput isFloat'>
                      {getFieldDecorator('CPU', {
                        rules: [{ required: false}],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label="GPU"  className='returnInput isFloat'>
                      {getFieldDecorator('GPU', {
                        rules: [{ required: false}],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label="分辨率"  className='returnInput isFloat'>
                      {getFieldDecorator('resolution', {
                        rules: [{ required: false}],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label="屏幕尺寸"  className='returnInput isFloat'>
                      {getFieldDecorator('screenSize', {
                        rules: [{ required: false}],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label="RAM"  className='returnInput isFloat'>
                      {getFieldDecorator('RAM', {
                        rules: [{ required: false}],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label="ROM"  className='returnInput isFloat'>
                      {getFieldDecorator('ROM', {
                        rules: [{ required: false}],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label="网络制式"  className='returnInput isFloat'>
                      {getFieldDecorator('netSystem', {
                        rules: [{ required: false}],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label="是否Root"  className='returnInput isFloat'>
                      {getFieldDecorator('root', {
                        rules: [{ required: false}],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label="序列号"  className='returnInput isFloat'>
                      {getFieldDecorator('serialNum', {
                        rules: [{ required: false}],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label="IMEI"  className='returnInput isFloat'>
                      {getFieldDecorator('IMEI', {
                        rules: [{ required: false}],
                      })(
                        <Input />
                      )}
                    </FormItem>
                  </Form>
                </Modal>
            </div>
        )
    }
}
const Addpageform = Form.create()(Addpage);
export default Addpageform;