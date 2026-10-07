export default function Field({ label, name, error, children, ...props }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children ?? <input name={name} aria-invalid={!!error} {...props} />}
      {error && <small className="err" role="alert">{error}</small>}
    </label>
  );
}
