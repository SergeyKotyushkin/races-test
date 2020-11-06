import Head from 'next/head'
import { useRouter } from 'next/router';
import { useTeam } from '../lib/react-hooks/use-team';
import Header from '../components/header';
import { makeStyles } from "@material-ui/core/styles";
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  ({
    container: {
      marginTop: theme.spacing(5)
    }
  })
);

export default function Home() {
  const classes = useStyles();
  const router = useRouter();
  const [team, { error, mutate }] = useTeam();

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
      {
        error
          ? (
            <Container maxWidth="lg" className={classes.container}>
              <Typography color="error" gutterBottom>Team validation error.</Typography>
            </Container>
          )
          : (
            <Container maxWidth="lg" className={classes.container}>
              <p>Index</p>
            </Container>
          )
      }
    </>
  )
}
