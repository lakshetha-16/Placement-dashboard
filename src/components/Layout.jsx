import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Avatar, Icon } from './Icon';

const NAV = [['/', 'Dashboard', 'home'], ['/jobs', 'Job openings', 'briefcase'], ['/applications', 'My applications', 'clipboard'], ['/notifications', 'Notifications', 'bell'], ['/profile', 'Profile', 'user']];

export default function Layout() {
  const { user, logout } = useAuth();
  const { unread, loading, error } = useData();
  const [open, setOpen] = useState(false);
  const date = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
  return (
    <div className="shell">
      <aside className={open ? 'side open' : 'side'} onClick={() => setOpen(false)}>
        <div className="logo"><span>P</span>PlaceTrack</div>
        <nav>
          {NAV.map(([to, label, icon]) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
              <Icon n={icon} />{label}{to === '/notifications' && unread > 0 && <b className="badge">{unread}</b>}
            </NavLink>
          ))}
        </nav>
        <div className="who">
          <Avatar name={user.name} round />
          <div><strong>{user.name}</strong><small>{user.department}</small></div>
          <button onClick={logout} aria-label="Log out" title="Log out"><Icon n="logout" size={18} /></button>
        </div>
      </aside>
      <div className="content">
        <header className="topbar">
          <button className="menu" onClick={() => setOpen(!open)} aria-label="Open menu"><Icon n="menu" /></button>
          <span className="date">{date}</span>
          <NavLink to="/notifications" className="bell" aria-label="Notifications"><Icon n="bell" />{unread > 0 && <i>{unread}</i>}</NavLink>
        </header>
        <main>
          {loading && <p>Loading placement data…</p>}
          {error && <p className="err">{error}. Check that public/data/*.json is served.</p>}
          {!loading && !error && <Outlet />}
        </main>
      </div>
    </div>
  );
}
