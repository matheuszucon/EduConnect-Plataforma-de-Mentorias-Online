import React, { useState } from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface SignUpFormProps {
  onSignUp: (userData: { name: string; email: string; password: string }) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp, isLoading, error, successMessage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim() || !email.trim() || !password.trim()) {
      setFormError('Por favor, preencha todos os campos.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError('Por favor, insira um e-mail válido.');
      return;
    }
    if (password.length < 6) {
        setFormError('A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    onSignUp({ name, email, password });
  };
  
  if (successMessage) {
    return (
        <div className="text-center p-4">
            <h4 className="font-semibold text-lg mb-2 text-green-600">Sucesso!</h4>
            <p className="text-gray-600">{successMessage}</p>
        </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nome Completo</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            placeholder="Seu nome"
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            placeholder="voce@exemplo.com"
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            placeholder="••••••••"
            required
            disabled={isLoading}
          />
        </div>

        {formError && <p className="text-sm text-red-600 text-center">{formError}</p>}
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      </div>
      <div className="flex items-center justify-end pt-6 mt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-primary-dark/50 disabled:cursor-not-allowed"
        >
          {isLoading ? <SpinnerIcon /> : 'Criar Conta'}
        </button>
      </div>
    </form>
  );
};
