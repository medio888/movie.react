import MoviesList from "../components/MoviesList";
import { useFavorites } from "../context/favorites-context";
import { useEffect, useState } from "react";
import { getMoviesByIds } from "../services/api";
import type { Movie } from "../types/movie";

export default function Favorites() {
  const { favorites } = useFavorites();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMoviesByIds(favorites).then((data) => {
      setMovies(data || []);
      setLoading(false);
    });
  }, [favorites]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-slate-900">
        ❤️ Избранные фильмы
      </h1>

      {loading ? (
        <div className="text-center text-slate-500 text-lg">
          Загрузка...
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center text-slate-500 text-lg">
          У вас пока нет избранных фильмов
        </div>
      ) : (
        <MoviesList movies={movies} />
      )}
    </div>
  );
}