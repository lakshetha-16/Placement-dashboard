import { Link } from 'react-router-dom';
import { useData, STATUSES } from '../context/DataContext';
import { Avatar } from '../components/Icon';

export default function Applications() {
  const { apps, jobs, advance } = useData();
  if (apps.length === 0) return <><div className="pagehead"><h2>My applications</h2></div><p className="empty">You haven't applied anywhere yet. <Link to="/jobs">Browse job openings</Link></p></>;
  return (
    <>
      <div className="pagehead"><h2>My applications</h2><p>{apps.length} submitted</p></div>
      {apps.map((a) => {
        const j = jobs.find((x) => x.id === a.jobId);
        const step = STATUSES.indexOf(a.status);
        return (
          <div className="card app" key={a.jobId}>
            <div className="apphead"><Avatar name={j.company} /><div><h3>{j.company}</h3><span>{j.role} · applied {a.appliedOn}</span></div>
              <span className={`pill ${a.status.split(' ')[0]}`}>{a.status}</span></div>
            <ol className="steps">{STATUSES.map((s, i) => <li key={s} className={i <= step ? 'done' : ''}><i />{s}</li>)}</ol>
            <div className="appfoot"><small className="muted">{a.interviewDate ? `Interview on ${a.interviewDate}` : 'No interview scheduled yet'}</small>
              {a.status !== 'Selected' && <button onClick={() => advance(a.jobId)}>Simulate next stage</button>}</div>
          </div>);
      })}
      <p className="muted">"Simulate next stage" stands in for the placement cell updating your status, since this demo has no real server.</p>
    </>
  );
}
