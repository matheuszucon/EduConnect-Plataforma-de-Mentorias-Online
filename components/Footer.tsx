import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} EduConnect. Todos os direitos reservados.</p>
        <p className="text-sm text-gray-400 mt-1">Capacitando a próxima geração de aprendizes.</p>
      </div>
    </footer>
  );
};