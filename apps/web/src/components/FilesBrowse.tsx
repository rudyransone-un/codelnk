import React from 'react';
import { IconFileTypeJpg } from '@tabler/icons-react';

interface FilesBrowseProps {
  files: Array<string>;
}

const FileItem = ({
  file,
  fileLink,
}: {
  file: string;
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
            {file}
          </a>
        </div>
      </div>
      <div>{new Date().toDateString()}</div>
    </div>
  );
};

const FileList: React.FC<FilesBrowseProps> = ({ files }) => {
  return (
    <>
      <div className="w-full h-[30px] bg-gray-300"></div>
      {files &&
        files.map((file, index) => (
          <FileItem
            file={file}
            fileLink={`http://localhost:3000/file/${file}`}
            key={`file-${index}`}
          />
        ))}
    </>
  );
};

export function FilesBrowse({ files }: FilesBrowseProps) {
  return (
    <div className="w-[800px] bg-gray-200 rounded-sm p-1">
      <FileList files={files} />
    </div>
  );
}
