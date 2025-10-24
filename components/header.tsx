'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

export default function Header() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  if (status === 'loading') return null;

  const userName = session?.user?.name || session?.user?.email?.split('@')[0];
  const avatarLetter = userName?.charAt(0).toUpperCase();
  console.log({ status }, { session })
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            Todo App
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {status === 'authenticated' && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white text-blue-700 flex items-center justify-center font-semibold">
                  {avatarLetter}
                </div>
                <span className="text-sm">Welcome, {userName}</span>
                <button
                  onClick={() => signOut({ callbackUrl: '/auth/login' })}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            )}

            {status === 'unauthenticated' && (
              <Link
                href="/auth/login"
                className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-2xl focus:outline-none"
            >
              {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-600 px-4 py-2 flex flex-col gap-2">
          {status === 'authenticated' && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white text-blue-700 flex items-center justify-center font-semibold">
                  {avatarLetter}
                </div>
                <span className="text-sm">Welcome, {userName}</span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/auth/login' })}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg transition"
              >
                Logout
              </button>
            </>
          )}

          {status === 'unauthenticated' && (
            <Link
              href="/auth/login"
              className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg transition"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
