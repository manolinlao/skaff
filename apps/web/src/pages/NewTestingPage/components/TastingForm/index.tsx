import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Slider, SliderChangeEvent } from 'primereact/slider';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';

export const TastingForm = () => {
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [roaster, setRoaster] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [score, setScore] = useState<number>(5);
  const [date, setDate] = useState<Date | null>(new Date());

  const handleSave = () => {
    const data = { name, roaster, location, notes, score, date };
    console.log('Guardado:', data);
  };

  return (
    <form
      onSubmit={(e) => {
        console.log('on submit');
        e.preventDefault();
        handleSave();
      }}
    >
      <span className="p-float-label">
        <Calendar
          value={date}
          onChange={(e) => setDate(e.value ?? null)} // si e.value es undefined, pasamos null
          showIcon
        />
        <label>{t('tastingForm.fecha')}</label>
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
      </div>
      <div className="card flex justify-content-center">
        <Slider
          value={score}
          onChange={(e: SliderChangeEvent) => {
            if (typeof e.value === 'number') {
              setScore(e.value);
            }
          }}
          min={1}
          max={10}
          className="w-14rem"
        />
      </div>

      <Button label="Guardar" icon="pi pi-save" />
    </form>
  );
};
