import axios from 'axios';
import { history } from '../_helpers/history';
var api = 'http://localhost:3000';

export const userActions = {
	getCategory,
	getMovieUser,
	getHallUser,
	moviePageDetails,
	bookTicket
}

function getCategory(category){
	console.log("in get category");
	return dispatch =>{
        axios(api + "/users/get_movie_category?category=" + category,{
            method: "get",
            withCredentials: true
        }).then(function(res){
            console.log(res);
            if(res.data.status == "SUCCESS"){
                dispatch({type: "GETMOVIECATEGORY_SUCCESS", movie: res.data.movie});
            }else {
                dispatch({type: "GETMOVIECATEGORY_FAILURE"});
            }
        }).catch(function(err) {
            dispatch({type: "GETMOVIECATEGORY_FAILURE"});
        })
    }
}

function getMovieUser(movie){
	return dispatch =>{
        axios(api + "/users/get_movie?movie=" + movie,{
            method: "get",
            withCredentials: true
        }).then(function(res){
            console.log(res);
            if(res.data.status == "SUCCESS"){
                dispatch({type: "GETMOVIECATEGORY_SUCCESS", movie: res.data.movie});
            }else {
                dispatch({type: "GETMOVIECATEGORY_FAILURE"});
            }
        }).catch(function(err) {
            dispatch({type: "GETMOVIECATEGORY_FAILURE"});
        })
    }
}

function getHallUser(hallname){
	return dispatch =>{
        axios(api + "/users/get_movie_hall?hallname=" + hallname,{
            method: "get",
            withCredentials: true
        }).then(function(res){
            console.log(res);
            if(res.data.status == "SUCCESS"){
                dispatch({type: "GETMOVIEHALL_SUCCESS", hall: res.data.hall});
            }else {
                dispatch({type: "GETMOVIEHALL_FAILURE"});
            }
        }).catch(function(err) {
            dispatch({type: "GETMOVIEHALL_FAILURE"});
        })
    }
}

function moviePageDetails(movieid){
	return dispatch =>{
        axios(api + "/users/get_movie_info?movieid=" + movieid,{
            method: "get",
            withCredentials: true
        }).then(function(res){
            console.log(res);
            if(res.data.status == "SUCCESS"){
                dispatch({type: "GETMOVIEINFO_SUCCESS", movie: res.data.movie});
            }else {
                dispatch({type: "GETMOVIEINFO_FAILURE"});
            }
        }).catch(function(err) {
            dispatch({type: "GETMOVIEINFO_FAILURE"});
        })
    }
}

function bookTicket(data){
	return dispatch => {
        axios(api + "/users/bookticket",{
            method: "post",
            data: data,
            withCredentials: true
        }).then(function(res){
            console.log(res);
            if(res.data.status == "SUCCESS"){
                dispatch({type: "BOOKTICKET_SUCCESS"});
            }else {
                dispatch({type: "BOOKTICKET_FAILURE"});
            }
        }).catch(function(err) {
            dispatch({type: "BOOKTICKET_FAILURE"});
        })
    }
}