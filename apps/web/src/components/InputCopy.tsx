import React from 'react';
import { IconClipboard } from '@tabler/icons-react';

interface InputCopyProps {
  fileLink: string;
  onChangeFile(e: React.ChangeEvent<HTMLInputElement>): any;
}

export function InputCopy({
  fileLink,
  onChangeFile,
}: InputCopyProps) {
  return (
    <div className="flex items-center space-x-1">
      <input
        className="border-[1px] px-2 w-[320px] rounded-sm h-[35px] border-slate-200 focus:outline-none"
        type="text"
        value={fileLink}
        onChange={onChangeFile}
      />
      <button
        className="bg-slate-100 h-[35px] w-[40px] flex justify-center items-center rounded-sm hover:bg-slate-50"
        onClick={() => {
          navigator.clipboard.writeText(fileLink).then();
        }}
      >
        <IconClipboard width={24} height={24} />
      </button>
    </div>
  );
}
