import axios from 'axios';
import { history } from '../_helpers/history';
var api = 'http://localhost:3000';

export const apiActions = {
    isLoggedIn,
    login,
    logout

};
function isLoggedIn(){
    return dispatch => {
        axios(api + '/check', {
            method: "get",
            withCredentials: true
        }).then(function(res){
            console.log("res: ", res.data);
            if(res.data.status == "SUCCESS")
                dispatch({type: "CHECK_SUCCESS", username: res.data.username});
            else
                dispatch({type: "CHECK_FAILURE"});
        }).catch(function(err) {
            dispatch({type: "CHECK_FAILURE"})
        })
    }
}
function login(username, password){
    return dispatch =>{
        axios(api + '/login', {
            method: 'post',
            data: {username, password},
            withCredentials: true
        }).then (function(res){
            if(res.data.success == "SUCCESS"){
                dispatch({type: "LOGIN_SUCCESS", username})
                this.history.push('/adminhome');
            } else {
                dispatch({type: "LOGIN_FAILURE"});
            }
        }).catch(function(err){
            dispatch({type: "LOGIN_FAILURE"});
        })
    }
}
function logout(){
    return dispatch => {
        axios(api + '/logout', {
            method: "get",
            withCredentials: true
        }).then(function(res){
            history.push("/login");
            dispatch({type: "LOGOUT_SUCCESS"});
        }).catch(function(err) {
            dispatch({type: "LOGOUT_FAILURE"})
        })
    }
}