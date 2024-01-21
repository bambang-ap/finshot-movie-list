import {useMovieDetail} from '@/src/api';
import {Icon} from '@/src/components/Icon';
import {useRouter} from 'next/router';
import {ReactNode, useLayoutEffect, useRef, useState} from 'react';

export default function MovieDetail() {
	const router = useRouter();

	if (!router.query.id) return null;

	return <RenderMovieDetail movie_id={router.query.id as string} />;
}

function RenderMovieDetail({movie_id}: {movie_id: string}) {
	const router = useRouter();
	const ref = useRef<HTMLDivElement>(null);

	const [width, setWidth] = useState(0);
	const [currentIdx, setCurrentIdx] = useState(0);

	const {data} = useMovieDetail({movie_id});
	const {movie} = data?.data ?? {};
	const {
		title_english: title,
		year,
		rating,
		runtime,
		language,
		genres,
		description_full,
		cast,
	} = movie ?? {};

	const screenshots = entries(movie).filter(([key]) =>
		key.includes('large_screenshot'),
	);

	function goToScreenshot(index: number) {
		setCurrentIdx(index);
	}

	useLayoutEffect(() => {
		if (ref.current && ref.current.clientWidth) {
			setWidth(ref.current.clientWidth);
		}
	});

	return (
		<div ref={ref} className="flex flex-col gap-2">
			<div className="flex items-center px-[12.5pt] py-4 border-0 border-b-2">
				<Icon
					className="cursor-pointer"
					onClick={router.back}
					name="faChevronLeft"
				/>
				<div className="flex-1 text-center font-bold">{title}</div>
			</div>

			<div className="overflow-hidden py-8" style={{width}}>
				<div
					style={{left: -width * currentIdx, width: width * screenshots.length}}
					className="flex relative items-center bg-black transition-all duration-500">
					{screenshots.map(([, url], index) => (
						<div className="w-full" key={index}>
							<img className="w-full" src={url as string} />
						</div>
					))}
				</div>
			</div>

			<div className="flex gap-2 pb-4 items-center justify-center">
				{screenshots.map(([], index) => {
					const isSelected = index === currentIdx;

					return (
						<button
							key={index}
							onClick={() => goToScreenshot(index)}
							className={classNames('cursor-pointer p-2 rounded-full', {
								'bg-red-300': !isSelected,
								'bg-white border-2 border-red-300': isSelected,
							})}
						/>
					);
				})}
			</div>

			<div className="px-[12.5pt]">
				<div className="flex gap-2">
					<Details title="Year" detail={year} />
					<Details title="Rating" detail={rating} />
				</div>
				<div className="flex gap-2">
					<Details title="Runtime" detail={runtime} />
					<Details title="Language" detail={language} />
				</div>
				<Details title="Genres" detail={genres?.join(', ')} />
				<Details title="Description" detail={description_full} />
				<div className="flex flex-col gap-2">
					<div className="font-bold">Cast</div>
					<div className="flex px-[12.5pt] gap-2">
						{cast?.map(people => {
							const {character_name, name, url_small_image} = people;
							return (
								<div
									className="flex flex-col gap-2 items-center"
									key={`${character_name}-${name}`}>
									<div className="w-16 h-16 overflow-hidden rounded-lg">
										<img
											className="w-full h-full"
											alt=""
											src={url_small_image!}
										/>
									</div>
									<div className="text-ellipsis text-xs text-center">
										{name}
									</div>
									<div className="text-ellipsis text-xs text-center text-gray-500">
										{character_name}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

function Details({title, detail}: {title: string; detail?: ReactNode}) {
	return (
		<div className={classNames('flex')}>
			<div className="font-bold">{title}</div>
			<div className="flex gap-2">
				<div>:</div>
				<div>{detail}</div>
			</div>
		</div>
	);
}
