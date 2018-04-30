import React from 'react';

import { connect } from 'react-redux';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupDropdown,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
 } from 'reactstrap';

import classnames from 'classnames';

import AdminNav from "../NavBars/AdminNav";
import { adminActions } from "../../apiActions";

import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
Charts(FusionCharts);

class Dashboard extends React.Component{
	
	constructor(props) {
	    super(props);

	    this.toggle = this.toggle.bind(this);
	    this.onClick = this.onClick.bind(this);
	    this.onChange = this.onChange.bind(this);
	    this.onClick2 = this.onClick2.bind(this);
	    this.onChange2 = this.onChange2.bind(this);
	    this.state = {
	        activeTab: '1',
	        moviename: '',
	        moviename2: ''
	    };
	}

	toggle(tab) {
	    if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
	    }
	}

	onChange2(e){
		this.setState({moviename2: e.target.value})
	}

	onChange(e){
		this.setState({moviename: e.target.value})
	}

	onClick2(e){
		const { dispatch } = this.props;
		dispatch(adminActions.getReviews(this.state.moviename2));
	}

	onClick(e){
		console.log(this.state.moviename);
		const { dispatch } = this.props;
		dispatch(adminActions.getCitywiseRevenue(this.state.moviename));
	}

	componentDidMount(){
		const { dispatch } = this.props;
		dispatch(adminActions.getTopMovies());
		dispatch(adminActions.getTopHalls());
		dispatch(adminActions.getClicks());
	}

  	render() {
	  	const { admin } = this.props;

	  	let topmoviesele = null;
	  	let citywiseele = null;
	  	let tophallsele = null;
	  	let pageClicksele = null;
	  	let reviewsele = null
	  	if(admin.topmovies){
	  		let dataSource = {
		        chart: {
		            caption: "Top movies with Revenue",
		            numberPrefix:"$",
		            plottooltext: "Movie : $label Total Revenue : $datavalue",
		            theme: "ocean"
		        },
		        data: admin.topmovies.map(movie => ({ label: movie[0], value: Math.round(+movie[1]*100)/100 }))
		    };
		    let chartConfigs = {
		        id: "movies-revenue-chart",
		        renderAt: "movies-revenue-chart-container",
		        type: "column2d",
		        width: "80%",
		        height: 400,
		        dataFormat: "json",
		        dataSource: dataSource
		    };

		    topmoviesele = < ReactFC {...chartConfigs} />
	  	}
	  	if(admin.citywiselist){
	  		let data = [];
	  		for(let key in admin.citywiselist)
	  			data.push({label: key, value: Math.round(+admin.citywiselist[key]*100)/100})

	  		let dataSource = {
		        chart: {
		            caption: "City Wise Revenue",
		            numberPrefix:"$",
		            plottooltext: "City : $label Total Revenue : $datavalue",
		            theme: "ocean"
		        },
		        data
		    };
		    let chartConfigs = {
		        id: "citywise-revenue-chart",
		        renderAt: "citywise-revenue-chart-container",
		        type: "column2d",
		        width: "80%",
		        height: 400,
		        dataFormat: "json",
		        dataSource: dataSource
		    };

	  		citywiseele = < ReactFC {...chartConfigs} />
	  	}
	  	if(admin.tophalls){
	  		let data = [];
	  		for(let i in admin.tophalls)
	  			data.push({label: admin.tophalls[i][0], value: admin.tophalls[i][1]})

	  		let dataSource = {
		        chart: {
		            caption: "Top Halls That Sold Most Tickets",
		            plottooltext: "Movie Hall : $label Total Revenue : $datavalue",
		            theme: "ocean"
		        },
		        data
		    };
		    let chartConfigs = {
		        id: "hallwise-revenue-chart",
		        renderAt: "hallwise-revenue-chart-container",
		        type: "pie3d",
		        width: "80%",
		        height: 400,
		        dataFormat: "json",
		        dataSource: dataSource
		    };

	  		tophallsele = < ReactFC {...chartConfigs} />
	  	}
	  	if(admin.clicks){
	  		let data = [];
	  		for(let key in admin.clicks)
	  			data.push({label: key, value: admin.clicks[key]});

	  		let dataSource = {
		        chart: {
		            caption: "Clicks per user page",
		            showpercentvalues:"1",
		            showpercentintooltip:"0",
		            plottooltext: "Page : $label Total Clicks : $datavalue",
		            theme: "ocean"
		        },
		        data
		    };
		    let chartConfigs = {
		        id: "clicks-chart",
		        renderAt: "clicks-chart-container",
		        type: "pie3d",
		        width: "80%",
		        height: 400,
		        dataFormat: "json",
		        dataSource: dataSource
		    };

	  		pageClicksele = < ReactFC {...chartConfigs} />
	  	}
	  	if(admin.reviews){
	  		let data = [];
	  		for(let key in admin.reviews)
	  			data.push({label: key, value: admin.reviews[key]});

	  		let dataSource = {
		        chart: {
		            caption: "Reviews",
		            showpercentvalues:"1",
		            showpercentintooltip:"0",
		            plottooltext: "Rating : $label No. of users : $datavalue",
		            theme: "ocean"
		        },
		        data
		    };
		    let chartConfigs = {
		        id: "reviews-chart",
		        renderAt: "reviews-chart-container",
		        type: "column2d",
		        width: "80%",
		        height: 400,
		        dataFormat: "json",
		        dataSource: dataSource
		    };

	  		reviewsele = < ReactFC {...chartConfigs} />
	  	}

	    return (
	      <div>
	      <div><AdminNav /><br/><br/><br/><br/></div>

	      <div class="container">
				<div class="row"><div class="col-sm-1"></div><div class="col-sm-10">
	        <Nav tabs>
	          <NavItem>
	            <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
	              Top Movies
	            </NavLink>
	          </NavItem>
	          <NavItem>
	            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
	              Movie Revenues
	            </NavLink>
	          </NavItem>
	          <NavItem>
	            <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }}>
	              Top Halls
	            </NavLink>
	          </NavItem>
	          <NavItem>
	            <NavLink className={classnames({ active: this.state.activeTab === '4' })} onClick={() => { this.toggle('4'); }}>
	              Page Clicks
	            </NavLink>
	          </NavItem>
	          <NavItem>
	            <NavLink className={classnames({ active: this.state.activeTab === '5' })} onClick={() => { this.toggle('5'); }}>
	              Reviews
	            </NavLink>
	          </NavItem>
	        </Nav>
	        <TabContent activeTab={this.state.activeTab}>
	          <TabPane tabId="1">
	          {topmoviesele}
	          </TabPane>
	          <TabPane tabId="2">
	            <InputGroup>
		          <Input onChange={this.onChange} placeholder="Type a Movie Name......"/>
					&nbsp;
	      			&nbsp;
		          <InputGroupAddon addonType="prepend"><Button color="primary" onClick={this.onClick}>Search Movie</Button></InputGroupAddon>
		        </InputGroup>
		        {citywiseele}
	          </TabPane>
	          <TabPane tabId="3">
	            {tophallsele}
	          </TabPane>
	          <TabPane tabId="4">
	            {pageClicksele}
	          </TabPane>
	          <TabPane tabId="5"><br/>
	          	<InputGroup>
		          <Input onChange={this.onChange2} placeholder="Type a Movie Name......"/>
					&nbsp;
	      			&nbsp;
		          <InputGroupAddon addonType="prepend"><Button color="primary" onClick={this.onClick2}>Search Movie</Button></InputGroupAddon>
		        </InputGroup>
	            {reviewsele}
	          </TabPane>
	        </TabContent>
	        </div><div class="col-sm-1"></div></div></div>
	      </div>
	    );
    }

}

function mapStateToProps(state) {
    const { admin } = state;
    return {
        admin
    };
}

const AdminDashboard = connect(mapStateToProps)(Dashboard);
export default AdminDashboard;