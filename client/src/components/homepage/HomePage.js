import React from 'react';
import MainNav from '../../mainNav.js';

import { Link } from 'react-router-dom';

class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            movies:[
            {
                img: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
                title: "Avengers: Infinity War",
                desc: "An entire universe. Once and for all. As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. "
            },{
                img: "https://image.tmdb.org/t/p/w500/30oXQKwibh0uANGMs0Sytw3uN22.jpg",
                title: "Rampage",
                desc: "Big meets bigger"
            },{
                img: "https://image.tmdb.org/t/p/w500/nAU74GmpUk7t5iklEp3bufwDq4n.jpg",
                title: "A Quiet Place",
                desc: "If they hear you, they hunt you."
            },{
                img: "https://image.tmdb.org/t/p/w500/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg",
                title: "Ready Player One",
                desc: "A better reality awaits. When the creator of a popular video game system dies, a virtual contest is created to compete for his fortune."
            }
            ]};
    }
    render() {
        return (
            <div class="container">
            <MainNav />
                <div className="row page">
                { this.state.movies.map((movie) => 
                    <div class="col" key={movie.title}>
                    <div class="card">
                        <img class="card-img-top" src={movie.img} />
                        <div class="card-body">
                            <h5 class="card-title">{movie.title}</h5>
                            <p class="card-text">{movie.desc}</p>
                            <Link to="/movie/23333" class="btn btn-primary">Buy Tickets</Link>
                        </div>
                    </div>
                    </div>
                )}
                </div>
                <h2>Near By Movie Halls</h2>
                <div className="row">
                { [1,2,3,4].map((i) => 
                    <div className="col" key={i}>
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Hall Name {i}</h5>
                                <p class="card-text">Hall Description</p>
                                <Link to="/hall/23333" class="btn btn-primary">Check out Movies</Link>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>

        );
    }
}

export default HomePage;