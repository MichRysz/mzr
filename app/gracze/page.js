'use client';

import { useState } from 'react';
import { supabase } from '/lib/supabaseClient';

export default function AddPlayer() {
  const [imie, setImie] = useState('');
  const [nazwisko, setNazwisko] = useState('');
  const [miasto, setMiasto] = useState('');

  const addPlayer = async () => {
    await supabase.from('gracze').insert({ imie, nazwisko, miasto });
    setImie('');
    setNazwisko('');
    setMiasto('');
    alert('Gracz dodany!');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold">Dodaj gracza</h2>
      <input className="border p-2 m-2" value={imie} onChange={(e) => setImie(e.target.value)} placeholder="Imię" />
      <input className="border p-2 m-2" value={nazwisko} onChange={(e) => setNazwisko(e.target.value)} placeholder="Nazwisko" />
      <input className="border p-2 m-2" value={miasto} onChange={(e) => setMiasto(e.target.value)} placeholder="Miasto" />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={addPlayer}>Dodaj gracza</button>
    </div>
  );
}
