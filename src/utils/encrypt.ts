import * as CryptoJS from 'crypto-js';

export function encrypt(token: string) {
  return CryptoJS.AES.encrypt(token, process.env.SECRET_PASSPHRASE);
}

export function decrypt(token: string) {
  return CryptoJS.AES.decrypt(token, process.env.SECRET_PASSPHRASE);
}
