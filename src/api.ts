import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {
	ApiResponse,
	MovieDetailParams,
	MovieListParams,
	MovieListResponse,
} from './api.type';
import {Movie, MovieDetail} from './app.type';

async function baseAPI<Res>(path: string, params: object) {
	const host = 'https://yts.mx/api/v2';
	const data = await axios.get<ApiResponse<Res>>(`${host}${path}`, {params});
	return data.data;
}

export function useMovieList(params: MovieListParams) {
	const {limit = 10, page = 1, query_term} = params;

	const query = useInfiniteQuery(['movie_list', limit, query_term], {
		queryFn({pageParam = page}) {
			return baseAPI<MovieListResponse>('/list_movies.json', {
				limit,
				query_term,
				page: pageParam,
			});
		},
		getNextPageParam(prevPage) {
			const {
				movie_count = 0,
				page_number = 1,
				limit: pageLimit = 0,
			} = prevPage?.data ?? {};
			const totalPage = Math.ceil(movie_count / pageLimit);

			if (page_number < totalPage) return page_number + 1;

			return false;
		},
	});

	const dataMapped = query.data?.pages.reduce<Movie[]>(
		(prevMovies, currentMovies) => {
			return [...prevMovies, ...(currentMovies.data.movies ?? [])];
		},
		[],
	);

	return {
		...query,
		dataMapped,
		get lastPage() {
			const {
				movie_count = 0,
				page_number,
				limit: pageLimit = 0,
			} = query.data?.pages.slice().pop()?.data ?? {};
			const totalPage = Math.ceil(movie_count / pageLimit);
			return {totalPage, page_number, movie_count};
		},
	};
}

export function useMovieDetail(params: Pick<MovieDetailParams, 'movie_id'>) {
	return useQuery([JSON.stringify(params)], {
		queryFn() {
			return baseAPI<MovieDetail>('/movie_details.json', {
				...params,
				with_cast: true,
				with_images: true,
			} as MovieDetailParams);
		},
	});
}
