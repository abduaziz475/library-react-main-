import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background: #0f172a;
  color: #e2e8f0;
  padding: 72px 24px 32px;
`;

export const FooterInner = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.8fr 0.8fr 1fr;
  gap: 32px;
  max-width: 1300px;
  margin: 0 auto 32px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const FooterBrand = styled.div`
  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
    font-size: 1.4rem;
    color: #f8fafc;
  }

  p {
    color: #cbd5e1;
    line-height: 1.7;
    max-width: 360px;
  }
`;

export const BrandMark = styled.span`
  display: inline-grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  color: #111827;
  font-weight: 800;
`;

export const FooterLinks = styled.div`
  h4 {
    margin-bottom: 16px;
    color: #f8fafc;
    font-size: 1rem;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  a {
    color: #cbd5e1;
  }
`;

export const FooterBottom = styled.div`
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #cbd5e1;
  max-width: 1300px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;