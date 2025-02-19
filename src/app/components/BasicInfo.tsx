import React, { useState } from 'react';

const equipmentOptions = [
  'Helmet',
  'Chestplate',
  'Leggings',
  'Boots',
  'Gloves',
  'Cape'
];

const BasicInfo: React.FC = () => {
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);

  const handleEquipmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedEquipments(value);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Basic Info</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Tree</label>
        <input type="text" className="w-full p-2 border rounded-lg" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Axe</label>
        <input type="text" className="w-full p-2 border rounded-lg" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Sets</label>
        <input type="text" className="w-full p-2 border rounded-lg" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Lantern</label>
        <input type="text" className="w-full p-2 border rounded-lg" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Pet</label>
        <input type="text" className="w-full p-2 border rounded-lg" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Rings</label>
        <input type="text" className="w-full p-2 border rounded-lg" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Equipments</label>
        <select
          multiple
          value={selectedEquipments}
          onChange={handleEquipmentChange}
          className="w-full p-2 border rounded-lg"
        >
          {equipmentOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BasicInfo;