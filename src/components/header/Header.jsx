import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HeaderContainer,
  HeaderInner,
  Logo,
  Nav,
  NavItem,
  Actions,
  SearchButton,
  PrimaryButton,
} from './Header.styles';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Books', path: '/section' },
  { label: 'Categories', path: '/section' },
  { label: 'About', path: '/home' },
];

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderInner className="max-width">
        <Logo to="/">
          <span className="logo-mark">B</span>
          BookNest
        </Logo>

        <Nav>
          {navItems.map((item) => (
            <NavItem key={item.label}>
              <NavLink to={item.path}>{item.label}</NavLink>
            </NavItem>
          ))}
        </Nav>

        <Actions>
          <SearchButton type="button">Search</SearchButton>
          <PrimaryButton type="button">Join Library</PrimaryButton>
        </Actions>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header;
