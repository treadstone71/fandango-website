import React from 'react';
import MainNav from '../../mainNav.js';

export default class MovieHall extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      movies: [
        {
          img:
            'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
          title: 'Avengers: Infinity War',
          desc:
            'An entire universe. Once and for all. As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. '
        },
        {
          img:
            'https://image.tmdb.org/t/p/w500/30oXQKwibh0uANGMs0Sytw3uN22.jpg',
          title: 'Rampage',
          desc:
            'Big meets bigger. Primatologist Davis Okoye shares an unshakable bond with George, the extraordinarily intelligent, silverback gorilla who has been in his care since birth. '
        },
        {
          img:
            'https://image.tmdb.org/t/p/w500/nAU74GmpUk7t5iklEp3bufwDq4n.jpg',
          title: 'A Quiet Place',
          desc:
            'If they hear you, they hunt you. A family is forced to live in silence while hiding from creatures that hunt by sound.'
        },
        {
          img:
            'https://image.tmdb.org/t/p/w500/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg',
          title: 'Ready Player One',
          desc:
            'A better reality awaits. When the creator of a popular video game system dies, a virtual contest is created to compete for his fortune.'
        }
      ],
      moviehall_name: "AMC Mercado 20"
    };
  }
    render() {
        return (
            <div className="container">
                <MainNav />
                <div className="page">
                    <h1>{this.state.moviehall_name}</h1>
                    {this.state.movies.map((movie) => 
                        <div className="row" key={movie.title} style={{marginBottom: '20px'}}>
                            <div className="col-3">
                                <img class="img-fluid" src={movie.img} alt={movie.title} />
                            </div>
                            <div className="col-7">
                                {[1,2,3,4,5].map((t) => 
                                    <span key={t} className="movie-time">1{t}:00pm</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}