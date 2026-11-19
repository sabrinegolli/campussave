/* Fake QR (deterministic pattern). Replace with a real library (e.g. qrcode.react) when the backend generates the code. */
export default function QrPlaceholder({ value = 'campussave', size = 64 }) {
  const n = 11;
  let seed = [...String(value)].reduce((s, c) => (s * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const finder = (x, y) => (x < 3 && y < 3) || (x > n - 4 && y < 3) || (x < 3 && y > n - 4);
  const cells = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (finder(x, y) || rnd() > 0.5) cells.push([x, y]);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${n} ${n}`} role="img" aria-label="QR code de retrait" shapeRendering="crispEdges">
      <rect width={n} height={n} fill="#fff" />
      {cells.map(([x, y]) => <rect key={x + '-' + y} x={x} y={y} width="1" height="1" fill="#0a2a66" />)}
    </svg>
  );
}
