import React from 'react';
import MainNav from '../../mainNav.js';

import { Link } from 'react-router-dom';

export default class MoviePage extends React.Component {
    render() {
        return (
            <div className="container">
                <MainNav />
                <div className="page">
                    <div className="row">
                        <div className="col-4">
                            <img className="img-fluid" src="https://cdn.images.express.co.uk/img/dynamic/36/590x/secondary/Avengers-Infinity-War-ends-with-many-of-these-characters-dead-1322280.jpg" />
                        </div>
                        <div className="col-8">
                            <h1>Avengers: Infinity War (9.0)</h1>
                            <p>Release Date: 2018-04-25</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}