/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TastingForm } from './components/TastingForm';

const pageStyle = css`
  padding: 2rem;
`;

export default function NewTastingPage() {
  return (
    <div css={pageStyle}>
      <h2>Nueva Cata</h2>
      <TastingForm />
    </div>
  );
}
