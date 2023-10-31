import { useState, useEffect, React } from "react"
import { useLocation } from "react-router-dom"

const Reviews = () => {
    const [ reviews, setReviews ] = useState('')
    const id = useLocation().pathname.split('/')[2]

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwY2U5NDhhZDE3MDk4YjdiMDY0M2UzNzAyNDcwN2MyZSIsInN1YiI6IjY1M2ZiMTEzY2M5NjgzMDBlYTcyMjE3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4JoR3Bh3JECCGxfgEHZO2aU_YaJZO4kcoo6RHbbiCzs'
            }
          };
          
          fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => {
                // eslint-disable-next-line array-callback-return
                response.results.map((result, index, films) => {
                    const { id, author, content } = result
                    films[index] = { id: id, author: author, content: content }
                    setReviews(films)
                })
            })
            .catch(err => console.error(err));
    }, [id])

    return (
        <>
            {reviews && (
                <ul>
                    {reviews.map(review => (
                        <li key={review.id}>
                            <b>Author: {review.author}</b>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default Reviews