import nextConnect from 'next-connect';
import auth from '../../middlewares/auth';
import passport from '../../lib/auth/passport';

const handler = nextConnect();

handler.use(auth);

handler.post(passport.authenticate('local'), (req, res) => {
  // todo: filter returning properties
  res.json({ user: req.user });
});

export default handler;
