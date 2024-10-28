import { useRouter } from 'next/router';

export default function SubIdPage() {
  const router = useRouter();
  const { id } = router.query; // URL에서 id를 가져옴

  return (
    <div>
      <h1>Dynamic Sub Page</h1>
      <p>The ID is: {id}</p>
    </div>
  );
}