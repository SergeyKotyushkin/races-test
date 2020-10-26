import { createHmac } from "crypto";

export function encrypt(text) {
  return createHmac('sha512', process.env.SHA_KEY).update(text).digest('hex');
};
