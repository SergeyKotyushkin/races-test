import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { decrypt as rsaDecrypt } from "../encryption/rsa/decrypt";

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
    async (req, rsaEncryptedLogin, _, done) => {
      try {
        var login = rsaDecrypt(rsaEncryptedLogin, process.env.RSA_DECRYPT_PRIVATE_KEY, process.env.RSA_DECRYPT_PASSPHRASE);
        const team = await req.db.collection('teams').findOne({ login });
        done(null, team || false);
      }
      catch (error) {
        done(error, false);
      }
    }
  )
);

export default passport;
