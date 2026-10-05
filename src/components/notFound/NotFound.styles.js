import styled from 'styled-components';

export const NoteFoundContainer = styled.div`
  min-height: 60vh;
  display: grid;
  place-items: center;
  padding: 40px 24px;
  background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);

  .max-width {
    text-align: center;
  }
`;

export const NotFoundCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 24px;
  padding: 48px 32px;
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.08);
`;

export const NotFoundTitle = styled.h1`
  font-size: clamp(4rem, 10vw, 7rem);
  letter-spacing: -0.08em;
  color: #0f172a;
`;

export const NotFoundText = styled.p`
  font-size: 1.1rem;
  color: #475569;
  margin-top: 12px;
  line-height: 1.7;
`;