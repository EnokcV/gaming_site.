'use client';
import Navbar from '../../components/Navbar';
import { useState } from 'react';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-900 to-gray-900 text-white">
      <Navbar />
      <main className="max-w-md mx-auto mt-16 bg-gray-800 rounded p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Iniciar Sesión</h2>
        {submitted ? (
          <div className="text-green-400 text-center font-semibold">¡Inicio de sesión simulado!</div>
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
