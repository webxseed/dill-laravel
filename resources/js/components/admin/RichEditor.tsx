import { useState, useEffect, useRef } from "react";

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichEditor({ value, onChange }: RichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (editorRef.current && isMounted && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [isMounted]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const addLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  if (!isMounted) {
    return <div className="w-full px-3 py-2 rounded-md border border-border bg-background min-h-[200px]">Loading editor...</div>;
  }

  return (
    <div className="border border-border rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-border">
        <button
          type="button"
          onClick={() => execCommand('bold')}
          className="px-2 py-1 text-sm hover:bg-gray-200 rounded font-bold"
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          className="px-2 py-1 text-sm hover:bg-gray-200 rounded italic"
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => execCommand('underline')}
          className="px-2 py-1 text-sm hover:bg-gray-200 rounded underline"
          title="Underline"
        >
          U
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
          title="Bullet List"
        >
          •
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
          title="Numbered List"
        >
          1.
        </button>
        <button
          type="button"
          onClick={() => execCommand('formatBlock', 'h2')}
          className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
          title="Heading"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => execCommand('formatBlock', 'p')}
          className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
          title="Paragraph"
        >
          P
        </button>
        <button
          type="button"
          onClick={addLink}
          className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
          title="Add Link"
        >
          Link
        </button>
        <button
          type="button"
          onClick={() => execCommand('removeFormat')}
          className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
          title="Clear Formatting"
        >
          Clear
        </button>
      </div>
      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="w-full px-3 py-2 min-h-[200px] bg-background focus:outline-none prose prose-sm max-w-none"
        style={{ minHeight: '200px' }}
      />
    </div>
  );
}
