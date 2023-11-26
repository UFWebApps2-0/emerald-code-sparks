import React, { useState } from 'react';
import Open from "../../assets/icons8-collapse-arrow-30_OPEN.png";
import Closed from "../../assets/icons8-collapse-arrow-30_CLOSED.png";
import './Accordion.less';

export default function Accordion({ title, content }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-item">
      <div
        className={`accordion-title ${isActive ? 'active' : ''}`}
        onClick={() => setIsActive(!isActive)}
      >
        <div>{title}</div>
        <img src={isActive ? Open : Closed} alt={isActive ? "Open" : "Closed"} />
      </div>
      {isActive && <div className="accordion-content">{content}</div>}
    </div>
  );
};
