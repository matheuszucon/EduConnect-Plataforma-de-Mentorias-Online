import React, { useState } from 'react';
import type { StudyGroup, Material } from '../types';
import { UsersIcon } from './icons/UsersIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { LinkIcon } from './icons/LinkIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { VideoCameraIcon } from './icons/VideoCameraIcon';
import { PlusIcon } from './icons/PlusIcon';
import { Modal } from './Modal';
import { ShareMaterialForm } from './ShareMaterialForm';

interface StudyGroupDetailsProps {
  group: StudyGroup;
  onBack: () => void;
  onShareMaterial: (groupId: number, newMaterial: Omit<Material, 'id' | 'sharedBy' | 'sharedAt'>) => void;
  isUserLoggedIn: boolean;
}

const MaterialIcon: React.FC<{ type: Material['type'] }> = ({ type }) => {
  switch (type) {
    case 'pdf': return <DocumentTextIcon className="w-6 h-6 text-red-500" />;
    case 'video': return <VideoCameraIcon className="w-6 h-6 text-purple-500" />;
    case 'link':
    default: return <LinkIcon className="w-6 h-6 text-blue-500" />;
  }
};

export const StudyGroupDetails: React.FC<StudyGroupDetailsProps> = ({ group, onBack, onShareMaterial, isUserLoggedIn }) => {
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const handleShare = (newMaterial: Omit<Material, 'id' | 'sharedBy' | 'sharedAt'>) => {
    onShareMaterial(group.id, newMaterial);
    setShareModalOpen(false);
  };
    
  return (
    <section>
      <button onClick={onBack} className="flex items-center gap-2 text-primary hover:underline mb-6 font-semibold">
        <ArrowLeftIcon />
        Voltar para todos os grupos
      </button>

      {/* Group Header */}
      <header className="mb-8 p-6 bg-white rounded-lg shadow">
        <h1 className="text-4xl font-bold text-gray-800">{group.name}</h1>
        <p className="text-lg text-secondary mt-2">{group.description}</p>
        <div className="flex items-center gap-2 mt-4 text-secondary">
          <UsersIcon />
          <span>{group.members} / {group.maxMembers} membros</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Shared Materials */}
        <main className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Materiais Compartilhados</h2>
            <button
                onClick={() => setShareModalOpen(true)}
                disabled={!isUserLoggedIn}
                title={!isUserLoggedIn ? "Você precisa estar logado para compartilhar materiais" : "Compartilhar Material"}
                className="flex items-center gap-2 bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-primary-dark transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <PlusIcon />
              Compartilhar Material
            </button>
          </div>

          <div className="space-y-4">
            {group.materials.length > 0 ? (
                group.materials.map(material => (
                <div key={material.id} className="border rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                    <MaterialIcon type={material.type} />
                    <div>
                        <a href={material.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">{material.title}</a>
                        <p className="text-sm text-secondary">Compartilhado por {material.sharedBy} em {material.sharedAt}</p>
                    </div>
                    </div>
                    <a href={material.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary hover:text-primary-dark border border-primary rounded-full px-4 py-1 transition-colors hover:bg-blue-50">
                        {material.type === 'pdf' ? 'Baixar' : 'Acessar'}
                    </a>
                </div>
                ))
            ) : (
                <p className="text-center text-gray-500 py-8">Nenhum material foi compartilhado ainda. Seja o primeiro!</p>
            )}
          </div>
        </main>

        {/* Sidebar: Group Members */}
        <aside className="lg:col-span-1 bg-white p-6 rounded-lg shadow h-fit">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Membros do Grupo</h3>
          <ul className="space-y-3">
            {group.membersList.length > 0 ? (
                group.membersList.map(member => (
                    <li key={member.id} className="flex items-center gap-3">
                    <img className="w-10 h-10 rounded-full" src={member.avatarUrl} alt={member.name} />
                    <span className="font-medium text-gray-700">{member.name}</span>
                    </li>
                ))
            ) : (
                <p className="text-sm text-gray-500">Nenhum membro para exibir.</p>
            )}
          </ul>
        </aside>
      </div>
      
      <Modal isOpen={isShareModalOpen} onClose={() => setShareModalOpen(false)} title="Compartilhar Novo Material">
        <ShareMaterialForm onShare={handleShare} onCancel={() => setShareModalOpen(false)} />
      </Modal>
    </section>
  );
};
