import CryptoJS from "crypto-js";

function decryptData(encryptedData: string) {
  const bytes = CryptoJS.AES.decrypt(
    encryptedData,
    process.env.NEXT_PUBLIC_SECRET_KEY!
  );
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export default decryptData;
