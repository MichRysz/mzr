'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user); // Pobieramy zalogowanego użytkownika
      }
    };
    fetchUser();
  }, []);

  const handleDeleteAccount = async () => {
    if (!user) {
      alert('Nie jesteś zalogowany.');
      return;
    }

    const confirmDelete = window.confirm(
      'Czy na pewno chcesz usunąć swoje konto? Ta operacja jest nieodwracalna.'
    );
    if (!confirmDelete) return;

    // Przesyłamy samo `id`, zamiast `user_id`
    const response = await fetch(`/api/delete-account?id=${user.id}`, { 
      method: 'DELETE' 
    });

    if (!response.ok) {
      const data = await response.json();
      alert('Błąd: ' + data.error);
      return;
    }

    alert('Twoje konto zostało usunięte.');
    router.push('/'); // Przekierowanie po usunięciu konta
  };

  return (
    <div className="p-4">
      <h1>Mój profil</h1>
      {user ? (
        <>
          <p><strong>Email:</strong> {user.email}</p>
          <button
            onClick={handleDeleteAccount}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Usuń konto
          </button>
        </>
      ) : (
        <p>Ładowanie...</p>
      )}
    </div>
  );
}
