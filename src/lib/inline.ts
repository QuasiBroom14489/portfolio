// Minimal inline markdown for content strings: escapes HTML, then **bold** and [text](/internal-path) links.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const inline = (s: string) =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '<a href="$2" data-open>$1</a>');

export const statusClass: Record<string, string> = {
  Live: 'live', Beta: 'beta', 'Daily use': 'daily', 'Public repo': 'public', Building: 'building',
};
