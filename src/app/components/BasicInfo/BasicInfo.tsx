import React, { useState } from 'react';
import styles from './BasicInfo.module.css'


interface BasicInfoProps {
  name: string;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ name }) => {
  const [currentLevel, setCurrentLevel] = useState("");
  const [targetLevel, setTargetLevel] = useState("");
  const [currentExp, setCurrentExp] = useState("");
  const [targetExp, setTargetExp] = useState("");
  //console.log('BasicInfo name prop:', name);
  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-4">{name} Calculator</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Current Level:</label>
          <input
            type="number"
            defaultValue={1}
            className={`p-2 w-full border border-gray-600 rounded text-black ${styles.noSpinner}`}
            onChange={(e) => setCurrentLevel(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Target Level:</label>
          <input
            type="number"
            defaultValue={2}
            className="p-2 w-full border border-gray-600 rounded text-black"
          />
        </div>
        <div>
          <label className="block mb-1">Current EXP:</label>
          <input
            type="number"
            defaultValue={0}
            className="p-2 w-full border border-gray-600 rounded text-black"
          />
        </div>
        <div>
          <label className="block mb-1">Target EXP:</label>
          <input
            type="number"
            defaultValue={0}
            className="p-2 w-full border border-gray-600 rounded text-black"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-lg">Experience Till Target: 83</p>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold mb-2">Bonuses</h2>
        <div className="flex flex-col">
          <label className="flex items-center mb-1">
            <input type="checkbox" className="mr-2" />
            Leagues Tier 1 (500% exp)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Leagues Tier 2+ (800% exp)
          </label>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold mb-2">Filters/Options</h2>
        <input
          type="text"
          placeholder="Filter actions by name..."
          className="p-2 mb-2 w-full border border-gray-600 rounded"
        />
        <div className="flex flex-col">
          <label className="flex items-center mb-1">
            Category:
            <select className="ml-2 p-2 border border-gray-600 rounded">
              <option>All</option>
              {/* Add more options as needed */}
            </select>
          </label>
          <label className="flex items-center mb-1">
            <input type="checkbox" className="mr-2" />
            Hide Members?
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Enable Real Time Prices?
          </label>
        </div>
      </div>
    </div>
  );


  // const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);

  // const handleEquipmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = Array.from(event.target.selectedOptions, option => option.value);
  //   setSelectedEquipments(value);
  // };

  // return (
  //   <div className="p-4 bg-gray-100 rounded-lg shadow-md">
  //     <h2 className="text-xl font-bold mb-4">Basic Info</h2>
  //     <div className="mb-4">
  //       <label className="block text-gray-700">Tree</label>
  //       <input type="text" className="w-full p-2 border rounded-lg" />
  //     </div>
  //     <div className="mb-4">
  //       <label className="block text-gray-700">Axe</label>
  //       <input type="text" className="w-full p-2 border rounded-lg" />
  //     </div>
  //     <div className="mb-4">
  //       <label className="block text-gray-700">Sets</label>
  //       <input type="text" className="w-full p-2 border rounded-lg" />
  //     </div>
  //     <div className="mb-4">
  //       <label className="block text-gray-700">Lantern</label>
  //       <input type="text" className="w-full p-2 border rounded-lg" />
  //     </div>
  //     <div className="mb-4">
  //       <label className="block text-gray-700">Pet</label>
  //       <input type="text" className="w-full p-2 border rounded-lg" />
  //     </div>
  //     <div className="mb-4">
  //       <label className="block text-gray-700">Rings</label>
  //       <input type="text" className="w-full p-2 border rounded-lg" />
  //     </div>
  //     <div className="mb-4">
  //       <label className="block text-gray-700">Equipments</label>
  //       <select
  //         multiple
  //         value={selectedEquipments}
  //         onChange={handleEquipmentChange}
  //         className="w-full p-2 border rounded-lg"
  //       >
  //         {equipmentOptions.map(option => (
  //           <option key={option} value={option}>
  //             {option}
  //           </option>
  //         ))}
  //       </select>
  //     </div>
  //   </div>
  // );
};

export default BasicInfo;