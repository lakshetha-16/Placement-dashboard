import { hue, initials } from '../utils';
const P = {
  home: 'M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z',
  briefcase: 'M3 7h18v13H3zM9 7V4h6v3M3 13h18',
  clipboard: 'M8 4h8v3H8zM6 5h2M16 5h2v16H6V5M9 12h6M9 16h4',
  bell: 'M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21h4',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  logout: 'M9 4H4v16h5M16 8l4 4-4 4M20 12H9',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  check: 'M5 12l5 5 9-10',
  menu: 'M4 6h16M4 12h16M4 18h16',
};
export const Icon = ({ n, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={P[n]} /></svg>
);
export const Avatar = ({ name, round }) => (
  <span className={round ? 'avatar round' : 'avatar'} style={{ background: `hsl(${hue(name)} 45% 36%)` }}>{initials(name)}</span>
);
