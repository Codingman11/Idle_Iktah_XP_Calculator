'use client';
import React from 'react';

interface ListViewProps {
  skills: Array<{
    name: string;
    icon: string;
  }>;
  onSkillSelect: (skillName: string) => void;
  selectedSkill: string;
}

export const ListView: React.FC<ListViewProps> = ({ skills, onSkillSelect, selectedSkill }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow p-4 w-full">
      <h2 className="text-xl font-bold mb-4 text-white">Skills</h2>
      <div className="space-y-2">
        {skills.map((skill) => (
          <button
            key={skill.name}
            onClick={() => onSkillSelect(skill.name.toLowerCase())}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors text-white ${
              selectedSkill === skill.name.toLowerCase()
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-500'
            }`}
          >
            <div className="flex items-center space-x-2">
              <img
                src={skill.icon}
                alt={`${skill.name} icon`}
                className="w-6 h-6"
              />
              <span>{skill.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}