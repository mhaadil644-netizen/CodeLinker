export function PerfumeBottle({ className = "" }: { className?: string }) {
  return (
    <svg 
      width="300" 
      height="400" 
      viewBox="0 0 300 400" 
      className={`mx-auto transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] ${className}`}
    >
      <defs>
        <linearGradient id="bottleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#F5E6D3' }} />
          <stop offset="50%" style={{ stopColor: '#D4AF37' }} />
          <stop offset="100%" style={{ stopColor: '#B8860B' }} />
        </linearGradient>
      </defs>
      <rect x="100" y="150" width="100" height="200" rx="10" fill="url(#bottleGradient)" opacity="0.9" />
      <rect x="130" y="100" width="40" height="60" fill="url(#bottleGradient)" opacity="0.9" />
      <rect x="125" y="80" width="50" height="30" rx="5" fill="#2C5F7C" />
      <rect x="110" y="200" width="80" height="60" rx="5" fill="white" opacity="0.8" />
      <text x="150" y="220" textAnchor="middle" className="font-serif text-sm fill-med-sea">MED</text>
      <text x="150" y="240" textAnchor="middle" className="font-serif text-sm fill-med-sea">Parfum</text>
    </svg>
  );
}
