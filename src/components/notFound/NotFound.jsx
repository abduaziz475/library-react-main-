import React from 'react';
import { Link } from 'react-router-dom';
import {
  NoteFoundContainer,
  NotFoundCard,
  NotFoundTitle,
  NotFoundText,
} from './NotFound.styles';

const NotFound = () => {
  return (
    <NoteFoundContainer>
      <div className="max-width">
        <NotFoundCard>
          <NotFoundTitle>404</NotFoundTitle>
          <NotFoundText>
            The page you are looking for has wandered off the shelf.
          </NotFoundText>
          <Link to="/" style={{ display: 'inline-block', marginTop: '24px', background: '#0f172a', color: '#fff', padding: '12px 18px', borderRadius: '999px', fontWeight: 700 }}>
            Back to home
          </Link>
        </NotFoundCard>
      </div>
    </NoteFoundContainer>
  );
};

export default NotFound;
