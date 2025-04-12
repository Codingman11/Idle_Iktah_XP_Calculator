const [universalXPData, setUniversalXPData] = useState<UniversalXPData[]>([]);
const [selectedLevel, setSelectedLevel] = useState<number>(1);
const [targetXP, setTargetXP] = useState<number>(0);
const [result, setResult] = useState<string>('');

useEffect(() => {
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('universal_xp')
      .select('*');

    if (error) {
      console.error("Error fetching data: ", error);
    } else { 
      setUniversalXPData(data);
    }

    console.log(data);
  };
  fetchData();
}, []);

const calculateXP = () => {
  const selectedData = universalXPData.find(data => data.level === selectedLevel);
  if (!selectedData) return;

  const xpNeeded = targetXP - selectedData.total_xp;
  const levelsNeeded = Math.ceil(xpNeeded / selectedData.xp_to_next_level);

  setResult(`Levels needed to reach ${targetXP} XP: ${levelsNeeded}`);
};

console.log(universalXPData);

import { createClient} from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

interface UniversalXPData {
  level: number;
  total_xp: number;
  xp_to_next_level: number;
}

const supabase = createClient(supabaseUrl, supabaseKey);


export default function Universal() {
  const [levelData, setLevelData] = useState<LevelData[]>([]);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [targetLevel, setTargetLevel] = useState<number>(2);
  const [xpRequired, setXpRequired] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("universal_xp")
        .select("level, TotalXP, XpToNextLevel");
      if (error) {
        setError(error);
      } else {
        console.log("Fetched data:", data);
        setLevelData(data.map((item: any) => ({
          Level: item.level,
          TotalXP: item.TotalXP,
          XpToNextLevel: item.XpToNextLevel
        })));
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const calculateXP = () => {
    const currentLevelData = levelData.find((level) => level.Level === currentLevel);
    const targetLevelData = levelData.find((level) => level.Level === targetLevel);

    console.log(currentLevelData, targetLevelData);
    if (currentLevelData && targetLevelData) {
      
      setXpRequired(targetLevelData.TotalXP - currentLevelData.TotalXP);
    } else {
      setXpRequired(-1);
    }
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className="text-center text-black">
      <h2>Universal XP Calculator</h2>
      <div>
        <label>
          Current Level:
          <input
            type="number"
            value={currentLevel}
            onChange={(e) => setCurrentLevel(Number(e.target.value))}
          />
        </label>
        <label>
          Target Level:
          <input 
            type="number"
            value={targetLevel}
            onChange={(e) => setTargetLevel(Number(e.target.value))}
          />
        </label>
        <button onClick={calculateXP}>Calculate XP</button>
      </div>
      {xpRequired !== null && (<div>XP Required: {xpRequired}</div>)}
      <table>
        <thead>
          <tr>
            <th>Level</th>
            <th>Total XP</th>
            <th>XP to Next Level</th>
          </tr>
        </thead>
        <tbody>
          {levelData.map((level) => (
            <tr key={level.Level}>
              <td>{level.Level}</td>
              <td>{level.TotalXP}</td>
              <td>{level.XpToNextLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <BasicInfo /> */}
    </div>
  
);


}


        {/* <div>
          <label className="block mb-1">Current EXP:</label>
          <input
            type="number"
            value={currentExp}
            onChange={(e) => setCurrentExp(Number(e.target.value))}
            className="p-2 w-full border border-gray-600 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Target EXP:</label>
          <input
            type="number"
            value={targetExp}
            onChange={(e) => setTargetExp(Number(e.target.value))}
            className="p-2 w-full border border-gray-600 rounded"
          />
        </div> */}


return ( <div className="mb-4">
  <label className="block mb-2">Select Tree:</label>
  <select
    value={selectedTree.name}
    onChange={(e) => setSelectedTree(treeOptions.find(tree => tree.name === e.target.value)!)}
    className="w-full p-2 border border-gray-300 rounded"
  >
    {treeOptions.map((tree) => (
      <option key={tree.name} value={tree.name}>
        {tree.name}
      </option>
    ))}
  </select>
</div>
<div className="mb-4">
  <label className="block mb-2">Select Equipments:</label>
  {equipmentOptions.map((equipment) => (
    <div key={equipment.name} className="flex items-center mb-2">
      <input
        type="checkbox"
        id={equipment.name}
        checked={selectedEquipments.includes(equipment.name)}
        onChange={() => handleEquipmentChange(equipment.name)}
        className="mr-2"
      />
      <label htmlFor={equipment.name}>{equipment.name}</label>
    </div>
  ))}
</div>
<div className="mt-4">
  <h3 className="text-xl font-bold">Results</h3>
  <p>Base Duration: {selectedTree.time} seconds</p>
  <p>Calculated Duration: {calculateDuration().toFixed(2)} seconds</p>
  <p>XP per Hour: {(selectedTree.xp / calculateDuration() * 3600).toFixed(2)}</p>
</div>)






'use client';
import React from 'react';

interface ListViewProps {
  skills: Array<{
    name: string;
    icon: string;
  }>;
  onSkillSelect: (skillName: string) => void;
  selectedSkill: string;
}

export const ListView: React.FC<ListViewProps> = ({ skills, onSkillSelect, selectedSkill }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 w-full">
      <h2 className="text-xl font-bold mb-4">Skills</h2>
      <div className="space-y-2">
        {skills.map((skill) => (
          <button
            key={skill.name}
            onClick={() => onSkillSelect(skill.name.toLowerCase())}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
              selectedSkill === skill.name.toLowerCase()
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              <img
                src={skill.icon}
                alt={`${skill.name} icon`}
                className="w-6 h-6"
              />
              <span>{skill.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState } from 'react';
import { ExperienceData } from '@/types';
import { ListView } from './components/ListView';
import SkillComponent from '@/components/SkillComponent';
import BasicInfo from './components/BasicInfo/BasicInfo';

interface HomeClientProps {
  expData: ExperienceData[];
}

const skillsList = [
  { name: 'Universal', icon: '/icons/universal.png' },
  { name: 'Home', icon: '/icons/home.png' },
  { name: 'Carpentry', icon: '/icons/carpentry.png' },
  { name: 'Enchanting', icon: '/icons/enchanting.png' },
  { name: 'Community', icon: '/icons/community.png' },
  { name: 'Crafting', icon: '/icons/crafting.png' },
  { name: 'Smithing', icon: '/icons/smithing.png' },
  { name: 'Cooking', icon: '/icons/cooking.png' },
  { name: 'Alchemy', icon: '/icons/alchemy.png' },
  { name: 'Woodcutting', icon: '/icons/woodcutting.png' },
  { name: 'Mining', icon: '/icons/mining.png' },
  { name: 'Fishing', icon: '/icons/fishing.png' },
  { name: 'Gathering', icon: '/icons/gathering.png' },
];

type SkillKey = 'universal' | 'woodcutting' | 'smithing' | 'fishing' | 'alchemy' | 'mining' | 'home' |
  'carpentry' | 'community' | 'cooking' | 'crafting' | 'enchanting' | 'gathering';

const skillComponents: Record<SkillKey, string> = {
  universal: 'Universal',
  woodcutting: 'Woodcutting',
  smithing: 'Smithing',
  fishing: 'Fishing',
  alchemy: 'Alchemy',
  mining: 'Mining',
  home: 'Home',
  carpentry: 'Carpentry',
  community: 'Community',
  cooking: 'Cooking',
  crafting: 'Crafting',
  enchanting: 'Enchanting',
  gathering: 'Gathering'
};

export default function HomeClient({ expData }: HomeClientProps) {
  const [selectedTab, setSelectedTab] = useState<SkillKey>('universal');

  const handleSkillSelect = (skillName: string) => {
    if (skillName in skillComponents) {
      setSelectedTab(skillName as SkillKey);
    } else {
      setSelectedTab('universal');
      console.warn(`Invalid skill selected: ${skillName}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left side - ListView */}
      <div className="w-1/4 p-4">
        <ListView 
          skills={skillsList}
          onSkillSelect={handleSkillSelect}
          selectedSkill={selectedTab}
        />
      </div>

      {/* Right side - Calculator/BasicInfo */}
      <div className="w-3/4 p-4">
        <BasicInfo name={skillComponents[selectedTab]} />
      </div>
    </div>
  );
}

import { fetchLevelData } from '@/backend/fetchLevelData';
import HomeClient from './HomeClient';
import Navbar from './components/Navbar';

export default async function Home() {
  const expData = await fetchLevelData();

  return (
    <div>
      {/*<Navbar />/*/}
      <div className="flex flex-col items-center justify-start min-h-screen py-2 mt-10">
        
        <div className='right-3'>
          <h1 className="text-4xl font-bold text-cyan-900 " >Welcome to Idle Iktah XP Calculator</h1>
          <p className="text-lg text-cyan-800 text-center">Select a skill to view more information</p>
        </div>
        <HomeClient expData={expData} />
      </div>
    </div>
  );
} 