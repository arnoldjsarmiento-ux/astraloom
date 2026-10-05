import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Code, Smartphone, Cloud, Database, Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-max">
        <div className="flex items-center justify-between h-16 px-4">
          <a href="#home" className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Code className="h-8 w-8 text-primary-600" />
              <Smartphone className="h-6 w-6 text-primary-500" />
              <Cloud className="h-6 w-6 text-primary-400" />
              <Database className="h-6 w-6 text-primary-300" />
            </div>
            <span className="text-xl font-bold gradient-text">Vynix</span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/register"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Join Team
            </Link>
            <Link
              to="/admin"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Admin
            </Link>
            <button type="button" className="btn-primary" onClick={scrollToContact}>
              Get Started
            </button>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden px-4 pb-4 bg-white/95 backdrop-blur-sm border-t border-gray-100">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/register"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              Join Team
            </Link>
            <Link
              to="/admin"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              Admin
            </Link>
            <button type="button" className="btn-primary w-full mt-2" onClick={scrollToContact}>
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
