import { motion } from 'framer-motion'
import { Code, Shield, Zap } from 'lucide-react'
import { getTeamMembers } from '../api/client'
import { useAsyncData } from '../hooks/useAsyncData'

const stats = [
  { number: '50+', label: 'Years Combined Experience' },
  { number: '15+', label: 'Technologies Mastered' },
  { number: '100%', label: 'Client Satisfaction' },
  { number: '24/7', label: 'Support Available' },
]

const culture = [
  {
    icon: Code,
    title: 'Continuous Learning',
    description:
      'We stay ahead of technology trends through continuous learning and professional development.',
    bg: 'bg-blue-100',
    color: 'text-blue-600',
  },
  {
    icon: Shield,
    title: 'Quality First',
    description:
      'Every project undergoes rigorous testing and quality assurance to ensure excellence.',
    bg: 'bg-green-100',
    color: 'text-green-600',
  },
  {
    icon: Zap,
    title: 'Innovation Driven',
    description:
      'We embrace new technologies and methodologies to deliver cutting-edge solutions.',
    bg: 'bg-purple-100',
    color: 'text-purple-600',
  },
]

export default function Team() {
  const { loading } = useAsyncData(async () => {
    try {
      return await getTeamMembers({ status: 'active' })
    } catch {
      // Live /api/team currently returns 500; culture content still renders
      return []
    }
  }, [])

  if (loading) {
    return (
      <section id="team" className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading team members...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="team" className="section-padding bg-gray-50">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our <span className="gradient-text">Expert Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our diverse team of skilled professionals brings together decades of experience across
            multiple technologies and industries to deliver exceptional results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Team Culture</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We believe in fostering a collaborative environment where innovation thrives and every
              team member can contribute their unique expertise.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {culture.map((item) => (
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
