import React from 'react';
import type { Mentorship } from '../types';
import { CalendarIcon } from './icons/CalendarIcon';
import { ClockIcon } from './icons/ClockIcon';

interface MentorshipCardProps {
  mentorship: Mentorship;
  onDetailsClick: (mentorship: Mentorship) => void;
}

export const MentorshipCard: React.FC<MentorshipCardProps> = ({ mentorship, onDetailsClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-center mb-4">
          <img className="w-16 h-16 rounded-full mr-4" src={mentorship.avatarUrl} alt={mentorship.mentorName} />
          <div>
            <p className="font-bold text-lg text-gray-800">{mentorship.mentorName}</p>
            <p className="text-sm text-secondary">{mentorship.mentorTitle}</p>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-primary mb-2">{mentorship.topic}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{mentorship.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {mentorship.tags.map(tag => (
            <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
      </div>
      <div className="bg-gray-50 p-6 border-t">
          <div className="flex justify-between text-sm text-secondary mb-4">
            <div className="flex items-center gap-2">
              <CalendarIcon />
              <span>{mentorship.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon />
              <span>{mentorship.duration}</span>
            </div>
          </div>
          <button 
            onClick={() => onDetailsClick(mentorship)}
            className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-all duration-300"
          >
            Ver Detalhes
          </button>
      </div>
    </div>
  );
};