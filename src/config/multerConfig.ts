import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

function generateRandomFilename(originalname: string): string {
  const randomString = crypto.randomBytes(24)
    .toString('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 16);
  
  const ext = path.extname(originalname);
  return `${randomString}${ext}`;
}

// Configuração de armazenamento padrão
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const filename = generateRandomFilename(file.originalname);
    cb(null, filename);
  }
});

export const upload = multer({ storage });

// Configuração de armazenamento para capa
const storageCapa = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', '..', 'uploads/cover'));
  },
  filename: (req, file, cb) => {
    const filename = generateRandomFilename(file.originalname);
    cb(null, filename);
  }
});

export const uploadCapa = multer({ storage: storageCapa });
