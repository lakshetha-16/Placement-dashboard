import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Avatar, Icon } from '../components/Icon';
import { daysLeft } from '../utils';

const STATUS_LIST = ['Applied', 'Shortlisted', 'Interview Scheduled', 'Selected'];
const COLORS = { Applied: '#4C8DF6', Shortlisted: '#F2A93B', 'Interview Scheduled': '#8B5CF6', Selected: '#1FA971' };

export default function Dashboard() {
  const { user } = useAuth();
  const { jobs, apps, stats } = useData();
  const count = (s) => apps.filter((a) => a.status === s).length;
  const deadlines = jobs.filter((j) => daysLeft(j.deadline) >= 0).sort((a, b) => a.deadline.localeCompare(b.deadline)).slice(0, 5);
  const interviews = apps.filter((a) => a.interviewDate).map((a) => ({ ...a, job: jobs.find((j) => j.id === a.jobId) }));
  const closing = jobs.filter((j) => daysLeft(j.deadline) >= 0 && daysLeft(j.deadline) <= 14).length;
  const filled = ['name', 'phone', 'department', 'cgpa', 'skills'].filter((k) => String(user[k] ?? '').trim()).length;
  const pct = Math.round((filled / 5) * 100);

  const t = stats.trends, max = Math.max(1, ...t.map((x) => x.placed));
  const pts = t.map((x, i) => [40 + (i * 320) / Math.max(1, t.length - 1), 150 - (x.placed / max) * 105]);
  const line = pts.map((p) => p.join(',')).join(' ');
  const C = 2 * Math.PI * 40;
  let off = 0;
  const segs = STATUS_LIST.map((s) => { const len = apps.length ? (count(s) / apps.length) * C : 0; const o = off; off += len; return { s, len, o }; });

  const cards = [['briefcase', jobs.length, 'Open positions', '#E6F0FF'], ['clipboard', apps.length, 'Applications sent', '#FFF1D6'],
    ['calendar', count('Interview Scheduled'), 'Interviews', '#EFE7FF'], ['check', count('Selected'), 'Offers received', '#D9F5E8']];
  return (
    <>
      <section className="hero">
        <div>
          <h2>Welcome back, {user.name.split(' ')[0]}</h2>
          <p>{closing} openings close in the next 14 days. {apps.length === 0 ? 'Send your first application today.' : `You have ${apps.length} active application${apps.length > 1 ? 's' : ''}.`}</p>
          <Link to="/jobs" className="cta">Browse openings</Link>
        </div>
        <div className="complete"><span>Profile {pct}% complete</span><div className="track"><div style={{ width: `${pct}%` }} /></div>{pct < 100 && <Link to="/profile">Finish your profile</Link>}</div>
      </section>
      <section className="grid4">
        {cards.map(([ic, v, l, bg]) => (
          <div className="card stat" key={l}><span className="ico" style={{ background: bg }}><Icon n={ic} /></span><div><b>{v}</b><small>{l}</small></div></div>
        ))}
      </section>
      <section className="grid2">
        <div className="card">
          <h3>Placement trends</h3><small className="muted">Students placed each year</small>
          <svg viewBox="0 0 400 190" className="chart" role="img" aria-label="Placement trend line chart">
            <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#138A72" stopOpacity=".3" /><stop offset="1" stopColor="#138A72" stopOpacity="0" /></linearGradient></defs>
            {[0, 1, 2].map((i) => <line key={i} x1="20" x2="380" y1={50 + i * 50} y2={50 + i * 50} stroke="#E4EAE7" />)}
            {pts.length > 0 && <polygon points={`${pts[0][0]},150 ${line} ${pts[pts.length - 1][0]},150`} fill="url(#g)" />}
            <polyline points={line} fill="none" stroke="#138A72" strokeWidth="3" strokeLinejoin="round" />
            {pts.map((p, i) => (<g key={i}><circle cx={p[0]} cy={p[1]} r="5" fill="#fff" stroke="#138A72" strokeWidth="3" />
              <text x={p[0]} y={p[1] - 12} textAnchor="middle" className="cv">{t[i].placed}</text><text x={p[0]} y="176" textAnchor="middle" className="cl">{t[i].year}</text></g>))}
          </svg>
        </div>
        <div className="card">
          <h3>Application statistics</h3><small className="muted">Where your applications stand</small>
          {apps.length === 0 ? <p className="empty">Apply to a job and your pipeline appears here.</p> : (
            <div className="donutwrap">
              <svg viewBox="0 0 120 120" width="150" role="img" aria-label="Applications by status">
                <circle cx="60" cy="60" r="40" fill="none" stroke="#E4EAE7" strokeWidth="16" />
                {segs.map((g) => g.len > 0 && <circle key={g.s} cx="60" cy="60" r="40" fill="none" stroke={COLORS[g.s]} strokeWidth="16" strokeDasharray={`${g.len} ${C - g.len}`} strokeDashoffset={-g.o} transform="rotate(-90 60 60)" />)}
                <text x="60" y="66" textAnchor="middle" className="dv">{apps.length}</text>
              </svg>
              <ul className="legend">{STATUS_LIST.map((s) => <li key={s}><i style={{ background: COLORS[s] }} />{s}<b>{count(s)}</b></li>)}</ul>
            </div>)}
        </div>
        <div className="card">
          <h3>Upcoming deadlines</h3>
          <ul className="list">{deadlines.map((j) => { const d = daysLeft(j.deadline); return (
            <li key={j.id}><Avatar name={j.company} /><span><strong>{j.company}</strong><small>{j.role}</small></span><em className={d <= 7 ? 'chip hot' : 'chip'}>{d === 0 ? 'Today' : `${d} days left`}</em></li>); })}</ul>
        </div>
        <div className="card">
          <h3>Interview schedule</h3>
          {interviews.length === 0 ? <p className="empty">No interviews yet. They show up once a company shortlists you.</p> :
            <ul className="list">{interviews.map((i) => <li key={i.jobId}><Avatar name={i.job.company} /><span><strong>{i.job.company}</strong><small>{i.job.role}</small></span><em className="chip">{i.interviewDate}</em></li>)}</ul>}
        </div>
      </section>
    </>
  );
}
