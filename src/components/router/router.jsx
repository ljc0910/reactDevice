import './router.css'
import React from 'react'
import {
	BrowserRouter as Router,
	Route,
	Link
  } from 'react-router-dom';
import Devicelist from '../content/devicelist/devicelist.jsx'
import Lendinfo from '../content/lendinfo/lendinfo.jsx'
import Footer  from '../footer/footer.jsx'
import Lendpage from '../content/devicelist/lendpage/lendpage.jsx'

class Setrouter extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			isDeviceList:true,
			date: ''
		}
	}
	addActive(bool){
		this.setState({isDeviceList: bool});
	}
	render(){
		return (
			<Router>
				<div className = 'setRouter'>
					<div  className = 'Header'>
						<ul>
							<li><Link to="/reactDevice" onClick = {this.addActive.bind(this,true)} className = {this.state.isDeviceList?'isAcitive':''}>设备列表</Link></li>
							<li><Link to="/Lendinfo" onClick = {this.addActive.bind(this,false)} className = {this.state.isDeviceList?'':'isAcitive'}>借出统计</Link></li>
						</ul>
					</div>
					<div className='Content'>
						<Route exact path="/reactDevice" component={Devicelist}/>
						<Route path="/Lendinfo" component={Lendinfo}/>
					</div>
					<Footer />
				</div>
			</Router>	
		)
	}
}

export default Setrouter;