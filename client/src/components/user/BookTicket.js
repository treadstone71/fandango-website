import React from 'react';

import UserNav from '../NavBars/UserNav.js';
import { userActions } from "../../apiActions";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Ticket extends React.Component {

    constructor(){
        super();
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            numTickets : 0
        }
    }

    onChange(e){
        this.setState({ numTickets : e.target.value});
    }

    componentDidMount(){
        const { dispatch } = this.props;
        let path  = this.props.location.pathname.split('/');
        if(path[1] == 'bookticket' && path.length == 4){
            dispatch(userActions.moviePageDetails(path[3]));
        }
    }

    onClick(e){
        console.log(this.state);
        const { dispatch, user } = this.props;
        let data = {
            movie_id: this.props.location.pathname.split('/')[3],
            hall_id: this.props.location.pathname.split('/')[2],
            numTickets: this.state.numTickets
        }
        for(var i in user.movie.halls){
            if(user.movie.halls[i].hall_id == this.props.location.pathname.split('/')[2]){
                data.price = user.movie.halls[i].ticket_price;
                break;
            }
        }
        dispatch(userActions.bookTicket(data));
    }

    render() {
        const { user } = this.props;

        let url = "/";
        let hallname = "";
        let hallid = this.props.location.pathname.split('/')[2];
        if(user.movie){
            url = "http://localhost:3000/movieimages/" + user.movie.movie_id + ".jpg";
            for(var i in user.movie.halls){
                console.log(user.movie.halls[i].hall_id, this.props.location.pathname.split('/')[2])
                if(user.movie.halls[i].hall_id == this.props.location.pathname.split('/')[2]){
                    hallname = user.movie.halls[i].name;
                    break;
                }
            }
        }

        return (
            <div className="container">
                <UserNav />
                <div className="row page">
                    <div className="col-4">
                        <h1>Book Ticket for</h1>
                        <img className="img-fluid" src= { url } />
                    </div>
                    <div className="col-8">
                        <h2>Ticket Detail</h2>
                        <div><b>Movie Hall:</b> <a href={"/moviehall/" + hallid}>{hallname}</a></div>
                        <div className="form-group">
                            <label htmlFor="numbertickets">Number of Tickets</label>
                            <input type="number" className="form-control" id="numbertickets" onChange={this.onChange}/>
                        </div>
                        <button type="submit" onClick={this.onClick} className="btn btn-primary">Book Ticket</button>
                    </div>
                </div>
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

const BookTicket = connect(mapStateToProps)(Ticket);
export default BookTicket;