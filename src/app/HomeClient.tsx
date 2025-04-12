"use client";
import { useState, useEffect } from 'react';
import { ExperienceData, SkillsData } from '@/types';
import { ListView } from './components/ListView';
import SkillComponent from '@/components/SkillComponent';

interface HomeClientProps {
  expData: ExperienceData[];
  skillsData: SkillsData[];
}

type SkillKey = 'universal' | 'woodcutting' | 'smithing' | 'fishing' | 'alchemy' | 'mining' | 'home' |
  'carpentry' | 'community' | 'cooking' | 'crafting' | 'enchanting' | 'gathering';

export default function HomeClient({ expData, skillsData }: HomeClientProps) {
  const [selectedTab, setSelectedTab] = useState<SkillKey>('universal');
  const [formattedSkills, setFormattedSkills] = useState<Array<{ name: string; icon: string }>>([]);

  useEffect(() => {
    // Format the skills data from Supabase
    const formatted = skillsData.map(skill => ({
      name: skill.name,
      icon: `/icons/${skill.name.toLowerCase()}.png`
    }));
    setFormattedSkills(formatted);
  }, [skillsData]);

  const handleSkillSelect = (skillName: string) => {
    if (skillName.toLowerCase() in skillComponents) {
      setSelectedTab(skillName.toLowerCase() as SkillKey);
    } else {
      setSelectedTab('universal');
      console.warn(`Invalid skill selected: ${skillName}`);
    }
  };

  const renderTabContent = () => {
    const skillName = skillComponents[selectedTab];
    return <SkillComponent expData={expData} name={skillName} />;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left side - ListView */}
      <div className="w-1/4 p-4">
        <ListView 
          skills={formattedSkills}
          onSkillSelect={handleSkillSelect}
          selectedSkill={selectedTab}
        />
      </div>

      {/* Right side - SkillComponent */}
      <div className="w-3/4 p-4">
        {renderTabContent()}
      </div>
    </div>
  );
}

// Update skillComponents to match your Supabase data structure
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