import React, { useState } from 'react';
import type { Material } from '../types';

interface ShareMaterialFormProps {
  onShare: (newMaterialData: Omit<Material, 'id' | 'sharedBy' | 'sharedAt'>) => void;
  onCancel: () => void;
}

export const ShareMaterialForm: React.FC<ShareMaterialFormProps> = ({ onShare, onCancel }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState<Material['type']>('link');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    onShare({ title, url, type });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="materialTitle" className="block mb-2 text-sm font-medium text-gray-900">Título do Material</label>
          <input
            type="text"
            id="materialTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            placeholder="ex: Guia Completo de Flexbox"
            required
          />
        </div>
        <div>
          <label htmlFor="materialUrl" className="block mb-2 text-sm font-medium text-gray-900">URL / Link</label>
          <input
            type="url"
            id="materialUrl"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            placeholder="https://..."
            required
          />
        </div>
        <div>
          <label htmlFor="materialType" className="block mb-2 text-sm font-medium text-gray-900">Tipo de Material</label>
          <select
            id="materialType"
            value={type}
            onChange={(e) => setType(e.target.value as Material['type'])}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
          >
            <option value="link">Link / Artigo</option>
            <option value="pdf">Documento (PDF)</option>
            <option value="video">Vídeo</option>
          </select>
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
          Compartilhar
        </button>
      </div>
    </form>
  );
};