import { motion } from 'framer-motion'
import {
  Code,
  Cloud,
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const stackCoverage = [
  {
    icon: Monitor,
    title: 'Frontend',
    description: 'React, Vue, Angular, TypeScript',
    bg: 'bg-blue-100',
    color: 'text-blue-600',
  },
  {
    icon: Server,
    title: 'Backend',
    description: 'Node.js, Python, Java, PHP',
    bg: 'bg-green-100',
    color: 'text-green-600',
  },
  {
    icon: Smartphone,
    title: 'Mobile',
    description: 'React Native, Flutter',
    bg: 'bg-purple-100',
    color: 'text-purple-600',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'AWS, Azure, Docker, K8s',
    bg: 'bg-orange-100',
    color: 'text-orange-600',
  },
]

function resolveIcon(name) {
  return iconMap[name] || Code
}

export default function Services() {
  const { data, loading, error } = useAsyncData(async () => {
    try {
      return await getServices({ isActive: true })
    } catch {
      return servicesFallback.data
    }
  }, [])

  if (loading) {
    return (
      <section id="services" className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading services...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error && (!data || data.length === 0)) {
    return (
      <section id="services" className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center">
            <p className="text-red-600 mb-4">Failed to load services</p>
            <p className="text-gray-600">Please try again later</p>
          </div>
        </div>
      </section>
    )
  }

  const services = data?.length ? data : servicesFallback.data

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive IT development services covering every aspect of modern software
            development, from frontend to backend, mobile to cloud, and everything in between.
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {services.map((service) => {
            const Icon = resolveIcon(typeof service.icon === 'string' ? service.icon : 'Code')
            return (
              <motion.div
                key={service.id || service.title}
                variants={cardVariants}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Technologies:</h4>
                  <div className="flex flex-wrap gap-1">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md hover:bg-primary-100 hover:text-primary-600 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Complete Tech Stack Coverage</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We stay current with the latest technologies and frameworks to deliver cutting-edge
              solutions that meet modern business requirements.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stackCoverage.map((item) => (
              <div key={item.title} className="text-center">
                <div
                  className={`w-16 h-16 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <item.icon className={`h-8 w-8 ${item.color}`} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
