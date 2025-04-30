
import React from 'react';
import { Button } from '@/components/ui/button';

interface CodeDisplayProps {
  code: string;
  onCopy: (code: string) => void;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, onCopy }) => {
  const lines = code.split('\n');

  return (
    <div className="editor-container bg-zinc-950 rounded-lg overflow-hidden">
      <div className="flex">
        <div className="line-numbers p-4 bg-zinc-900 text-gray-500 select-none">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <pre className="code-area flex-1 p-4 overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
      <div className="bg-zinc-900 p-2 flex justify-end">
        <Button 
          onClick={() => onCopy(code)} 
          variant="outline" 
          className="text-white border-gray-600 hover:bg-roblox-blue hover:text-white button-glow"
        >
          نسخ سريع
        </Button>
      </div>
    </div>
  );
};

export default CodeDisplay;
