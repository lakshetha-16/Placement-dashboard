import { useData } from '../context/DataContext';
import { Icon } from '../components/Icon';

const ICON = { 'Interview alert': 'calendar', 'Company update': 'briefcase', Announcement: 'bell' };
export default function Notifications() {
  const { notes, unread, markAllRead } = useData();
  const sorted = [...notes].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <div className="pagehead"><h2>Notifications</h2>{unread > 0 && <button onClick={markAllRead}>Mark all as read</button>}</div>
      {sorted.map((n) => (
        <div key={n.id} className={n.read ? 'card note' : 'card note unread'}>
          <span className="ico"><Icon n={ICON[n.type] ?? 'bell'} /></span>
          <div><small className="muted">{n.type}</small><h3>{n.title}</h3><p>{n.message}</p></div>
        </div>
      ))}
    </>
  );
}
