import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 30;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 82px;
  gap: 24px;
  padding: 0 24px;
`;

export const Logo = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: #f8fafc;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.02em;

  .logo-mark {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 12px;
    background: linear-gradient(135deg, #f59e0b, #f97316);
    color: #111827;
    font-weight: 800;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
  justify-content: center;
`;

export const NavItem = styled.li`
  list-style: none;

  a {
    color: #cbd5e1;
    font-size: 0.95rem;
    font-weight: 500;
    transition: color 0.2s ease;

    &:hover,
    &.active {
      color: #f8fafc;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const SearchButton = styled.button`
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: transparent;
  color: #e2e8f0;
  padding: 10px 18px;
  border-radius: 999px;
  font-weight: 600;
`;

export const PrimaryButton = styled.button`
  border: none;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  color: #111827;
  padding: 11px 18px;
  border-radius: 999px;
  font-weight: 700;
  box-shadow: 0 12px 28px rgba(249, 115, 22, 0.28);
`;