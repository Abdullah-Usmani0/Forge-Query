import hljs from 'highlight.js/lib/core';
import sql from 'highlight.js/lib/languages/sql';
import 'highlight.js/styles/github.css'; // choose the style you prefer
hljs.registerLanguage('sql', sql);

import React, { useEffect } from 'react';

const HighlightCode = ({ content }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre style={{overflowWrap: 'break-word', whiteSpace: 'pre-wrap'}}>
      <code
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </pre>
  );
};

export default HighlightCode;