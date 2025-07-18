import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import {
  TastingEntry,
  TastingEntrySchema,
} from '../../../../entities/tasting/model';
import { addTastingEntry } from '../../../../entities/tasting/db';
import {
  Container,
  ErrorList,
  FileInputWrapper,
  PreviewImage,
  SubmitButtonWrapper,
} from './styles';
import { TextBlock } from '../../../../components/TextBlock';
import i18n from '../../../../i18n/i18n';

export const TastingForm = () => {
  const { t } = useTranslation();

  const [date, setDate] = useState<Date>(new Date());
  const [coffeeName, setCoffeeName] = useState('');
  const [origin, setOrigin] = useState('');
  const [roaster, setRoaster] = useState('');
  const [method, setMethod] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]); // <- errores de validación

  const onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setPhotos(filesArray);
    }
  };

  const clearForm = () => {
    setDate(new Date());
    setCoffeeName('');
    setOrigin('');
    setRoaster('');
    setMethod('');
    setScore(null);
    setNotes('');
    setPhotos([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; // evitar dobles envíos
    setIsSubmitting(true);

    const dataToValidate: TastingEntry = {
      date,
      coffeeName,
      origin,
      roaster,
      method,
      score,
      notes,
      photos,
    };

    const result = TastingEntrySchema.safeParse(dataToValidate);

    if (!result.success) {
      console.error('Errores de validación:', result.error);
      const validationErrors: string[] = [];

      // result.error.issues es un array con los detalles de cada error
      for (const issue of result.error.issues) {
        // issue.path es un array con la ruta al campo con error
        // issue.message es el mensaje de error
        const field =
          issue.path.length > 0 ? issue.path.join('.') : 'formulario';
        validationErrors.push(`${field}: ${issue.message}`);
      }

      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const validData = result.data;
    console.log('✅ Datos válidos:', validData);

    try {
      await addTastingEntry(validData);
      alert('Entrada guardada con éxito');
      setErrors([]);
      clearForm();
    } catch (error) {
      console.error('Error guardando entrada:', error);
      setErrors(['Error guardando entrada, inténtalo de nuevo']);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <TextBlock bold size="large" color="primary">
          {t('tastingForm.title')}
        </TextBlock>

        {errors.length > 0 && (
          <ErrorList>
            <ul>
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </ErrorList>
        )}
        <FloatLabel>
          <Calendar
            id="tasting-date"
            value={date}
            onChange={(e) => setDate(e.value as Date)}
            showIcon
            dateFormat={i18n.language === 'es' ? 'dd/mm/yy' : 'mm/dd/yy'}
          />
          <label htmlFor="tasting-date">{t('tastingForm.date')}</label>
        </FloatLabel>

        <FloatLabel>
          <InputText
            id="coffee-name"
            value={coffeeName}
            onChange={(e) => setCoffeeName(e.target.value)}
          />
          <label htmlFor="coffee-name">{t('tastingForm.name')}</label>
        </FloatLabel>

        <FloatLabel>
          <InputText
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <label htmlFor="origin">{t('tastingForm.origin')}</label>
        </FloatLabel>

        <FloatLabel>
          <InputText
            id="roaster"
            value={roaster}
            onChange={(e) => setRoaster(e.target.value)}
          />
          <label htmlFor="roaster">{t('tastingForm.roaster')}</label>
        </FloatLabel>

        <FloatLabel>
          <InputText
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
          <label htmlFor="method">{t('tastingForm.method')}</label>
        </FloatLabel>

        <FloatLabel>
          <InputText
            id="score"
            type="number"
            min={0}
            max={10}
            value={score !== null ? String(score) : ''}
            onChange={(e) =>
              setScore(e.target.value === '' ? null : Number(e.target.value))
            }
          />
          <label htmlFor="score">{t('tastingForm.score')}</label>
        </FloatLabel>

        <FloatLabel>
          <InputTextarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            autoResize
          />
          <label htmlFor="notes">{t('tastingForm.notes')}</label>
        </FloatLabel>

        <FileInputWrapper>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={onPhotoChange}
          />

          {photos.length > 0 && (
            <PreviewImage src={URL.createObjectURL(photos[0])} alt="Preview" />
          )}
        </FileInputWrapper>

        <SubmitButtonWrapper>
          <Button
            type="submit"
            label={t('tastingForm.title')}
            disabled={isSubmitting}
            onClick={(e) => {
              e.currentTarget.blur();
            }}
          />
        </SubmitButtonWrapper>
      </Container>
    </form>
  );
};
