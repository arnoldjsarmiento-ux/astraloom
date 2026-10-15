import { motion } from 'framer-motion'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
  flush = false,
}) {
  const centered = align === 'center'
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-80px' }}
      className={`${centered ? 'mx-auto text-center' : ''} max-w-2xl ${flush ? '' : 'mb-14 lg:mb-16'}`}
    >
      {eyebrow && (
        <p className={`eyebrow mb-4 ${dark ? 'text-accent-300' : ''}`}>
          <span className={`h-px w-6 ${dark ? 'bg-accent-300' : 'bg-primary-600'}`} />
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15] font-semibold ${
          dark ? 'text-white' : 'text-ink-950'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-ink-300' : 'text-ink-500'}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
