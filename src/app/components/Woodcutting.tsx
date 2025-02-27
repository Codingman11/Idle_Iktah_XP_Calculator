import { useState } from 'react';
import BasicInfo from "@/components/BasicInfo/BasicInfo";


const equipmentOptions = [
  { name: 'Royal Crown', duration: 0.97 },
  { name: 'Royal Body', duration: 0.98 },
  { name: 'Royal Pants', duration: 0.98 },
  { name: 'Royal Boots', duration: 0.99 },
  { name: 'Royal Goblet', duration: 0.97 },
  { name: 'Royal Shield', duration: 0.98 },
  { name: 'Royal Gloves', duration: 0.99 },
  { name: 'Royal Ring', duration: 0.99 },
];

const treeOptions = [
  { name: 'Hemlock', level: 1, xp: 3, time: 4 },
  { name: 'Red Fir', level: 15, xp: 6, time: 6 },
  { name: 'Oak', level: 30, xp: 8, time: 6 },
  { name: 'Maple', level: 45, xp: 14, time: 6 },
  { name: 'Cedar', level: 60, xp: 30, time: 6 },
  { name: 'Elderwood', level: 75, xp: 200, time: 10 },
];

export default function Woodcutting() {
  const [selectedTree, setSelectedTree] = useState(treeOptions[0]);
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);

  const handleEquipmentChange = (equipment: string) => {
    setSelectedEquipments((prev) =>
      prev.includes(equipment)
        ? prev.filter((item) => item !== equipment)
        : [...prev, equipment]
    );
  };

  const calculateDuration = () => {
    const baseDuration = selectedTree.time;
    const equipmentDuration = selectedEquipments.reduce((acc, equipment) => {
      const equipmentOption = equipmentOptions.find((item) => item.name === equipment);
      return equipmentOption ? acc * equipmentOption.duration : acc;
    }, 1);
    return baseDuration * equipmentDuration;
  };

  return (
    <div className="text-center text-black p-4">
      <BasicInfo name="Woodcutting"/>
     
    </div>
  );
}