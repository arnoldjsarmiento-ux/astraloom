import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Clock, Users } from 'lucide-react'
import { GitHubIcon } from './icons'
import { getProjects } from '../api/client'
import { useAsyncData } from '../hooks/useAsyncData'
import projectsFallback from '../data/projects.json'
import SectionHeading from './SectionHeading'

const MAX_TAGS = 4

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')

  const { data: projects } = useAsyncData(async () => {
    const items = await getProjects({ status: 'published', limit: 100 })
    return items.length ? items : null
  }, projectsFallback.data)

  // Only offer filters that match at least one project
  const categories = useMemo(
    () => ['All', ...new Set(projects.map((project) => project.category).filter(Boolean))],
    [projects],
  )

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return projects
    return projects.filter((project) => project.category === activeCategory)
  }, [projects, activeCategory])

  return (
    <section id="portfolio" className="section-padding bg-white">
      <div className="container-max">
        <div className="mb-12 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            flush
            align="left"
            eyebrow="Selected work"
            title={
              <>
                Products we&apos;ve <span className="gradient-text">helped build</span>
              </>
            }
            description="A selection of web platforms, mobile apps and websites we've delivered for our clients."
          />

          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="inline-flex max-w-full shrink-0 self-start overflow-x-auto rounded-xl border border-ink-100 bg-ink-50 p-1 lg:self-auto"
          >
            {categories.map((category) => {
              const active = activeCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(category)}
                  className={`relative whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    active ? 'text-ink-950' : 'text-ink-500 hover:text-ink-800'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="portfolio-tab"
                      className="absolute inset-0 rounded-lg bg-white shadow-sm ring-1 ring-ink-100"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{category}</span>
                </button>
              )
            })}
          </div>
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => {
              const tags = project.technologies || []
              return (
                <motion.article
                  layout
                  key={project.id || project.title}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white transition-shadow duration-300 hover:shadow-[0_24px_60px_-24px_rgb(12_18_48/0.25)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
                    <img
                      src={project.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-800 backdrop-blur">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    {project.client && (
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                        {project.client}
                      </p>
                    )}
                    <h3 className="mt-2 text-lg font-semibold leading-snug text-ink-950">
                      {project.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-500">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {tags.slice(0, MAX_TAGS).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-ink-50 px-2 py-1 text-xs font-medium text-ink-600 ring-1 ring-ink-100"
                        >
                          {tech}
                        </span>
                      ))}
                      {tags.length > MAX_TAGS && (
                        <span className="rounded-md px-2 py-1 text-xs font-medium text-ink-400">
                          +{tags.length - MAX_TAGS}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto pt-6">
                      <div className="flex items-center justify-between gap-4 border-t border-ink-100 pt-5">
                        <div className="flex items-center gap-4 text-xs text-ink-500">
                          {project.duration && (
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              {project.duration}
                            </span>
                          )}
                          {project.teamSize && (
                            <span className="inline-flex items-center gap-1.5">
                              <Users className="h-3.5 w-3.5" />
                              {project.teamSize} people
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg p-2 text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-950"
                              aria-label={`${project.title} source code`}
                            >
                              <GitHubIcon className="h-4 w-4" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50"
                              aria-label={`Visit ${project.title}`}
                            >
                              Visit
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
