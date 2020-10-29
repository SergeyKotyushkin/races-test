import nextConnect from 'next-connect';
import auth from '../../middlewares/auth';

const handler = nextConnect();
handler.use(auth);

// todo: return only safe team properties
handler.get(async (req, res) => res.json({ team: req.user }));

export default handler;
