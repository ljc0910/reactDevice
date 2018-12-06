import React from 'react'
import axios from 'axios';
import store from '../../../../store/store.js';
import { lendDevice }  from '../../../../store/actions/device-actions';
import { updata } from '../../../../store/actions/updata-actions'
import dateFormat from './../../../../plugin/dateFormat'
import './lendpage.css'
import { Modal, Button, Form , Input ,DatePicker ,notification   } from 'antd'
const FormItem = Form.Item;
class Lendpage extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            visible: false,
            lendList:[]
        },
        store.subscribe(() =>{
          this.setState({
            lendList:store.getState().deviceReducer.lendList
          })
          if(store.getState().deviceReducer.lendList.length===0){
            this.setState({
              visible:false
            })
          }
        })
    }
    // componentDidMount() {
    //   this.props.form.validateFields();
    // }
    showModal = () => {
        this.setState({
          visible: true,
        });
      }
    
      handleOk = () => {
        var mobileId = '';
        var paramDate = this.props.form.getFieldsValue()
        this.state.lendList.forEach (v=> {
          mobileId = mobileId + v.id + ','
        })
        this.props.form.validateFields((err,succ)=>{
          if(err){
            console.log(err)
          }else{
            axios.post('http://106.12.22.249:4000/api/lendPhone',{
              mobileId: mobileId, //手机id
              lendMan: paramDate.lendMan,
              lendManLeader: paramDate.lendManLeader,
              lendFloor: paramDate.lendFloor,
              lendCenter: paramDate.lendCenter,
              expectReturnTime: dateFormat(paramDate.returnTime._d),
              lendFormNum: paramDate.lendFormNum,
            }).then(res=>{
              console.log(res)
              if(res.data.success){       //接触成功
                this.props.form.resetFields() //清空输入值
                var theList = []
                this.state.lendList.forEach(v=>{
                  theList.push(Object.assign({},v))
                })
                theList.forEach(v=>{
                  store.dispatch(lendDevice({
                      id: v.id,
                      phoneType: v.phoneType,
                      assetNum: v.assetNum
                  }))
                })
                store.dispatch(updata({
                  bol:true
                 }))
                this.setState({
                  visible: false,
                });
                var assList = ''
                theList.forEach(v=>{
                  assList = assList+v.assetNum+'、'
                })
                notification.open({
                  message: res.data.message,
                  description: '当前借出的设备资产编号为'+assList,
                });
              }else{
                                              //借出失败
              }
            })
          }
        })   //校验时机设定
      }
    
      handleCancel = (e) => {
        this.setState({
          visible: false,
        });
      }
  
      deleteDev = (i) =>{     //移除以选择设备
        var lendList = this.state.lendList[i]
        store.dispatch(lendDevice({
          id: lendList.id,
          phoneType: lendList.phoneType,
          assetNum: lendList.assetNum
      }))
        this.setState({
          lendList: this.state.lendList,
        });
      }
    

    render(){
        const { visible, lendNum,lendList } = this.state;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return(
            <div>
               <div className='child-lendbtn' onClick={this.showModal}>
                 
                </div>
                <Modal title="出借设备"
                  className='lendAlert'
                  visible={visible}
                  onOk={this.handleOk}
                  cancelText="取消"
                  okText = "出借"
                  closable={false}
                  onCancel={this.handleCancel}
                  width = '820px'
                >

                  <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <FormItem label="设备" className="lendDeviceForm">
                        <ul className="lendDeviceList" >
                         {lendList.map((v,i)=>
                          <li key={v.id} onClick = {this.deleteDev.bind(this,i)}>
                              <i className="cover"></i>
                              <h3>{v.phoneType}</h3>
                              <p>{v.assetNum}</p>
                          </li> 
                         )}
                        </ul>
                    </FormItem>
                    <FormItem label="出借人"  className='lendInput'>
                      {getFieldDecorator('lendMan', {
                        rules: [{ required: true, message: '请输入出借人!' }],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label="直属上级"  className='lendInput'>
                      {getFieldDecorator('lendManLeader', {
                        rules: [{ required: true, message: '请输入直属上级!' }],
                      })(
                        <Input/>
                      )}
                    </FormItem>
                    <FormItem label="楼层"  className='lendInput isFloat'>
                      {getFieldDecorator('lendFloor', {
                        rules: [{ required: false}],
                      })(
                        <Input/>
                      )}
                    </FormItem>
                    <FormItem label="中心/工作室"  className='lendInput isFloat'>
                      {getFieldDecorator('lendCenter', {
                        rules: [{ required: false}],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label="预计归还时间"  className='lendInput isFloat'>
                      {getFieldDecorator('returnTime', {
                        rules: [{ required: true,message: '请输入预计归还时间!' }],
                      })(
                        <DatePicker format="YYYY-MM-DD HH:mm:ss"/>
                      )}
                    </FormItem>
                    <FormItem label="表格编号"  className='lendInput isFloat'>
                      {getFieldDecorator('lendFormNum', {
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
const Lendpageform = Form.create()(Lendpage);
export default Lendpageform;