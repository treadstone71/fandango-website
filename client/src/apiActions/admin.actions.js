import axios from 'axios';
import { history } from '../_helpers/history';
var api = 'http://localhost:3000';

export const adminActions = {
    getTopMovies,
    getCitywiseRevenue,
    getTopHalls,
    getMovie,
    UpdateMovieInfo,
    postMovieHall
};

function getTopMovies(){
    return dispatch => {
        axios(api + "/admin/revenue_movies", {
            method: "get",
            withCredentials: true
        }).then(function(res){
            console.log(res.data);
            if(res.data && res.data.status == "SUCCESS"){
                dispatch({type: "GETTOPMOVIES_SUCCESS", topmovies: res.data.sol})
            } else {
                dispatch({type: "GETTOPMOVIES_FAILURE"});
            }
        }).catch(function(err) {
            dispatch({type: "GETTOPMOVIES_FAILURE"})
        })
    }
}

function getCitywiseRevenue(movie){
    return dispatch => {
        axios(api + ("/admin/city_revenue?movie="+movie), {
            method: "get",
            withCredentials: true
        }).then(function(res){
            console.log(res.data);
            if(res.data && res.data.status == "SUCCESS"){
                dispatch({type: "GETCITY_SUCCESS", citywiselist: res.data.ans})
            } else {
                dispatch({type: "GETCITY_FAILURE"});
            }
        }).catch(function(err) {
            dispatch({type: "GETCITY_FAILURE"})
        })
    }
}

function getTopHalls(){
    return dispatch => {
        axios(api + "/admin/get_halls", {
            method: "get",
            withCredentials: true
        }).then(function(res){
            console.log(res.data);
            if(res.data && res.data.status == "SUCCESS"){
                dispatch({type: "GETTOPHALLS_SUCCESS", tophalls: res.data.sol})
            } else {
                dispatch({type: "GETTOPHALLS_FAILURE"});
            }
        }).catch(function(err) {
            dispatch({type: "GETTOPHALLS_FAILURE"})
        })
    }
}

function getMovie(movie){
    return dispatch => {
        axios(api + ("/admin/get_movie?movie="+movie), {
            method: "get",
            withCredentials: true
        }).then(function(res){
            console.log(res.data);
            if(res.data && res.data.status == "SUCCESS"){
                console.log("inside get movie res", res.data.movie);
                dispatch({type:"GET_MOVIE_SUCCESS", movie: res.data.movie})
            } else {
                alert("Movie not found");
                    dispatch({type: "GET_MOVIE_FAILURE"});
                }
        }).catch(function(err) {
            alert("Movie not found");
            dispatch({type: "GET_MOVIE_FAILURE"})
    })
    }
}

function UpdateMovieInfo(movie_info, movie_id) {
    console.log("in update movie info", movie_info);
    var data = {
        title: movie_info.title,
        trailer: movie_info.trailer,
        characters: movie_info.characters,
        movie_length: movie_info.movie_length,
        date: movie_info.date
    }
    return dispatch =>
    {
        axios(api + "/admin/movie/update_movie_info?movie_id=" + movie_id, {
            method: "post",
            data: data,
            withCredentials: true
        }).then(function (res) {
            console.log(res.data);
            dispatch({type: "UPDATE_MOVIE_INFO_SUCCESS"})
            alert("Movie Info Updated");
            history.push('/admin/search-movie-hall');
        }).catch(function (err) {
            dispatch({type: "UPDATE_MOVIE_INFO_FAILURE"})
        });
    }
}

function postMovieHall(data){
    return dispatch => {
        axios(api + "/admin/post_hall", {
            method: "post",
            data: data,
            withCredentials: true
        }).then(function(res){
            console.log(res.data);
            if(res.data && res.data.status == "SUCCESS"){
                let hall_id = res.data.hall_id;
                axios(api + "/hallimage?hall_id=" + hall_id, {
                    method: "post",
                    data: data.file,
                    withCredentials: true
                }).then(function(res){
                    console.log("Res in upload", res)
                    history.push("/admin/halls/"+hall_id);
                }).catch(function(err) {
                    console.log("error in upload ", err);
                })
            } else {
                if(res.data.msg == "USERNAME_EXISTS"){
                    dispatch({type: "POSTHALL_FAILURE", dupusername: true});
                    alert("USERNAME_EXISTS");
                }
            }
        }).catch(function(err) {
            dispatch({type: "POSTHALL_FAILURE"})
        })
    }
}