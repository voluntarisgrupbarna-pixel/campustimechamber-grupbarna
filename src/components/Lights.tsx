export default function Lights({ count = 24, className = '' }: { count?: number; className?: string }) {
  return (
    <ul className={`lights ${className}`} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <li key={i} />
      ))}
    </ul>
  );
}
