import { motion } from 'framer-motion'
import { ArrowRight, Cloud, Code, Database, Shield, Smartphone, Sparkles, Zap } from 'lucide-react'
import { getHeroContent } from '../api/client'
import { useAsyncData } from '../hooks/useAsyncData'
import heroFallback from '../data/hero.json'

const stats = [
  { number: '150+', label: 'Projects delivered' },
  { number: '50+', label: 'Happy clients' },
  { number: '5+', label: 'Years experience' },
  { number: '24/7', label: 'Support' },
]

const expertise = [
  { icon: Code, label: 'Web', stack: 'React · Next.js' },
  { icon: Smartphone, label: 'Mobile', stack: 'React Native · Flutter' },
  { icon: Cloud, label: 'Cloud', stack: 'AWS · Azure · GCP' },
  { icon: Database, label: 'Data', stack: 'PostgreSQL · MongoDB' },
]

function normalizeLink(link, fallback) {
  if (!link) return fallback
  if (link === '/contact' || link === '/#contact') return '#contact'
  if (link === '/#portfolio' || link === '/portfolio') return '#portfolio'
  return link
}

// Highlight the last two words of the headline, e.g. "...into *Digital Reality*"
function splitHeadline(text = '') {
  const words = text.trim().split(/\s+/)
  if (words.length < 3) return ['', text]
  return [words.slice(0, -2).join(' '), words.slice(-2).join(' ')]
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

function Threads() {
  const paths = [
    'M-50 520 C 250 380, 450 640, 760 470 S 1250 300, 1500 420',
    'M-50 600 C 300 470, 520 700, 820 540 S 1260 380, 1500 500',
    'M-50 440 C 220 300, 480 560, 720 400 S 1220 220, 1500 330',
  ]
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="thread" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#6262f1" stopOpacity="0" />
          <stop offset="40%" stopColor="#6262f1" stopOpacity="0.55" />
          <stop offset="75%" stopColor="#22d3ee" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="url(#thread)"
          strokeWidth={i === 0 ? 1.6 : 1}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, delay: 0.3 + i * 0.25, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  )
}

function CodeCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-primary-600/30 via-transparent to-accent-400/25 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/80 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="ml-3 font-mono text-xs text-ink-400">your-next-product.ts</span>
        </div>
        <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-6 text-ink-300">
          <code>
            <span className="text-primary-300">const</span> product ={' '}
            <span className="text-primary-300">await</span> astraloom.
            <span className="text-accent-300">build</span>({'{'}
            {'\n'}
            {'  '}idea: <span className="text-emerald-300">&apos;yours&apos;</span>,{'\n'}
            {'  '}design: <span className="text-emerald-300">&apos;user-first&apos;</span>,{'\n'}
            {'  '}quality: <span className="text-emerald-300">&apos;production-grade&apos;</span>,
            {'\n'}
            {'}'}){'\n\n'}
            <span className="text-primary-300">await</span> product.
            <span className="text-accent-300">launch</span>()
          </code>
        </pre>
        <div className="grid gap-px border-t border-white/10 bg-white/10 sm:grid-cols-2">
          {expertise.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              className="flex items-center gap-3 bg-ink-900 px-5 py-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                <item.icon className="h-4.5 w-4.5 text-accent-300" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="truncate text-xs text-ink-400">{item.stack}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-6 top-[44%] hidden sm:flex items-center gap-2.5 rounded-xl border border-white/10 bg-ink-800/90 px-4 py-3 shadow-xl backdrop-blur"
      >
        <Shield className="h-5 w-5 text-emerald-300" />
        <span className="text-sm font-medium text-white">Enterprise-grade security</span>
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute -right-4 -top-5 hidden sm:flex items-center gap-2.5 rounded-xl border border-white/10 bg-ink-800/90 px-4 py-3 shadow-xl backdrop-blur"
      >
        <Zap className="h-5 w-5 text-amber-300" />
        <span className="text-sm font-medium text-white">Lightning-fast delivery</span>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const { data: hero } = useAsyncData(async () => {
    const items = await getHeroContent()
    return items[0]
  }, heroFallback.data[0])

  const [lead, highlight] = splitHeadline(hero.subtitle)

  return (
    <section id="home" className="relative isolate overflow-hidden bg-ink-950 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-primary-600/25 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-accent-500/15 blur-[120px]" />
        <div className="grid-backdrop absolute inset-0" />
        <Threads />
      </div>

      <div className="container-max px-5 sm:px-6 lg:px-8 pt-36 pb-24 lg:pt-44 lg:pb-32">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div className="text-center lg:text-left">
            <motion.p
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-ink-200 backdrop-blur"
            >
              <Sparkles className="h-4 w-4 text-accent-300" />
              {hero.title}
            </motion.p>

            <motion.h1
              {...fadeUp(0.1)}
              className="mt-7 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[4rem]"
            >
              {lead} <span className="gradient-text-light">{highlight}</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-300 lg:mx-0"
            >
              {hero.description}
            </motion.p>

            <motion.div
              {...fadeUp(0.3)}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <a href={normalizeLink(hero.primaryButton?.link, '#contact')} className="btn-light group">
                {hero.primaryButton?.text || 'Get Started'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href={normalizeLink(hero.secondaryButton?.link, '#portfolio')} className="btn-outline-light">
                {hero.secondaryButton?.text || 'View Portfolio'}
              </a>
            </motion.div>

            <motion.dl
              {...fadeUp(0.4)}
              className="mt-14 grid grid-cols-2 gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-4"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse text-center lg:text-left">
                  <dt className="mt-1 text-sm text-ink-400">{stat.label}</dt>
                  <dd className="font-display text-3xl font-semibold text-white">{stat.number}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-lg lg:max-w-none"
          >
            <CodeCard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
