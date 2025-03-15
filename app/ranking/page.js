'use client';

import { useEffect, useState } from 'react';
import { supabase } from '/lib/supabaseClient';

export default function Ranking() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data } = await supabase
        .from('gracze')
        .select('*')
        .order('ranking', { ascending: false });

      setPlayers(data);
    };

    fetchPlayers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold">Ranking graczy Rummikub</h2>
      <table className="w-full mt-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Pozycja</th>
            <th className="p-2">Gracz</th>
            <th className="p-2">Miasto</th>
            <th className="p-2">Ranking Elo</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.id}>
              <td className="p-2 text-center">{index + 1}</td>
              <td className="p-2 text-center">{player.imie} {player.nazwisko}</td>
              <td className="p-2 text-center">{player.miasto}</td>
              <td className="p-2 text-center">{player.ranking}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
