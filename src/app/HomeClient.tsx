"use client";
import { useState } from 'react';
import { ExperienceData, UniversalProps } from '@/types';
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
type SkillKey = 'universal' | 'woodcutting' | 'smithing' | 'fishing' | 'alchemy' | 'mining' | 'home' |
  'carpentry' | 'community' | 'cooking' | 'crafting' | 'enchanting' | 'gathering';

const skillComponents: Record<SkillKey, React.ComponentType<UniversalProps>> = {
  universal: Universal,
  woodcutting: Woodcutting,
  smithing: Smithing,
  fishing: Fishing,
  alchemy: Alchemy,
  mining: Mining,
  home: HomeSkill,
  carpentry: Carpentry,
  community: Community,
  cooking: Cooking,
  crafting: Crafting,
  enchanting: Enchanting,
  gathering: Gathering
};
export default function HomeClient({ expData }: HomeClientProps) {
  const [selectedTab, setSelectedTab] = useState<SkillKey>('universal');

    // Create a handler that validates the incoming string
    const handleTabChange = (tab: string) => {
      // Check if the passed tab is a valid skill key
      if (tab in skillComponents) {
        setSelectedTab(tab as SkillKey);
      } else {
        // Fallback to universal if an invalid key is passed
        setSelectedTab('universal');
        console.warn(`Invalid tab selected: ${tab}`);
      }
    };
  
    const renderTabContent = () => {
      const Component = skillComponents[selectedTab];
      return <Component expData={expData} />;
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


// switch (selectedTab) {
//   case 'universal':
//     return <Universal expData={expData} />;
//   case 'woodcutting':
//     return <Woodcutting expData={expData}/>;
//   case 'smithing':
//     return <Smithing expData={expData} />;
//   case 'fishing':
//     return <Fishing />;
//   case 'alchemy':
//     return <Alchemy />;
//   case 'mining':
//     return <Mining expData={expData} />;
//   case 'home':
//     return <HomeSkill expData={expData}/>;
//   case 'carpentry':
//     return <Carpentry />;
//   case 'community':
//     return <Community />;
//   case 'cooking':
//     return <Cooking />;
//   case 'crafting':
//     return <Crafting />;
//   case 'enchanting':
//     return <Enchanting />;
//   case 'gathering':
//     return <Gathering />;
//   default:
//     return <Universal expData={expData} />;
// }