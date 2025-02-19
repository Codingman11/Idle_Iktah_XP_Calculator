"use client"
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

import Smithing from '@/components/Smithing';
import Fishing from '@/components/Fishing';
import Link from 'next/link';
import Universal from './components/Universal';
import Woodcutting from './components/Woodcutting';

export default function Home() {
  const [selectedTab, setSelectedTab] = useState('universal');

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'universal':
        return <Universal />;
      case 'woodcutting':
        return <Woodcutting />;
      case 'smithing':
        return <Smithing />;
      case 'fishing':
        return <Fishing />;
      default:
        return <Universal />;
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2 mt-10">
      <Navbar setSelectedTab={setSelectedTab}/>
      {renderTabContent()}
    </div>)
}