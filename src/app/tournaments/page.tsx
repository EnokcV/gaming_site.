"use client";
import Navbar from '../../components/Navbar';
import { useState } from 'react';

const mockTournaments = [
  { id: 1, name: 'Torneo Valorant', game: 'Valorant', date: '2025-08-01', description: 'Competencia abierta para todos los rangos.' },
  { id: 2, name: 'FIFA 25 Ultimate', game: 'FIFA 25', date: '2025-08-10', description: 'Torneo online 1v1.' },
  { id: 3, name: 'League of Legends Clash', game: 'LoL', date: '2025-08-15', description: '¡Forma tu equipo y participa!' },
];

export default function TournamentsPage() {
  const [joined, setJoined] = useState<number[]>([]);

  const handleJoin = (id: number) => {
    if (!joined.includes(id)) setJoined([...joined, id]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white">
      <Navbar />
      <main className="max-w-3xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Torneos Disponibles</h2>
        <div className="grid gap-6">
          {mockTournaments.map(t => (
            <div key={t.id} className="bg-gray-800 rounded p-6 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-semibold mb-2">{t.name}</h3>
                <p className="mb-1">Juego: <span className="font-medium">{t.game}</span></p>
                <p className="mb-1">Fecha: <span className="font-medium">{t.date}</span></p>
                <p className="mb-2">{t.description}</p>
              </div>
              <button
                className={`mt-4 md:mt-0 px-6 py-2 rounded font-bold text-lg transition-colors ${joined.includes(t.id) ? 'bg-green-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                onClick={() => handleJoin(t.id)}
                disabled={joined.includes(t.id)}
              >
                {joined.includes(t.id) ? 'Inscrito' : 'Unirse'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
