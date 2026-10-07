// Data layer: jobs/stats come from JSON files via fetch (API integration);
// users, applications and notifications persist in localStorage (mock backend).
const get = async (file) => {
  const res = await fetch(`${import.meta.env.BASE_URL}data/${file}`);
  if (!res.ok) throw new Error(`Could not load ${file}`);
  return res.json();
};
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

export const api = {
  getJobs: () => get('jobs.json'),
  getStats: () => get('stats.json'),
  register(u) {
    const users = read('users', []);
    if (users.some((x) => x.email === u.email)) throw new Error('This email is already registered');
    write('users', [...users, u]);
    return u;
  },
  login(email, password) {
    const u = read('users', []).find((x) => x.email === email && x.password === password);
    if (!u) throw new Error('Incorrect email or password');
    return u;
  },
  updateUser(u) { write('users', read('users', []).map((x) => (x.email === u.email ? u : x))); return u; },
  getSession: () => read('session', null),
  setSession: (u) => (u ? write('session', u) : localStorage.removeItem('session')),
  getApps: (email) => read(`apps_${email}`, []),
  saveApps: (email, a) => write(`apps_${email}`, a),
  getNotes: (email) => read(`notes_${email}`, []),
  saveNotes: (email, n) => write(`notes_${email}`, n),
};
