import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center shadow-md">
      <div className="font-bold text-xl">
        <Link href="/">GamerTorneos</Link>
      </div>
      <div className="space-x-4">
        <Link href="/tournaments" className="hover:underline">Torneos</Link>
        <Link href="/profile" className="hover:underline">Mi Perfil</Link>
        <Link href="/admin" className="hover:underline">Admin</Link>
        <Link href="/login" className="hover:bg-gray-700 px-3 py-1 rounded">Iniciar Sesión</Link>
        <Link href="/register" className="hover:bg-gray-700 px-3 py-1 rounded">Registrarse</Link>
      </div>
    </nav>
  );
}
