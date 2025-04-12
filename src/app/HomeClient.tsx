"use client";
import { useState } from 'react';
import { ExperienceData } from '@/types';
import { IconLayout } from './components/IconLayout';
import SkillComponent from '@/components/SkillComponent';

interface HomeClientProps {
  expData: ExperienceData[];
}
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

  const handleTabChange = (tab: string) => {
    if (tab in skillComponents) {
      setSelectedTab(tab as SkillKey);
    } else {
      setSelectedTab('universal');
      console.warn(`Invalid tab selected: ${tab}`);
    }
  };

  const renderTabContent = () => {
    const skillName = skillComponents[selectedTab];
    return <SkillComponent expData={expData} name={skillName} />;
  };

  return (
    <>
      <IconLayout setSelectedTab={handleTabChange} />
      <div className='min-w-min p-4'>
        {renderTabContent()}
      </div>
    </>
  );
}