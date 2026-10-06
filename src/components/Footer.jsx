import { motion } from 'framer-motion'
import {
  Code,
  Cloud,
  Database,
  Mail,
  MapPin,
  Phone,
  Smartphone,
  X,
} from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from './icons'

const services = [
  'Web Development',
  'Mobile Apps',
  'Cloud Solutions',
  'Database Design',
  'DevOps',
  'Security',
]

const technologies = ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB']

const company = [
  { name: 'About Us', href: '#about-us' },
  { name: 'Our Team', href: '#our-team' },
  { name: 'Careers', href: '#careers' },
  { name: 'Blog', href: '#blog' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max">
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex items-center space-x-1">
                    <img
                      src="/logo_ft.png"
                      alt="AstraLoom"
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                </div>
                <p className="text-gray-300 mb-6 max-w-md">
                  Premier IT development agency specializing in cutting-edge web applications,
                  mobile solutions, cloud infrastructure, and digital transformation services.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="p-2 bg-gray-800 hover:bg-primary-600 rounded-lg transition-colors duration-200 group"
                    aria-label="GitHub"
                  >
                    <GitHubIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-gray-800 hover:bg-primary-600 rounded-lg transition-colors duration-200 group"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-gray-800 hover:bg-primary-600 rounded-lg transition-colors duration-200 group"
                    aria-label="Twitter"
                  >
                    <X className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="mailto:hello@astraloom.com"
                    className="p-2 bg-gray-800 hover:bg-primary-600 rounded-lg transition-colors duration-200 group"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-4">Services</h3>
                <ul className="space-y-2">
                  {services.map((item) => (
                    <li key={item}>
                      <a
                        href="#services"
                        className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-4">Technologies</h3>
                <ul className="space-y-2">
                  {technologies.map((item) => (
                    <li key={item}>
                      <span className="text-gray-300 hover:text-primary-400 transition-colors duration-200 cursor-pointer">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  {company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-gray-800"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">125 Rizal Ave. Ext. cor. Leoño St.</p>
                  <p className="text-gray-300">Barangay Tañong, Malabon City, 1470 Metro Manila, Philippines</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">+63 (970) 882-0393</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">hello@astraloom.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-6 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 AstraLoom  Innovations. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#privacy"
                className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#cookies"
                className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
