import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CircleCheck, Clock, Loader2, Mail, MapPin, Phone } from 'lucide-react'
import { createContact } from '../api/client'
import { company } from '../data/company'
import SectionHeading from './SectionHeading'

const contactInfo = [
  { icon: Mail, title: 'Email', lines: [company.email], href: `mailto:${company.email}` },
  { icon: Phone, title: 'Phone', lines: [company.phone], href: company.phoneHref },
  { icon: MapPin, title: 'Office', lines: company.address },
  { icon: Clock, title: 'Business hours', lines: company.hours },
]

const projectTypes = [
  'Web Application',
  'Mobile App',
  'E-commerce Platform',
  'Cloud Migration',
  'API Development',
  'Database Design',
  'DevOps Setup',
  'Security Audit',
  'Other',
]

const budgets = [
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000 - $250,000',
  '$250,000+',
  'Not sure yet',
]

const initialForm = {
  name: '',
  email: '',
  company: '',
  project: '',
  budget: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      await createContact(form)
      setSubmitted(true)
      setForm(initialForm)
    } catch (err) {
      console.error('Contact form submission error:', err)
      setError(
        `Sorry, we couldn't send your message. Please try again or email us at ${company.email}.`,
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding bg-ink-50">
      <div className="container-max">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Contact"
              title={
                <>
                  Let&apos;s build something <span className="gradient-text">great together</span>
                </>
              }
              description="Tell us about your project and we'll get back to you within 24 hours with next steps."
            />

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contactInfo.map((item) => {
                const content = (
                  <>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary-600 shadow-sm ring-1 ring-ink-100">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink-950">{item.title}</p>
                      {item.lines.map((line) => (
                        <p key={line} className="text-sm leading-relaxed text-ink-500">
                          {line}
                        </p>
                      ))}
                    </div>
                  </>
                )
                return (
                  <li key={item.title}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-start gap-4 rounded-xl p-2 -m-2 transition-colors hover:bg-white"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-start gap-4">{content}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-80px' }}
            className="rounded-3xl border border-ink-100 bg-white p-6 shadow-[0_30px_80px_-40px_rgb(12_18_48/0.35)] sm:p-10"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[28rem] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/50">
                    <CircleCheck className="h-8 w-8 text-emerald-500" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-ink-950">Thank you!</h3>
                  <p className="mt-2 max-w-sm text-ink-500">
                    We&apos;ve received your message and will get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary mt-8"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-ink-950">Start your project</h3>
                    <p className="mt-1 text-sm text-ink-500">Fields marked * are required.</p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="field-label">
                        Full name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={form.name}
                        onChange={onChange}
                        className="field"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="field-label">
                        Work email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={form.email}
                        onChange={onChange}
                        className="field"
                        placeholder="jane@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="field-label">
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={form.company}
                      onChange={onChange}
                      className="field"
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="project" className="field-label">
                        Project type *
                      </label>
                      <select
                        id="project"
                        name="project"
                        required
                        value={form.project}
                        onChange={onChange}
                        className="field"
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="field-label">
                        Budget range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={form.budget}
                        onChange={onChange}
                        className="field"
                      >
                        <option value="">Select budget range</option>
                        {budgets.map((budget) => (
                          <option key={budget} value={budget}>
                            {budget}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="field-label">
                      Project details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={onChange}
                      className="field resize-none"
                      placeholder="Tell us about your goals, timeline and any specific requirements..."
                    />
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary group w-full py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
