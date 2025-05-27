/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Slider } from 'primereact/slider';
import { Button } from 'primereact/button';
import { formStyle } from '../../styles';

export function TastingForm() {
  const [name, setName] = useState('');
  const [roaster, setRoaster] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [score, setScore] = useState(5);
  const [date, setDate] = useState<Date | null>(new Date());

  const handleSave = () => {
    const data = { name, roaster, location, notes, score, date };
    console.log('Guardado:', data);
  };

  return (
    <form
      css={formStyle}
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
    >
      <span className="p-float-label">
        <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon />
        <label>Fecha</label>
      </span>

      <span className="p-float-label">
        <InputText value={name} onChange={(e) => setName(e.target.value)} />
        <label>Nombre del café</label>
      </span>

      <span className="p-float-label">
        <InputText
          value={roaster}
          onChange={(e) => setRoaster(e.target.value)}
        />
        <label>Tostador</label>
      </span>

      <span className="p-float-label">
        <InputText
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label>Lugar</label>
      </span>

      <span className="p-float-label">
        <InputTextarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
        <label>Notas</label>
      </span>

      <div>
        <label>Puntuación: {score}</label>
        <Slider
          value={score}
          onChange={(e) => setScore(e.value ?? 5)}
          min={1}
          max={10}
        />
      </div>

      <Button label="Guardar" icon="pi pi-save" />
    </form>
  );
}
