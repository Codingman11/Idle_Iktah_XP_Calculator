"use client";
import { useEffect, useState } from 'react';
import BasicInfo from "@/components/BasicInfo";
import { supabase } from "@/lib/supabase";
import { PostgrestError } from '@supabase/supabase-js';

interface LevelData {
  Level: number;
  TotalXP: number;
  XpToNextLevel: number;
}

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