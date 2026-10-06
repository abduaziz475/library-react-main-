import React from 'react';
import {
  SectionContainer,
  ProfilePage,
  ProfileSidebar,
  AvatarFrame,
  StatusBadge,
  ProfileName,
  ProfileHandle,
  ProfileButton,
  ProfileMeta,
  MainPanel,
  MainHeader,
  MainTitle,
  HeaderButton,
  RepoCard,
  RepoIcon,
  RepoName,
  RepoTag,
  ContributionSection,
  ContributionHeader,
  ContributionText,
  ContributionFilters,
  TogglePill,
  ContributionGrid,
  MonthRow,
  ContributionRow,
  ContributionCell,
  ActivityPanel,
  Timeline,
  ActivityRow,
  ActivityIcon,
  ActivityText,
  ActivityMeta,
  Chart,
  Bar,
  BarValue,
} from './Section.styles';

const monthNames = ['Okt', 'Noy', 'Dek', 'Yan', 'Feb', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen'];

const rows = [
  [0, 0, 0, 0, 1, 1, 0, 0, 2, 3, 1, 0],
  [0, 0, 1, 1, 2, 3, 2, 1, 2, 3, 2, 1],
  [1, 2, 2, 0, 1, 0, 2, 2, 3, 4, 2, 1],
  [0, 1, 2, 3, 2, 1, 1, 2, 3, 4, 3, 2],
  [0, 1, 1, 2, 2, 1, 0, 1, 2, 3, 2, 1],
  [0, 0, 0, 1, 1, 2, 1, 2, 4, 3, 2, 1],
  [0, 0, 0, 0, 1, 2, 3, 2, 1, 2, 0, 0],
];

const activities = [
  { title: '3 ta omborcha 10 ta commit yaratil', meta: 'abduaziz475/abduaziz-it-akademiyasi', icon: '◫' },
  { title: '4 ta ombor yaratil', meta: 'abduaziz475/abduaziz-it-akademiyasi', icon: '□' },
  { title: '3 ta ombor 10 ta commit yaratil', meta: 'abduaziz475/abduaziz-it-akademiyasi', icon: '◫' },
];

const Section = () => {
  return (
    <SectionContainer>
      <ProfilePage>
        <ProfileSidebar>
          <AvatarFrame>
            <StatusBadge>◉</StatusBadge>
          </AvatarFrame>

          <ProfileName>Abdumanonov Abduaziz</ProfileName>
          <ProfileHandle>abduaziz475</ProfileHandle>

          <ProfileButton type="button">Profilni tahrirlash</ProfileButton>

          <ProfileMeta>
            <div className="meta-row"><span className="meta-icon">◌</span><span>0 ta obunachi · 2 ta obunachi</span></div>
            <div className="meta-row"><span className="meta-icon">◔</span><span>06:01 (UTC +12:00)</span></div>
            <div className="meta-row"><span className="meta-icon">✉</span><span>abduazizabdumanonov6@gmail.com</span></div>
            <div className="meta-row"><span className="meta-icon">🔗</span><a href="https://react-dark-mode-port-c0d1bolt.hos" target="_blank" rel="noreferrer">react-dark-mode-port-c0d1b... </a></div>
          </ProfileMeta>
        </ProfileSidebar>

        <MainPanel>
          <MainHeader>
            <MainTitle>Mahkamlangan</MainTitle>
            <HeaderButton type="button">Pinlarinigiz sozlang</HeaderButton>
          </MainHeader>

          <RepoCard>
            <RepoIcon>⌂</RepoIcon>
            <RepoName>cmd</RepoName>
            <RepoTag>Ommaiy</RepoTag>
          </RepoCard>

          <ContributionSection>
            <ContributionHeader>
              <ContributionText>O‘tgan yili 104 ta hisa</ContributionText>
              <ContributionFilters>
                <span>Hisso sozlamalari</span>
                <TogglePill type="button">2026-yil</TogglePill>
              </ContributionFilters>
            </ContributionHeader>

            <ContributionGrid>
              <MonthRow>
                {monthNames.map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </MonthRow>

              {rows.map((row, index) => (
                <ContributionRow key={index}>
                  {row.map((value, cellIndex) => (
                    <ContributionCell key={`${index}-${cellIndex}`} className={`level-${value}`} />
                  ))}
                </ContributionRow>
              ))}
            </ContributionGrid>
          </ContributionSection>

          <ActivityPanel>
            <Timeline>
              <div style={{ fontSize: '1.2rem', color: '#edf5ff', marginBottom: 8 }}>Hissa qo‘shish faoliyati</div>

              {activities.map((item) => (
                <ActivityRow key={item.title}>
                  <ActivityIcon>{item.icon}</ActivityIcon>
                  <ActivityText>
                    <div>{item.title}</div>
                    <ActivityMeta>{item.meta}</ActivityMeta>
                  </ActivityText>
                </ActivityRow>
              ))}
            </Timeline>

            <Chart>
              <Bar>
                <span>3 ta omborda 10 ta commit yaratil</span>
              </Bar>
              <Bar>
                <BarValue $value="72%" />
              </Bar>
              <Bar>
                <span>2 ta omborda 10 ta commit</span>
              </Bar>
              <Bar>
                <BarValue $value="58%" />
              </Bar>
              <Bar>
                <span>4 ta ombor yaratildi</span>
              </Bar>
              <Bar>
                <BarValue $value="81%" />
              </Bar>
            </Chart>
          </ActivityPanel>
        </MainPanel>
      </ProfilePage>
    </SectionContainer>
  );
};

export default Section;
