import {useMovieList} from '@/src/api';
import {Icon, Spinner} from '@/src/components/Icon';
import FlatList from 'flatlist-react';
import Link from 'next/link';
import {useLayoutEffect, useRef, useState} from 'react';

export default function Home() {
	const ref = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState(0);
	const [query_term, setQueryTerm] = useState('');
	const {
		lastPage,
		hasNextPage,
		fetchNextPage,
		isFetching,
		dataMapped = [],
	} = useMovieList({page: 1, query_term});

	const isSearching = isFetching && !!query_term;
	const {movie_count, showing} = lastPage ?? {};

	function fetchMoreData() {
		if (hasNextPage) fetchNextPage();
	}

	function onSearch(search: string) {
		typingDebounce(() => {
			setQueryTerm(search);
		});
	}

	useLayoutEffect(() => {
		if (ref.current && ref.current.clientHeight) {
			setHeight(ref.current.clientHeight);
		}
	});

	return (
		<div className="relative flex flex-col flex-1 p-[12.5pt]">
			<div className="flex items-center gap-2 bg-gray-100 z-10 rounded-xl px-4 py-2 border">
				<Icon name="faMagnifyingGlass" />
				<input
					onChange={e => onSearch(e.target.value)}
					placeholder="Input movie title !"
					className="bg-gray-100 w-full h-5 outline-none"
				/>
				{isSearching && <Spinner />}
			</div>

			<div className="text-center my-4">{`Showing ${showing} of ${movie_count}`}</div>

			<div ref={ref} className="flex-1" />

			<div
				style={{height}}
				className="flex flex-col relative overflow-hidden overflow-y-auto gap-[12.5pt]">
				<FlatList
					list={dataMapped}
					renderWhenEmpty={() => <div>List is empty!</div>}
					renderItem={movie => {
						const {
							id,
							rating,
							imdb_code,
							title_english: title,
							large_cover_image: medium_cover_image,
						} = movie;
						return (
							<Link
								href={`/detail?id=${id}`}
								key={`${id}-${imdb_code}`}
								className="flex items-center">
								<div
									style={{marginRight: '5pt'}}
									className="rounded-xl overflow-hidden w-[45pt] h-[67pt]">
									<img src={medium_cover_image} alt="" />
								</div>
								<div>
									<div className="text-sm text-black font-bold mb-[3pt]">
										{title}
									</div>
									<div className="text-xs text-gray-500">rating : {rating}</div>
								</div>
							</Link>
						);
					}}
					pagination={{
						hasMore: !!hasNextPage,
						loadMore: fetchMoreData,
						loadingIndicatorPosition: 'center',
						loadingIndicator: <Spinner className="text-xl" />,
					}}
				/>
			</div>
		</div>
	);
}
