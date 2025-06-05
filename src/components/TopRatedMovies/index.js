import {Link} from 'react-router-dom'

import {Component} from 'react'

import Header from '../Header'

import './index.css'

class TopRatedMovies extends Component {
  state = {
    topRatedMoviesData: [],
  }

  componentDidMount() {
    this.getTopRatedMovies()
  }

  getTopRatedMovies = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?api_key=6de6464c60dc6e29adb8a0eb4dec6103&language=en-US&page=1',
    )
    const data = await response.json()
    //  console.log(data)
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
      topRatedMoviesData: formattedData,
    })
  }

  render() {
    const {topRatedMoviesData} = this.state
    // console.log(topRatedMoviesData)
    return (
      <div className="top-rated-bg-container">
        <Header />
        <ul className="top-rated-movies-container">
          {topRatedMoviesData.map(eachTopRatedMovie => (
            <li
              key={eachTopRatedMovie.id}
              className="each-top-rated-movie-item"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${eachTopRatedMovie.backdropPath}`}
                alt={eachTopRatedMovie.title}
                className="movie-poster-image"
              />
              <div className="title-rating-container">
                <p className="movie-title">{eachTopRatedMovie.title}</p>
                <p className="movie-rating">{eachTopRatedMovie.voteAverage}</p>
              </div>
              <Link
                to={`/movie/${eachTopRatedMovie.id}`}
                className="view-details-btn-container"
              >
                <button type="button" className="view-details-btn">
                  View Details
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default TopRatedMovies