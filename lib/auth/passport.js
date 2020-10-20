import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.serializeUser((team, done) => {
  done(null, team._id.toString());
});

passport.deserializeUser((req, id, done) => {
  req.db
    .collection('teams')
    .findOne(ObjectId(id))
    .then((team) => done(null, team));
});

passport.use(
  new LocalStrategy(
    { usernameField: 'login', passwordField: 'login', passReqToCallback: true },
    async (req, login, _, done) => {
      const team = await req.db.collection('teams').findOne({ login });
      done(null, team || false);
    }
  )
);

export default passport;
