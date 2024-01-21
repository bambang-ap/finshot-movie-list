import {useMovieList} from '@/src/api';
import FlatList from 'flatlist-react';
import Link from 'next/link';
import {useLayoutEffect, useRef, useState} from 'react';

export default function Home() {
	const ref = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState(0);
	const {hasNextPage, fetchNextPage, dataMapped = []} = useMovieList({page: 1});

	function fetchMoreData() {
		if (hasNextPage) fetchNextPage();
	}

	useLayoutEffect(() => {
		if (ref.current && ref.current.clientHeight) {
			setHeight(ref.current.clientHeight);
		}
	}, []);

	return (
		<div className="relative flex flex-col flex-1 p-[12.5pt]">
			<div className="flex items-center gap-2 bg-gray-100 z-10 rounded-xl px-4 py-2 border mb-4">
				<div>o</div>
				<input
					placeholder="Input movie title !"
					className="bg-gray-100 w-full h-5 outline-none"
				/>
			</div>
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
							imdb_code,
							rating,
							title,
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
						loadingIndicator: <div className="text-center">Loading...</div>,
					}}
				/>
			</div>
		</div>
	);
}
