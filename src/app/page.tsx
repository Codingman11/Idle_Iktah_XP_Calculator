import { fetchLevelData } from '@/backend/fetchLevelData';
import HomeClient from './HomeClient';

export default async function Home() {
  const expData = await fetchLevelData();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2 mt-10">
      <div>
        <h1 className="text-4xl font-bold text-cyan-900">Welcome to Idle Iktah XP Calculator</h1>
        <p className="text-lg text-cyan-800 text-center">Select a skill to view more information</p>
      </div>
      <HomeClient expData={expData} />
    </div>
  );
} 