import React, { useState } from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { XIcon } from './icons/XIcon';
import type { User } from '../types';

interface HeaderProps {
  onLoginClick: () => void;
  onSignUpClick: () => void;
  user: User | null;
  onLogoutClick: () => void;
  onDashboardClick: () => void;
  onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick, onSignUpClick, user, onLogoutClick, onDashboardClick, onHomeClick }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onLoginClick();
    setMobileMenuOpen(false);
  };

  const handleSignUpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSignUpClick();
    setMobileMenuOpen(false);
  };
  
  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onLogoutClick();
    setMobileMenuOpen(false);
  };
  
  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onDashboardClick();
    setMobileMenuOpen(false);
  };
  
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onHomeClick();
    setMobileMenuOpen(false);
  };

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    onHomeClick(); // First go to home to make sure sections are visible
    setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        }
    }, 0);
    setMobileMenuOpen(false); // Close mobile menu on click
  };
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <a href="#" onClick={handleHomeClick} className="flex items-center gap-3">
             <div className="bg-primary p-2 rounded-lg">
                <BookOpenIcon className="text-white h-6 w-6" />
             </div>
            <span className="text-2xl font-bold text-primary">EduConnect</span>
          </a>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#mentorships" onClick={(e) => handleScrollToSection(e, 'mentorships')} className="text-gray-600 hover:text-primary transition-colors">Mentorias</a>
            <a href="#studygroups" onClick={(e) => handleScrollToSection(e, 'studygroups')} className="text-gray-600 hover:text-primary transition-colors">Grupos de Estudo</a>
            {user ? (
              <>
                <button onClick={handleDashboardClick} className="text-gray-700 font-medium hover:text-primary transition-colors">Olá, {user.name.split(' ')[0]}</button>
                <button onClick={handleLogoutClick} className="text-gray-600 hover:text-primary transition-colors">Sair</button>
              </>
            ) : (
              <>
                <a href="#" onClick={handleLoginClick} className="text-gray-600 hover:text-primary transition-colors">Entrar</a>
                <a href="#" onClick={handleSignUpClick} className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">Cadastre-se</a>
              </>
            )}
          </nav>
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-primary focus:outline-none">
              {isMobileMenuOpen 
                ? <XIcon className="w-6 h-6" /> 
                : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              }
            </button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <nav className="flex flex-col items-center space-y-2 p-4">
            <a href="#mentorships" onClick={(e) => handleScrollToSection(e, 'mentorships')} className="block py-2 text-gray-600 hover:text-primary transition-colors">Mentorias</a>
            <a href="#studygroups" onClick={(e) => handleScrollToSection(e, 'studygroups')} className="block py-2 text-gray-600 hover:text-primary transition-colors">Grupos de Estudo</a>
            <hr className="w-4/5 my-2"/>
            {user ? (
              <>
                <a href="#" onClick={handleDashboardClick} className="block py-2 text-gray-700 font-medium">Olá, {user.name.split(' ')[0]}</a>
                <a href="#" onClick={handleLogoutClick} className="w-full text-center bg-secondary text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">Sair</a>
              </>
            ) : (
              <>
                <a href="#" onClick={handleLoginClick} className="block py-2 text-gray-600 hover:text-primary transition-colors">Entrar</a>
                <a href="#" onClick={handleSignUpClick} className="w-full text-center bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">Cadastre-se</a>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};