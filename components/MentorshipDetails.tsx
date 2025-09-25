import React from 'react';
import type { Mentorship } from '../types';
import { CalendarIcon } from './icons/CalendarIcon';
import { ClockIcon } from './icons/ClockIcon';

interface MentorshipDetailsProps {
  mentorship: Mentorship;
}

export const MentorshipDetails: React.FC<MentorshipDetailsProps> = ({ mentorship }) => {
  return (
    <div className="space-y-4 text-gray-700">
      <div className="flex items-center gap-4">
        <img className="w-20 h-20 rounded-full" src={mentorship.avatarUrl} alt={mentorship.mentorName} />
        <div>
          <h4 className="text-xl font-bold text-gray-800">{mentorship.mentorName}</h4>
          <p className="text-md text-secondary">{mentorship.mentorTitle}</p>
        </div>
      </div>
      <p>{mentorship.description}</p>
      <div className="flex flex-wrap gap-2 py-2">
          {mentorship.tags.map(tag => (
            <span key={tag} className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">{tag}</span>
          ))}
      </div>
      <div className="border-t pt-4 space-y-3">
        <div className="flex items-center gap-3 text-md">
            <CalendarIcon className="w-6 h-6 text-secondary"/>
            <strong>Data:</strong>
            <span>{mentorship.date}</span>
        </div>
        <div className="flex items-center gap-3 text-md">
            <ClockIcon className="w-6 h-6 text-secondary"/>
            <strong>Duração:</strong>
            <span>{mentorship.duration}</span>
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <button className="bg-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-primary-dark transition-all duration-300">
            Inscreva-se Agora
        </button>
      </div>
    </div>
  );
};