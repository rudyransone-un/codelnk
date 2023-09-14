import fs from 'node:fs';
import path from 'node:path';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import { nanoid } from 'nanoid';
import mime from 'mime-types';

import {
  uploadFile,
  getFiles,
  getLastCreatedFile,
} from './service/file';

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

app.get('/file/last', async (req, res) => {
  const file = await getLastCreatedFile();

  res.json({ file });
});

app.get('/file/:filename', (req, res) => {
  const filePath = `${UPLOADS_DIR}/${req.params.filename}`;

  if (!fs.existsSync(filePath))
    return res.json({ message: 'file not found' });

  res.sendFile(filePath);
});

app.get('/files', async (req, res) => {
  const files = await getFiles();

  if (!files) return res.json({ message: 'files empty' });

  res.json({ files, count: files.length });
});

app.post('/upload', upload.single('file'), async (req, res) => {
  const fileLink =
    req.file && `http://localhost:${PORT}/file/${req.file.filename}`;

  if (!req.file) return res.json({ error: 'Filed upload file' });

  await uploadFile({
    filename: req.file.filename,
    filetype: mime.extension(req.file.mimetype) as string,
    size: req.file.size,
  });

  res.status(200).json({ message: 'file uploaded', link: fileLink });
});

app.listen(PORT, () =>
  console.log(`Started on http://localhost:${PORT}`),
);
