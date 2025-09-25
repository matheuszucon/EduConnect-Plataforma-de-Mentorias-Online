import React from 'react';
import type { User, Mentorship, StudyGroup } from '../types';
import { MentorshipCard } from './MentorshipCard';
import { StudyGroupCard } from './StudyGroupCard';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface DashboardProps {
  user: User;
  userMentorships: Mentorship[];
  userStudyGroups: StudyGroup[];
  onBack: () => void;
  onViewMentorshipDetails: (mentorship: Mentorship) => void;
  onViewStudyGroupDetails: (group: StudyGroup) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  userMentorships,
  userStudyGroups,
  onBack,
  onViewMentorshipDetails,
  onViewStudyGroupDetails,
}) => {
  return (
    <section>
      <button onClick={onBack} className="flex items-center gap-2 text-primary hover:underline mb-6 font-semibold">
        <ArrowLeftIcon />
        Voltar para a página principal
      </button>

      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Meu Painel</h1>
        <p className="mt-4 text-lg text-secondary max-w-2xl mx-auto">
          Gerencie suas mentorias e grupos de estudo em um só lugar.
        </p>
      </header>

      {/* My Mentorias Section */}
      <section id="my-mentorships" className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-primary pb-2">Minhas Próximas Mentorias</h2>
        {userMentorships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userMentorships.map(mentorship => (
              <MentorshipCard key={mentorship.id} mentorship={mentorship} onDetailsClick={onViewMentorshipDetails} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 px-6 bg-white rounded-lg shadow">
            <p className="text-gray-600">Você ainda não se inscreveu em nenhuma mentoria.</p>
            <button onClick={onBack} className="mt-4 bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-all duration-300">
              Explorar Mentorias
            </button>
          </div>
        )}
      </section>

      {/* My Study Groups Section */}
      <section id="my-studygroups">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-primary pb-2">Meus Grupos de Estudo</h2>
        {userStudyGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userStudyGroups.map(group => (
              <StudyGroupCard 
                key={group.id} 
                group={group} 
                onDetailsClick={onViewStudyGroupDetails}
                buttonText="Acessar Grupo"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 px-6 bg-white rounded-lg shadow">
            <p className="text-gray-600">Você ainda não faz parte de nenhum grupo de estudo.</p>
            <button onClick={onBack} className="mt-4 bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-all duration-300">
              Encontrar Grupos
            </button>
          </div>
        )}
      </section>
    </section>
  );
};