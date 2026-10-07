import { useMemo, useState } from 'react';
import { useData } from '../context/DataContext';
import { Avatar, Icon } from '../components/Icon';
import { daysLeft } from '../utils';

export default function Jobs() {
  const { jobs, apps, apply } = useData();
  const [q, setQ] = useState('');
  const [type, setType] = useState('All');
  const [loc, setLoc] = useState('All');
  const locations = ['All', ...new Set(jobs.map((j) => j.location))];
  const shown = useMemo(() => jobs.filter((j) =>
    (type === 'All' || j.type === type) && (loc === 'All' || j.location === loc) &&
    `${j.company} ${j.role} ${j.skills.join(' ')}`.toLowerCase().includes(q.toLowerCase())), [jobs, q, type, loc]);
  return (
    <>
      <div className="pagehead"><h2>Job openings</h2><p>{shown.length} of {jobs.length} positions</p></div>
      <div className="filters">
        <label className="search"><Icon n="search" size={18} /><input placeholder="Search company, role or skill" value={q} onChange={(e) => setQ(e.target.value)} /></label>
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Job type">{['All', 'Full-time', 'Internship'].map((t) => <option key={t}>{t}</option>)}</select>
        <select value={loc} onChange={(e) => setLoc(e.target.value)} aria-label="Location">{locations.map((l) => <option key={l}>{l}</option>)}</select>
      </div>
      {shown.length === 0 && <p className="empty">No openings match these filters. Clear the search to see all jobs.</p>}
      <div className="grid2">
        {shown.map((j) => {
          const applied = apps.some((a) => a.jobId === j.id);
          const d = daysLeft(j.deadline);
          return (
            <article className="card job" key={j.id}>
              <header><Avatar name={j.company} /><div><h3>{j.company}</h3><span>{j.role}</span></div><em className={j.type === 'Internship' ? 'chip blue' : 'chip'}>{j.type}</em></header>
              <p className="meta">{j.location} · <strong>{j.package}</strong></p>
              <p>{j.description}</p>
              <p className="tags">{j.skills.map((s) => <span key={s}>{s}</span>)}</p>
              <footer><small className={d <= 7 ? 'hotText' : 'muted'}>{d < 0 ? 'Closed' : `Closes ${j.deadline} (${d} days)`}</small>
                <button className="primary" disabled={applied || d < 0} onClick={() => apply(j)}>{applied ? 'Applied' : 'Apply now'}</button></footer>
            </article>);
        })}
      </div>
    </>
  );
}
