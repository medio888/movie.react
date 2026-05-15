import MovieCard from "./MovieCard";
import type { Movie } from "../types/movie";

export default function MoviesList({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}