import React, { useState } from 'react';
import Head from 'next/head';

const AuthPage = () => {
  const [errorMessage, setErrorMessage] = useState('');

  async function onSubmit(e) {
    e.preventDefault();

    // todo: encrypt login
    const body = {
      login: e.currentTarget.login.value
    };

    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (response.status === 200) {
      // todo: redirect to associate page
      alert("Success!");
    } else {
      // todo: change error message template
      setErrorMessage(`Failure! ${response.status} ${response.statusText}.`);
    }
  }

  return (
    <>
      <Head>
        <title>Authorization</title>
      </Head>
      <p>Hello man!</p>
      <p>Please reveal yourself :)</p>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">
          <input id="login" type="login" name="login" placeholder="Login" />
        </label>
        <button type="submit">Log in</button>
        {
          errorMessage
            ? <p style={{ color: 'red' }}>{errorMessage}</p>
            : null
        }
      </form>
    </>
  );
}

export default AuthPage;
