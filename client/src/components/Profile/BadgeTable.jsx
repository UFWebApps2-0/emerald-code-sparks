import React from 'react';
import Badge from './Badge';
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
          <div className="grid-cell " key={`cell-${rowIndex}-${cellIndex}`}>
            {/* TODO change hardcoded badge prop values to cell data values */}
            <Badge 
                imageUrl={"https://media.discordapp.net/attachments/517010400860962831/1171160597463838840/image.png"}
                name={"Complete 100 Python exercises"}
                progressPercent={99}  
            />
          </div>
        ))
      )}
    </div>
  );
};

export default BadgeTable;
