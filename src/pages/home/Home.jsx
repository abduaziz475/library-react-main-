import React from 'react';
import {
  HomeContainer,
  HeroSection,
  HeroContent,
  HeroText,
  HeroActions,
  PrimaryButton,
  SecondaryButton,
  StatRow,
  StatItem,
  HeroVisual,
  MainBookCard,
  FloatingCard,
  SideCard,
  ContentSection,
  ContentInner,
  SectionHeading,
  BookGrid,
  BookCardItem,
  BookInfo,
  PriceRow,
  Price,
  AddButton,
  CategorySection,
  CategoryGrid,
  CategoryCard,
  CTASection,
  CTABox,
  CTAContent,
} from './Home.styles';

const featuredBooks = [
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    category: 'Fiction',
    price: '$18.90',
    text: 'A thought-provoking journey through life’s infinite possibilities.',
    image:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-Improvement',
    price: '$16.50',
    text: 'Small changes that create lasting changes in your daily life.',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Educated',
    author: 'Tara Westover',
    category: 'Memoir',
    price: '$21.20',
    text: 'A powerful memoir about resilience, identity, and learning.',
    image:
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    category: 'Classic',
    price: '$14.00',
    text: 'A timeless story about purpose, courage, and listening to your heart.',
    image:
      'https://images.unsplash.com/photo-1516979187454-437ec3e2f40d?auto=format&fit=crop&w=900&q=80',
  },
];

const categories = [
  { icon: '📚', title: 'Fiction', text: 'Stories that spark imagination and transport you beyond the ordinary.' },
  { icon: '🧠', title: 'Psychology', text: 'Explore the mind and deepen your understanding of human behavior.' },
  { icon: '🌍', title: 'History', text: 'Travel through time and discover the moments that shaped the world.' },
  { icon: '💡', title: 'Productivity', text: 'Learn practical habits and systems for a better, more focused life.' },
];

const Home = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroText>
            <span style={{ display: 'inline-block', padding: '8px 14px', borderRadius: '999px', background: '#e0e7ff', color: '#4338ca', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.74rem', marginBottom: '18px' }}>
              Your next favorite read
            </span>
            <h1>Find your story in every page.</h1>
            <p>
              BookNest brings together bestselling novels, timeless classics, and fresh discoveries so your next adventure starts with a single click.
            </p>

            <HeroActions>
              <PrimaryButton type="button">Browse Collection</PrimaryButton>
              <SecondaryButton type="button">Explore Deals</SecondaryButton>
            </HeroActions>

            <StatRow>
              <StatItem>
                <strong>25k+</strong>
                <span>Books available</span>
              </StatItem>
              <StatItem>
                <strong>8k+</strong>
                <span>Active readers</span>
              </StatItem>
              <StatItem>
                <strong>4.9/5</strong>
                <span>Reader rating</span>
              </StatItem>
            </StatRow>
          </HeroText>

          <HeroVisual>
            <FloatingCard>
              <img src="https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=900&q=80" alt="Book cover" />
              <h3>Quiet Strength</h3>
              <p>Rina Moss</p>
            </FloatingCard>

            <MainBookCard>
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80" alt="Book cover" />
              <h3>After the Rain</h3>
              <p>Emma Leigh</p>
            </MainBookCard>

            <SideCard>
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80" alt="Book cover" />
              <h3>Bright Horizons</h3>
              <p>Daniel Ford</p>
            </SideCard>
          </HeroVisual>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <ContentInner>
          <SectionHeading>
            <h2>Featured titles</h2>
            <p>Handpicked reads for curious minds, thoughtful readers, and everyone in search of an unforgettable story.</p>
          </SectionHeading>

          <BookGrid>
            {featuredBooks.map((book) => (
              <BookCardItem key={book.title}>
                <img src={book.image} alt={book.title} />
                <BookInfo>
                  <div className="meta">
                    <span>{book.category}</span>
                    <span>⭐ 4.8</span>
                  </div>
                  <h3>{book.title}</h3>
                  <p>{book.text}</p>
                  <PriceRow>
                    <Price>{book.price}</Price>
                    <AddButton type="button">Add to cart</AddButton>
                  </PriceRow>
                </BookInfo>
              </BookCardItem>
            ))}
          </BookGrid>
        </ContentInner>
      </ContentSection>

      <CategorySection>
        <CategoryGrid>
          {categories.map((category) => (
            <CategoryCard key={category.title}>
              <div className="icon">{category.icon}</div>
              <h3>{category.title}</h3>
              <p>{category.text}</p>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </CategorySection>

      <CTASection>
        <CTABox>
          <CTAContent>
            <h2>Build your personal library today.</h2>
            <p>Join a community of readers who never stop exploring new voices, bold ideas, and the stories that last a lifetime.</p>
          </CTAContent>
          <PrimaryButton type="button">Start Reading</PrimaryButton>
        </CTABox>
      </CTASection>
    </HomeContainer>
  );
};

export default Home;
