import React from 'react';
import type { ArchiveFile } from '../types';

interface Props {
  file: ArchiveFile;
}

const FileView: React.FC<Props> = ({ file }) => {
  return (
    <div className="file-view">
      <div className="file-header">
        <h2 className="file-title">{file.title}</h2>
        <div className="file-id">{file.id}</div>
      </div>
      
      <div className="file-meta">
        <span className="meta-label">CATEGORY:</span><span>{file.category}</span>
        <span className="meta-label">CLEARANCE:</span><span>LEVEL {file.clearance}</span>
        <span className="meta-label">AUTHOR:</span><span>{file.author}</span>
        <span className="meta-label">DATE:</span><span>{file.date}</span>
        <span className="meta-label">TAGS:</span><span>{file.tags.join(', ')}</span>
      </div>

      <div className="file-section">
        <div className="section-label">SUMMARY</div>
        <div className="section-content">{file.summary}</div>
      </div>

      <div className="file-section">
        <div className="section-label">BODY</div>
        <pre className="body-text">{file.body}</pre>
      </div>
    </div>
  );
};

export default FileView;
