import axios from 'axios';
import { history } from '../_helpers/history';
var api = 'http://localhost:3000';

export const adminActions = {
    getTopMovies,
    getCitywiseRevenue,
    getTopHalls,
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

function postMovieHall(data){
    return dispatch => {
        axios(api + "/admin/post_hall", {
            method: "post",
            data: data,
            withCredentials: true
        }).then(function(res){
            console.log(res.data);
            if(res.data && res.data.status == "SUCCESS"){
                dispatch({type: "POSTHALL_SUCCESS", hall_id: res.data.hall_id})
                history.push("/admin/halls/"+res.data.hall_id);
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