import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import HomePage from '../homepage/HomePage.js';


const divContainer= {
    margintop: '10%',
    marginbottom: '20%',
    marginleft: '30%',
    marginbottom: '20%'
}
const divStyle={
    margintop : "10%"
};
const imgStyle = {
    width: '150px',
    height : '150px'
};
const fontStyleInput ={
    fontSize : '17px'
};

class Login extends React.Component{
    constructor(){
        super();

    }
    render(){
        return(

            <div class="container">
            <HomePage />
            <div class="row" className="center" style={divContainer}>
            <div class="col-sm-offset-3 col-md-offset-3 col-lg-offset-3 col-sm-3 col-md-3 col-lg-7"
        style={divStyle} >
            <div class="panel panel-default">
            <div class="panel-heading text-center">
            <img style={imgStyle} class="flicon-logo-fullcolor"
        src='https://pmcdeadline2.files.wordpress.com/2015/01/fandango-logo-new.jpg?w=892&h=598&crop=1'
        alt="Freelancer Logo"/>
            </div>
            <div class="panel-body" >
            <form class="form-horizontal" role="form"
        onSubmit={this.handleSubmit}>
    <div class="form-group">
            <label class="col-sm-3 col-md-3 col-lg-3" style={fontStyleInput}>
            User Name :</label>
        <div class="col-sm-8 col-md-8 col-lg-8">
            <input type="text" class="form-control" name="username"
        onChange={this.handleChange}
        id="uname" placeholder="User Name" autoFocus />
        </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 col-md-3 col-lg-3"
        style={fontStyleInput}>Password :</label>
        <div class="col-sm-8 col-md-8 col-lg-8">
            <input type="password" class="form-control"
        onChange={this.handleChange}
        name="password" id="pwd" placeholder="Password"/>
            </div>
            </div>
            <div class="form-group">
            <div class="col-xs-offset-4 col-sm-offset-4 col-md-offset-4 col-lg-offset-5">
            <button type="submit" class="btn btn-primary" id="btn">
            <font style={fontStyleInput}>
            Log In
        </font>
        </button>
        </div>
        </div>
        <hr/>
        </form>
        </div>
        </div>
        </div>
        </div>
        </div>

        );
    }
}

export default Login;