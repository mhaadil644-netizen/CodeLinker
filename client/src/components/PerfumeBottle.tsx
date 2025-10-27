export function PerfumeBottle({ className = "" }: { className?: string }) {
  return (
    <svg 
      width="300" 
      height="400" 
      viewBox="0 0 300 400" 
      className={`mx-auto transition-all duration-300 hover:drop-shadow-[0_0_30px_rgba(212,175,55,0.5)] ${className}`}
    >
      <defs>
        <linearGradient id="luxuryBottleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FAF7F0', stopOpacity: 0.95 }} />
          <stop offset="30%" style={{ stopColor: '#F5E6D3', stopOpacity: 0.9 }} />
          <stop offset="60%" style={{ stopColor: '#D4AF37', stopOpacity: 0.85 }} />
          <stop offset="100%" style={{ stopColor: '#C19A2E', stopOpacity: 0.9 }} />
        </linearGradient>
        <linearGradient id="capGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#3A7A9E' }} />
          <stop offset="50%" style={{ stopColor: '#2C5F7C' }} />
          <stop offset="100%" style={{ stopColor: '#1E4A5F' }} />
        </linearGradient>
        <linearGradient id="glassShine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0 }} />
          <stop offset="30%" style={{ stopColor: 'white', stopOpacity: 0.6 }} />
          <stop offset="50%" style={{ stopColor: 'white', stopOpacity: 0.8 }} />
          <stop offset="70%" style={{ stopColor: 'white', stopOpacity: 0.6 }} />
          <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0 }} />
        </linearGradient>
        <filter id="luxury-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Shadow base */}
      <ellipse cx="150" cy="365" rx="45" ry="8" fill="black" opacity="0.15" />
      
      {/* Bottle body - elegant curved shape */}
      <path
        d="M 95 160 
           Q 95 155 100 155
           L 100 240
           Q 100 320 110 340
           Q 110 350 120 350
           L 180 350
           Q 190 350 190 340
           Q 200 320 200 240
           L 200 155
           Q 200 155 205 160
           L 205 240
           Q 205 325 195 345
           Q 195 355 180 355
           L 120 355
           Q 105 355 105 345
           Q 95 325 95 240
           Z"
        fill="url(#luxuryBottleGradient)"
        stroke="#D4AF37"
        strokeWidth="0.5"
        filter="url(#luxury-glow)"
      />
      
      {/* Bottle shoulders - elegant curve */}
      <path
        d="M 120 155
           Q 120 145 125 140
           L 125 110
           Q 125 105 130 105
           L 170 105
           Q 175 105 175 110
           L 175 140
           Q 180 145 180 155
           L 120 155
           Z"
        fill="url(#luxuryBottleGradient)"
        stroke="#D4AF37"
        strokeWidth="0.5"
      />
      
      {/* Glass shine effect */}
      <rect 
        x="108" 
        y="170" 
        width="20" 
        height="160" 
        rx="3"
        fill="url(#glassShine)" 
        opacity="0.4"
      />
      
      {/* Decorative gold bands */}
      <rect x="95" y="155" width="110" height="3" fill="#D4AF37" opacity="0.8" />
      <rect x="105" y="345" width="90" height="2" fill="#D4AF37" opacity="0.6" />
      
      {/* Luxury cap - multi-layered */}
      <rect 
        x="118" 
        y="85" 
        width="64" 
        height="25" 
        rx="3"
        fill="url(#capGradient)"
        stroke="#1E4A5F"
        strokeWidth="0.5"
      />
      
      {/* Cap detail - top ring */}
      <rect 
        x="123" 
        y="78" 
        width="54" 
        height="12" 
        rx="6"
        fill="#2C5F7C"
        stroke="#1E4A5F"
        strokeWidth="0.5"
      />
      
      {/* Cap ornament */}
      <circle cx="150" cy="84" r="8" fill="#D4AF37" opacity="0.9" />
      <circle cx="150" cy="84" r="5" fill="#C19A2E" />
      
      {/* Elegant label with ornate border */}
      <path
        d="M 115 210
           Q 115 205 120 205
           L 180 205
           Q 185 205 185 210
           L 185 270
           Q 185 275 180 275
           L 120 275
           Q 115 275 115 270
           Z"
        fill="white"
        opacity="0.92"
        stroke="#D4AF37"
        strokeWidth="1.5"
      />
      
      {/* Decorative corners on label */}
      <path d="M 120 210 L 125 210 L 125 205 M 175 205 L 175 210 L 180 210" 
        stroke="#D4AF37" 
        strokeWidth="1.5" 
        fill="none"
        strokeLinecap="round"
      />
      <path d="M 120 270 L 125 270 L 125 275 M 175 275 L 175 270 L 180 270" 
        stroke="#D4AF37" 
        strokeWidth="1.5" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Brand text */}
      <text 
        x="150" 
        y="232" 
        textAnchor="middle" 
        className="font-serif text-lg font-bold fill-med-sea"
        style={{ letterSpacing: '2px' }}
      >
        MED
      </text>
      <text 
        x="150" 
        y="250" 
        textAnchor="middle" 
        className="font-serif text-sm fill-med-sea"
        style={{ letterSpacing: '3px' }}
      >
        PARFUM
      </text>
      <line x1="130" y1="256" x2="170" y2="256" stroke="#D4AF37" strokeWidth="0.5" />
      <text 
        x="150" 
        y="268" 
        textAnchor="middle" 
        className="text-xs fill-med-sea"
        style={{ fontSize: '8px', letterSpacing: '1px' }}
      >
        MEDITERRANEAN
      </text>
    </svg>
  );
}
