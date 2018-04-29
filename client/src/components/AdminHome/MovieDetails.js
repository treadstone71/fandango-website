import React from 'react';
import AdminNav from '../NavBars/AdminNav';
import { connect } from 'react-redux';
import { adminActions } from "../../apiActions/admin.actions.js";
import axios from 'axios';
import { history } from '../../_helpers/history';
var api = 'http://localhost:3000';

class MovieDetails extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            title:"",
            trailer: "",
            date:"",
            characters:"",
            movie_length:"",
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
           this.getMovieInfo(path[3]);
        }
    }
    getMovieInfo(movie_id){
        var self = this
            axios(api + "/admin/movie/get_movie_info?movie_id=" + movie_id, {
                method: "get",
                withCredentials: true
            }). then(function(res) {
                console.log(res.data);
                self.setState({
                    movie_id: res.data.movie_info.movie_id,
                    title: res.data.movie_info.title,
                    trailer: res.data.movie_info.trailer,
                    characters: res.data.movie_info.characters,
                    movie_length: res.data.movie_info.movie_length,
                    date: res.data.movie_info.date
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
            dispatch(adminActions.UpdateMovieInfo(this.state, path[3]));
        }
    }



    render(){
        const {admin} = this.props;
        let button =  null;
        let movieinfoEle =null;
        if(this.state.editing == false){
            button = (
                <div class="form-group">
                <div class="col-lg-3">
                <button type="button" onClick={this.edit.bind(this)} class="btn btn-primary form-control"><label>Edit Movie Info</label></button>
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

        function charString(characters){
            let charStr = " ";
            for(var i in characters){
                charStr += characters[i] + ", ";
            }
            return charStr.substring(0, charStr.length-2);
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
            <h3>Movie Info</h3>
        <form class="form-horizontal" role="form" onSubmit={this.handleSubmit}>
        <div class="form-group">
            <label class="col-lg-3 control-label">Movie Title :</label>
        <div class="col-lg-8">
            <input class="form-control" type="text"  name="title" id="title" disabled={this.state.disabled} value={this.state.title} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">Movie Trailer :</label>
        <div class="col-lg-8">
            <input class="form-control" type="text"  name="trailer" id="trailer" disabled={this.state.disabled} value={this.state.trailer} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">Movie Image :</label>
        <div class="col-lg-8">
            <input class="form-control" type="file"  name="image" id="imge" disabled={this.state.disabled} value={this.state.image} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">Date of Release :</label>
        <div class="col-lg-8">
            <input class="form-control" type="date"  name="date" id="date"  disabled={this.state.disabled} value={this.state.date} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">Characters :</label>
        <div class="col-lg-8">
            <textArea class="form-control"   name="characters" id="characters"  disabled={this.state.disabled} onChange={this.handleChange}>{charString(this.state.characters)}</textArea>
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">Movie Length :</label>
        <div class="col-lg-8">
            <input class="form-control" type="text"  name="movie_length" id="movie_length" disabled={this.state.disabled} value={this.state.movie_length} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">See It In :</label>
        <div class="col-lg-8">
            <select class="form-control" name="see"disabled={this.state.disabled} onChange={this.handleChange}>
    <option value="imax">IMAX</option>
            <option value="digital">Digital</option>
            <option value="normal">Normal</option>
            </select>
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


export default connect(mapStateToProps)(MovieDetails);