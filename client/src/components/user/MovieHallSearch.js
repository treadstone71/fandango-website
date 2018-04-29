import React from 'react';
import MainNav from '../../mainNav.js';
import { connect } from 'react-redux';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';import {
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
 } from 'reactstrap';
import {  Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Search extends React.Component{
    constructor(){
        super();

        this.toggle = this.toggle.bind(this);
        this.onClick2 = this.onClick2.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChange2 = this.onChange2.bind(this);
        this.state = {
            activeTab: '1',
            moviename: "",
            category: "",
            hallname: ""
        };

    }

    onChange3(e){
        this.setState({ hallname: ""})
    }

    onChange2(e){
        this.setState({ category: e.target.value });
    }

    onChange(e){
        this.setState({moviename: e.target.value})
    }

    onClick2(e){

    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <div class="container">
            <MainNav /><br/><br/><br/><br/>
            <div class="row"><div class="col-sm-1"></div><div class="col-sm-10">
            <Nav tabs>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                  Movies
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                  Halls
                </NavLink>
              </NavItem>
            </Nav><br/>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <InputGroup>
                  <Input onChange={this.onChange} placeholder="Type a Movie Name to search......"/>
                    &nbsp;
                    &nbsp;
                  <InputGroupAddon addonType="prepend"><Button color="primary" onClick={this.onClick2}>Search Movie</Button></InputGroupAddon>
                </InputGroup><br/>
                <InputGroup>
                  <Input onChange={this.onChange2} placeholder="Type a Movie Category to search......"/>
                    &nbsp;
                    &nbsp;
                  <InputGroupAddon addonType="prepend"><Button color="primary" onClick={this.onClick2}>Search </Button></InputGroupAddon>
                </InputGroup><br/><br/>
                <div class="row"><div class="col-1"></div>
                    <div class="col-10">
                        <div class="card card-body bg-light">
                            <div class="row">
                                <div class="col-6">
                                    <img src= "http://localhost:3000/movieimages/1000.jpg" alt="" class="img-rounded img-responsive" width="300" height="300" />
                                </div>
                                <div class="col-6">
                                    <p><a href="/"><b>Avengers - Infinity War</b></a></p>
                                    <p><b>Halls : </b><a href="/">Sierra</a>,<a href="/">Great Mall</a></p>
                                    <p><b>Characters : </b> Robert Downey Jr, Chris Pratt ... </p>
                                    <p><b>Movie Time : </b>120 minutes</p>
                                    <p><b>Movie Rating : </b>3.5</p>
                                </div>
                            </div>
                        </div>
                    </div><div class="col-1"></div>
                </div>
              </TabPane>
              <TabPane tabId="2">
                <InputGroup>
                  <Input onChange={this.onChange3} placeholder="Type a Hall Name to search......"/>
                    &nbsp;
                    &nbsp;
                  <InputGroupAddon addonType="prepend"><Button color="primary" onClick={this.onClick2}>Search Movie</Button></InputGroupAddon>
                </InputGroup><br/>
                <div class="row"><div class="col-1"></div>
                    <div class="col-10">
                        <div class="card card-body bg-light">
                            <div class="row">
                                <div class="col-6">
                                    <img src= "http://localhost:3000/hallimages/1018.jpg" alt="" class="img-rounded img-responsive" width="300" height="300" />
                                </div>
                                <div class="col-6">
                                    <p><a href="/"><b>Great Mall Century</b></a></p>
                                    <p><b>Movies : </b><a href="/">The Bourne Identity</a>,<a href="/">The icarus Agenda</a></p>
                                    <p><b>Price : </b> 15$ </p>
                                    <p><b>Movie Time : </b>120 minutes</p>
                                </div>
                            </div>
                        </div>
                    </div><div class="col-1"></div>
                </div>
              </TabPane>
            </TabContent>
            </div><div class="col-sm-1"></div></div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return {
        user
    };
}

const MovieHallSearch = connect(mapStateToProps)(Search);
export default MovieHallSearch;