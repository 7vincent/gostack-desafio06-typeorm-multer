import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const diretory = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  diretory,
  storage: multer.diskStorage({
    destination: diretory,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
};
