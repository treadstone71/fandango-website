import React from 'react';
import MainNav from '../../mainNav.js';

import { Link } from 'react-router-dom';

class HomePage extends React.Component{
    constructor(){
        super();

    }
    render() {
        return (
            <div class="container">
            <MainNav />
                <div className="row page">
                { [1,2,3,4].map((i) => 
                    <div class="col" key={i}>
                    <div class="card">
                        <img class="card-img-top" src="https://cdn.images.express.co.uk/img/dynamic/36/590x/secondary/Avengers-Infinity-War-ends-with-many-of-these-characters-dead-1322280.jpg" alt="Movie Title" />
                        <div class="card-body">
                            <h5 class="card-title">Movie title</h5>
                            <p class="card-text">Movie Description</p>
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
                                <h5 class="card-title">Hall Name</h5>
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