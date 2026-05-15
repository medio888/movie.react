import { useEffect, useState } from "react";
import { boardMovies, searchMovies } from "../services/api";
import SearchBar from "../components/SearchBar";
import MoviesList from "../components/MoviesList";
import type { Movie } from "../types/movie";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    boardMovies().then((data) => {
      setMovies(data.titles || []);
      setLoading(false);
    });
  }, []);

  const handleSearch = (query: string) => {
    setLoading(true);

    searchMovies(query).then((data) => {
      setMovies(data.titles || []);
      setLoading(false);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-4">
          🎬 Поиск Фильмов
        </h1>

        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          Найдите популярные фильмы, рейтинги, жанры и добавляйте их в избранное
        </p>

        <SearchBar onSearch={handleSearch} />
      </div>

      {loading ? (
        <div className="text-center text-xl text-slate-500">
          Загрузка фильмов...
        </div>
      ) : (
        <MoviesList movies={movies} />
      )}
    </div>
  );
}