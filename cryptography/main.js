const fs = require("fs");
const encrypt = require("./encrypt");
const decrypt = require("./decrypt");

const publicKey = fs.readFileSync(__dirname + "/id_rsa_pub.pem", "utf-8");

const encryptedMessage = encrypt.encryptWithPublicKey(publicKey, "abcd");

console.log(encryptedMessage.toString());

const privateKey = fs.readFileSync(__dirname + "/id_rsa_pvt.pem", "utf-8");

const decryptedMessage = decrypt.decryptWithPrivateKey(
  privateKey,
  encryptedMessage
);

console.log(decryptedMessage.toString());
