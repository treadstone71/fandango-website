import React from 'react';
import AdminNav from '../NavBars/AdminNav';
import { connect } from 'react-redux';
import { adminActions } from "../../apiActions/admin.actions.js";
import axios from 'axios';
import { history } from '../../_helpers/history';
var api = 'http://localhost:3000';

class MovieHallDetails extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username:"",
            password: "",
            name:"",
            movie_times:"",
            num_tickets:"",
            screen_number:"",
            ticket_price:"",
            movies:"",
            image:"",
            editing: false,
            disabled: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount(){
        console.log("Inside componentdidmount");
        const { dispatch } = this.props;
        let path = this.props.location.pathname.split('/');
        console.log(path, "this is path");
        if(path[1] == 'admin' && path.length == 4){
            this.getMovieHallInfo(path[3]);
        }
    }

    getMovieHallInfo(hall_id){
        var self = this
        axios(api + "/admin/moviehall/get_movie_hall_info?hall_id=" + hall_id, {
            method: "get",
            withCredentials: true
        }). then(function(res) {
            console.log(res.data);
            self.setState({
                username: res.data.hall_info.username,
                password: res.data.hall_info.password,
                hall_id: res.data.hall_info.hall_id,
                name: res.data.hall_info.name,
                movie_times: res.data.hall_info.movie_times,
                num_tickets: res.data.hall_info.num_tickets,
                screen_number: res.data.hall_info.screen_number,
                ticket_price: res.data.hall_info.ticket_price,
                movies: res.data.hall_info.movies
            })
        })
    }

    edit() {
        this.setState({
            editing: true,
            disabled: false
        })
    }
    cancel() {
        this.setState({
            editing: false,
            disabled: true
        })
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const{ dispatch } = this.props;
        let path = this.props.location.pathname.split('/');
        console.log(path, "this is in handlesubmit path");

        if(path[1] == 'admin' && path.length == 4){
            console.log("check: ", this.state);
            console.log(typeof(this.state.movie_times));
            let data = this.state;
            if(typeof(this.state.movie_times) == "string")
            data.movie_times = this.state.movie_times.split(",");
            if(typeof(this.state.screen_number) == "string")
            data.screen_number = this.state.screen_number.split(",");
            if(typeof(this.state.movies) == "string")
            data.movies = this.state.movies.split(",");
            console.log(data);
             dispatch(adminActions.UpdateMovieHallInfo(data, path[3]));
        }
    }

    render(){
        const {admin} = this.props;
        let button =  null;
        let moviehallinfoEle =null;
        if(this.state.editing == false){
            button = (
                <div class="form-group">
                <div class="col-lg-3">
                <button type="button" onClick={this.edit.bind(this)} class="btn btn-primary form-control"><label>Edit Movie Hall Info</label></button>
            </div>
            </div>
        )
        } else {
            button = (
                <div class="form-group">
                <div class="btn-group">
                <button type="reset" onClick={this.cancel.bind(this)} class="btn btn-primary form-control"><label>Cancel</label></button>
            </div>
            </div>
        )
        }


        return(
            <div className="Profile">
            <div id="ShowingBlackBackground">
            <AdminNav />
            <br />
            <br />
            </div>
            <div class="container">
            <hr />
            <div class="row">
            <div class="col-md-3">
            <div class="text-center">
            <img src="" class="img-rounded img-responsive" alt="" />
            <h5></h5>
            </div>
            </div>
            <div class="col-md-9 personal-info">
            <h3>Movie Hall Info</h3>
        <form class="form-horizontal" role="form" onSubmit={this.handleSubmit}>
    <div class="form-group">
            <label class="col-lg-3 control-label">Movie Hall Username :</label>
        <div class="col-lg-8">
            <input class="form-control" type="text"  name="username" id="username" disabled={this.state.disabled} value={this.state.username} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">Movie Hall Name :</label>
        <div class="col-lg-8">
            <input class="form-control" type="text"  name="name" id="name"  disabled={this.state.disabled} value={this.state.name} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">Movie Image :</label>
        <div class="col-lg-8">
            <input class="form-control" type="file"  name="image" id="image" disabled={this.state.disabled} value={this.state.image} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">Movie Times :</label>
        <div class="col-lg-8">
            <input class="form-control"   name="movie_times" id="movie_times"  disabled={this.state.disabled} value={this.state.movie_times} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">Total Number of Tickets:</label>
        <div class="col-lg-8">
            <input class="form-control" type="text"  name="num_tickets" id="num_tickets" disabled={this.state.disabled} value={this.state.num_tickets} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">Screen Number :</label>
        <div class="col-lg-8">
            <input class="form-control" type="text"  name="screen_number" id="screen_number" disabled={this.state.disabled} value={this.state.screen_number} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">Price of the Ticket :</label>
        <div class="col-lg-8">
            <input class="form-control" type="text"  name="ticket_price" id="ticket_price" disabled={this.state.disabled} value={this.state.ticket_price} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">List of Movies Playing in the Hall :</label>
        <div class="col-lg-8">
            <input class="form-control" type="text"  name="movies" id="movies" disabled={this.state.disabled} value={this.state.movies} onChange={this.handleChange} />
        </div>
        </div>

            <div class='form-group'>
            <div class='col-lg-8'>
            <button type="submit" class="btn btn-primary"  name="save" id="save" >Save Changes</button>
        </div>
        </div>
        {button}
    </form>
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

export default connect(mapStateToProps)(MovieHallDetails);