import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { encrypt as rsaEncrypt } from "../lib/encryption/rsa/encrypt";
import { useTeam } from '../lib/react-hooks/use-team';

const AuthPage = () => {
  // useRef stores isInitialMount flag, useRef does not cause re-render
  const isInitialMount = useRef(true);
  const [team] = useTeam();
  const [hasAuthCheck, setHasAuthCheck] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // useEffect runs once on component mount and every time when the state of the 'team' changes
  useEffect(() => {
    // it is not needed to do some logic if it is mount callback
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
    else {
      if (team) {
        // if team is authenticated then redirect to index
        Router.replace('/');
      }
      else {
        setHasAuthCheck(true);
      }
    }
  }, [team]);

  async function onSubmit(e) {
    e.preventDefault();

    const body = {
      login: rsaEncrypt(e.currentTarget.login.value, process.env.NEXT_PUBLIC_RSA_ENCRYPT_PUBLIC_KEY)
    };

    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (response.status === 200) {
      Router.replace('/');
    } else {
      // todo: change error message template
      setErrorMessage(`Failure! ${response.status} ${response.statusText}.`);
    }
  }

  if (!hasAuthCheck)
    return (
      <span>Loading...</span>
    );

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
