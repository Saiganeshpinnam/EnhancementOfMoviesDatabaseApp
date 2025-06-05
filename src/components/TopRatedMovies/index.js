import {Link} from 'react-router-dom'

import {Component} from 'react'

import Header from '../Header'

import './index.css'

class TopRatedMovies extends Component {
  state = {
    topRatedMoviesData: [],
    topRatedMoviesPageNumber: 1,
  }

  componentDidMount() {
    this.getTopRatedMovies()
  }

  getTopRatedMovies = async () => {
    const {topRatedMoviesPageNumber} = this.state
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=6de6464c60dc6e29adb8a0eb4dec6103&language=en-US&page=${topRatedMoviesPageNumber}`,
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

  onClickingPrevBtn = () => {
    const {topRatedMoviesPageNumber} = this.state
    if (topRatedMoviesPageNumber > 1) {
      this.setState(
        prevState => ({
          topRatedMoviesPageNumber: prevState.topRatedMoviesPageNumber - 1,
        }),
        this.getTopRatedMovies,
      )
    } else {
      this.setState(
        {
          topRatedMoviesPageNumber: 1,
        },
        this.getTopRatedMovies,
      )
    }
  }

  onClickingNxtBtn = () => {
    this.setState(
      prevState => ({
        topRatedMoviesPageNumber: prevState.topRatedMoviesPageNumber + 1,
      }),
      this.getTopRatedMovies,
    )
  }

  render() {
    const {topRatedMoviesData, topRatedMoviesPageNumber} = this.state
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
        <div className="pagination-container">
          <button
            type="button"
            className="pagination-btn"
            onClick={this.onClickingPrevBtn}
          >
            Prev
          </button>
          <p className="page-number">{topRatedMoviesPageNumber}</p>
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

export default TopRatedMovies
