import React from 'react';
import { Link } from 'react-router-dom';
import {
  FooterContainer,
  FooterInner,
  FooterBrand,
  BrandMark,
  FooterLinks,
  FooterBottom,
} from './Footer.Styled';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterInner>
        <FooterBrand>
          <h3>
            <BrandMark>B</BrandMark>
            BookNest
          </h3>
          <p>
            Discover stories that stay with you, explore fresh reads, and build a library that grows with your imagination.
          </p>
        </FooterBrand>

        <FooterLinks>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/section">Books</Link></li>
            <li><Link to="/section">Categories</Link></li>
          </ul>
        </FooterLinks>

        <FooterLinks>
          <h4>Community</h4>
          <ul>
            <li><Link to="/section">Events</Link></li>
            <li><Link to="/section">Reviews</Link></li>
            <li><Link to="/section">Newsletter</Link></li>
          </ul>
        </FooterLinks>

        <FooterLinks>
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:hello@booknest.com">hello@booknest.com</a></li>
            <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
            <li><Link to="/section">24/7 support</Link></li>
          </ul>
        </FooterLinks>
      </FooterInner>

      <FooterBottom>
        <span>© 2026 BookNest Library</span>
        <span>Made for readers and dreamers.</span>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
