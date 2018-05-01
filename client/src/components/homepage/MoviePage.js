import React from 'react';
import MainNav from '../../mainNav.js';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class MoviePage extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        movie_img: "https://cdn.images.express.co.uk/img/dynamic/36/590x/secondary/Avengers-Infinity-War-ends-with-many-of-these-characters-dead-1322280.jpg",
        movie_title: "Avengers: Infinity War",
        add_review: false,
        add_rating: false
    };
  }
    render() {
        const review = this.state.add_review ? (
            <FormGroup>
              <Label for="exampleEmail">Reviews: </Label>
              <Input type="textarea" name="text" id="reviewText" />
              <Button color="primary"> Add </Button>
            </FormGroup>
            ) : null;
        const rating = this.state.add_rating ? (
            <FormGroup>
              <Label for="exampleEmail">Rating: </Label>
              <Input type="select" name="select" id="exampleSelect">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
              <Button color="primary"> Add </Button>
            </FormGroup>
            ) : null;

        return (
            <div className="container">
                <MainNav />
                <div className="page">
                    <div className="row movie-info">
                        <div className="col-4">
                            <img className="img-fluid" src={this.state.movie_img} />
                        </div>
                        <div className="col-8">
                            <h1>{this.state.movie_title} (9.0)</h1>
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
                                <Link to="/bookticket/hallId/movieId/time" key={t} className="movie-time">1{t}:00pm</Link>
                            )}
                        </div>
                    </div>
                    )}
                    <Button color="primary" onClick={() => this.setState({add_review: !this.state.add_review})}>Add Reviews</Button>{'   '}
                    <Button color="primary" onClick={() => this.setState({add_rating: !this.state.add_rating})}>Add Ratings</Button>
                    {review}
                    {rating}
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