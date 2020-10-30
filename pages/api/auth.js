import nextConnect from 'next-connect';
import auth, { mustAuthenticated } from '../../middlewares/auth';
import passport from '../../lib/auth/passport';

const handler = nextConnect();

handler.use(auth);

handler.post(passport.authenticate('local'), (req, res) => {
  // todo: filter returning properties
  res.json({ user: req.user });
});

handler.delete(mustAuthenticated, (req, res) => {
  req.logOut();
  res.status(204).end();
});

export default handler;
