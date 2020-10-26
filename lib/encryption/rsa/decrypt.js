import { privateDecrypt } from "crypto";

export function decrypt(encryptedData, privateKey, passphrase) {
  var decryptedData = privateDecrypt(
    {
      key: privateKey,
      passphrase
    },
    Buffer.from(encryptedData, 'base64')
  );

  return decryptedData.toString();
};
