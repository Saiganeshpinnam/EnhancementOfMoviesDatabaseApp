import {Link} from 'react-router-dom'

import {Component} from 'react'

import Header from '../Header'

import './index.css'

class Home extends Component {
  state = {
    popularMoviesData: [],
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=6de6464c60dc6e29adb8a0eb4dec6103&language=en-US&page=1',
    )
    const data = await response.json()
    // console.log(data)
    //  data.results.map(eachResult => console.log(eachResult.title))
    const formattedData = data.results.map(eachMovie => ({
      id: eachMovie.id,
      backdropPath: eachMovie.backdrop_path,
      title: eachMovie.title,
      posterPath: eachMovie.poster_path,
      releaseDate: eachMovie.release_date,
      voteAverage: eachMovie.vote_average,
    }))
    this.setState({
      popularMoviesData: formattedData,
    })
  }

  render() {
    const {popularMoviesData} = this.state

    return (
      <div className="home-bg-container">
        <Header />
        <ul className="popular-movies-container">
          {popularMoviesData.map(eachPopularMovie => (
            <li key={eachPopularMovie.id} className="each-popular-movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${eachPopularMovie.backdropPath}`}
                alt={eachPopularMovie.title}
                className="movie-poster-image"
              />
              <div className="title-rating-btn-container">
                <div className="title-rating-container">
                  <p className="movie-title">{eachPopularMovie.title}</p>
                  <p className="movie-rating">{eachPopularMovie.voteAverage}</p>
                </div>
                <Link
                  to={`/movie/${eachPopularMovie.id}`}
                  className="view-details-btn-container"
                >
                  <button type="button" className="view-details-btn">
                    View Details
                  </button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Home