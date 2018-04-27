import React from 'react';
import AdminNav from '../NavBars/AdminNav.js';


class AdminHome extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div>
            <AdminNav />
            </div>
        );
    }
}

export default AdminHome;