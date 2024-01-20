import { useMovieDetail, useMovieList } from "@/src/api";

export default function Home() {
  const { data } = useMovieList({ page: 1 });
  const { data: d } = useMovieDetail({ movie_id: "125" });

  return null;
}
