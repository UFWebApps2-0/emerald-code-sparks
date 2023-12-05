import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';

const UnitListModal = ({ visible, onCancel, units, onUnitSelect, selectedUnits }) => {

  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [selectedUnitToDelete, setSelectedUnitToDelete] = useState(null);
  const [localSelectedUnits, setLocalSelectedUnits] = useState(selectedUnits || []);

  useEffect(() => {
    setLocalSelectedUnits(selectedUnits || []);
  }, [selectedUnits]);

  const handleUnitSelect = (unit) => {
    const isSelected = localSelectedUnits.includes(unit);
    const updatedSelected = isSelected
      ? localSelectedUnits.filter((selectedUnit) => selectedUnit !== unit)
      : [...localSelectedUnits, unit];

    setLocalSelectedUnits(updatedSelected); // Update local state
    onUnitSelect && onUnitSelect(updatedSelected); // Notify parent component about the selected units
  };

  const showConfirmation = (unit) => {
    setSelectedUnitToDelete(unit);
    setConfirmationVisible(true);
  };

  const handleConfirmDelete = () => {
    setConfirmationVisible(false);
    if (selectedUnitToDelete) {
      const updatedSelectedUnits = localSelectedUnits.filter(unit => unit !== selectedUnitToDelete);
      setLocalSelectedUnits(updatedSelectedUnits);
      onUnitSelect && onUnitSelect(updatedSelectedUnits); // Notify parent component about the selected units
    }
  };

  const handleCancelDelete = () => {
    setSelectedUnitToDelete(null);
    setConfirmationVisible(false);
  };

  return (
    <Modal
      title="Unit List"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <button key="cancel" onClick={onCancel}>
          Close
        </button>,
      ]}
    >
      <ul>
        {units.map((unit) => (
          <li key={unit.id}>
            <button onClick={() => showConfirmation(unit)} style={{ marginTop: 18 }}>
              {unit.name}
            </button>
          </li>
        ))}
      </ul>
      <Modal
        title="Confirm Delete"
        visible={isConfirmationVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Confirm"
      >
        <p>Are you sure you want to delete this unit?</p>
      </Modal>
    </Modal>
  );
};

export default UnitListModal;
