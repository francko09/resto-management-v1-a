import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

interface RegisterProps {
  onRegister: (username: string, password: string, role: 'user' | 'admin') => void;
  onCancel: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    onRegister(username, password, role);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Inscription</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="username">Nom d'utilisateur</label>
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Mot de passe</label>
              <input
                type="password"
                placeholder="Mot de passe"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <input
                type="password"
                placeholder="Confirmer le mot de passe"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="role">Rôle</label>
              <select
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={role}
                onChange={(e) => setRole(e.target.value as 'user' | 'admin')}
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>
            <div className="flex items-center justify-between mt-6">
              <button
                className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-900 flex items-center"
                type="submit"
              >
                <UserPlus className="mr-2" /> S'inscrire
              </button>
              <button
                className="px-6 py-2 text-blue-600 rounded-lg hover:bg-blue-100"
                type="button"
                onClick={onCancel}
              >
                Annuler
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;