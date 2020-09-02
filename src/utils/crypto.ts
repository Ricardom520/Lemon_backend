var cryptoJs = require('crypto-js');

// DES 对称解密
export const decryptDes = (message: string) => {
  var keyHex = cryptoJs.enc.Utf8.parse('reservationAes');
  var decrypted = cryptoJs.DES.decrypt(message, keyHex, {
    mode: cryptoJs.mode.ECB,
    padding: cryptoJs.pad.Pkcs7
  });
  
  return decrypted.toString(cryptoJs.enc.Utf8);
}