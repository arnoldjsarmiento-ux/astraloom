import { Link } from 'react-router-dom'
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react'
import { company } from '../data/company'
import Logo from './Logo'

const services = [
  'Web Development',
  'Mobile Apps',
  'Cloud Solutions',
  'Database Design',
  'Security & Compliance',
  'Team Augmentation',
]

const companyLinks = [
  { name: 'About', href: '#about' },
  { name: 'Our Process', href: '#process' },
  { name: 'Selected Work', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
]

const linkClass = 'text-sm text-ink-400 transition-colors hover:text-white'

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-white">
      <div className="container-max px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-400">
              Premier IT development agency specializing in cutting-edge web applications, mobile
              solutions, cloud infrastructure, and digital transformation services.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Services</h3>
            <ul className="mt-5 space-y-3">
              {services.map((item) => (
                <li key={item}>
                  <a href="#services" className={linkClass}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className={linkClass}>
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/register" className={linkClass}>
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Get in touch</h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a href={`mailto:${company.email}`} className={`${linkClass} flex gap-3`}>
                  <Mail className="h-4 w-4 shrink-0 translate-y-0.5 text-accent-300" />
                  {company.email}
                </a>
              </li>
              <li>
                <a href={company.phoneHref} className={`${linkClass} flex gap-3`}>
                  <Phone className="h-4 w-4 shrink-0 translate-y-0.5 text-accent-300" />
                  {company.phone}
                </a>
              </li>
              <li className="flex gap-3 text-sm text-ink-400">
                <MapPin className="h-4 w-4 shrink-0 translate-y-0.5 text-accent-300" />
                <span>
                  {company.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 sm:flex-row">
          <p className="text-sm text-ink-500">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <a href="#home" className={`${linkClass} inline-flex items-center gap-2`}>
            Back to top
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
