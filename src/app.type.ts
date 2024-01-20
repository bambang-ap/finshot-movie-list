export type Movie = {
  background_image_original: string;
  background_image: string;
  date_uploaded_unix: number;
  date_uploaded: string;
  description_full: string;
  genres: string[];
  id: number;
  imdb_code: string;
  language: string;
  large_cover_image: string;
  medium_cover_image: string;
  mpa_rating: string;
  rating: number;
  runtime: number;
  slug: string;
  small_cover_image: string;
  state: string;
  summary: string;
  synopsis: string;
  title_english: string;
  title_long: string;
  title: string;
  url: string;
  year: number;
  yt_trailer_code: string;
};

export type MovieDetail = Movie & {
  cast: MovieCast[];
  large_screenshot_image1: string;
  large_screenshot_image2: string;
  large_screenshot_image3: string;
  like_count: number;
  medium_screenshot_image1: string;
  medium_screenshot_image2: string;
  medium_screenshot_image3: string;
};

export type MovieCast = {
  name: string;
  character_name: string;
  url_small_image: string;
  imdb_code: string;
};
