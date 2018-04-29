import React from 'react';
import AdminNav from '../NavBars/AdminNav';
import { connect } from 'react-redux';
import { adminActions } from "../../apiActions";
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

class SearchMovieHall extends React.Component{
    constructor(props){
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onClick1 = this.onClick1.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChange1 = this.onChange1.bind(this);

        this.state = {
            activeTab: '1',
            moviename: '',
            maoviehallname: ''
        };
    }

    onChange(e){
        this.setState({moviename: e.target.value})
    }
    onChange1(e){
        this.setState({moviehallname: e.target.value})
    }

    onClick(e){
        console.log(this.state.moviename);
        const { dispatch } = this.props;
        dispatch(adminActions.getMovie(this.state.moviename));
    }

    onClick1(e){
        console.log(this.state.moviehallname);
        const {dispatch} = this.props;
        dispatch(adminActions.getMovieHall(this.state.moviehallname));
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render(){
        const { admin } = this.props;

        let movieEle = null;
        let moviehallEle = null;
        if(admin.movie){
            let details = admin.movie;
            movieEle =
                <div class="jumbotron jumbotron-fluid">
               <div class="container">
                <div class='row'>
                <div class="col-sm-3">
                </div>
                <div class="col-sm-6">
                <div class="">
                <div class="row">
                <div class="col-sm-6">
                <a href={"/admin/movie/" + details.movie_id}><h4>{details.title}</h4></a>
               <p>
                <label> Trailer : </label>
           <a href={details.trailer}>Click To View</a>
            </p>
            <p>
                <label>Characters : </label>

            {details.characters}
                </p>
            <p>
                <label>Date : </label>
            {details.date}
            </p>
            <p>
                <label>Movie Length : </label>
            {details.movie_length}
            </p>
            <p>
                <label>See It In : </label>
            {details.seeitin}
            </p>
            </div>
            </div>
            </div>
            </div>
            <div class="col-sm-3">
                </div>
            </div>
            </div>
            </div>
        }
        if(admin.name){
            let details = admin.name;
            moviehallEle =
        <div class="jumbotron jumbotron-fluid">
                <div class="container">
                <div class='row'>
                <div class="col-sm-3">
                </div>
                <div class="col-sm-6">
                <div class="">
                <div class="row">
                <div class="col-sm-6">
                <img src= "" alt="" class="img-rounded img-responsive" />
                </div>
                <div class="col-sm-6">
                <a href={"/admin/moviehall/" + details.hall_id}><h4>{details.hall_id}</h4></a>
            <p>
            <label> User of Hall : </label>
            {details.username}
            </p>
            <p>
            <label>Name of Hall : </label>

            {details.name}
        </p>
            <p>
            <label>Total Tickets in Hall : </label>
            {details.num_tickets}
        </p>
            </div>
            </div>
            </div>
            </div>
            <div class="col-sm-3">
                </div>
                </div>
                </div>
                </div>

        }

        return(
            <div>
            <div><AdminNav /><br/><br/><br/><br/>
            </div>
            <div class="container">
            <div class="row">
            <div class="col-sm-1">
            </div>
            <div class="col-sm-10">
            <Nav tabs>
        <NavItem>
        <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
        Search Movie
        </NavLink>
        </NavItem>
        <NavItem>
        <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
        Search Movie Hall
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
            <Input onChange={this.onChange} placeholder="Type a Movie Name......" autoFocus/>
            &nbsp;
            &nbsp;
            <InputGroupAddon addonType="prepend"><Button color="primary" onClick={this.onClick}>Search Movie</Button></InputGroupAddon>
            </InputGroup>
        <br />
        {movieEle}
            </TabPane>
           <TabPane tabId="2">
            <InputGroup>
            <Input onChange={this.onChange1} placeholder="Type a Movie Hall Name......" />
            &nbsp;
            &nbsp;
         <InputGroupAddon addonType="prepend"><Button color="primary" onClick={this.onClick1}>Search Movie Hall</Button></InputGroupAddon>
        </InputGroup>
            <br />
        { moviehallEle}
        </TabPane>
            </TabContent>
            </div>
            </div>
            <div class="col-sm-1">
            </div>
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

export default connect(mapStateToProps)(SearchMovieHall);