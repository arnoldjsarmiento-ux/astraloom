import { motion } from 'framer-motion'
import { Code, Compass, PenTool, Rocket } from 'lucide-react'
import SectionHeading from './SectionHeading'

const steps = [
  {
    icon: Compass,
    title: 'Discover',
    description:
      'We dig into your goals, users and constraints to agree on scope, priorities and what success looks like.',
  },
  {
    icon: PenTool,
    title: 'Design',
    description:
      'Wireframes, prototypes and architecture are reviewed with you before production code is written.',
  },
  {
    icon: Code,
    title: 'Build',
    description:
      'Agile sprints with regular demos, code reviews and automated testing keep quality high and progress visible.',
  },
  {
    icon: Rocket,
    title: 'Launch & support',
    description:
      'We deploy, monitor and keep improving your product, with ongoing maintenance and 24/7 support.',
  },
]

export default function Process() {
  return (
    <section id="process" className="section-padding bg-ink-50">
      <div className="container-max">
        <SectionHeading
          eyebrow="How we work"
          title="A clear process, from first call to launch day"
          description="No black boxes. You see the plan, the progress and the product at every step."
        />

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[2.75rem] hidden h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent lg:block"
          />
          <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-60px' }}
                className="relative rounded-2xl border border-ink-100 bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-100">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-sm font-semibold text-ink-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-ink-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
