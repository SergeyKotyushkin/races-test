import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { encrypt as rsaEncrypt } from "../lib/encryption/rsa/encrypt";
import { useTeam } from '../lib/react-hooks/use-team';
import Header from '../components/header';
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Container, Typography, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  ({
    container: {
      marginTop: theme.spacing(5)
    },
    form: {
      marginTop: theme.spacing(2)
    },
    button: {
      margin: theme.spacing(1)
    }
  })
);

const AuthPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const [team, { error, mutate }] = useTeam();
  const [loginProcessing, setLoginProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function onSubmit(e) {
    e.preventDefault();

    const body = {
      login: rsaEncrypt(e.currentTarget.login.value, process.env.NEXT_PUBLIC_RSA_ENCRYPT_PUBLIC_KEY)
    };

    setLoginProcessing(true);

    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (response.status === 200) {
      mutate(true);
    } else {
      // todo: change error message template
      setErrorMessage(`Failure! ${response.status} ${response.statusText}.`);
      setLoginProcessing(false);
    }
  }

  useEffect(() => {
    if (team) {
      router.replace('/');
    }
  }, [team]);

  return (
    <>
      <Head>
        <title>Authorization</title>
      </Head>
      <Header />
      {
        error &&
        (
          <Container maxWidth="lg" className={classes.container}>
            <Typography color="error" gutterBottom>Team validation error.</Typography>
          </Container>
        )
      }
      {
        !error && !loginProcessing &&
        (
          <Container maxWidth="lg" className={classes.container}>
            <Typography variant="body1" gutterBottom>Hello man!</Typography>
            <Typography variant="body1" gutterBottom>Please enter your secret code for authentication.</Typography>
            <form onSubmit={onSubmit} className={classes.form}>
              <TextField label="Code" name="login" color="default" color="secondary" />
              <Button type="submit" variant="contained" color="primary" className={classes.button}>Log in</Button>
            </form>
            {
              errorMessage && <Typography color="error">{errorMessage}</Typography>
            }
          </Container>
        )
      }
      {
        loginProcessing &&
        (
          <Container maxWidth="lg" className={classes.container}>
            <CircularProgress color="inherit"/>
          </Container>
        )
      }
    </>
  );
}

export default AuthPage;
