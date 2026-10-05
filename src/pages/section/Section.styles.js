import styled from 'styled-components';

export const SectionContainer = styled.section`
  background: #f8fafc;
  color: #0f172a;
  padding: 32px 24px 90px;
`;

export const SectionHero = styled.div`
  max-width: 1300px;
  margin: 0 auto 36px;
  background: linear-gradient(135deg, #eff6ff, #fef3c7);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 30px;
  padding: 42px 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SectionHeroText = styled.div`
  h1 {
    font-size: clamp(2.2rem, 4vw, 4rem);
    letter-spacing: -0.05em;
    margin-bottom: 12px;
  }

  p {
    color: #475569;
    line-height: 1.7;
    max-width: 600px;
  }
`;

export const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
`;

export const FilterChip = styled.button`
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: rgba(255, 255, 255, 0.8);
  color: #0f172a;
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 600;

  &.active {
    background: #0f172a;
    color: white;
    border-color: #0f172a;
  }
`;

export const CatalogGrid = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 26px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const BookCardItem = styled.article`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 22px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  overflow: hidden;
  box-shadow: 0 20px 38px rgba(15, 23, 42, 0.06);

  img {
    width: 100%;
    height: 290px;
    object-fit: cover;
    display: block;
  }
`;

export const BookInfo = styled.div`
  padding: 22px 20px 24px;

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.76rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 12px;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 8px;
  }

  p {
    color: #475569;
    line-height: 1.7;
    margin-bottom: 18px;
  }
`;

export const BookActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Price = styled.span`
  font-size: 1.2rem;
  font-weight: 800;
`;

export const AddButton = styled.button`
  background: #0f172a;
  color: white;
  border: none;
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 700;
`;