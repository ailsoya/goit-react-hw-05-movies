import { useState, useEffect, React } from "react"
import { useLocation } from "react-router-dom"
import styles from 'Style.module.css'

const Cast = () => {
    const [ cast, setCast ] = useState('')
    const id = useLocation().pathname.split('/')[2]

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwY2U5NDhhZDE3MDk4YjdiMDY0M2UzNzAyNDcwN2MyZSIsInN1YiI6IjY1M2ZiMTEzY2M5NjgzMDBlYTcyMjE3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4JoR3Bh3JECCGxfgEHZO2aU_YaJZO4kcoo6RHbbiCzs'
            }
          };
          
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
            .then(response => response.json())
            .then(response => {
                // eslint-disable-next-line array-callback-return
                response.cast.map((actor, index, actors) => {
                    const { id, name, character, profile_path } = actor
                    actors[index] = { id: id, name: name, character: character, profile_path: profile_path }
                    setCast(actors)
                })
            })
            .catch(err => console.error(err));
    }, [id])

    return (
        <>
            {cast && (
                <ul>
                    {cast.map(actor => (
                        <li key={actor.id} className={styles.Actor}>
                            <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt="actor" className={styles.Photo} />
                            <p>
                                {actor.name}<br /><br />
                                Character: {actor.character}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default Cast