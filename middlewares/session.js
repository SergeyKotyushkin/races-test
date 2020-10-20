import { session, Store, MemoryStore } from 'next-session';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo({ Store, MemoryStore });

export default function (req, res, next) {
  const mongoStore = new MongoStore({
    client: req.dbClient,
    stringify: false
  });

  return session({
    store: mongoStore,
    rolling: true,
    cookie: {
      maxAge: 60 * 60 * 24 * 50, // 50 days
      httpOnly: false
    }
  })(req, res, next);
}
