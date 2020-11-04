import Head from 'next/head'
import { useRouter } from 'next/router';
import { useTeam } from '../lib/react-hooks/use-team';
import Header from '../components/header/index';


export default function Home() {

  const router = useRouter();
  const [team, { error, mutate }] = useTeam();

  if (error) return <span>Error</span>;
  if (team === null) {
    mutate(null);
    router.replace('/auth');
    return <></>;
  }

  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
      <Header />
      <p>Index</p>
    </>
  )
}
