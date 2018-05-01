import React from 'react';
import MovieNav from '../NavBars/MovieNav';
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

class SearchMovie extends React.Component{
    constructor(props){
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            activeTab: '1',
            moviename: ''
        };
    }

    onChange(e){
        this.setState({moviename: e.target.value})
    }

    onClick(e){
        console.log(this.state.moviename);
        const { dispatch } = this.props;
        dispatch(adminActions.getMovie(this.state.moviename));
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
                <div class="row">
                <div class="col-sm-6">
                <img src={"http://localhost:3000/movieimages/1001.jpeg"} alt="" class="img-rounded img-responsive" />
                </div>
                <br />
                <div class="col-sm-6">
                <a href={"/madmin/movie/" + details.movie_id}><h4>{details.title}</h4></a>
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
        Search Movie
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

export default connect(mapStateToProps)(SearchMovie);