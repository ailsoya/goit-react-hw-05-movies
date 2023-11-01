import Home from 'pages/Home'
import Movies from 'pages/Movies'
import MovieDetails from 'pages/MovieDetails/MovieDetails'
import Cast from '../pages/MovieDetails/Cast'
import Reviews from '../pages/MovieDetails/Reviews'
import { Routes, Route, NavLink  } from "react-router-dom"
import styles from 'Style.module.css'
import styled from "styled-components"

export const App = () => {
  const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: crimson;
  }
`
  return (
    <div>
      <nav className={styles.Nav}>
        <StyledLink to="/" end>Home</StyledLink>
        <StyledLink to="/movies">Movies</StyledLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} >
          <Route path="query=:search" element={<Reviews />} />
        </Route>
        <Route path="/movies/:movieId" element={<MovieDetails />} >
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </div>
  )
}
