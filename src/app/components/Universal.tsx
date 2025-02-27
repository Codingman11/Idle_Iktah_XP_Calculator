// pages/universal.tsx
import { useState } from 'react';
import { GetStaticProps } from 'next';
import BasicInfo from "@/components/BasicInfo/BasicInfo";
import { supabase } from "@/backend/supabaseClient";

// Define the interface for ExperienceData

interface ExperienceData {
  level: number;
  TotalXP: number;
  XpToNextLevel: number;
}
// Define the interface for UniversalProps
interface UniversalProps {
  expData: ExperienceData[];
}

export default function Universal({ expData }: UniversalProps) {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [targetLevel, setTargetLevel] = useState<number>(2);
  const [xpRequired, setXpRequired] = useState<number>(0);

  console.log(expData);
  const calculateXP = () => {
    const currentLevelData = expData.find((xpTable) => xpTable.level === currentLevel);
    const targetLevelData = expData.find((xpTable) => xpTable.level === targetLevel);

    if (currentLevelData && targetLevelData) {
      setXpRequired(targetLevelData.TotalXP - currentLevelData.TotalXP);
    } else {
      setXpRequired(-1);
    }
  };

  return (

    <div className="text-center text-black p-4">
      <BasicInfo name="Universal" />
      <table>
        <tbody>
          {expData.map((xpTable) => (
            <tr key={xpTable.level}>
              <td>{xpTable.level}</td>
              <td>{xpTable.TotalXP}</td>
              <td>{xpTable.XpToNextLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await supabase
    .from('universal_xp')
    .select('level, TotalXP, XpToNextLevel');

  if (error) {
    console.error("Error fetching level data:", error);
    return {
      props: {
        expData: []
      },
      revalidate: 60 // Revalidate every minute
    };
  }

  const expData = data.map((item) => ({
    level: item.level,
    TotalXP: item.TotalXP,
    XpToNextLevel: item.XpToNextLevel
  }));

  return {
    props: {
      expData
    },
    revalidate: 3600 // Revalidate every hour
  };
};