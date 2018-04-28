import React from 'react';
import AdminNav from '../NavBars/AdminNav.js';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { adminActions } from "../../apiActions";

class MovieHall extends React.Component{
    
    constructor(){
        super();
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    //username, password, hall_id, name, movie_times, num_tickets, screen_number, ticket_price, movies

    onChange(e){
        console.log(e.target.id);
        const {name, value} = e.target;
        this.setState({ [name]: value });
    }

    onClick(e){
        e.preventDefault();
        console.log(this.state);
        const { dispatch } = this.props;
        dispatch(adminActions.postMovieHall(this.state));
    }

    render() {
        return (
            <div class="container">
            <AdminNav /><br/><br/><br/><br/>
            <div class="row"><div class="col-sm-2"></div><div class="col-sm-8">
            <Form>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input name="username" id="username" placeholder="Enter username for the hall..." onChange={this.onChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input type="password" name="password" id="password" placeholder="Enter password for the hall..." onChange={this.onChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="name">Hall Name</Label>
                  <Input name="name" id="name" placeholder="Enter Hall Name..." onChange={this.onChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="movie_times">Movie Times</Label>
                  <Input name="movie_times" id="movie_times" placeholder="Enter Movie Times separated by comma(,)..." onChange={this.onChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="num_tickets">Number of tickets</Label>
                  <Input name="num_tickets" id="num_tickets" placeholder="Enter Number of tickets hall has..." onChange={this.onChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="screen_number">Number of screens</Label>
                  <Input name="screen_number" id="screen_number" placeholder="Enter Number of screens hall has..." onChange={this.onChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="ticket_price">Ticket price</Label>
                  <Input name="ticket_price" id="ticket_price" placeholder="Enter ticket price for the hall..." onChange={this.onChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="movies">Movies Running in the hall</Label>
                  <Input name="movies" id="movies" placeholder="Enter Movie IDs separated by comma(,)..." onChange={this.onChange}/>
                </FormGroup>
                <Button type="submit" color="primary" onClick={this.onClick}>Add Movie Hall</Button>
            </Form>
            </div><div class="col-sm-2"></div></div>
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

const AddMovieHall = connect(mapStateToProps)(MovieHall);
export default AddMovieHall;