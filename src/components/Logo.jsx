export default function Logo({ variant = 'dark', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img src="/mark.png" alt="" width="40" height="32" className="h-8 w-auto" />
      <span
        className={`font-display text-[1.35rem] font-bold tracking-tight ${
          variant === 'light' ? 'text-white' : 'text-ink-950'
        }`}
      >
        AstraLoom
      </span>
    </span>
  )
}
