import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle,
  Code,
  Cloud,
  Database,
  Shield,
  Smartphone,
  Zap,
} from 'lucide-react'
import { getHeroContent } from '../api/client'
import { useAsyncData } from '../hooks/useAsyncData'
import heroFallback from '../data/hero.json'

const techExpertise = [
  { icon: Code, label: 'Web Development' },
  { icon: Smartphone, label: 'Mobile Apps' },
  { icon: Cloud, label: 'Cloud Solutions' },
  { icon: Database, label: 'Database Design' },
]

const stats = [
  { number: '150+', label: 'Projects Delivered' },
  { number: '50+', label: 'Happy Clients' },
  { number: '5+', label: 'Years Experience' },
  { number: '24/7', label: 'Support' },
]

const pattern =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"

function normalizeLink(link, fallback) {
  if (!link) return fallback
  if (link === '/contact' || link === '/#contact') return '#contact'
  if (link === '/#portfolio' || link === '/portfolio') return '#portfolio'
  return link
}

export default function Hero() {
  const { data, loading, error } = useAsyncData(async () => {
    try {
      const items = await getHeroContent()
      return items[0] || heroFallback.data[0]
    } catch {
      return heroFallback.data[0]
    }
  }, [])

  if (loading) {
    return (
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </section>
    )
  }

  if (error && !data) {
    return (
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50"
      >
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load hero content</p>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </section>
    )
  }

  const hero = data

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50"
      style={{
        backgroundImage: hero.backgroundImage ? `url(${hero.backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-white/80" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: pattern }} />
      </div>

      <div className="container-max section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              {hero.title}
              <span className="gradient-text block">{hero.subtitle}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href={normalizeLink(hero.primaryButton?.link, '#contact')}
                className="btn-primary flex items-center justify-center group"
              >
                {hero.primaryButton?.text || 'Get Started'}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={normalizeLink(hero.secondaryButton?.link, '#portfolio')}
                className="btn-secondary text-center"
              >
                {hero.secondaryButton?.text || 'View Portfolio'}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary-100 to-secondary-200 rounded-full translate-y-12 -translate-x-12" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Tech Expertise</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {techExpertise.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + 0.1 * index }}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                    >
                      <item.icon className="h-6 w-6 text-primary-600" />
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm text-gray-600">Lightning-fast development</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-600">Enterprise-grade security</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Expert team collaboration</span>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Code className="h-8 w-8 text-white" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Cloud className="h-6 w-6 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
