import React, { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { encrypt as rsaEncrypt } from "../lib/encryption/rsa/encrypt";
import { useTeam } from '../lib/react-hooks/use-team';
import Header from '../components/header';
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import { Typography, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  ({
    container: {
      marginTop: theme.spacing(5)
    },
    button: {
      margin: theme.spacing(1)
    }
  })
);

const AuthPage = () => {
  const classes = useStyles();
  const [team, { error }] = useTeam();
  const [errorMessage, setErrorMessage] = useState('');

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

  if (error) {
    return (
      <span>Error!</span>
    );
  }

  if (team !== null) {
    if (team !== undefined) {
      Router.replace('/');
    }

    return (
      <span>Loading...</span>
    );
  }

  return (
    <>
      <Head>
        <title>Authorization</title>
      </Head>
      <Header />
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="body1" gutterBottom>Hello man!</Typography>
        <Typography variant="body1" gutterBottom>Please enter your secret code for authentication.</Typography>
        <form onSubmit={onSubmit}>
          <p>
            <TextField label="Code" name="login" color="default" color="secondary" />
            <Button type="submit" variant="contained" color="primary" className={classes.button}>Log in</Button>
          </p>
        </form>
        {
          errorMessage
            ? <Typography color="error">{errorMessage}</Typography>
            : null
        }
      </Container>
    </>
  );
}

export default AuthPage;
