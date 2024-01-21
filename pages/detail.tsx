import {useRouter} from 'next/router';

export default function MovieDetail() {
	const router = useRouter();

	console.log(router.query);

	return (
		<>
			<div>jhsfdjk</div>
		</>
	);
}
