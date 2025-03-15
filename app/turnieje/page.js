'use client';

import { useState } from 'react';
import { supabase } from '/lib/supabaseClient';

export default function AddTournament() {
  const [nazwa, setNazwa] = useState('');
  const [dataRozpoczecia, setDataRozpoczecia] = useState('');
  const [dataZakonczenia, setDataZakonczenia] = useState('');
  const [maxStoliki, setMaxStoliki] = useState(1);
  const [iloscRund, setIloscRund] = useState(1);
  const [partieWRundach, setPartieWRundach] = useState({});

  const dodajTurniej = async () => {
    if (!nazwa || !dataRozpoczecia || !dataZakonczenia || iloscRund < 1 || maxStoliki < 1) {
      alert('Wypełnij wszystkie wymagane pola.');
      return;
    }

    for (let i = 1; i <= iloscRund; i++) {
      if (!partieWRundach[i] || partieWRundach[i] < 1) {
        alert(`Podaj poprawną liczbę partii dla rundy ${i}`);
        return;
      }
    }

    // Tworzenie turnieju
    const { data: turniej, error } = await supabase
      .from('turnieje')
      .insert({
        nazwa,
        data_rozpoczecia: dataRozpoczecia,
        data_zakonczenia: dataZakonczenia,
        max_stoliki: maxStoliki,
      })
      .select('id')
      .single();

    if (error) {
      alert('Błąd przy tworzeniu turnieju.');
      return;
    }

    // Tworzenie rund dla turnieju
    const rundy = [];

    for (let i = 1; i <= iloscRund; i++) {
      rundy.push({
        turniej_id: turniej.id,
        numer_rundy: i,
        liczba_partii: partieWRundach[i],
      });
    }

    await supabase.from('rundy').insert(rundy);

    // Reset formularza
    setNazwa('');
    setDataRozpoczecia('');
    setDataZakonczenia('');
    setMaxStoliki(1);
    setIloscRund(1);
    setPartieWRundach({});

    alert('Turniej i rundy zostały dodane.');
  };

  return (
    <div className="container mx-auto p-4 space-y-4 max-w-xl">
      <h2 className="text-2xl font-bold">🏆 Dodaj turniej z rundami</h2>

      <input
        className="border p-2 w-full"
        placeholder="Nazwa turnieju"
        value={nazwa}
        onChange={(e) => setNazwa(e.target.value)}
      />

      <div className="flex gap-2">
        <input
          className="border p-2 w-full"
          type="date"
          value={dataRozpoczecia}
          onChange={(e) => setDataRozpoczecia(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          type="date"
          value={dataZakonczenia}
          onChange={(e) => setDataZakonczenia(e.target.value)}
        />
      </div>

      <input
        className="border p-2 w-full"
        type="number"
        min={1}
        placeholder="Maksymalna liczba stolików"
        value={maxStoliki}
        onChange={(e) => setMaxStoliki(Number(e.target.value))}
      />

      <input
        className="border p-2 w-full"
        type="number"
        min={1}
        placeholder="Ilość rund"
        value={iloscRund}
        onChange={(e) => setIloscRund(Number(e.target.value))}
      />

      <div>
        <h3 className="font-semibold">🎲 Określ liczbę partii w każdej rundzie:</h3>
        {Array.from({ length: iloscRund }, (_, i) => (
          <input
            key={i + 1}
            type="number"
            min={1}
            className="border p-2 w-full mt-2"
            placeholder={`Liczba partii w rundzie nr ${i + 1}`}
            value={partieWRundach[i + 1] || ''}
            onChange={(e) =>
              setPartieWRundach({
                ...partieWRundach,
                [i + 1]: Number(e.target.value),
              })
            }
          />
        ))}
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2 w-full"
        onClick={dodajTurniej}
      >
        ➕ Dodaj turniej z rundami
      </button>
    </div>
  );
}
