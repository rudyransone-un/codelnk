import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputCopy, FilesBrowse } from './components';
import './index.css';

interface SelectFileProps {
  file: File | undefined;
  handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const SelectFile = ({ file, handleFileChange }: SelectFileProps) => {
  return (
    <div className="flex flex-col justify-center">
      <input type="file" onChange={handleFileChange} />
      <div className="font-sans">
        {file && `${file.name} - ${file.type}`}
      </div>
    </div>
  );
};

interface UploadFileProps {
  file: File | undefined;
  uploadFile(): void;
  handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const UploadFile = ({
  file,
  handleFileChange,
  uploadFile,
}: UploadFileProps) => {
  return (
    <div className="flex items-center space-x-2">
      <SelectFile file={file} handleFileChange={handleFileChange} />
      <button
        className="bg-teal-100 w-[120px] h-[35px]"
        onClick={uploadFile}
      >
        Upload
      </button>
    </div>
  );
};

function App() {
  const [file, setFile] = useState<File>();
  const [files, setFiles] = useState<Array<string> | null>(null);
  const [fileLink, setFileLink] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:3000/files').then((response) => {
      setFiles(response.data.files);
    });
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    axios
      .post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':
            'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        withCredentials: false,
      })
      .then((response) => setFileLink(response.data.link))
      .catch(console.error);
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileLink(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto h-screen flex justify-center items-center">
        <div className="flex items-center flex-col space-y-1">
          <UploadFile
            file={file}
            handleFileChange={handleFileChange}
            uploadFile={uploadFile}
          />
          <InputCopy
            fileLink={fileLink}
            onChangeFile={onChangeFile}
          />
          {files && <FilesBrowse files={files} />}
        </div>
      </div>
    </>
  );
}

export default App;
