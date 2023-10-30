import Home from 'pages/Home'
import Movies from 'pages/Movies'
import MovieDetails from 'pages/MovieDetails/MovieDetails'
import { Cast } from '../pages/MovieDetails/Cast'
import { Reviews } from '../pages/MovieDetails/Reviews'
import { Routes, Route, NavLink  } from "react-router-dom"

export const App = () => {
  return (
    <div>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />} >
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />s
        </Route>
      </Routes>
    </div>
  )
}
