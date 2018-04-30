import React from 'react';
import MainNav from '../../mainNav.js';

import { Link } from 'react-router-dom';

class HomePage extends React.Component {
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
      moviehalls: [
        {
          name: 'California Theatre',
          desc:
            'Restored 1927 motion picture house turned performing-arts venue, also offers private event options.'
        },
        {
          name: 'Towne 3 Cinemas',
          desc:
            'Movies from India featured in a straightforward movie theater with a concession stand.'
        },
        {
          name: 'AMC Mercado 20',
          desc:
            'Find movies near you, view show times, watch movie trailers and buy movie tickets. Our theaters have the newest movies. Watch trailers and then find tickets for movies near you.'
        },
        {
          name: 'Hackworth IMAX Dome',
          desc:
            'Movie theater chain known for presenting 3D films on a giant screen, including blockbusters.'
        }
      ]
    };
  }
  render() {
    return (
      <div class="container">
        <MainNav />
        <div className="row page">
          {this.state.movies.map(movie => (
            <div class="col" key={movie.title}>
              <div class="card">
                <img class="card-img-top" src={movie.img} />
                <div class="card-body">
                  <h5 class="card-title">{movie.title}</h5>
                  <p class="card-text">{movie.desc}</p>
                  <Link to="/movie/23333" class="btn btn-primary">
                    Buy Tickets
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h2>Near By Movie Halls</h2>
        <div className="row">
          {this.state.moviehalls.map(moviehall => (
            <div className="col" key={moviehall.name}>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{moviehall.name}</h5>
                  <p class="card-text">{moviehall.desc}</p>
                  <Link to="/hall/23333" class="btn btn-primary">
                    Check out Movies
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default HomePage;
