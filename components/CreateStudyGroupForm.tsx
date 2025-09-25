import React, { useState } from 'react';
import type { StudyGroup } from '../types';

interface CreateStudyGroupFormProps {
  onCreate: (newGroupData: Omit<StudyGroup, 'id' | 'members'>) => void;
  onCancel: () => void;
}

export const CreateStudyGroupForm: React.FC<CreateStudyGroupFormProps> = ({ onCreate, onCancel }) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [maxMembers, setMaxMembers] = useState(10);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !subject || !description) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    onCreate({ 
        name, 
        subject, 
        description, 
        maxMembers, 
        imageUrl: `https://picsum.photos/seed/${name.replace(/\s/g, '')}/400/200` 
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="groupName" className="block mb-2 text-sm font-medium text-gray-900">Nome do Grupo</label>
          <input
            type="text"
            id="groupName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            placeholder="ex: Magos do JavaScript"
            required
          />
        </div>
        <div>
          <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">Matéria</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            placeholder="ex: JavaScript Avançado"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Descrição</label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
            placeholder="No que este grupo irá focar?"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="maxMembers" className="block mb-2 text-sm font-medium text-gray-900">Máx. de Membros ({maxMembers})</label>
           <input
            id="maxMembers"
            type="range"
            min="2"
            max="20"
            value={maxMembers}
            onChange={(e) => setMaxMembers(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
      <div className="flex items-center justify-end pt-6 border-t mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="ml-3 text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Criar Grupo
        </button>
      </div>
    </form>
  );
};