import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api/api';
import { useAuth } from './AuthContext';

const DataContext = createContext(null);
export const useData = () => useContext(DataContext);
export const STATUSES = ['Applied', 'Shortlisted', 'Interview Scheduled', 'Selected'];
const addDays = (n) => new Date(Date.now() + n * 864e5).toISOString().slice(0, 10);

export function DataProvider({ children }) {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({ trends: [], announcements: [] });
  const [apps, setApps] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.getJobs(), api.getStats()])
      .then(([j, s]) => { setJobs(j); setStats(s); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (user) { setApps(api.getApps(user.email)); setNotes(api.getNotes(user.email)); }
  }, [user]);

  const commit = (nextApps, nextNotes = notes) => {
    setApps(nextApps); setNotes(nextNotes);
    api.saveApps(user.email, nextApps); api.saveNotes(user.email, nextNotes);
  };
  const note = (type, title, message) => ({ id: crypto.randomUUID(), type, title, message, read: false, date: new Date().toISOString() });

  const apply = (job) => {
    if (apps.some((a) => a.jobId === job.id)) return;
    commit([...apps, { jobId: job.id, status: 'Applied', appliedOn: addDays(0), interviewDate: null }],
      [note('Company update', `Applied to ${job.company}`, `Your application for ${job.role} was received.`), ...notes]);
  };
  // Demo: moves an application to the next stage, as a placement officer would.
  const advance = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    let n = notes;
    const next = apps.map((a) => {
      if (a.jobId !== jobId) return a;
      const status = STATUSES[Math.min(STATUSES.indexOf(a.status) + 1, STATUSES.length - 1)];
      if (status === 'Interview Scheduled') {
        n = [note('Interview alert', `Interview at ${job.company}`, `Your interview is on ${addDays(7)}.`), ...n];
        return { ...a, status, interviewDate: addDays(7) };
      }
      n = [note('Company update', `${job.company}: ${status}`, `Your status changed to ${status}.`), ...n];
      return { ...a, status };
    });
    commit(next, n);
  };
  const markAllRead = () => commit(apps, notes.map((x) => ({ ...x, read: true })));

  const allNotes = useMemo(() => [...notes, ...stats.announcements.map((a) => ({ ...a, read: true, date: '2026-10-01' }))], [notes, stats]);
  const value = { jobs, stats, apps, notes: allNotes, loading, error, apply, advance, markAllRead,
    unread: notes.filter((n) => !n.read).length };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
