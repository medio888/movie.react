export interface Movie {
  id: string;

  primaryTitle: string;
  originalTitle?: string;

  startYear?: number;

  genres?: {
    genres: {
      text: string;
    }[];
  };

  ratingsSummary?: {
    aggregateRating?: number;
  };

  primaryImage?: {
    url: string;
  };

  plot?: {
    plotText?: {
      plainText?: string;
    };
  };
}