// ISO 3166-1 alpha-2 codes for African flags
const AFRICAN_FLAGS = [
  { code: 'gh', name: 'Ghana' }, { code: 'ng', name: 'Nigeria' },
  { code: 'za', name: 'South Africa' }, { code: 'ke', name: 'Kenya' },
  { code: 'et', name: 'Ethiopia' }, { code: 'tz', name: 'Tanzania' },
  { code: 'ug', name: 'Uganda' }, { code: 'rw', name: 'Rwanda' },
  { code: 'sn', name: 'Senegal' }, { code: 'ci', name: 'Ivory Coast' },
  { code: 'tg', name: 'Togo' }, { code: 'ma', name: 'Morocco' },
  { code: 'eg', name: 'Egypt' }, { code: 'cm', name: 'Cameroon' },
  { code: 'gn', name: 'Guinea' }, { code: 'bj', name: 'Benin' },
  { code: 'zm', name: 'Zambia' }, { code: 'zw', name: 'Zimbabwe' },
  { code: 'mz', name: 'Mozambique' }, { code: 'ml', name: 'Mali' },
]

function Flag({ code, name }: { code: string; name: string }) {
  return (
    <span title={name} className="inline-flex items-center justify-center flex-shrink-0 px-6">
      <img
        src={`https://flagcdn.com/h40/${code}.png`}
        srcSet={`https://flagcdn.com/h80/${code}.png 2x`}
        height="24"
        alt={name}
        className="h-6 w-auto object-cover rounded-sm shadow-sm opacity-90 hover:opacity-100 transition-opacity"
        loading="lazy"
      />
    </span>
  )
}

export default function FlagMarquee({ className = '' }: { className?: string }) {
  const doubled = [...AFRICAN_FLAGS, ...AFRICAN_FLAGS]
  const container = 'w-full max-w-[1536px] mx-auto px-6 sm:px-12 lg:px-20'
  
  return (
    <div className={`py-8 rule-top rule-bottom ${className}`}>
      <div 
        className={`${container} overflow-hidden`}
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
        }}
      >
        <div className="marquee-track">
          {doubled.map((flag, i) => (
            <Flag key={i} code={flag.code} name={flag.name} />
          ))}
        </div>
      </div>
    </div>
  )
}
