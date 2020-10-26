import { publicEncrypt } from "crypto";

export function encrypt(data, publicKey) {
  var encryptedData = publicEncrypt(publicKey, Buffer.from(data));

  return encryptedData.toString("base64");
};
