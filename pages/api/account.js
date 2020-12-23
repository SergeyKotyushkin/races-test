import nextConnect from 'next-connect';
import auth from '../../middlewares/auth';

const handler = nextConnect();
handler.use(auth);

// todo: return only safe account properties
handler.get(async (req, res) => {
  res.json({ account: req.user || null })
});

export default handler;
