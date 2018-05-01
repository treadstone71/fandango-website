import React from 'react';
import UserNav from '../NavBars/UserNav.js';

import { userActions } from "../../apiActions";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class VProfile extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        const { dispatch } = this.props;
        let path  = this.props.location.pathname.split('/');
        if(path[1] == 'profile' && path.length == 3){
            dispatch(userActions.getUserInfo(path[2]));
        }
    }

    render() {
        const { user, location } = this.props;
        let userele = null;

        if(user.user){
            userele = <div class="row"><div class="col-1"></div>
                                        <div class="col-10">
                                            <div class="card card-body bg-light">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <img src= {"http://localhost:3000/userimages/" + user.user.username + ".jpg"} alt="" class="img-rounded img-responsive" width="300" height="300" />
                                                    </div>
                                                    <div class="col-6">
                                                        <p><b>First Name : </b>{user.user.firstname}</p>
                                                        <p><b>Last Name : </b>{user.user.lastname}</p>
                                                        <p><b>Address : </b>{user.user.address}</p>
                                                        <p><b>City : </b>{user.user.city}</p>
                                                        <p><b>State : </b>{user.user.state}</p>
                                                        <p><b>Zip Code : </b>{user.user.zip}</p>
                                                        <p><b>Phone : </b>{user.user.phone}</p>
                                                        <p><b>Email : </b>{user.user.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div><div class="col-1"></div>
                                    </div>
        }

        return (
            <div className="container">
            <UserNav  /><br/><br/><br/>
                {userele}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return {
        user
    };
}

const Profile = connect(mapStateToProps)(VProfile);
export default Profile;
