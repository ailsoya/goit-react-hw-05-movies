import { useParams } from "react-router-dom"
import { useState, useEffect, React } from "react"
import { Link } from "react-router-dom"

const MovieDetails = () => {
    const { movieId } = useParams()
    const [ currentMovie, setMovie ] = useState('')

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
                setMovie(response)
                //console.log(response)
            })
            .catch(err => console.error(err))
      }, [movieId])


    return (
        <div>
            <Link to="/">Go back</Link>
            {currentMovie && (
                <div>
                    <h2>{currentMovie.title} ({currentMovie.release_date.split('-')[0]})</h2>
                    <p>User score: {Math.round(currentMovie.vote_average*10)}%</p>
                    <h3>Overview</h3>
                    <p>{currentMovie.overview}</p>
                    <h3>Genres</h3>
                    <ul>{currentMovie.genres.map(genre => (<li key={genre.id}>{genre.name}</li>))}</ul>
                </div>
            )}
        </div>
    )
}

export default MovieDetails