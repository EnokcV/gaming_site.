"use client";
import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface Tournament {
  id: number;
  name: string;
  game: string;
  date: string;
  description: string;
  published: boolean;
}

export default function AdminPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [form, setForm] = useState({ name: '', game: '', date: '', description: '' });


  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('tournaments')
      .select('*')
      .order('date', { ascending: true });
    if (error) {
      setError('Error al cargar torneos.');
      setTournaments([]);
    } else {
      setTournaments(data as Tournament[]);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.game || !form.date) return;
    setError(null);
    const { error } = await supabase.from('tournaments').insert([
      { name: form.name, game: form.game, date: form.date, description: form.description, published: false }
    ]);
    if (error) setError('Error al crear el torneo.');
    setForm({ name: '', game: '', date: '', description: '' });
    fetchTournaments();
  };

  const togglePublish = async (id: number) => {
    const torneo = tournaments.find(t => t.id === id);
    if (!torneo) return;
    const { error } = await supabase
      .from('tournaments')
      .update({ published: !torneo.published })
      .eq('id', id);
    if (error) setError('Error al actualizar el estado de publicación.');
    fetchTournaments();
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('tournaments').delete().eq('id', id);
    if (error) setError('Error al eliminar el torneo.');
    fetchTournaments();
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white">
      <Navbar />
      <main className="max-w-3xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Panel de Administración</h2>
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Crear Torneo</h3>
          <form onSubmit={handleCreate} className="grid gap-4 grid-cols-1 md:grid-cols-2 bg-gray-800 rounded p-6 shadow-lg">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nombre del torneo"
              className="px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              name="game"
              value={form.game}
              onChange={handleChange}
              placeholder="Juego"
              className="px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descripción"
              className="px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 col-span-1 md:col-span-2"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 py-2 rounded font-bold text-lg col-span-1 md:col-span-2"
            >
              Crear Torneo
            </button>
          </form>
        </section>
        <section>
          <h3 className="text-2xl font-semibold mb-4">Gestionar Torneos</h3>
          <div className="grid gap-6">
            {tournaments.length === 0 ? (
              <div className="text-gray-400">No hay torneos creados.</div>
            ) : (
              tournaments.map(t => (
                <div key={t.id} className="bg-gray-800 rounded p-6 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="text-xl font-bold mb-1">{t.name}</h4>
                    <p className="mb-1">Juego: <span className="font-medium">{t.game}</span></p>
                    <p className="mb-1">Fecha: <span className="font-medium">{t.date}</span></p>
                    <p className="mb-2">{t.description}</p>
                    <span className={`px-3 py-1 rounded text-xs font-bold ${t.published ? 'bg-green-600' : 'bg-yellow-600'}`}>{t.published ? 'Publicado' : 'No publicado'}</span>
                  </div>
                  <div className="flex flex-col gap-2 mt-4 md:mt-0">
                    <button
                      className={`px-4 py-1 rounded font-semibold ${t.published ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'}`}
                      onClick={() => togglePublish(t.id)}
                    >
                      {t.published ? 'Despublicar' : 'Publicar'}
                    </button>
                    <button
                      className="px-4 py-1 rounded font-semibold bg-red-600 hover:bg-red-700"
                      onClick={() => handleDelete(t.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
