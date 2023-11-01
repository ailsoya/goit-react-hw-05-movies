import { useParams, useLocation, Link, Outlet } from "react-router-dom"
import { useState, useEffect, React } from "react"
import styles from 'Style.module.css'

const MovieDetails = () => {
    const { movieId } = useParams()
    const [ currentMovie, setMovie ] = useState('')
    const location = useLocation()

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwY2U5NDhhZDE3MDk4YjdiMDY0M2UzNzAyNDcwN2MyZSIsInN1YiI6IjY1M2ZiMTEzY2M5NjgzMDBlYTcyMjE3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4JoR3Bh3JECCGxfgEHZO2aU_YaJZO4kcoo6RHbbiCzs'
            }
        }
          
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
            .then(response => response.json())
            .then(response => {
                const { id, title, release_date, poster_path, vote_average, overview, genres } = response
                const film = { id: id, title: title, release_date: release_date, poster_path: poster_path, vote_average: vote_average, overview: overview, genres: genres }
                setMovie(film)
                })
            .catch(err => console.error(err))
      }, [movieId])


    return (
        <>
            <Link to={location.state.from} className={styles.Back}>← Go Back</Link>
            {currentMovie && (
                <div className={styles.Card}>
                    <img src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`} alt="poster"/>
                    <div>
                        <h2>{currentMovie.title} ({currentMovie.release_date.split('-')[0]})</h2>
                        <p>User score: {Math.round(currentMovie.vote_average*10)}%</p>
                        <h3>Overview</h3>
                        <p>{currentMovie.overview}</p>
                        <h3>Genres</h3>
                        <ul className={styles.Genres}>{currentMovie.genres.map(genre => (<li key={genre.id}>{genre.name}</li>))}</ul>
                    </div>
                </div>
            )}
            <hr />
            <p>Additional information</p>
            <ul>
                <Link to='cast' state={{ from: location.state.from }}><li>Cast</li></Link>
                <Link to='reviews' state={{ from: location.state.from }}><li>Reviews</li></Link>
            </ul>
            <hr />
            <Outlet />
        </>
    )
}

export default MovieDetails