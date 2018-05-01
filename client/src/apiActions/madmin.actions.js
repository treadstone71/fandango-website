import axios from 'axios';
import {history} from '../_helpers/history'
var api = 'http://localhost:3000';

export const madminActions = {
    postMovie,
    UpdateMovieInfo,
    getMovieRevenue
};

function postMovie(data){
    return dispatch => {
        axios(api +"/madmin/post_movie", {
            method: "post",
            data: data,
            withCredentials: true
        }).then(function(res){
            console.log(res.data);
            if(res.data && res.data.status == "SUCCESS"){
                let movie_id = res.data.movie_id;
                axios(api + "/movieimages?movie_id=" + movie_id, {
                    method: "post",
                    data: data.file,
                    withCredentials: true
                }).then(function(res){
                    console.log("Res in upload", res)
                    history.push("/madmin/dashboard");
                }).catch(function(err){
                    console.log("error in upload ", err);
                })
            } else {
                if(res.data.msg == "TITLE_EXISTS"){
                    dispatch({type: "POSTMOVIE_FAILURE", duptitle: true});
                    alert("TITLE EXISTS");
                }
            }
        }).catch(function(err){
            dispatch({type: "POSTMOVIE_FAILURE"})
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
        axios(api + "/madmin/movie/update_movie_info?movie_id=" + movie_id, {
            method: "post",
            data: data,
            withCredentials: true
        }).then(function (res) {
            console.log(res.data);
            dispatch({type: "UPDATE_MOVIE_INFO_SUCCESS"})
            alert("Movie Info Updated");
            history.push('/madmin/search-movie');
        }).catch(function (err) {
            dispatch({type: "UPDATE_MOVIE_INFO_FAILURE"})
        });
    }
}

function getMovieRevenue(movie){
    console.log(movie);
    return dispatch => {
        axios(api + "/madmin/revenue_movie?movie=" +movie, {
            method: "get",
            withCredentials: true
        }).then(function(res){
            console.log(res.data);
            if(res.data && res.data.status == "SUCCESS"){
                dispatch({type: "GETMOVIEREVENUE_SUCCESS", movie: res.data.movie})
            } else {
                dispatch({type: "GETMOVIEREVENUE_FAILURE"})
            }
        }).catch(function(err){
            dispatch({type: "GETMOVIEREVENUE_FAILURE"})
        })
    }
}



