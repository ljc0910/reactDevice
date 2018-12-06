import React from 'react'
import { Table } from 'antd';
import axios from 'axios';
import {message} from 'antd'
import { Pagination } from 'antd';
import './lendinfo.css'
message.config({    //message配置
    duration: 1,    //默认时长
    maxCount: 1     //最大显示数
});
const columns = [{
    title: '借出天数',
    dataIndex: 'totalTime',
  }, {
    title: '出借人',
    dataIndex: 'lendMan',
  }, {
    title: '借出时间',
    dataIndex: 'lendTime',
  }, {
    title: '归还时间',
    dataIndex: 'returnTime',
  }, {
    title: '借出设备型号',
    dataIndex: 'phoneType',
  }, {
    title: '设备资产编号',
    dataIndex: 'assetNum',
  }];
  const perPage = 10;//table 每页展示数量
class Lendinfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            deviceTableData:[],
            pageNum:1,
            pageNums:1
        }
    }
    componentDidMount() {
        this.getDeviceList()
    }
    getDeviceList(){
        axios.get('http://106.12.22.249:4000/api/getLendDetail',{
            params:{
                pageNum:this.state.pageNum,
                ts:Date.parse(new Date())
            }
        },message.loading('loading..', 0)).then(res=>{
            if(res.data.success){
                message.success('数据请求成功！',0.1);
                res.data.data.forEach((v)=>{
                    var  curTime = v.returnTime?v.returnTime:new Date();
                    var  curDate = new Date(curTime).getTime() - new Date(v.lendTime).getTime() 
                    v.totalTime  = Math.ceil((curDate)/(3600*24*1000)) + "天";
                })
                this.setState({
                    deviceTableData:res.data.data,
                    pageNums:res.data.pageNums * perPage
                })
            }else{
                message.error('网络错误，请重试！');
            }
        }).catch(()=>{
            message.error('接口异常，请联系管理员！');
        })
    }
    changePage(value){
        
    }
    render(){
        return(
            <div className = 'lendInfo'>
                <Table columns={columns} dataSource={this.state.deviceTableData} size="middle" pagination = {false} rowKey={(record)=>{return record.assetNum}}/>
                <Pagination defaultCurrent={1} total={this.state.pageNums} pageSize = {perPage} onChange={this.changePage.bind(this)} />
            </div>
        )
    }
}

export default Lendinfo;