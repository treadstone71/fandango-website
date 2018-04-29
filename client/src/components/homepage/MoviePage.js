import React from 'react';
import MainNav from '../../mainNav.js';

import { Link } from 'react-router-dom';

export default class MoviePage extends React.Component {
    render() {
        return (
            <div className="container">
                <MainNav />
                <div className="page">
                    <div className="row movie-info">
                        <div className="col-4">
                            <img className="img-fluid" src="https://cdn.images.express.co.uk/img/dynamic/36/590x/secondary/Avengers-Infinity-War-ends-with-many-of-these-characters-dead-1322280.jpg" />
                        </div>
                        <div className="col-8">
                            <h1>Avengers: Infinity War (9.0)</h1>
                            <p>Release Date: 2018-04-25</p>
                        </div>
                    </div>
                    <h2>Buy Tickets</h2>
                    { [3,4].map((h) => 
                    <div className="row movie-hall" key={h}>
                        <div className="col-4">
                            Hall Name {h}
                        </div>
                        <div className="col-8">
                            {[3,4,5].map((t) => 
                                <span key={t} className="movie-time">1{t}:00pm</span>
                            )}
                        </div>
                    </div>
                    )}
                    <h2>Comment/Rating</h2>
                    {[2,3].map((c) =>
                        <div class="media" key={c}>
                            <div class="mr-3">User name</div>
                            <div class="media-body">
                                <h5 class="mt-0">Rating 8</h5>
                                Reviews
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}