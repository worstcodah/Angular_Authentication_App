const crypto = require("crypto");
const hash = crypto.createHash("sha256");
const fs = require("fs");
const encrypt = require("./encrypt");
const decrypt = require("./decrypt");

const myData = {
  firstName: "first name",
  lastName: "last name",
  socialSecurityNumber: "ss number",
};

const myDataString = JSON.stringify(myData);

hash.update(myDataString);

const hashedData = hash.digest("hex");

const senderPrivateKey = fs.readFileSync(
  __dirname + "/id_rsa_pvt.pem",
  "utf-8"
);

const signedMessage = encrypt.encryptWithPrivateKey(
  senderPrivateKey,
  hashedData
);

const packageOfDataToSend = {
  algorithm: "sha256",
  originalData: myData,
  signedAndEncryptedData: signedMessage,
};

module.exports.packageOfDataToSend = packageOfDataToSend;
