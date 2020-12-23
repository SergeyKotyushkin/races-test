import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ObjectId } from 'mongodb';
import { decrypt as rsaDecrypt } from "../encryption/rsa/decrypt";
import { encrypt as shaEncrypt } from "../encryption/sha/encrypt";

passport.serializeUser((account, done) => {
  done(null, account._id.toString());
});

passport.deserializeUser((req, id, done) => {
  req.db
    .collection('accounts')
    .findOne(ObjectId(id))
    .then((account) => done(null, account));
});

passport.use(
  new LocalStrategy(
    { usernameField: 'login', passwordField: 'login', passReqToCallback: true },
    async (req, rsaEncryptedLogin, _, done) => {
      try {
        const login = rsaDecrypt(rsaEncryptedLogin, process.env.RSA_DECRYPT_PRIVATE_KEY, process.env.RSA_DECRYPT_PASSPHRASE);
        const shaEncryptedLogin = shaEncrypt(login);
        const account = await req.db.collection('accounts').findOne({ login: shaEncryptedLogin });
        done(null, account || false);
      }
      catch (error) {
        done(error, false);
      }
    }
  )
);

export default passport;
