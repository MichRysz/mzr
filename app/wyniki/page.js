'use client';

import { useEffect, useState } from 'react';
import { supabase } from '/lib/supabaseClient';

export default function AddGameResult() {
  const [gracze, setGracze] = useState([]);
  const [turnieje, setTurnieje] = useState([]);
  const [turniejId, setTurniejId] = useState('');
  const [dataPartii, setDataPartii] = useState('');
  const [stolikTyp, setStolikTyp] = useState(4);
  const [wybraniGracze, setWybraniGracze] = useState([]);
  const [zwyciezcaId, setZwyciezcaId] = useState('');
  const [malePunkty, setMalePunkty] = useState({});

  useEffect(() => {
    fetchPlayers();
    fetchTurnieje();
  }, []);

  const fetchPlayers = async () => {
    const { data } = await supabase.from('gracze').select('*');
    setGracze(data);
  };

  const fetchTurnieje = async () => {
    const { data } = await supabase.from('turnieje').select('*');
    setTurnieje(data);
  };

  const zapiszWyniki = async () => {
    if (wybraniGracze.length !== stolikTyp || !zwyciezcaId) {
      alert('Sprawdź, czy wybrałeś wszystkich graczy oraz zwycięzcę.');
      return;
    }

    const { data: partia } = await supabase
      .from('partie')
      .insert({
        turniej_id: turniejId,
        data_partii: dataPartii,
        stolik_typ: stolikTyp,
      })
      .select('id')
      .single();

    const K = 32;
    const zwyciezca = gracze.find((g) => g.id === zwyciezcaId);

    if (!zwyciezca) {
      alert('Błąd: nie znaleziono zwycięzcy w bazie.');
      return;
    }

    const przegrani = gracze.filter(
      (g) => wybraniGracze.includes(g.id) && g.id !== zwyciezcaId
    );

    // Aktualizacja rankingu Elo
    let rankingZwyciezcy = zwyciezca.ranking;

    for (const przegrany of przegrani) {
      const Ea = 1 / (1 + 10 ** ((przegrany.ranking - rankingZwyciezcy) / 400));
      const Eb = 1 - Ea;

      const zmianaZwyciezca = Math.round(K * (1 - Ea));
      const zmianaPrzegrany = -zmianaZwyciezca;

      // Aktualizacja rankingu zwycięzcy
      rankingZwyciezcy += zmianaZwyciezca;

      // Aktualizacja rankingu przegranego
      await supabase
        .from('gracze')
        .update({ ranking: przegrany.ranking + zmianaPrzegrany })
        .eq('id', przegrany.id);

      // Zapis wyniku dla przegranego
      await supabase.from('wyniki').insert({
        partia_id: partia.id,
        gracz_id: przegrany.id,
        czy_wygral: false,
        duzy_punkt: 0,
        maly_punkt: malePunkty[przegrany.id],
        zmiana_rankingu: zmianaPrzegrany,
      });
    }

    // Zapis wyniku dla zwycięzcy
    await supabase.from('wyniki').insert({
      partia_id: partia.id,
      gracz_id: zwyciezca.id,
      czy_wygral: true,
      duzy_punkt: 1,
      maly_punkt: malePunkty[zwyciezca.id],
      zmiana_rankingu: rankingZwyciezcy - zwyciezca.ranking,
    });

    // Ostateczna aktualizacja rankingu zwycięzcy
    await supabase
      .from('gracze')
      .update({ ranking: rankingZwyciezcy })
      .eq('id', zwyciezca.id);

    alert('Partia zapisana poprawnie!');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold">Wprowadź wyniki partii</h2>

      <select className="border p-2 m-2" value={turniejId} onChange={(e) => setTurniejId(Number(e.target.value))}>
        <option value="">Wybierz turniej</option>
        {turnieje.map((t) => (
          <option key={t.id} value={t.id}>
            {t.nazwa}
          </option>
        ))}
      </select>

      <input
        className="border p-2 m-2"
        type="date"
        value={dataPartii}
        onChange={(e) => setDataPartii(e.target.value)}
      />

      <select className="border p-2 m-2" value={stolikTyp} onChange={(e) => setStolikTyp(Number(e.target.value))}>
        <option value={3}>3-osobowy</option>
        <option value={4}>4-osobowy</option>
      </select>

      <div className="mt-2">
        <h3 className="font-semibold">Wybierz graczy ({stolikTyp})</h3>
        {gracze.map((g) => (
          <div key={g.id}>
            <label>
              <input
                type="checkbox"
                checked={wybraniGracze.includes(g.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setWybraniGracze([...wybraniGracze, g.id]);
                  } else {
                    setWybraniGracze(wybraniGracze.filter((id) => id !== g.id));
                  }
                }}
              />{' '}
              {g.imie} {g.nazwisko}
            </label>
            {wybraniGracze.includes(g.id) && (
              <input
                className="border p-1 ml-2"
                type="number"
                placeholder="Małe punkty"
                value={malePunkty[g.id] || ''}
                onChange={(e) => setMalePunkty({ ...malePunkty, [g.id]: Number(e.target.value) })}
              />
            )}
          </div>
        ))}
      </div>

      <select className="border p-2 m-2" value={zwyciezcaId} onChange={(e) => setZwyciezcaId(Number(e.target.value))}>
        <option value="">Wybierz zwycięzcę</option>
        {gracze.filter((g) => wybraniGracze.includes(g.id)).map((g) => (
          <option key={g.id} value={g.id}>
            {g.imie} {g.nazwisko}
          </option>
        ))}
      </select>

      <button className="bg-blue-500 text-white p-2 rounded mt-4" onClick={zapiszWyniki}>
        Zapisz wyniki partii
      </button>
    </div>
  );
}
