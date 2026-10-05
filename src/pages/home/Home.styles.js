import styled from 'styled-components';

export const HomeContainer = styled.div`
  background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
  color: #0f172a;
`;

export const HeroSection = styled.section`
  padding: 96px 24px 72px;
`;

export const HeroContent = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 48px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const HeroText = styled.div`
  h1 {
    font-size: clamp(2.8rem, 6vw, 5rem);
    line-height: 1.05;
    letter-spacing: -0.05em;
    margin-bottom: 24px;
    max-width: 620px;
  }

  p {
    font-size: 1.08rem;
    line-height: 1.8;
    color: #475569;
    max-width: 560px;
    margin-bottom: 28px;
  }
`;

export const HeroActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
  flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
  border: none;
  border-radius: 999px;
  padding: 15px 26px;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  color: #111827;
  font-weight: 700;
  box-shadow: 0 20px 38px rgba(249, 115, 22, 0.2);
`;

export const SecondaryButton = styled.button`
  border: 1px solid rgba(15, 23, 42, 0.14);
  border-radius: 999px;
  padding: 14px 24px;
  background: rgba(255, 255, 255, 0.7);
  color: #0f172a;
  font-weight: 600;
`;

export const StatRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 28px;
`;

export const StatItem = styled.div`
  strong {
    display: block;
    font-size: 1.7rem;
    color: #0f172a;
  }

  span {
    color: #475569;
    font-size: 0.95rem;
  }
`;

export const HeroVisual = styled.div`
  position: relative;
  min-height: 550px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BookCard = styled.div`
  position: absolute;
  width: 220px;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 20px;
  padding: 18px;
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.1);
  backdrop-filter: blur(10px);

  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 14px;
  }

  h3 {
    margin-bottom: 6px;
    font-size: 1.15rem;
  }

  p {
    color: #475569;
    font-size: 0.85rem;
  }
`;

export const MainBookCard = styled(BookCard)`
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(0deg);
  z-index: 2;
  width: 260px;
`;

export const FloatingCard = styled(BookCard)`
  left: 20px;
  top: 60px;
  transform: rotate(-12deg);
  z-index: 1;
`;

export const SideCard = styled(BookCard)`
  right: 18px;
  bottom: 40px;
  transform: rotate(12deg);
  z-index: 1;
`;

export const ContentSection = styled.section`
  padding: 30px 24px 90px;
`;

export const ContentInner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`;

export const SectionHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 20px;
  margin-bottom: 30px;

  h2 {
    font-size: clamp(2rem, 3vw, 3rem);
    letter-spacing: -0.04em;
  }

  p {
    color: #475569;
    max-width: 500px;
    line-height: 1.7;
  }

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 28px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const BookCardItem = styled.article`
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 24px 44px rgba(15, 23, 42, 0.08);

  img {
    width: 100%;
    height: 280px;
    object-fit: cover;
    display: block;
  }
`;

export const BookInfo = styled.div`
  padding: 20px 20px 24px;

  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    color: #64748b;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  h3 {
    margin-bottom: 8px;
    font-size: 1.2rem;
  }

  p {
    color: #475569;
    line-height: 1.7;
    margin-bottom: 18px;
  }
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Price = styled.span`
  font-weight: 700;
  font-size: 1.1rem;
  color: #0f172a;
`;

export const AddButton = styled.button`
  background: #0f172a;
  color: #f8fafc;
  border: none;
  border-radius: 999px;
  padding: 10px 14px;
  font-weight: 600;
`;

export const CategorySection = styled.section`
  padding: 0 24px 90px;
`;

export const CategoryGrid = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

export const CategoryCard = styled.div`
  padding: 28px 22px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(239,246,255,0.9));
  border: 1px solid rgba(148, 163, 184, 0.15);

  .icon {
    width: 52px;
    height: 52px;
    display: grid;
    place-items: center;
    border-radius: 14px;
    background: linear-gradient(135deg, #dbeafe, #fed7aa);
    margin-bottom: 16px;
    font-size: 1.5rem;
  }

  h3 {
    margin-bottom: 10px;
  }

  p {
    color: #475569;
    line-height: 1.7;
  }
`;

export const CTASection = styled.section`
  padding: 0 24px 90px;
`;

export const CTABox = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  background: linear-gradient(135deg, #0f172a, #1e293b 60%, #312e81);
  border-radius: 30px;
  padding: 52px 42px;
  display: flex;
  justify-content: space-between;
  gap: 28px;
  align-items: center;
  color: white;

  @media (max-width: 780px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const CTAContent = styled.div`
  h2 {
    font-size: clamp(2rem, 3vw, 2.8rem);
    margin-bottom: 12px;
    letter-spacing: -0.04em;
  }

  p {
    color: #cbd5e1;
    max-width: 520px;
    line-height: 1.7;
  }
`;
