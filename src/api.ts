import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  ApiResponse,
  MovieDetailParams,
  MovieListParams,
  MovieListResponse,
} from "./api.type";
import { MovieDetail } from "./app.type";

async function baseAPI<Res>(path: string, params: object) {
  const host = "https://yts.mx/api/v2";
  const data = await axios.get<ApiResponse<Res>>(`${host}${path}`, { params });
  return data.data;
}

export function useMovieList(params: MovieListParams) {
  return useQuery([JSON.stringify(params)], {
    queryFn() {
      return baseAPI<MovieListResponse>("/list_movies.json", params);
    },
  });
}

export function useMovieDetail(params: Pick<MovieDetailParams, "movie_id">) {
  return useQuery([JSON.stringify(params)], {
    queryFn() {
      return baseAPI<MovieDetail>("/movie_details.json", {
        ...params,
        with_cast: true,
        with_images: true,
      } as MovieDetailParams);
    },
  });
}
