"use client";
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface Tournament {
  id: number;
  name: string;
  game: string;
  date: string;
  description: string;
}

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [joined, setJoined] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [userId, setUserId] = useState<string | null>(null);

  // Obtener usuario actual al montar
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data?.user?.id ?? null));
  }, []);

  // Cargar torneos publicados
  useEffect(() => {
    supabase
      .from('tournaments')
      .select('*')
      .eq('published', true)
      .then(({ data, error }) => {
        if (data) setTournaments(data);
      });
  }, []);

  // Cargar torneos a los que el usuario está inscrito
  useEffect(() => {
    if (!userId) return;
    supabase.from('tournament_participants')
      .select('tournament_id')
      .eq('user_id', userId)
      .then(({ data }) => {
        if (data) setJoined(data.map((row: { tournament_id: number }) => row.tournament_id));
      });
  }, [userId]);

  const handleJoin = async (id: number) => {
    if (!userId) {
      setError('Debes iniciar sesión para unirte a un torneo.');
      return;
    }
    setLoading(true);
    setError(null);
    const { error: joinError } = await supabase.from('tournament_participants').insert({
      tournament_id: id,
      user_id: userId,
    });
    if (joinError) {
      setError(joinError.message);
    } else {
      setJoined([...joined, id]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white">
      <Navbar />
      <main className="max-w-3xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Torneos Disponibles</h2>
        {error && <div className="text-red-400 text-center mb-4">{error}</div>}
        <div className="grid gap-6">
          {tournaments.map(t => (
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
                disabled={joined.includes(t.id) || loading}
              >
                {joined.includes(t.id) ? 'Inscrito' : loading ? 'Uniendo...' : 'Unirse'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
