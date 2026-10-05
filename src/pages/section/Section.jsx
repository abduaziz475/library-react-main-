import React from 'react';
import {
  SectionContainer,
  SectionHero,
  SectionHeroText,
  FilterBar,
  FilterChip,
  CatalogGrid,
  BookCardItem,
  BookInfo,
  BookActions,
  Price,
  AddButton,
} from './Section.styles';

const books = [
  {
    title: 'The Midwich Cuckoos',
    author: 'John Wyndham',
    category: 'Classic',
    price: '$19.50',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    description: 'A chilling novel about silence, power, and the future of humanity.',
  },
  {
    title: 'The Orchard',
    author: 'Sarah Pollock',
    category: 'Drama',
    price: '$17.00',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    description: 'A warm, reflective story about second chances and family roots.',
  },
  {
    title: 'The Long Way Home',
    author: 'Milo Green',
    category: 'Adventure',
    price: '$21.00',
    image: 'https://images.unsplash.com/photo-1523464862210-25bc8a52bf8d?auto=format&fit=crop&w=900&q=80',
    description: 'An exploration of courage, memory, and the roads that change us.',
  },
  {
    title: 'The Quiet Hour',
    author: 'Amelia Stone',
    category: 'Literature',
    price: '$16.40',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80',
    description: 'A poetic collection of life’s gentle, unforgettable moments.',
  },
  {
    title: 'Design Your Day',
    author: 'Nora Hughes',
    category: 'Self-Help',
    price: '$22.80',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
    description: 'Create a more intentional, fulfilling daily routine with ease.',
  },
  {
    title: 'The Last Atlas',
    author: 'James Reeve',
    category: 'History',
    price: '$18.90',
    image: 'https://images.unsplash.com/photo-1516979187454-437ec3e2f40d?auto=format&fit=crop&w=900&q=80',
    description: 'A beautifully told historical journey into forgotten worlds.',
  },
];

const filters = ['All', 'Classic', 'Adventure', 'History', 'Self-Help', 'Drama'];

const Section = () => {
  return (
    <SectionContainer>
      <SectionHero>
        <SectionHeroText>
          <h1>Library collection</h1>
          <p>
            Browse carefully curated books from timeless classics to modern reads selected for curious minds and everyday explorers.
          </p>
          <FilterBar>
            {filters.map((filter, index) => (
              <FilterChip key={filter} className={index === 0 ? 'active' : ''} type="button">
                {filter}
              </FilterChip>
            ))}
          </FilterBar>
        </SectionHeroText>
      </SectionHero>

      <CatalogGrid>
        {books.map((book) => (
          <BookCardItem key={book.title}>
            <img src={book.image} alt={book.title} />
            <BookInfo>
              <div className="meta">
                <span>{book.category}</span>
                <span>⭐ 4.9</span>
              </div>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
              <BookActions>
                <Price>{book.price}</Price>
                <AddButton type="button">Add to cart</AddButton>
              </BookActions>
            </BookInfo>
          </BookCardItem>
        ))}
      </CatalogGrid>
    </SectionContainer>
  );
};

export default Section;
