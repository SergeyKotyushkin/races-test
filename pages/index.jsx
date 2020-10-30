import Head from 'next/head'
import Router from 'next/router';

export default function Home() {
  async function handleLogout() {
    var response = await fetch('/api/auth', {
      method: 'DELETE',
    });

    console.log('response status', response.status);
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
