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

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("universal_xp")
        .select("Level, TotalXP, XpToNextLevel");
      if (error) {
        setError(error);
      } else {
        console.log("Fetched data:", data);
        setLevelData(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className="text-center text-black">
      <h2>Universal XP Calculator</h2>
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