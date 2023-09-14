import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputCopy, FilesBrowse } from '../components';
import { FileResponse } from '../types/FileResponse.ts';
import { Header } from '../components/Header.tsx';

interface SelectFileProps {
  file: File | undefined | null;
  handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void;
  clearFileChange(): void;
}

const SelectFile = ({
  file,
  handleFileChange,
  clearFileChange,
}: SelectFileProps) => {
  return (
    <div className="flex flex-col justify-center">
      <input type="file" onChange={handleFileChange} />
      <div className="font-sans flex items-center space-x-1">
        {file && (
          <div>
            {file.name} - {file.type}
          </div>
        )}
        {file && (
          <button
            onClick={clearFileChange}
            className="font-sans underline text-red-400"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

interface UploadFileProps {
  file: File | null | undefined;
  uploadFile(): void;
  handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void;
  clearFileChange(): void;
}

const UploadFile = ({
  file,
  handleFileChange,
  uploadFile,
  clearFileChange,
}: UploadFileProps) => {
  return (
    <div className="flex items-center space-x-2">
      <SelectFile
        file={file}
        handleFileChange={handleFileChange}
        clearFileChange={clearFileChange}
      />
      <button
        className="bg-teal-100 w-[120px] h-[35px]"
        onClick={uploadFile}
      >
        Upload
      </button>
    </div>
  );
};

export function UploadPage() {
  const [lastFile, setLastFile] = useState<FileResponse>();
  const [file, setFile] = useState<File | null>();
  const [files, setFiles] = useState<Array<FileResponse> | null>(
    null,
  );
  const [filesCount, setFilesCount] = useState<number>(0);
  const [fileLink, setFileLink] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:3000/files').then((response) => {
      setFiles(response.data.files);
      setFilesCount(response.data.count);
    });

    axios.get('http://localhost:3000/file/last').then((response) => {
      setLastFile(response.data.file[0]);
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

  const clearFileChange = () => {
    setFile(null);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto h-screen flex justify-center items-center">
        <div className="flex items-center flex-col space-y-1">
          <UploadFile
            file={file}
            handleFileChange={handleFileChange}
            uploadFile={uploadFile}
            clearFileChange={clearFileChange}
          />
          <InputCopy
            fileLink={fileLink}
            onChangeFile={onChangeFile}
          />
          {files && (
            <FilesBrowse
              files={files}
              filesCount={filesCount}
              lastFile={lastFile}
            />
          )}
        </div>
      </div>
    </>
  );
}
