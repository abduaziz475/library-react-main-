import styled from 'styled-components';

export const SectionContainer = styled.section`
  min-height: 100vh;
  background: linear-gradient(180deg, #020d1d 0%, #081827 100%);
  color: #e5eef8;
  padding: 32px 24px 80px;
`;

export const ProfilePage = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 42px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const ProfileSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;
`;

export const AvatarFrame = styled.div`
  position: relative;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #f0f4fb 0%, #dce3ec 36%, #b7c2d0 100%);
  box-shadow: inset 0 0 0 8px rgba(255, 255, 255, 0.08), 0 12px 34px rgba(8, 22, 38, 0.5);
  overflow: hidden;
  border: 4px solid rgba(126, 180, 255, 0.3);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80') center/cover no-repeat;
    filter: grayscale(1) contrast(1.05) brightness(1.05);
    mix-blend-mode: multiply;
    opacity: 0.9;
  }
`;

export const StatusBadge = styled.button`
  position: absolute;
  right: 22px;
  bottom: 14px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.6);
  background: rgba(8, 22, 38, 0.72);
  color: #e5eef8;
  font-size: 1.2rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.28);
`;

export const ProfileName = styled.h2`
  margin-top: 22px;
  font-size: clamp(2rem, 2vw, 2.3rem);
  line-height: 1.2;
  letter-spacing: -0.05em;
  color: #f5f9ff;
  text-align: center;
`;

export const ProfileHandle = styled.div`
  margin-top: 8px;
  font-size: 1.2rem;
  color: rgba(203, 214, 232, 0.82);
`;

export const ProfileButton = styled.button`
  width: 100%;
  margin-top: 22px;
  border: 1px solid rgba(191, 205, 223, 0.2);
  background: rgba(255,255,255,0.04);
  color: #edf5ff;
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 1rem;
  font-weight: 700;
`;

export const ProfileMeta = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: rgba(224, 236, 250, 0.9);
  font-size: 1.05rem;

  .meta-row {
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(220, 231, 246, 0.9);
  }

  .meta-icon {
    width: 18px;
    color: #9db5d1;
  }

  a {
    color: #8ab1ff;
    text-decoration: none;
  }
`;

export const MainPanel = styled.main`
  padding-top: 14px;
`;

export const MainHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
`;

export const MainTitle = styled.h3`
  font-size: clamp(1.2rem, 1.8vw, 1.7rem);
  color: #eef4fc;
  letter-spacing: -0.04em;
`;

export const HeaderButton = styled.button`
  background: rgba(80, 107, 150, 0.16);
  border: 1px solid rgba(119, 151, 187, 0.25);
  color: #9fbbef;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.85rem;
`;

export const RepoCard = styled.div`
  background: rgba(15, 27, 42, 0.86);
  border: 1px solid rgba(138, 170, 219, 0.18);
  border-radius: 14px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  width: min(100%, 760px);
`;

export const RepoIcon = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 6px;
  border: 1px solid rgba(187, 205, 231, 0.7);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #d8e8ff;
`;

export const RepoName = styled.span`
  font-size: 1.05rem;
  color: #edf5ff;
`;

export const RepoTag = styled.span`
  margin-left: auto;
  color: #9cc3ff;
  font-size: 0.8rem;
`;

export const ContributionSection = styled.section`
  margin-top: 38px;
`;

export const ContributionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 16px;
`;

export const ContributionText = styled.h4`
  font-size: 1.8rem;
  letter-spacing: -0.04em;
  color: #eaf3ff;
`;

export const ContributionFilters = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(175, 195, 221, 0.8);
`;

export const TogglePill = styled.button`
  border: none;
  background: rgba(58, 94, 146, 0.72);
  color: #edf6ff;
  border-radius: 8px;
  padding: 8px 14px;
  font-weight: 700;
  font-size: 0.82rem;
`;

export const ContributionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 5px;
  background: rgba(9, 19, 29, 0.56);
  border: 1px solid rgba(151, 177, 214, 0.12);
  border-radius: 14px;
  padding: 12px;
  max-width: 840px;
`;

export const MonthRow = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 6px;
  color: rgba(196, 210, 232, 0.7);
  font-size: 0.78rem;
  padding: 0 4px;
`;

export const ContributionRow = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 5px;
`;

export const ContributionCell = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: rgba(143, 164, 186, 0.18);
  box-shadow: inset 0 0 0 1px rgba(150, 177, 214, 0.08);

  &.level-0 { background: rgba(143, 164, 186, 0.18); }
  &.level-1 { background: rgba(34, 197, 94, 0.35); }
  &.level-2 { background: rgba(34, 197, 94, 0.5); }
  &.level-3 { background: rgba(34, 197, 94, 0.72); }
  &.level-4 { background: rgba(22, 163, 74, 0.92); }
`;

export const ActivityPanel = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 28px;
  margin-top: 32px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const ActivityRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid rgba(151, 177, 214, 0.12);

  &:first-child {
    border-top: none;
  }
`;

export const ActivityIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid rgba(139, 169, 217, 0.35);
  display: grid;
  place-items: center;
  color: #d8e8ff;
  background: rgba(255,255,255,0.02);
`;

export const ActivityText = styled.div`
  color: rgba(210, 224, 242, 0.9);
  line-height: 1.5;
`;

export const ActivityMeta = styled.div`
  margin-top: 6px;
  color: rgba(150, 173, 203, 0.82);
  font-size: 0.8rem;
`;

export const Chart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding-top: 12px;
`;

export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: rgba(210, 224, 242, 0.9);
`;

export const BarValue = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: rgba(255,255,255,0.06);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: ${props => props.$value || '50%'};
    border-radius: inherit;
    background: linear-gradient(90deg, #34d399, #1adb85);
  }
`;
