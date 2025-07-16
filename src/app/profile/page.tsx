"use client";
import Navbar from '../../components/Navbar';
import { useState } from 'react';

const mockUser = {
  username: 'gamer123',
  email: 'gamer123@email.com',
  joinedTournaments: [
    { id: 1, name: 'Torneo Valorant', game: 'Valorant', date: '2025-08-01' },
    { id: 3, name: 'League of Legends Clash', game: 'LoL', date: '2025-08-15' },
  ],
};

export default function ProfilePage() {
  const [user] = useState(mockUser);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white">
      <Navbar />
      <main className="max-w-xl mx-auto mt-16 bg-gray-800 rounded p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Mi Perfil</h2>
        <div className="mb-6">
          <p><span className="font-semibold">Usuario:</span> {user.username}</p>
          <p><span className="font-semibold">Correo:</span> {user.email}</p>
        </div>
        <h3 className="text-2xl font-semibold mb-4">Torneos Inscritos</h3>
        <ul className="space-y-3">
          {user.joinedTournaments.length === 0 ? (
            <li className="text-gray-400">Aún no estás inscrito en ningún torneo.</li>
          ) : (
            user.joinedTournaments.map(t => (
              <li key={t.id} className="bg-gray-700 rounded p-4">
                <span className="font-bold">{t.name}</span> - {t.game} - <span className="italic">{t.date}</span>
              </li>
            ))
          )}
        </ul>
      </main>
    </div>
  );
}
