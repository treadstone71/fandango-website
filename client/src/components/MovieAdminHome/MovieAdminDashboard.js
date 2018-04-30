import React from 'react';

import MovieNav from "../NavBars/MovieNav";
import { connect } from 'react-redux';
import { madminActions } from "../../apiActions/madmin.actions.js";
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

class MovieAdminDashboard extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            activeTab: '1',
            moviename: ''
        };
        this.toggle = this.toggle.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onClick1 = this.onClick1.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChange1 = this.onChange.bind(this);

    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    onChange(e){
        this.setState({moviename: e.target.value})
    }

    onChange1(e){
        this.setState({moviename: e.target.value})
    }

    onClick(e){
        console.log(this.state.moviename);
        const { dispatch } = this.props;
        dispatch(madminActions.getMovieRevenue(this.state.moviename));
    }

    onClick1(e){
        console.log(this.state.moviename);
        const { dispatch } = this.props;
        dispatch(madminActions.getMovieBilling(this.state.moviename));
    }




    render(){
        const { admin } = this.props;
        let movierevenueEle = null;
        let moviebillingele = null

        if(admin.movie){
            let revenue = admin.movie.map(m => <tr>
                <td><a href={"/madmin/movie/"+ m.movieid}>{m.movietitle}</a></td>
                <td>{m.revenue}</td>
            </tr>)

            movierevenueEle =
        <div><br/>
            <label>Movie Revenue : </label><br/><br/>
            <table class="table">
                <thead>
                <tr>
            <th>Movie Name</th>
            <th>Total Revenue</th>
            </tr>
            </thead>
            <tbody>
            {revenue}
            </tbody>
            </table>
            </div>

        }

        return(
            <div>
            <div><MovieNav /><br/><br/><br/><br/>
            </div>
            <div class="container">
            <div class="row">
            <div class="col-sm-1">
            </div>
            <div class="col-sm-10">
            <Nav tabs>
        <NavItem>
        <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
        Search Movie For Revenue
        </NavLink>
        </NavItem>
        <NavItem>
        <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
        Search Movie For Billing
        </NavLink>
        </NavItem>
        </Nav>
        <br/>
        <br/>
        &nbsp;
    &nbsp;
    <div class="container col-sm-offset-7 col-md-offset-7 col-lg-offset-12 col-sm-7 col-md-7 col-lg-12">
            <TabContent activeTab={this.state.activeTab}>
    <TabPane tabId="1">
            <InputGroup>
            <Input onChange={this.onChange} placeholder="Type a Movie Name for Revenue......" autoFocus/>
        &nbsp;
    &nbsp;
    <InputGroupAddon addonType="prepend"><Button color="primary" onClick={this.onClick}>Search Movie</Button></InputGroupAddon>
        </InputGroup>
        <br />
        {movierevenueEle}
        </TabPane>
        <TabPane tabId="2">
            <InputGroup>
            <Input onChange={this.onChange1} placeholder="Type a Movie Name for Billing Info......" />
            &nbsp;
    &nbsp;
    <InputGroupAddon addonType="prepend"><Button color="primary" onClick={this.onClick1}>Search Movie</Button></InputGroupAddon>
        </InputGroup>
        <br />
        {/*{ moviehallEle}*/}
        </TabPane>
        </TabContent>
        </div>
        </div>
        <div class="col-sm-1">
            </div>
            </div>
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

export default connect(mapStateToProps)(MovieAdminDashboard);