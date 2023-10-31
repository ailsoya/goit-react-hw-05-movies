import styles from 'Style.module.css'
import { useState, useEffect, React } from "react"
import { Link } from "react-router-dom"

const Movies = () => {
    const [ results, setResults] = useState('')
    const [ search, setSearch] = useState('')

    const handleSubmit = evt => {
        evt.preventDefault()
        setSearch(evt.target.search.value)
    }

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwY2U5NDhhZDE3MDk4YjdiMDY0M2UzNzAyNDcwN2MyZSIsInN1YiI6IjY1M2ZiMTEzY2M5NjgzMDBlYTcyMjE3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4JoR3Bh3JECCGxfgEHZO2aU_YaJZO4kcoo6RHbbiCzs'
            }
          };
          
          fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=true&language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => {
                // eslint-disable-next-line array-callback-return
                response.results.map((result, index, films) => {
                    const { id, title } = result
                    films[index] = { id: id, title: title }
                    setResults(films)
                })
            })
            .catch(err => console.error(err));
      }, [search])

    return (
        <div>
            <form className={styles.Form} onSubmit={(evt) => handleSubmit(evt)}>
                <input
                    name="search"
                    type="text"
                    autoComplete="off"
                    autoFocus
                />
                <button type="submit" className={styles.SearchFormButton}>
                </button>
            </form>
            {results.length > 0 && (
                <ul className={styles.Prop}>
                    {results.map(result => ( <li key={result.id}><Link to={`/movies/${result.id}`} className={styles.Obj}>{result.title}</Link></li> ))}
                </ul>
            )}
        </div>
    )
}

export default Movies