import { Movie } from './app.type';

export interface ApiResponse<T> {
  status: string;
  status_message: string;
  data: T;
  '@meta': {
    server_time: number;
    server_timezone: string;
    api_version: number;
    execution_time: string;
  };
}

export interface MovieListParams {
  /**
   * The limit of results per page that has been set
   * @default 20
   */
  limit?: number;
  /**
   * Used to see the next page of movies, eg limit=15 and page=2 will show you movies 15-30
   * @default 1
   */
  page?: number;
  /**
   * Used to filter by a given quality
   * @default All
   */
  quality?: 'All' | '480p' | '720p' | '1080p' | '1080p.x265' | '2160p' | '3D';
  /**
   * Used to filter movie by a given minimum IMDb rating
   * @default 0
   */
  minimum_rating?: number;
  /**
   * Used for movie search, matching on: Movie Title/IMDb Code, Actor Name/IMDb Code, Director Name/IMDb Code
   * @default 0
   */
  query_term?: string;
  /**
   * Used to filter by a given genre (See http://www.imdb.com/genre/ for full list)
   * @default All
   */
  genre?: string;
  /**
   * Sorts the results by choosen value
   * @default date_added
   */
  sort_by?:
    | 'title'
    | 'year'
    | 'rating'
    | 'peers'
    | 'seeds'
    | 'download_count'
    | 'like_count'
    | 'date_added';
  /**
   * Orders the results by either Ascending or Descending order
   * @default desc
   */
  order_by?: 'desc' | 'asc';
  /**
   * Returns the list with the Rotten Tomatoes rating included
   * @default false
   */
  with_rt_ratings?: boolean;
}

export interface MovieListResponse {
  /**
   * The total movie count results for your query	2131
   */
  movie_count?: number;
  /**
   * The limit of results per page that has been set	20
   */
  limit?: number;
  /**
   * The current page number you are viewing	1
   */
  page_number?: number;
  /**
   * An array which will hold multiple movies and their relative information	ARRAY
   */
  movies?: Movie[];
}

export type MovieDetailParams = {
  /**
   * The YTS ID of the movie or the IMDB ID
   */
  movie_id: string;
  /**
   * When set the data returned will include the added image URLs
   */
  with_images?: boolean;
  /**
   * When set the data returned will include the added information about the cast
   */
  with_cast?: boolean;
};
