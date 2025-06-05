import {Link} from 'react-router-dom'

import {Component} from 'react'

import Header from '../Header'

import './index.css'

class UpcomingMovies extends Component {
  state = {
    upcomingMoviesData: [],
    upcomingMoviesPageNumber: 1,
  }

  componentDidMount() {
    this.getUpcomingMovies()
  }

  getUpcomingMovies = async () => {
    const {upcomingMoviesPageNumber} = this.state
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=6de6464c60dc6e29adb8a0eb4dec6103&language=en-US&page=${upcomingMoviesPageNumber}`,
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
      upcomingMoviesData: formattedData,
    })
  }

  onClickingPrevBtn = () => {
    const {upcomingMoviesPageNumber} = this.state
    if (upcomingMoviesPageNumber > 1) {
      this.setState(
        prevState => ({
          upcomingMoviesPageNumber: prevState.upcomingMoviesPageNumber - 1,
        }),
        this.getUpcomingMovies,
      )
    } else {
      this.setState(
        {
          upcomingMoviesPageNumber: 1,
        },
        this.getUpcomingMovies,
      )
    }
  }

  onClickingNxtBtn = () => {
    this.setState(
      prevState => ({
        upcomingMoviesPageNumber: prevState.upcomingMoviesPageNumber + 1,
      }),
      this.getUpcomingMovies,
    )
  }

  render() {
    const {upcomingMoviesData, upcomingMoviesPageNumber} = this.state
    //  console.log(upcomingMoviesData)
    return (
      <div className="upcoming-bg-container">
        <Header />
        <ul className="upcoming-movies-container">
          {upcomingMoviesData.map(eachUpcomingMovie => (
            <li key={eachUpcomingMovie.id} className="each-upcoming-movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${eachUpcomingMovie.backdropPath}`}
                alt={eachUpcomingMovie.title}
                className="movie-poster-image"
              />
              <div className="title-rating-container">
                <p className="movie-title">{eachUpcomingMovie.title}</p>
                <p className="movie-rating">{eachUpcomingMovie.voteAverage}</p>
              </div>
              <Link
                to={`/movie/${eachUpcomingMovie.id}`}
                className="view-details-btn-container"
              >
                <button type="button" className="view-details-btn">
                  View Details
                </button>
              </Link>
            </li>
          ))}
        </ul>
        <div className="pagination-container">
          <button
            type="button"
            className="pagination-btn"
            onClick={this.onClickingPrevBtn}
          >
            Prev
          </button>
          <p className="page-number">{upcomingMoviesPageNumber}</p>
          <button
            type="button"
            className="pagination-btn"
            onClick={this.onClickingNxtBtn}
          >
            Next
          </button>
        </div>
      </div>
    )
  }
}

export default UpcomingMovies
