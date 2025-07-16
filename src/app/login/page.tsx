'use client';
import Navbar from '../../components/Navbar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }
    if (data?.user) {
      setSuccess(true);
      setLoading(false);
      router.push('/tournaments');
      return;
    }
    setError('No se pudo autenticar.');
    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-900 to-gray-900 text-white">
      <Navbar />
      <main className="max-w-md mx-auto mt-16 bg-gray-800 rounded p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Iniciar Sesión</h2>
        {success ? (
          <div className="text-green-400 text-center font-semibold">¡Inicio de sesión exitoso!</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-blue-700 border border-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-black-700 border border-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-bold text-lg"
            >
              Iniciar Sesión
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
