export const initials = (n) => n.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
export const hue = (s) => ([...s].reduce((a, c) => a + c.charCodeAt(0), 0) * 37) % 360;
export const daysLeft = (d) => Math.ceil((new Date(d) - new Date()) / 864e5);
