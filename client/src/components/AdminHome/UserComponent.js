import React from 'react';
import AdminNav from '../NavBars/AdminNav.js';
import { connect } from 'react-redux';

class User extends React.Component{
    constructor(){
        super();

    }
    render() {
        return (
            <div class="container">
            <AdminNav />
                
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