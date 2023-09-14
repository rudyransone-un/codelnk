import React from 'react';
import { IconFileTypeJpg } from '@tabler/icons-react';
import { FileResponse } from '../types/FileResponse.ts';

interface FilesBrowseProps {
  files: Array<FileResponse>;
  filesCount: number;
  lastFile: FileResponse | undefined;
}

const FileItem = ({
  file,
  fileLink,
}: {
  file: FileResponse;
  fileLink: string;
}) => {
  return (
    <div className="flex justify-between items-center p-1 hover:bg-slate-50 rounded-sm">
      <div className="flex items-center space-x-1">
        <IconFileTypeJpg
          className="text-slate-500"
          width={24}
          height={24}
        />
        <div className="font-sans">
          <a className="underline" href={fileLink}>
            {file.filename}
          </a>
        </div>
      </div>
      <div>{file.timestamp}</div>
    </div>
  );
};

const FileList: React.FC<FilesBrowseProps> = ({
  files,
  filesCount,
  lastFile,
}) => {
  return (
    <>
      <div className="w-full h-[40px] bg-gray-300 text-gray-800 flex items-center justify-between px-2 font-sans text-md">
        <div>Files - {filesCount}</div>
        <div>Last uploaded File - {lastFile?.timestamp}</div>
      </div>
      {files &&
        files.map((file) => (
          <FileItem
            file={file}
            fileLink={`http://localhost:3000/file/${file.filename}`}
            key={file.id}
          />
        ))}
    </>
  );
};

export function FilesBrowse({
  files,
  filesCount,
  lastFile,
}: FilesBrowseProps) {
  return (
    <div className="w-[800px] bg-gray-200 rounded-sm p-1 space-y-1">
      <FileList
        files={files}
        filesCount={filesCount}
        lastFile={lastFile}
      />
    </div>
  );
}
