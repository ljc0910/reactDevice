import React from 'react'
import store from '../../../store/store.js';
import { lendDevice,returnDevice }  from '../../../store/actions/device-actions';
import { updata } from '../../../store/actions/updata-actions'
import './devicelist.css'
import { Input,Select,Table,Tag,Pagination,message, Popconfirm } from 'antd';
import axios from 'axios';
import Lendpage from './lendpage/lendpage.jsx'  
import Returnpage from './returnpage/returnpage.jsx'  
import Addpage from './addpage/addpage.jsx'  
message.config({    //message配置
    duration: 1,    //默认时长
    maxCount: 1     //最大显示数
});
const Search = Input.Search;
const Option = Select.Option;

const perPage = 10;//table 每页展示数量
class Devicelist extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            deviceTableData:[],
            pageNum:1,            
            pageNums:1, 
            search:'',
            loanType:-1,
            isDelete:-1,
            lendNum:0,
            returnNum:0
        },
        store.subscribe(() =>{      //监听store state
            this.setState({
                lendNum:store.getState().deviceReducer.lendList.length,
                returnNum:store.getState().deviceReducer.returnList.length,
            })
            if(store.getState().updataReducer.bol.bol == true){     //重新获取列表
                this.getDeviceList()
            }
        }),
        this.columns = [{
            title: '',
            width: 40,
            key:'daizi',
            render: tags =>{
                // console.log(tags)
                if(tags.isDelete==="上线中"){
                    return <div className = 'devicelist-btn'>
                                <span className="iconfont icon-daizi" onClick = {()=>{
                                    if(tags.loanType==='持有'){
                                        store.dispatch(lendDevice({
                                            id:tags.id,
                                            phoneType:tags.phoneType,
                                            assetNum:tags.assetNum
                                        }))
                                    }else{
                                        store.dispatch(returnDevice({
                                            id:tags.id,
                                            phoneType:tags.phoneType,
                                            assetNum:tags.assetNum
                                        }))
                                    }
                                }}></span>
                            </div>
                }else{
                    return null
                }
            },
          },{
            title: '资产编号',
            dataIndex: 'assetNum',
            key:'assetNum'
          }, {
            title: '品牌',
            dataIndex: 'brand',
            key:'brand'
          }, {
            title: '手机型号',
            dataIndex: 'phoneType',
            key:'phoneType'
          }, {
            title: '系统版本',
            dataIndex: 'systemVersion',
            key:'systemVersion'
          }, {
            title: 'RAM',
            dataIndex: 'RAM',
            key:'RAM'
          }, {
            title: 'ROM',
            dataIndex: 'ROM',
            key: 'ROM'
          }, {
            title: '借出状态',
            dataIndex: 'loanType',
            key:'loanType'
          }, {
            title: '出借人',
            dataIndex: 'lendMan',
            key:'lendMan'
          },{
            title: '状态',
            dataIndex: 'isDelete',
            key:'isDelete'
          },{
            title: '',
            width: 80,
            key:'btn',
            render: tags => (
              <ul className = 'devicelist-btn'>
                  <li className="iconfont icon-xiangqing"></li>
                  <li className="iconfont icon-xiugai">
                     <Addpage id={tags.id}/>
                  </li>
                  <Popconfirm title="Are you sure delete this device?" onConfirm={()=>{
                      axios.post('http://106.12.22.249:4000/api/deletePhone',{
                        id: tags.id, //手机id
                      }).then(res=>{
                        if(res.data.success){
                            store.dispatch(updata({
                                bol:true
                            }))
                            message.success(res.data.message)
                        }else{
                            message.error(res.data.message)
                        }
                      })
                  }} onCancel={()=>{
                      message.info('取消删除！')
                  }} okText="Yes" cancelText="No">
                    <li className="iconfont icon-shanchu" ></li>
                  </Popconfirm>
              </ul>
            ),
          }];
    }

    componentDidMount() {
        this.getDeviceList()
        this.setState({
            lendNum:store.getState().deviceReducer.lendList.length,
            returnNum:store.getState().deviceReducer.returnList.length
        })
    }
    getDeviceList(){
        axios.get('http://106.12.22.249:4000/api/getPhoneList',{
            params:{
                search:this.state.search,
                loanType:this.state.loanType,
                pageNum:this.state.pageNum,
                perPageNum:perPage,
                isDelete:this.state.isDelete,
                ts:Date.parse(new Date())
            }
        },message.loading('loading..', 0)).then(res=>{
            if(res.data.success){
                store.dispatch(updata({
                    bol:false
                }))
                message.success('数据请求成功！',0.1);
                var tableData = res.data.data
                res.data.data.forEach((v,i)=>{
                    tableData[i].isDelete = v.isDelete==0?'上线中':'已下线'
                    if(v.loanType==1){
                        tableData[i].loanType = '已借出'
                    }else if(v.loanType==2){
                        tableData[i].loanType = '已逾期'
                    }else{
                        tableData[i].loanType = '持有'
                    }
                })
                this.setState({
                    deviceTableData:tableData,
                    pageNums:res.data.pageNums * perPage
                })
            }else{
                message.error('网络错误，请重试！');
            }
        }).catch(()=>{
            message.error('接口异常，请联系管理员！');
        })
    }
    searchVal(value){
        this.setState({ //setState并不是立即执行，需要走完react生命周期，到达render才执行。它的第二个参数是回调函数，把需要执行的操作写在回调函数里。
            search:value
        },()=>{
            this.getDeviceList()
        })
    }
    stateSelect(value){
        this.setState({ 
            loanType:value
        },()=>{
            this.getDeviceList()
        })
    }
    onlineSelect(value){
        this.setState({ 
            isDelete:value
        },()=>{
            this.getDeviceList()
        })
    }
    changePage(value){
        this.setState({ 
            pageNum:value
        },()=>{
            this.getDeviceList()
        })
    }
    render(){
        const { deviceTableData, pageNum, pageNums,search, loanType,isDelete,lendNum,returnNum} = this.state;
        return (
            <div className = 'devicelist'>
                <div className = 'devicelist-filter'>
                    <Search
                        placeholder="搜索编号、品牌、型号"
                        onSearch={this.searchVal.bind(this)}
                        style={{ width: 200 }}
                    />
                    <Select defaultValue={-1} style={{ width: 120 }} onChange={this.stateSelect.bind(this)}>
                        <Option value={-1}>全部</Option>
                        <Option value={0}>持有</Option>
                        <Option value={1}>已借出</Option>
                        <Option value={2}>已逾期</Option>
                    </Select>
                    <Select defaultValue={-1} style={{ width: 120 }} onChange={this.onlineSelect.bind(this)}>
                        <Option value={-1}>全部</Option>
                        <Option value={0}>上线</Option>
                        <Option value={1}>下线</Option>
                    </Select>
                    <ul className= 'devicelist-btngroup'>
                        <li className = 'btn btn-add' >
                            +
                            <Addpage />
                        </li>
                        <li className = {lendNum>0?'btn btn-lend':'btn'}>
                            借
                            <Lendpage/>
                            <span className ={lendNum>0?'':'isHide'}>{lendNum}</span>
                        </li>
                        <li className = {returnNum>0?'btn btn-return':'btn'}>
                            还
                            <Returnpage />
                            <span className ={returnNum>0?'':'isHide'}>{returnNum}</span>                            
                        </li>
                    </ul>
                </div>
                <div className = 'devicelist-table'>
                    <Table columns={this.columns} dataSource={deviceTableData} size="middle" pagination = {false} rowKey={(record)=>{return record._id}} rowClassName={(record,index)=>{
                        if(record.loanType==='已借出'){
                            return 'isLend'
                        }else if(record.loanType==='已逾期'){
                            return 'isLimit'
                        }else{
                            return 
                        }
                    }}/>
                    <Pagination defaultCurrent={1} total={pageNums} pageSize = {perPage} current={pageNum} onChange={this.changePage.bind(this)} />
                </div>
            </div>
        )
    }
}

export default Devicelist;