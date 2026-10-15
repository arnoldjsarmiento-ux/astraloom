const technologies = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'React Native',
  'Flutter',
  'Swift',
  'Kotlin',
  'AWS',
  'Google Cloud',
  'Azure',
  'Docker',
  'Kubernetes',
  'PostgreSQL',
  'MongoDB',
  'Tailwind CSS',
]

export default function TechStrip() {
  return (
    <section aria-label="Technologies we work with" className="border-t border-white/10 bg-ink-950 py-10">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
        Technologies we build with
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <ul className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {[...technologies, ...technologies].map((tech, index) => (
            <li
              key={`${tech}-${index}`}
              aria-hidden={index >= technologies.length}
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm font-medium text-ink-200"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
