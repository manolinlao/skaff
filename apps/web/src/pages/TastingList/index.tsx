import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { TastingEntry } from '../../entities/tasting/model';
import { getAllTastingEntries } from '../../entities/tasting/db';
import { format } from 'date-fns';

export const TastingList = () => {
  const [entries, setEntries] = useState<TastingEntry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const data = await getAllTastingEntries();
      setEntries(data);
    };

    fetchEntries();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Todas las catas</h2>
      {entries.length === 0 ? (
        <p>No hay catas guardadas.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {entries.map((entry) => (
            <Card
              key={entry.id}
              title={entry.coffeeName}
              subTitle={entry.roaster}
            >
              <p>Origen: {entry.origin}</p>
              <p>Método: {entry.method}</p>
              <p>Fecha: {format(new Date(entry.date), 'dd/MM/yyyy')}</p>
              <p>Notas: {entry.notes}</p>
              <p>Puntuación: {entry.score}</p>
              {/* Podrías añadir fotos si las muestras como URL o miniaturas más adelante */}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
