import { useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useAccount } from '../lib/react-hooks/use-account';
import Header from '../components/header';
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Container, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  ({
    container: {
      marginTop: theme.spacing(5)
    }
  })
);

const Index = () => {
  const classes = useStyles();
  const router = useRouter();
  const [account, { error }] = useAccount();

  useEffect(() => {
    if (account === null) {
      router.replace('/auth');
    }
  }, [account]);

  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
      <Header />
      {
        error && account &&
        (
          <Container maxWidth="lg" className={classes.container}>
            <Typography color="error" gutterBottom>Account validation error.</Typography>
          </Container>
        )
      }
      {
        !error && account &&
        (
          <Container maxWidth="lg" className={classes.container}>
            <Typography gutterBottom>Index</Typography>
          </Container>
        )
      }
      {
        !account &&
        (
          <Container maxWidth="lg" className={classes.container}>
            <CircularProgress color="inherit"/>
          </Container>
        )
      }
    </>
  )
}

export default Index;
