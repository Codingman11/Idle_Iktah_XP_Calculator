// pages/universal.tsx
// import { useState } from 'react';
import { GetStaticProps } from 'next';
import BasicInfo from "@/components/BasicInfo/BasicInfo";
import { supabase } from "@/backend/supabaseClient";
import { LevelDataProvider } from '@/context/LevelDataContext';
import { UniversalProps} from '../types'
// Define the interface for ExperienceData



export default function Universal({ expData }: UniversalProps) {

  return (
    <LevelDataProvider expData={expData}>
    <div className="text-center text-black p-4">
      <BasicInfo name="Universal" />
    </div>
    </LevelDataProvider>
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