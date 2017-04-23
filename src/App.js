import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import classNames from 'classnames';

class App extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<div>
				<Header />
				<div className="container" style={{width: '100%', padding: '0px', backgroundColor: '#333', borderBottom: '1px solid #464545'}}>
					<TabMenu />
				</div>
			</div>
			)
	}
}

const Header = () =>
<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', borderBottom: '1px solid #464545'}}>
	<p style={{color: 'white', fontSize: '20px', flexGrow: '1', marginBottom: '0', flexBasis: '25%', textAlign: 'left', marginLeft: '20px'}}><a style={{color: 'white'}} href="#"><span className="glyphicon glyphicon-menu-hamburger"></span></a></p>
	<h1 style={{paddingTop: '15px', paddingBottom: '15px', margin: '0', color: '#fff', flexGrow: '5', flexBasis: '50%'}}>CPR & FIST &#8482;</h1>	
	<p style={{color: 'white', fontSize: '20px', flexGrow: '1', marginBottom: '0', flexBasis: '25%', display:'flex', justifyContent: 'flex-end', marginRight:'20px', alignItems: 'center'}}>
		<img src="http://logan-may.com/wp-content/uploads/2017/04/Priority_Logan-e1491699002557.jpg" style={{borderRadius: '100px', width:'30px',  height:'30px', margin: '10px'}}/>
		<span className="glyphicon glyphicon-chevron-down" style={{fontSize: '16px'}}></span>
	</p>
</div>

class TabMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			view: this.props.active,
			graphVis: 'hidden',
			height: '0px',
			ticker: ''
		}
	}
	changeView(v) {
		if (v == 'best') {
			this.refs.tc.className="activeTab";
			this.refs.ta.className="inactive";
			this.refs.tp.className="inactive";
			this.refs.b.style.display = 'block';
			this.refs.v.style.display = 'none'; 
			this.refs.bv.style.display = 'none'; 
		} else if (v == 'vol') {
			this.refs.tp.className="activeTab";
			this.refs.ta.className="inactive";
			this.refs.tc.className="inactive";
			this.refs.bv.style.display = 'block';
			this.refs.v.style.display = 'none'; 
			this.refs.b.style.display = 'none'; 
		} else if(v == 'bestvol') {
			this.refs.ta.className="activeTab";
			this.refs.tp.className="inactive";
			this.refs.tc.className="inactive";
			this.refs.v.style.display = 'block';
			this.refs.bv.style.display = 'none'; 
			this.refs.b.style.display = 'none'; 
		}
	}
	fun(sym) {
		console.log(this);
		console.log(sym)
		this.setState({
			graphVis: 'visible',
			height: '400px',
			ticker: sym
		})
	}
	render() {
		return (
			<div style={{textAlign: 'center'}}>
				<ul className="nav nav-tabs" role="tablist" data-tabs="tabs" style={{textAlign: 'center', display: 'inline-block'}}>
					<li><a data-toggle="tab" ref="tc" style={{fontSize: '45px'}} onClick={() => this.changeView('best')}>Best Stocks</a></li>
					<li><a data-toggle="tab" ref="ta" className="activeTab" style={{fontSize: '45px'}} onClick={() => this.changeView('bestvol')}>Most Volatile</a></li>
					<li><a data-toggle="tab" ref="tp" style={{fontSize: '45px'}} onClick={() => this.changeView('vol')}>Best Volatile</a></li>
				</ul>
				<Graph view={this.state.graphVis} height={this.state.height} display={this.state.display}>{this.state.ticker}</Graph>
				<div className="tab-content" style={{marginTop: '40px'}}>
					<div style={{display: 'none'}} ref="b" id="clock">
						<Table getGraph={this.fun.bind(this)} collection="beststocks">Best Stocks to Buy</Table>
					</div>
					<div style={{display: 'none'}} ref="v" id="clock">
						<Table getGraph={this.fun.bind(this)} collection="volatile">Most Volatile Stocks</Table>
					</div>
					<div style={{display: 'none'}} ref="bv" id="clock">
						<Table getGraph={this.fun.bind(this)} collection="bestvol">Best Volatile Stocks to Buy</Table>
					</div>
				</div>
			</div>
		)
	}
}

class Graph extends React.Component {
	constructor(props) {
		super(props);
	}
	hideGraph() {
		this.refs.gc.style.opacity = '0';
		this.refs.gc.style.height = '0px'
		this.refs.c.style.height = '0px'
		this.refs.chev.style.display = 'none';
		this.refs.tit.style.display = 'none';
		this.refs.bar1.style.display = 'none';
		this.refs.bar2.style.display = 'none';
	}
	render() {
		if(this.props.view == 'visible') {
			this.refs.gc.style.opacity = '1';
			this.refs.gc.style.height = '550px'
			this.refs.c.style.height = '750px'
			this.refs.chev.style.display = 'block';
			this.refs.tit.style.display = 'block';
			this.refs.bar1.style.display = 'block';
			this.refs.bar2.style.display = 'block';			
		}
		return (
			<div id="wrapper" ref="c" style={{visibility: this.props.view, height: '0px'}}>
			 <h2 ref="tit" id="graph-title">{this.props.children} </h2>
			 <hr ref="bar1" />
			 <iframe style={{width:'85%'}} src="http://127.0.0.1:5000/" ref="gc" id="graph-container"></iframe>
			 <a ref="chev" onClick={this.hideGraph.bind(this)}><span className="glyphicon glyphicon-chevron-up"></span></a>
			 <hr ref="bar2"/>
			</div>
		)
	}
}

class Table extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			loaded: false
		}
	}
	componentDidMount() {
		if(this.props.collection) {
			console.log('fetching')
			var _this = this;
			var url = 'http://localhost:3000/' + this.props.collection;
			$.get(url, function(res) {
				console.log("got it")
				_this.setState({data: res, loaded:true});
			})
		}
	}
	getGraph(sym) {
		this.props.getGraph(sym);
		console.log(sym);
	}
	render() {
		var _this = this;
		if(this.state.loaded) {
			console.log(this.state.data)
			return (
				<div className="table-container" style={{ width: '85%', marginLeft: '7.5%', float:'left'}}>
					<p></p>
					<table className="table table-striped" style={{textAlign: 'left', zIndex:'100'}}>
		    		<thead>
		      		<tr style={{fontSize: '22px', borderBottom: '1px solid #464545'}}>
		        		<th>Company</th>
		        		<th>Volatility</th>
		        		<th>Score</th>
		        		<th>Suggestion</th>
				      </tr>
				      {
				      	JSON.parse(this.state.data).map(function(e) {
				      		var suggClass = '';
				      		var rowClass = 'row-class';
				      		if(e.Suggestion === 'BUY') {
				      			suggClass += 'buy';
				      			rowClass += ' row-buy'
				      		} else if(e.Suggestion === 'SELL') {
				      			suggClass += 'sell';
				      			rowClass += ' row-sell'
				      		} else if(e.Suggestion === 'HOLD') {
				      			suggClass += 'hold';
				      			rowClass += ' row-hold'
				      		}
				      		return (
				      			<tr key={e.Symbol} ref={e.Symbol} className={rowClass} onClick={() => _this.getGraph(e.Symbol)}>
				      				<th>{e.Name} ({e.Symbol})</th>
=				      				<th>{e.Volatility}</th>
				      				<th>{e.Rating}</th>
				      				<th className={suggClass}>{e.Suggestion}</th>
				      			</tr>
				      		)
				      	})
				      }
				    </thead>
				    <tbody>
				    </tbody>
			   	</table>
			   </div>
			)
		} else {
			return null
		}
	}
}

export default App;
