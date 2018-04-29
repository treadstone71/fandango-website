import React from 'react';

import MainNav from '../../mainNav.js';

export default class BookTicket extends React.Component {
    render() {
        return (
            <div className="container">
                <MainNav />
                <div className="row page">
                    <div className="col-4">
                        <h1>Book Ticket for</h1>
                        <img className="img-fluid" src="https://cdn.images.express.co.uk/img/dynamic/36/590x/secondary/Avengers-Infinity-War-ends-with-many-of-these-characters-dead-1322280.jpg" />
                    </div>
                    <div className="col-8">
                        <h2>Ticket Detail</h2>
                        <div><b>Movie Hall:</b> Hall Name</div>
                        <div><b>Movie Time:</b> 14:00pm</div>
                        <div className="form-group">
                            <label htmlFor="numbertickets">Number of Tickets</label>
                            <input type="number" className="form-control" id="numbertickets" />
                        </div>
                        <button type="submit" className="btn btn-primary">Book Ticket</button>
                    </div>
                </div>
            </div>
        );
    }
}