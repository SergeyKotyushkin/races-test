import Head from 'next/head'
import Router from 'next/router';

export default function Home() {
  async function handleLogout() {
    await fetch('/api/auth', {
      method: 'DELETE',
    });

    Router.replace('/auth');
  };

  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
      <p>Index</p>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}
