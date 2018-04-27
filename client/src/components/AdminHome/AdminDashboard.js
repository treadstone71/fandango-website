import React from 'react';

import { connect } from 'react-redux';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import AdminNav from "../NavBars/AdminNav";
import { adminActions } from "../../apiActions";

import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
Charts(FusionCharts);
var myDataSource = {
        chart: {
            caption: "Age profile of website visitors",
            subcaption: "Last Year",
            startingangle: "120",
            showlabels: "0",
            showlegend: "1",
            enablemultislicing: "0",
            slicingdistance: "15",
            showpercentvalues: "1",
            showpercentintooltip: "0",
            plottooltext: "Age group : $label Total visit : $datavalue",
            theme: "ocean"
        },
        data: [{
            label: "Teenage",
            value: "1250400"
        }, {
            label: "Adult",
            value: "1463300"
        }, {
            label: "Mid-age",
            value: "1050700"
        }, {
            label: "Senior",
            value: "491000"
        }]
    };

    var chartConfigs = {
        id: "age-profile-chart",
        renderAt: "age-profile-chart-container",
        type: "pie3d",
        width: 500,
        height: 400,
        dataFormat: "json",
        dataSource: myDataSource
    };

class Dashboard extends React.Component{
	
	constructor(props) {
	    super(props);

	    this.toggle = this.toggle.bind(this);
	    this.state = {
	        activeTab: '1'
	    };
	}

	toggle(tab) {
	    if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
	    }
	}

	componentDidMount(){
		const { dispatch } = this.props;
		dispatch(adminActions.getTopMovies());
	}

  	render() {
	  	const { admin } = this.props;

	  	let topmoviesele = null;
	  	if(admin.topmovies){
	  		let dataSource = {
		        chart: {
		            caption: "Top 10 movies with Revenue",
		            subcaption: "Last Year",
		            numberPrefix:"$",
		            plottooltext: "Movie : $label Total Revenue : $datavalue",
		            theme: "ocean"
		        },
		        data: admin.topmovies.map(movie => ({ label: movie[0], value: movie[1] }))
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
	        </Nav>
	        <TabContent activeTab={this.state.activeTab}>
	          <TabPane tabId="1">
	          {topmoviesele}
	          </TabPane>
	          <TabPane tabId="2">
	            yoyomA2
	          </TabPane>
	          <TabPane tabId="3">
	            yoyomA2
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