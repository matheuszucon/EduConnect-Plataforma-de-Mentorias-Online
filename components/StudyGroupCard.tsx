import React from 'react';
import type { StudyGroup } from '../types';
import { UsersIcon } from './icons/UsersIcon';

interface StudyGroupCardProps {
  group: StudyGroup;
  onDetailsClick: (group: StudyGroup) => void;
  buttonText?: string;
}

export const StudyGroupCard: React.FC<StudyGroupCardProps> = ({ group, onDetailsClick, buttonText = "Entrar no Grupo" }) => {
  const memberPercentage = (group.members / group.maxMembers) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      <img className="w-full h-40 object-cover" src={group.imageUrl} alt={group.name} />
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-sm font-semibold text-primary uppercase tracking-wide">{group.subject}</p>
        <h3 className="text-xl font-bold text-gray-800 mt-1 mb-2">{group.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">{group.description}</p>

        <div className="flex items-center justify-between text-secondary text-sm mb-4">
            <div className="flex items-center gap-2">
                <UsersIcon />
                <span>{group.members} / {group.maxMembers} membros</span>
            </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${memberPercentage}%` }}></div>
        </div>

        <button 
            onClick={() => onDetailsClick(group)}
            className="mt-auto w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-all duration-300">
          {buttonText}
        </button>
      </div>
    </div>
  );
};