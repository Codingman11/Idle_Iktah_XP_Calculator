import React, { useEffect, useState } from 'react';
import styles from './BasicInfo.module.css'
import { useExperienceData } from '@/context/LevelDataContext';


interface BasicInfoProps {
  name: string;
  
}

const BasicInfo: React.FC<BasicInfoProps> = ({ name }) => {

  const { expData, currentLevel, targetLevel, expRequired, updateLevels } = useExperienceData();

  const [propsCurrentLevel, setPropsCurrentLevel] = useState<number | string>("");
  const [currentExp, setCurrentExp] = useState<number | string>("");
  const [targetExp, setTargetExp] = useState<number | string>("");

  console.log(expData)
  const findExpData = (level: number) => {
    return expData.find((data) => data.level === level);
  };

  const findLevelByExp = (exp: number) => {
    for (let i = expData.length - 1; i >= 0; i--) {
      if (exp >= expData[i].TotalXP) {
        return expData[i].level;
      }
    }
    return 1; // Default to level 1 if no match found
  };

  const calculateRemainingExp = () => {
    if (Number(currentExp) > 0) {
      return Number(targetExp) - Number(currentExp);
    } else {
      const currentLevelData = findExpData(currentLevel);
      const targetLevelData = findExpData(targetLevel);

      if (currentLevelData && targetLevelData) {
        return targetLevelData.TotalXP - currentLevelData.TotalXP;
      }
      return 0;
    }
  };
  const handleCurrentExpChange = (exp: string) => {
    const expValue = exp === '' ? '' : Number(exp);
    setCurrentExp(expValue);
    if (expValue !== '') {
      const newLevel = findLevelByExp(Number(expValue));
      updateLevels(newLevel, Number(expValue), targetLevel, expRequired);
    }
  };

  const handleCurrentLevelChange = (level: string) => {
    const levelValue = level === '' ? '' : Number(level);
    setPropsCurrentLevel(levelValue);
    const newExp = levelValue === '' ? '' : findExpData(Number(levelValue))?.TotalXP || 0;
    setCurrentExp(newExp);
    updateLevels(Number(levelValue), Number(newExp), targetLevel, expRequired);
  };

  const handleTargetLevelChange = (level: number) => {
    const targetLevelData = findExpData(level);
    const newTargetExp = targetLevelData ? targetLevelData.TotalXP : 0;
    setTargetExp(newTargetExp);
    updateLevels(currentLevel, level, expRequired);
  };

  //console.log('BasicInfo name prop:', name);
  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-4">{name} Calculator</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Current Level:</label>
          <input
            type="number"
            value={currentLevel}
            className={`p-2 w-full border border-gray-600 rounded text-black ${styles.noSpinner}`}
            onChange={(e) => handleCurrentLevelChange(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Target Level:</label>
          <input
            type="number"
            defaultValue={targetLevel}
            className={`p-2 w-full border border-gray-600 rounded text-black ${styles.noSpinner}`}
            onChange={(e) => handleTargetLevelChange(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block mb-1">Current EXP:</label>
          <input
            type="number"
            value={currentExp}
            className={`p-2 w-full border border-gray-600 rounded text-black ${styles.noSpinner}`}
            onChange={(e) => handleCurrentExpChange(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Target EXP:</label>
          <input
            type="number"
            value={targetExp}
            disabled
            className={`p-2 w-full border border-gray-600 rounded text-black ${styles.noSpinner} ${styles.disabledInput}`}
          />
        </div>

      </div>
      <div className="mt-4">
        <p className="text-lg">Experience Till Target: {calculateRemainingExp() ?? 'N/A'}</p>
      </div>
      {/* <div className="mt-4">
        <h2 className="text-2xl font-semibold mb-2">Level Data</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th>Level</th>
              <th>Total XP</th>
              <th>XP to Next Level</th>
            </tr>
          </thead>
          <tbody>
            {expData.map((level) => (
              <tr key={level.level}>
                <td>{level.level}</td>
                <td>{level.TotalXP}</td>
                <td>{level.XpToNextLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
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