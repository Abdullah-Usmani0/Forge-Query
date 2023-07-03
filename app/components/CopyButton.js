import React, { useState } from 'react';

const CopyButton = ({ content }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Optional: Reset the copied status after 2 seconds
  };

  return (
    <div
      onClick={handleCopyClick}
      className="absolute top-1 right-1 cursor-pointer text-xs text-gray-500"
      title={isCopied ? "Copied!" : "Copy to clipboard"}
    >
      {isCopied ? 'Copied!' : 'Copy'}
    </div>
  );
};


export default CopyButton;