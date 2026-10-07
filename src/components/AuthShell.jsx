export default function AuthShell({ children }) {
  return (
    <div className="authwrap">
      <section className="brand">
        <h1>PlaceTrack</h1>
        <p className="tag">Your campus placement journey, in one place.</p>
        <ul>
          <li>Browse openings from top recruiters</li>
          <li>Track every application and interview</li>
          <li>Never miss a deadline or announcement</li>
        </ul>
        <div className="brandstats"><b>305<span>students placed in 2025</span></b><b>61<span>recruiting companies</span></b></div>
      </section>
      <section className="formside"><div className="authcard">{children}</div></section>
    </div>
  );
}
