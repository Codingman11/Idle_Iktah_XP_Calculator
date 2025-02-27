import React from 'react';

interface NavbarProps {
  setSelectedTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setSelectedTab }) => {
  return (
    <nav className="flex justify-center space-x-4">
      <button
        onClick={() => setSelectedTab('universal')}
        className='px-4 py-2 bg-blue-500 text-white rounded-lg border border-blue-700 hover:bg-blue-600'
      >
        Universal
      </button>
      <button
        onClick={() => setSelectedTab('woodcutting')}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg border border-blue-700 hover:bg-blue-600"
      >
        Woodcutting
      </button>
      <button
        onClick={() => setSelectedTab('smithing')}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg border border-blue-700 hover:bg-blue-600"
      >
        Smithing
      </button>
      <button
        onClick={() => setSelectedTab('fishing')}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg border border-blue-700 hover:bg-blue-600"
      >
        Fishing
      </button>
    </nav>
  );
};

export default Navbar;