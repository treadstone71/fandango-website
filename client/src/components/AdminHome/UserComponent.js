import React from 'react';
import AdminNav from '../NavBars/AdminNav.js';
import { connect } from 'react-redux';
import { adminActions } from "../../apiActions/admin.actions.js";
import axios from 'axios';
import { history } from '../../_helpers/history';
var api = 'http://localhost:3000';

class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:"",
            firstname:"",
            lastname: "",
            address:"",
            city:"",
            state:"",
            zip:"",
            phone:"",
            email:"",
            creditcard:"",
            image:"",
            editing: false,
            disabled: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount(){
        console.log("Inside componentdidmount");
        const { dispatch } = this.props;
        let path = this.props.location.pathname.split('/');
        console.log(path, "this is path");
        if(path[1] == 'admin' && path.length == 4){
            this.getUserInfo(path[3]);
        }
    }

    getUserInfo(userid){
        var self = this;
        axios(api + "/admin/user/get_user_info?userid="+ userid, {
            method: "get",
            withCredentials: true
        }).then(function(res){
            console.log(res.data);
            self.setState({
                userid: res.data.user_info.userid,
                username: res.data.user_info.username,
                firstname: res.data.user_info.firstname,
                lastname: res.data.user_info.lastname,
                address: res.data.user_info.address,
                city: res.data.user_info.city,
                state: res.data.user_info.state,
                zip: res.data.user_info.zip,
                phone: res.data.user_info.phone,
                email: res.data.user_info.email,
                creditcard: res.data.user_info.creditcard
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
            dispatch(adminActions.UpdateUserInfo(this.state, path[3]));
        }
    }

    render() {
        const {admin} = this.props;
        let button =  null;
        let userhallinfoEle =null;
        if(this.state.editing == false){
            button = (
                <div class="form-group">
                <div class="col-lg-3">
                <button type="button" onClick={this.edit.bind(this)} class="btn btn-primary form-control"><label>Edit User Info</label></button>
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
        return (
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
            <img src={"http://localhost:3000/movieimages/download.jpeg"} class="img-rounded img-responsive" alt="" />
            <h5></h5>
            </div>
            </div>
            <div class="col-md-9 personal-info">
            <h3>User Info</h3>
        <form class="form-horizontal" role="form" onSubmit={this.handleSubmit}>
    <div class="form-group">
            <label class="col-lg-3 control-label">Username :</label>
        <div class="col-lg-8">
            <input class="form-control" type="text"  name="username" id="username" disabled={this.state.disabled} value={this.state.username} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">Firstname :</label>
        <div class="col-lg-8">
            <input class="form-control" type="text"  name="firstname" id="firstname"  disabled={this.state.disabled} value={this.state.firstname} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">Lastname :</label>
        <div class="col-lg-8">
            <input class="form-control" type="text"  name="lastname" id="lastname"  disabled={this.state.disabled} value={this.state.lastname} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">User Image :</label>
        <div class="col-lg-8">
            <input class="form-control" type="file"  name="image" id="image" disabled={this.state.disabled} value={this.state.image} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">User Address :</label>
        <div class="col-lg-8">
            <input class="form-control"   name="address" id="address"  disabled={this.state.disabled} value={this.state.address} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">City :</label>
        <div class="col-lg-8">
            <input class="form-control" type="text"  name="city" id="city" disabled={this.state.disabled} value={this.state.city} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">State :</label>
        <div class="col-lg-8">
            <input class="form-control" type="text"  name="state" id="state" disabled={this.state.disabled} value={this.state.state} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">Zip :</label>
        <div class="col-lg-8">
            <input class="form-control" type="number"  name="zip" id="zip" disabled={this.state.disabled} value={this.state.zip} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">Phone :</label>
        <div class="col-lg-8">
            <input class="form-control" type="number"  name="phone" id="phone" disabled={this.state.disabled} value={this.state.phone} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">Email :</label>
        <div class="col-lg-8">
            <input class="form-control" type="email"  name="email" id="email" disabled={this.state.disabled} value={this.state.email} onChange={this.handleChange} />
        </div>
        </div>
        <div class="form-group">
            <label class="col-lg-3 control-label">Credit Card :</label>
        <div class="col-lg-8">
            <input class="form-control" type="number"  name="creditcard" id="creditcard" disabled={this.state.disabled} value={this.state.creditcard} onChange={this.handleChange} />
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

const UserComponent = connect(mapStateToProps)(User);
export default UserComponent;