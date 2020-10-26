import { publicEncrypt } from "crypto";

export default function encrypt(data, publicKey) {
  var encryptedData = publicEncrypt(publicKey, Buffer.from(data));

  return encryptedData.toString("base64");
};
