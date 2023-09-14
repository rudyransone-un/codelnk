import fs from 'node:fs';
import path from 'node:path';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import { nanoid } from 'nanoid';
import mime from 'mime-types';

const PORT = 3000;
const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const fileId = nanoid();
    const fileType = mime.extension(file.mimetype);

    if (!fileType)
      return cb(new Error('Invalid file type'), file.filename);

    // file.mimetype.split('/')[1]
    cb(null, `${fileId}.${fileType}`);
  },
});
const upload = multer({ storage });

app.use(cors());
app.use(bodyParser.json());

app.get('/test', (_, res) => {
  res.status(200).json({ ping: 'pong' });
});

app.get('/file/:filename', (req, res) => {
  const filePath = `${UPLOADS_DIR}/${req.params.filename}`;

  if (!fs.existsSync(filePath))
    return res.json({ message: 'file not found' });

  res.sendFile(filePath);
});

app.get('/files', (req, res) => {
  const files = fs.readdirSync(UPLOADS_DIR);

  res.json({ files });
});

app.post('/upload', upload.single('file'), (req, res) => {
  // console.log('#INFO', req.file);
  const fileLink =
    req.file && `http://localhost:3000/file/${req.file.filename}`;

  res.status(200).json({ message: 'file uploaded', link: fileLink });
});

app.listen(PORT, () =>
  console.log(`Started on http://localhost:${PORT}`),
);
