import React from 'react';
import './BadgeTable.less';

const BadgeTable = () => {
  const numRows = 4;
  const numColumns = 4;

  const data = Array.from({ length: numRows }, () =>
    Array.from({ length: numColumns }, () => 'Badge')
  );

  return (
    <div className="grid-table">
      {data.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <div className="grid-cell" key={`cell-${rowIndex}-${cellIndex}`}>
            
            <span className="badge">{cell}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default BadgeTable;
