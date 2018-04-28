import axios from 'axios';
import { history } from '../_helpers/history';
var api = 'http://localhost:3000';

export const adminActions = {
    getTopMovies,
    getCitywiseRevenue,
    getTopHalls
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