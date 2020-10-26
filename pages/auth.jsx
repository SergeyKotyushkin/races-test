import React, { useState } from 'react';
import Head from 'next/head';
import encrypt from "../lib/encryption/rsa/encrypt";

const AuthPage = () => {
  const [errorMessage, setErrorMessage] = useState('');

  async function onSubmit(e) {
    e.preventDefault();

    const body = {
      login: encrypt(e.currentTarget.login.value, process.env.NEXT_PUBLIC_RSA_ENCRYPT_PUBLIC_KEY)
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
