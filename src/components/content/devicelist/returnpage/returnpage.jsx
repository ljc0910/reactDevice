import React from 'react'
import './returnpage.css'
import { Modal, Button ,notification} from 'antd'
import axios from 'axios';
import store from '../../../../store/store.js';
import { returnDevice }  from '../../../../store/actions/device-actions';
import { updata } from '../../../../store/actions/updata-actions'
class Returnpage extends React.Component{
    constructor(props){
        super(props)
        this.state = {       
            visible: false,
            returnList:[]
        },
        store.subscribe(() =>{
          this.setState({
            returnList:store.getState().deviceReducer.returnList
          })
          if(store.getState().deviceReducer.returnList.length===0){
            this.setState({
              visible:false
            })
          }
        })
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      }
    
      handleOk = (e) => {
        var mobileId = '';
        this.state.returnList.forEach (v=> {
          mobileId = mobileId + v.id + ','
        })
        axios.post('http://106.12.22.249:4000/api/returnPhone',{
          mobileId: mobileId, //手机id
        }).then(res=>{
          if (res.data.success) {
            var theList = []
                this.state.returnList.forEach(v=>{
                  theList.push(Object.assign({},v))
                })
                theList.forEach(v=>{
                  store.dispatch(returnDevice({
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
                description: '当前归还的设备资产编号为'+assList,
              });
          }
        })
      }
    
      handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }
      deleteDev = (i) =>{     //移除以选择设备
        var returnList = this.state.returnList[i]
        store.dispatch(returnDevice({
          id: returnList.id,
          phoneType: returnList.phoneType,
          assetNum: returnList.assetNum
      }))
        this.setState({
          returnList: this.state.returnList,
        });
      }

    render(){
        const { visible, returnList } = this.state;
        return(
            <div>
               <div className='child-returnbtn' onClick={this.showModal}>
                 
                </div>
                <Modal title="归还设备"
                  className='returnAlert'
                  visible={visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <ul className="returnDeviceList" >
                    {returnList.map((v,i)=>
                    <li key={v.id} onClick = {this.deleteDev.bind(this,i)}>
                        <i className="cover"></i>
                        <h3>{v.phoneType}</h3>
                        <p>{v.assetNum}</p>
                    </li> 
                    )}
                  </ul>
                </Modal>
            </div>
        )
    }
}

export default Returnpage;