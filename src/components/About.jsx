import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Code, Shield, Zap } from 'lucide-react'
import SectionHeading from './SectionHeading'

const stats = [
  { number: '50+', label: 'Years combined experience' },
  { number: '15+', label: 'Technologies mastered' },
  { number: '100%', label: 'Client satisfaction' },
  { number: '24/7', label: 'Support available' },
]

const values = [
  {
    icon: Code,
    title: 'Continuous learning',
    description:
      'We stay ahead of technology trends through continuous learning and professional development.',
  },
  {
    icon: Shield,
    title: 'Quality first',
    description:
      'Every project undergoes rigorous testing and quality assurance to ensure excellence.',
  },
  {
    icon: Zap,
    title: 'Innovation driven',
    description: 'We embrace new technologies and methodologies to deliver cutting-edge solutions.',
  },
]

const reasons = [
  'Full-stack development capabilities',
  'Agile development methodology',
  '24/7 support and maintenance',
  'Competitive pricing and transparent billing',
]

export default function About() {
  return (
    <section id="about" className="relative isolate overflow-hidden bg-ink-950 section-padding">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full bg-primary-600/20 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 h-[26rem] w-[26rem] rounded-full bg-accent-500/10 blur-[120px]" />
      </div>

      <div className="container-max">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              dark
              align="left"
              eyebrow="Why AstraLoom"
              title={
                <>
                  An expert team that treats your product{' '}
                  <span className="gradient-text-light">like our own</span>
                </>
              }
              description="Our diverse team of skilled professionals brings together decades of experience across multiple technologies and industries to deliver exceptional results."
            />

            <ul className="space-y-3">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-center gap-3 text-ink-200">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-400/15 ring-1 ring-accent-300/30">
                    <Check className="h-3.5 w-3.5 text-accent-300" />
                  </span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="flex flex-col-reverse bg-ink-950 p-6 sm:p-8"
                >
                  <dt className="mt-2 text-sm text-ink-400">{stat.label}</dt>
                  <dd className="font-display text-4xl font-semibold text-white sm:text-5xl">
                    {stat.number}
                  </dd>
                </motion.div>
              ))}
            </dl>

            <div className="grid gap-4 sm:grid-cols-3">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <value.icon className="h-5 w-5 text-accent-300" />
                  <h3 className="mt-4 text-base font-semibold text-white">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-gradient-to-r from-primary-600/20 to-accent-500/10 p-8 sm:flex-row sm:items-center lg:p-10"
        >
          <div>
            <h3 className="text-xl font-semibold text-white sm:text-2xl">Want to build with us?</h3>
            <p className="mt-2 text-ink-300">
              We&apos;re always looking for talented engineers, designers and project managers.
            </p>
          </div>
          <Link to="/register" className="btn-light shrink-0 group">
            Join our team
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
