const crypto = require("crypto");

function decryptWithPrivateKey(privateKey, message) {
  return crypto.privateDecrypt(privateKey, message);
}

function decryptWithPublicKey(publicKey, message) {
  return crypto.publicDecrypt(publicKey, message);
}

module.exports.decryptWithPrivateKey = decryptWithPrivateKey;
module.exports.decryptWithPublicKey = decryptWithPublicKey;
