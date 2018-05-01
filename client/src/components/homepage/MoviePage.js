import React from 'react';
import UserNav from '../NavBars/UserNav.js';

import { userActions } from "../../apiActions";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class MPage extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        const { dispatch } = this.props;
        let path  = this.props.location.pathname.split('/');
        if(path[1] == 'movie' && path.length == 3){
            dispatch(userActions.moviePageDetails(path[2]));
        }
    }

    render() {
        const { user, location } = this.props;
        let movieele = null;
        let hallsele = null;
        let ratingsele = null;

        if(user.movie){
            movieele = <div class="row"><div class="col-1"></div>
                                        <div class="col-10">
                                            <div class="card card-body bg-light">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <img src= {"http://localhost:3000/movieimages/" + user.movie.movie_id + ".jpg"} alt="" class="img-rounded img-responsive" width="300" height="300" />
                                                    </div>
                                                    <div class="col-6">
                                                        <p><a href={"/movie/"+user.movie.movie_id}><b>{user.movie.title}</b></a></p>
                                                        <p><b>Characters : </b> {user.movie.characters.toString()} </p>
                                                        <p><b>Movie Time : </b>{user.movie.movie_length}</p>
                                                        <p><a href={user.movie.trailer}>Click to see trailer</a></p>
                                                        <p><b>Available in : </b>{user.movie.seeitin.toString()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div><div class="col-1"></div>
                                    </div>

            hallsele = user.movie.halls.map( hall => <div class="row">
                                                <div class="col-1"></div>
                                                <div class="col-4">
                                                    <p><b><a href={"/moviehall/" + hall.hall_id}>{hall.name}</a></b></p>
                                                </div>
                                                <div class="col-3">
                                                    <p><b>Price: </b>{"$" + hall.ticket_price}</p>
                                                </div>
                                                <div class="col-3">
                                                    <p><b><a href={"/bookticket/" + hall.hall_id + "/" + location.pathname.split('/')[2]}>Buy</a></b></p>
                                                </div>
                                                <div class="col-1"></div>
                                            </div>)
            ratingsele =  user.movie.reviews.map( rating => <div class="row">
                            <div class="col-1"></div>
                                        <div class="col-10">
                                            <div class="card card-body bg-light">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <p><b>User : </b><a href={"/user/"+1000}>prashatnh</a></p>
                                                        <p><b>Rating : </b>{rating.rating}</p>
                                                    </div>
                                                    <div class="col-6">
                                                        <p>{rating.review}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div><div class="col-1"></div>
                                        </div>
                                )
        }

        return (
            <div className="container">
            <UserNav  /><br/><br/><br/>
                {movieele}<br/><br/>
                <div class="row">
                <div class="col-1"></div>
                <div class="col-10">
                <h4>Buy Tickets Now</h4>
                </div>
                <div class="col-1"></div></div>
                {hallsele}<br/><br/>
                <div class="row">
                <div class="col-1"></div>
                <div class="col-10">
                <h4>Reviews</h4>
                </div>
                <div class="col-1"></div></div>
                {ratingsele}
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

const MoviePage = connect(mapStateToProps)(MPage);
export default MoviePage;