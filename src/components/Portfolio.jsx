import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Code,
  Cloud,
  Database,
  ExternalLink,
  Smartphone,
} from 'lucide-react'
import { GitHubIcon } from './icons'
import { getProjects } from '../api/client'
import { useAsyncData } from '../hooks/useAsyncData'
import projectsFallback from '../data/projects.json'

const categories = [
  'All',
  'Web Application',
  'Mobile App',
  'Data Analytics',
  'Cloud Solutions',
  'IoT Solutions',
]

const categoryIcons = {
  'Web Application': Code,
  'Mobile App': Smartphone,
  'Data Analytics': Database,
  'Cloud Solutions': Cloud,
  'IoT Solutions': Cloud,
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')

  const { data, loading, error } = useAsyncData(async () => {
    try {
      return await getProjects({ status: 'published', limit: 100 })
    } catch {
      return projectsFallback.data
    }
  }, [])

  const projects = data?.length ? data : projectsFallback.data

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return projects
    return projects.filter((project) => project.category === activeCategory)
  }, [projects, activeCategory])

  if (loading) {
    return (
      <section id="portfolio" className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error && (!data || data.length === 0)) {
    return (
      <section id="portfolio" className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <p className="text-red-600 mb-4">Failed to load projects</p>
            <p className="text-gray-600">Please try again later</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our diverse portfolio of successful projects across various industries and
            technologies. Each project represents our commitment to excellence and innovation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filtered.map((project) => {
            const CategoryIcon = categoryIcons[project.category] || Code
            return (
              <motion.div
                key={project.id || project.title}
                variants={cardVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full text-white text-sm font-medium">
                      <CategoryIcon className="h-4 w-4" />
                      <span>{project.category}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          aria-label="Live site"
                        >
                          <ExternalLink className="h-4 w-4 text-white" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          aria-label="GitHub"
                        >
                          <GitHubIcon className="h-4 w-4 text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
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
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Next Project?
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Let&apos;s discuss how we can bring your vision to life with cutting-edge technology
              and expert development practices.
            </p>
            <a
              href="#contact"
              className="inline-block bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Get Started Today
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
