import { useState, useEffect, React } from "react"
import { Link } from "react-router-dom"
import styles from 'Style.module.css'

const Home = () => {
    const [list, setList] = useState([])

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwY2U5NDhhZDE3MDk4YjdiMDY0M2UzNzAyNDcwN2MyZSIsInN1YiI6IjY1M2ZiMTEzY2M5NjgzMDBlYTcyMjE3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4JoR3Bh3JECCGxfgEHZO2aU_YaJZO4kcoo6RHbbiCzs'
            }
        }

        fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
            .then(response => response.json())
            .then(response => {
                // eslint-disable-next-line array-callback-return
                response.results.map((result, index, films) => {
                    const { id, title } = result
                    films[index] = { id: id, title: title }
                    setList(films)
                })
            })
            .catch(err => console.error(err))
      }, [])

    return (
        <>
            <h2 className={styles.Title}>Trending today</h2>
            {list.length > 0 && (
                <ul className={styles.Prop}>
                    {list.map(film => ( <li key={film.id}><Link to={`/movies/${film.id}`} state={{ from: "/" }} className={styles.Obj}>{film.title}</Link></li> ))}
                </ul>
            )}
        </>
    )
}

export default Home