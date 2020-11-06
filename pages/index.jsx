import { useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useTeam } from '../lib/react-hooks/use-team';
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
  const [team, { error }] = useTeam();

  useEffect(() => {
    if (team === null) {
      router.replace('/auth');
    }
  }, [team]);

  return (
    <>
      <Head>
        <title>Index</title>
      </Head>
      <Header />
      {
        error && team &&
        (
          <Container maxWidth="lg" className={classes.container}>
            <Typography color="error" gutterBottom>Team validation error.</Typography>
          </Container>
        )
      }
      {
        !error && team &&
        (
          <Container maxWidth="lg" className={classes.container}>
            <Typography gutterBottom>Index</Typography>
          </Container>
        )
      }
      {
        !team &&
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
