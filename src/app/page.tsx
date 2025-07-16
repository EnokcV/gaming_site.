import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white">
      <Navbar />
      <main className="max-w-2xl mx-auto mt-16 text-center">
        <h1 className="text-5xl font-extrabold mb-6">Bienvenido a GamerTorneos</h1>
        <p className="mb-8 text-lg">
          La plataforma donde puedes crear, gestionar y participar en torneos de videojuegos con tu comunidad.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="/register" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded text-lg font-semibold">Regístrate</a>
          <a href="/tournaments" className="bg-gray-700 hover:bg-gray-800 px-6 py-3 rounded text-lg font-semibold">Ver Torneos</a>
        </div>
      </main>
    </div>
  );
}
