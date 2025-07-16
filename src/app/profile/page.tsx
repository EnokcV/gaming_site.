"use client";
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ProfilePage() {
  const [profile, setProfile] = useState<{ username: string; email: string } | null>(null);
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileAndTournaments = async () => {
      setLoading(true);
      setError(null);
      // Obtener usuario autenticado
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        setError('No se pudo obtener el usuario autenticado.');
        setLoading(false);
        return;
      }
      const user = userData.user;
      // Obtener username del perfil (si lo guardaste en user_metadata)
      const username = user.user_metadata?.username || '';
      setProfile({ username, email: user.email ?? "" });
      // Obtener torneos inscritos
      const { data: joined, error: joinError } = await supabase
        .from('tournament_participants')
        .select('tournament_id, tournaments (id, name, game, date)')
        .eq('user_id', user.id);
      if (joinError) {
        setError('No se pudieron obtener los torneos inscritos.');
        setLoading(false);
        return;
      }
      // Extraer info de los torneos
      const joinedTournaments = (joined || [])
        .map((row: any) => row.tournaments)
        .filter(Boolean);
      setTournaments(joinedTournaments);
      setLoading(false);
    };
    fetchProfileAndTournaments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white">
      <Navbar />
      <main className="max-w-xl mx-auto mt-16 bg-gray-800 rounded p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Mi Perfil</h2>
        {loading ? (
          <div className="text-center text-gray-400">Cargando...</div>
        ) : error ? (
          <div className="text-red-400 text-center mb-4">{error}</div>
        ) : profile && (
          <>
            <div className="mb-6">
              <p><span className="font-semibold">Usuario:</span> {profile.username}</p>
              <p><span className="font-semibold">Correo:</span> {profile.email}</p>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Torneos Inscritos</h3>
            <ul className="space-y-3">
              {tournaments.length === 0 ? (
                <li className="text-gray-400">Aún no estás inscrito en ningún torneo.</li>
              ) : (
                tournaments.map(t => (
                  <li key={t.id} className="bg-gray-700 rounded p-4">
                    <span className="font-bold">{t.name}</span> - {t.game} - <span className="italic">{t.date}</span>
                  </li>
                ))
              )}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

