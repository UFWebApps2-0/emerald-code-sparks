import React, { useState } from 'react';
import '../../Moderation/Moderation.css';

const ClassroomForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="classroom-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter classroom name"
        required
        className="classroom-form-input"
      />
      <button type="submit" className="classroom-form-submit-btn">
        Submit
      </button>
    </form>
  );
};

export default ClassroomForm;
