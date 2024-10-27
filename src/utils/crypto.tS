import CryptoJS from 'crypto-js';

export const encryptedPassword = (password) => CryptoJS.AES.encrypt(password, process.env.REACT_APP_SECRET_KEY).toString();
