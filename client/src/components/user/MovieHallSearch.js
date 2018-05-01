import React from 'react';
import UserNav from '../NavBars/UserNav.js';
import { connect } from 'react-redux';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { userActions } from "../../apiActions";
import classnames from 'classnames';
import {
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
        this.onClick3 = this.onClick3.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChange2 = this.onChange2.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onChange3 = this.onChange3.bind(this);
        this.state = {
            activeTab: '1',
            moviename: "",
            category: "",
            hallname: ""
        };

    }

    onChange3(e){
        this.setState({ hallname: e.target.value})
    }

    onChange2(e){
        this.setState({ category: e.target.value });
    }

    onChange(e){
        this.setState({moviename: e.target.value})
    }
    //for category
    onClick3(e){
        console.log(this.state, e.target.name);
        const { category } = this.state;
        const { dispatch } = this.props;
        dispatch(userActions.getCategory(category));
    }

    //for movies
    onClick(e){
        console.log(this.state, e.target.name);
        const { moviename } = this.state;
        const { dispatch } = this.props;
        dispatch(userActions.getMovieUser(moviename));
    }

    //for halls
    onClick2(e){
        console.log(this.state.hallname);
        const { hallname } = this.state;
        const { dispatch } = this.props;
        dispatch(userActions.getHallUser(hallname));
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {

        const { user } = this.props;
        let moviesele = null;
        let hallele = null

        if(user.movie){
            moviesele = user.movie.map(movie => <div class="row"><div class="col-1"></div>
                                        <div class="col-10">
                                            <div class="card card-body bg-light">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <img src= {"http://localhost:3000/movieimages/" + movie.movie_id + ".jpg"} alt="" class="img-rounded img-responsive" width="300" height="300" />
                                                    </div>
                                                    <div class="col-6">
                                                        <p><a href={"/movie/"+movie.movie_id}><b>{movie.title}</b></a></p>
                                                        <p><b>Characters : </b> {movie.characters.toString()} </p>
                                                        <p><b>Movie Time : </b>{movie.movie_length}</p>
                                                        <p><a href={movie.trailer}>Click to see trailer</a></p>
                                                        <p><b>Available in : </b>{movie.seeitin.toString()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div><div class="col-1"></div>
                                    </div>)
        }
        if(user.hall){
            hallele = <div class="row"><div class="col-1"></div>
                    <div class="col-10">
                        <div class="card card-body bg-light">
                            <div class="row">
                                <div class="col-6">
                                    <img src= {"http://localhost:3000/hallimages/" + user.hall.hall_id + ".jpg"} alt="" class="img-rounded img-responsive" width="300" height="300" />
                                </div>
                                <div class="col-6">
                                    <p><a href={"/"+user.hall.hall_id}><b>{user.hall.name}</b></a></p>
                                    <p><b>Movie Timings : </b>{user.hall.movie_times.toString()}</p>
                                    <p><b>Number of Tickets left : </b> {user.hall.num_tickets} </p>
                                    <p><b>Ticket Price : </b> {user.hall.ticket_price} </p>
                                    <p><b>Number of Screens : </b>{user.hall.screen_number.length}</p>
                                </div>
                            </div>
                        </div>
                    </div><div class="col-1"></div>
                </div>
        }
        return (
            <div class="container">
        <UserNav /><br/><br/><br/><br/>
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
                  <InputGroupAddon addonType="prepend"><Button color="primary" onClick={this.onClick}>Search Movie</Button></InputGroupAddon>
                </InputGroup><br/>
                <InputGroup>
                  <Input onChange={this.onChange2} placeholder="Type a Movie Category to search......"/>
                    &nbsp;
                    &nbsp;
                  <InputGroupAddon addonType="prepend"><Button color="primary" onClick={this.onClick3}>Search Category</Button></InputGroupAddon>
                </InputGroup><br/><br/>
                {moviesele}
              </TabPane>
              <TabPane tabId="2">
                <InputGroup>
                  <Input onChange={this.onChange3} placeholder="Type a Hall Name to search......"/>
                    &nbsp;
                    &nbsp;
                  <InputGroupAddon addonType="prepend"><Button color="primary" onClick={this.onClick2}>Search Movie</Button></InputGroupAddon>
                </InputGroup><br/>
                {hallele}
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