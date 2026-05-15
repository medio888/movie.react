import { Link } from "react-router-dom";
import { useFavorites } from "../context/favorites-context";
import type React from "react";
import type { Movie } from "../types/movie";

export default function MovieCard({ movie }: { movie: Movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } =
    useFavorites();

  const handleFavorites = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie.id);
    }
  };

  const favorite = isFavorite(movie.id);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
      <Link to={`/movie/${movie.id}`} className="flex-1 flex flex-col">
        <div className="aspect-[2/3] overflow-hidden bg-slate-100">
          {movie.primaryImage?.url ? (
            <img
              src={movie.primaryImage.url}
              alt={movie.primaryTitle}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              Нет постера
            </div>
          )}
        </div>

        <div className="p-4 flex-1">
          <h3 className="font-bold text-slate-800 line-clamp-2 leading-tight mb-3 text-lg">
            {movie.primaryTitle}
          </h3>

          <div className="space-y-2 text-sm text-slate-600">
            <p>
              📅 <span className="font-medium">{movie.startYear || "Неизвестно"}</span>
            </p>

            <p>
              🎭{" "}
              <span className="font-medium">
                {movie.genres?.genres
                  ?.slice(0, 2)
                  .map((genre) => genre.text)
                  .join(", ") || "Нет жанра"}
              </span>
            </p>

            <div className="flex items-center gap-4 pt-2">
              <span className="text-green-600 font-semibold">
                👍 {movie.ratingsSummary?.aggregateRating || 0}
              </span>

              <span className="text-red-500 font-semibold">
                👎
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <button
          onClick={handleFavorites}
          className={`w-full py-2.5 px-4 rounded-xl font-medium transition-all active:scale-95 ${
            favorite
              ? "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {favorite ? "Удалить из избранного" : "В избранное"}
        </button>
      </div>
    </div>
  );
}