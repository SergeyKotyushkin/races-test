import nextConnect from 'next-connect';
import database from './database';
import session from './session';
import passport from '../lib/auth/passport';

const middleware = nextConnect();

middleware
  .use(database)
  .use(session)
  .use(passport.initialize())
  .use(passport.session());

export default middleware;


export function mustAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  console.error('Unauthenticated request');
  res.status(401).end();
}
