import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import Logo from './Logo'

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Work', href: '#portfolio' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || mobileOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-white/90 backdrop-blur-lg shadow-[0_1px_0_0_rgb(12_18_48/0.08)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-max flex h-[4.5rem] items-center justify-between px-5 sm:px-6 lg:px-8">
        <a href="#home" aria-label="AstraLoom home">
          <Logo variant={solid ? 'dark' : 'light'} />
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                solid
                  ? 'text-ink-600 hover:text-ink-950 hover:bg-ink-50'
                  : 'text-ink-200 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/register"
            className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
              solid ? 'text-ink-600 hover:text-ink-950' : 'text-ink-200 hover:text-white'
            }`}
          >
            Careers
          </Link>
          <a href="#contact" className="btn-primary py-2.5 px-4 text-sm">
            Start a project
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <button
          type="button"
          className={`lg:hidden -mr-2 rounded-lg p-2 transition-colors ${
            solid ? 'text-ink-900 hover:bg-ink-50' : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-ink-100 bg-white"
          >
            <div className="px-5 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-ink-700 hover:bg-ink-50 hover:text-ink-950"
                >
                  {link.name}
                </a>
              ))}
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-medium text-ink-700 hover:bg-ink-50 hover:text-ink-950"
              >
                Careers
              </Link>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full mt-3"
              >
                Start a project
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
