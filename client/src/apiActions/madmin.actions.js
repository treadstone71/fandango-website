import axios from 'axios';
import {history} from '../_helpers/history'
var api = 'http://localhost:3000';

export const madminActions = {
    postMovie
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
