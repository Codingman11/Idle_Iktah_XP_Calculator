"use client";
import { useState } from 'react';
import { ExperienceData } from '@/backend/fetchLevelData';
import { IconLayout } from './components/IconLayout';
import Smithing from '@/components/Smithing';
import Fishing from '@/components/Fishing';
import Universal from './components/Universal';
import Woodcutting from './components/Woodcutting';
import Alchemy from '@/components/Alchemy';
import Mining from '@/components/Mining';
import Carpentry from '@/components/Carpentry';
import Community from '@/components/Community';
import Cooking from '@/components/Cooking';
import Crafting from '@/components/Crafting';
import Enchanting from '@/components/Enchanting';
import Gathering from '@/components/Gathering';
import HomeSkill from '@/components/HomeSkill';


interface HomeClientProps {
  expData: ExperienceData[];
}

export default function HomeClient({ expData }: HomeClientProps) {
  const [selectedTab, setSelectedTab] = useState('universal');

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'universal':
        return <Universal expData={expData} />;
      case 'woodcutting':
        return <Woodcutting />;
      case 'smithing':
        return <Smithing />;
      case 'fishing':
        return <Fishing />;
      case 'alchemy':
        return <Alchemy />;
      case 'mining':
        return <Mining />;
      case 'home':
        return <HomeSkill />;
      case 'carpentry':
        return <Carpentry />;
      case 'community':
        return <Community />;
      case 'cooking':
        return <Cooking />;
      case 'crafting':
        return <Crafting />;
      case 'enchanting':
        return <Enchanting />;
      case 'gathering':
        return <Gathering />;
      default:
        return <Universal expData={expData} />;
    }
  };

  return (
    <>
      <IconLayout setSelectedTab={setSelectedTab} />
      <div className='min-w-min p-4'>
        {renderTabContent()}
      </div>
    </>
  );
}