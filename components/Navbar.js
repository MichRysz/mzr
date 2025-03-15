'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Navbar() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Pobranie bieżącej sesji
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Nasłuchiwanie zmian w stanie autentykacji
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    // Czyszczenie subskrypcji przy odmontowaniu komponentu
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <nav className=" p-4 flex items-center justify-center relative border-b border-white border-opacity-50">
      {/* Lewa część (opcjonalnie możesz dodać linki lub inne elementy) */}
      <div className="flex-grow flex justify-start"></div>

      {/* Logo na środku */}
      <div className="flex-grow flex justify-center">
        <Image
          src="/logo.png"
          alt="Logo Rummikub"
          width={450}
          height={150}
          priority
        />
      </div>

      {/* Prawa część - informacja o użytkowniku, link do profilu oraz przycisk wylogowania */}
      <div className="flex-grow flex flex-col justify-end items-end">
        {session ? (
          <div className="text-white text-right">
            <p>
              Jesteś zalogowany jako: <strong>{session.user.email}</strong>
            </p>
            <div className="flex gap-2">
              <Link href="/profile" className="underline">
                Mój profil
              </Link>
              <button onClick={handleLogout} className="underline">
                Wyloguj
              </button>
            </div>
          </div>
        ) : (
          <Link href="/login" className="text-white">
            Zaloguj się
          </Link>
        )}
      </div>
    </nav>
  );
}
