import React from 'react';
import MainNav from '../../mainNav.js';

export default class MovieHall extends React.Component {
    render() {
        return (
            <div className="container">
                <MainNav />
                <div className="page">
                    <h1>Hall Name</h1>
                    {[3,4,5,6].map((h) => 
                        <div className="row" key={h} style={{marginBottom: '20px'}}>
                            <div className="col-3">
                                <img class="img-fluid" src="https://cdn.images.express.co.uk/img/dynamic/36/590x/secondary/Avengers-Infinity-War-ends-with-many-of-these-characters-dead-1322280.jpg" alt="Movie Title" />
                            </div>
                            <div className="col-7">
                                {[1,2,3,4,5].map((t) => 
                                    <span className="movie-time">1{t}:00pm</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}