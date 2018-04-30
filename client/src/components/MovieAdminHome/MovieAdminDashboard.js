import React from 'react';
import { connect } from 'react-redux';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupDropdown,
    Input

} from 'reactstrap';

import MovieNav from "../NavBars/MovieNav";
import {adminActions} from "../../apiActions";

class MovieAdminDashboard extends React.Component{

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            activeTab: '1',
            moviename: ''
        };
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

    onClick(e){
        console.log(this.state.moviename);
        const { dispatch } = this.props;
        dispatch(adminActions.getCitywiseRevenue(this.state.moviename));
    }




    render(){
        return(
            <div>
                <div><MovieNav /><br/><br/><br/><br/></div>

                <div class="container">
                    <div class="row"><div class="col-sm-1"></div><div class="col-sm-10">
                        <Nav tabs>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                                    Revenue By Movies                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                                    Cancel Bookings
                                </NavLink>
                            </NavItem>
                            {/*<NavItem>*/}
                                {/*<NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }}>*/}
                                    {/*Top Halls*/}
                                {/*</NavLink>*/}
                            {/*</NavItem>*/}
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                {/*{topmoviesele}*/}
                            </TabPane>
                            <TabPane tabId="2">
                                <InputGroup>
                                    <Input onChange={this.onChange} placeholder="Type a Movie Name......"/>
                                    &nbsp;
                                    &nbsp;
                                    <InputGroupAddon addonType="prepend"><Button color="primary" onClick={this.onClick}>Search Movie</Button></InputGroupAddon>
                                </InputGroup>
                                {/*{citywiseele}*/}
                            </TabPane>
                            <TabPane tabId="3">
                                {/*{tophallsele}*/}
                            </TabPane>
                        </TabContent>
                    </div><div class="col-sm-1"></div></div></div>
            </div>



    );

    }

}

export default MovieAdminDashboard;