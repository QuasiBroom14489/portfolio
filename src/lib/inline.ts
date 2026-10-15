// Minimal inline markdown for content strings: escapes HTML, then **bold**.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const inline = (s: string) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

export const statusClass: Record<string, string> = {
  Live: 'live', Beta: 'beta', 'Daily use': 'daily', 'Public repo': 'public', Building: 'building',
};
