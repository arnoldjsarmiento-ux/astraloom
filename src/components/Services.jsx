import { motion } from 'framer-motion'
import {
  Check,
  Cloud,
  Code,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Monitor,
  Server,
  Shield,
  Smartphone,
  Users,
  Zap,
} from 'lucide-react'
import { getServices } from '../api/client'
import { useAsyncData } from '../hooks/useAsyncData'
import servicesFallback from '../data/services.json'
import SectionHeading from './SectionHeading'

const iconMap = {
  Code,
  Smartphone,
  Cloud,
  Database,
  Globe,
  Shield,
  Zap,
  Users,
  Cpu,
  GitBranch,
  Monitor,
  Server,
}

export default function Services() {
  const { data } = useAsyncData(async () => {
    const services = await getServices({ isActive: true })
    return services.length ? services : null
  }, servicesFallback.data)

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-max">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              End-to-end engineering for <span className="gradient-text">every layer</span> of
              your product
            </>
          }
          description="From the first interface your customers see to the infrastructure that keeps it running — one team, accountable for the whole stack."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((service, index) => {
            const Icon = iconMap[service.icon] || Code
            return (
              <motion.article
                key={service.id || service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
                viewport={{ once: true, margin: '-60px' }}
                className="group relative flex flex-col rounded-2xl border border-ink-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-[0_20px_50px_-20px_rgb(75_70_229/0.25)]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 text-white shadow-lg shadow-primary-600/20 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-ink-950">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{service.description}</p>
                {service.features?.length > 0 && (
                  <ul className="mt-5 space-y-2 border-t border-ink-100 pt-5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-ink-600">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
