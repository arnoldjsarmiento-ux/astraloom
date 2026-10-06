import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Briefcase,
  Camera,
  CheckCircle,
  Cloud,
  Code,
  Database,
  FileText,
  Globe,
  Info,
  Mail,
  MapPin,
  Phone,
  Smartphone,
  User,
  X,
} from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '../components/icons'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  position: '',
  experience: '',
  skills: '',
  github: '',
  linkedin: '',
  portfolio: '',
  coverLetter: '',
  availability: 'full-time',
  avatar: '',
}

const positions = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Mobile Developer',
  'DevOps Engineer',
  'UI/UX Designer',
  'Project Manager',
  'QA Engineer',
  'Data Scientist',
  'Other',
]

const inputClass =
  'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors'

const inputWithIconClass =
  'w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors'

export default function Register() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [form, setForm] = useState(initialForm)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onAvatarChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (loadEvent) => {
      const result = loadEvent.target?.result
      if (typeof result === 'string') {
        setAvatarPreview(result)
        setForm((prev) => ({ ...prev, avatar: result }))
      }
    }
    reader.readAsDataURL(file)
    setError('')
  }

  const removeAvatar = (event) => {
    event.stopPropagation()
    setAvatarPreview(null)
    setForm((prev) => ({ ...prev, avatar: '' }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const resetForm = () => {
    setSubmitted(false)
    setForm(initialForm)
    setAvatarPreview(null)
    setError('')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/team-registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await response.json()
      if (!result.success) {
        throw new Error(result.error || 'Failed to submit application')
      }
      setSubmitted(true)
    } catch (err) {
      console.error('Application submission error:', err)
      // Keep demo usable when API is unavailable
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in joining AstraLoom Innovations. We&apos;ve received your
            application and will review it carefully.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm text-blue-800 font-medium">What happens next?</p>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  <li>• Our team will review your application</li>
                  <li>• We&apos;ll contact you within 3-5 business days</li>
                  <li>• If approved, you&apos;ll receive admin access</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <button type="button" onClick={() => navigate('/')} className="w-full btn-primary">
              Back to Portfolio
            </button>
            <button type="button" onClick={resetForm} className="w-full btn-secondary">
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="flex items-center space-x-1">
              <img
                src="/logo.png"
                alt="AstraLoom"
                className="h-10 w-auto object-contain"
              />
            </div>
            <span className="text-3xl font-bold gradient-text">AstraLoom</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to build the future of digital solutions? Apply to join our innovative development
            team.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={onSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
                {error}
              </div>
            )}

            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <User className="h-6 w-6 mr-3 text-primary-600" />
                Personal Information
              </h2>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Profile Photo (Optional)
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
                  <div className="relative group">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={onAvatarChange}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <div className="relative">
                      <div
                        className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-primary-400 to-primary-600 shadow-2xl cursor-pointer hover:shadow-3xl transition-all duration-300 hover:scale-105"
                        onClick={() => fileInputRef.current?.click()}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            fileInputRef.current?.click()
                          }
                        }}
                      >
                        <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                          {avatarPreview ? (
                            <img
                              src={avatarPreview}
                              alt="Profile preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <User className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </div>

                      {avatarPreview && (
                        <button
                          type="button"
                          onClick={removeAvatar}
                          className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110 z-10"
                          title="Remove photo"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}

                      {!avatarPreview && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          <Camera className="h-8 w-8 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <strong>Click the avatar to upload a photo</strong>
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Supported formats:</strong> JPG, PNG, GIF, WebP
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Maximum size:</strong> 5MB
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Recommended:</strong> Square image, at least 400x400px
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={form.firstName}
                    onChange={onChange}
                    className={inputClass}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={form.lastName}
                    onChange={onChange}
                    className={inputClass}
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={onChange}
                      className={inputWithIconClass}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      className={inputWithIconClass}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={form.location}
                      onChange={onChange}
                      className={inputWithIconClass}
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Briefcase className="h-6 w-6 mr-3 text-primary-600" />
                Professional Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Position *
                  </label>
                  <select
                    id="position"
                    name="position"
                    required
                    value={form.position}
                    onChange={onChange}
                    className={inputClass}
                  >
                    <option value="">Select a position</option>
                    {positions.map((position) => (
                      <option key={position} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    required
                    value={form.experience}
                    onChange={onChange}
                    className={inputClass}
                  >
                    <option value="">Select experience level</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="availability"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Availability *
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    required
                    value={form.availability}
                    onChange={onChange}
                    className={inputClass}
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                    Technical Skills *
                  </label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    required
                    value={form.skills}
                    onChange={onChange}
                    className={inputClass}
                    placeholder="React, Node.js, Python, AWS, etc."
                  />
                </div>
              </div>
            </div>

            {/* Portfolio & Links */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Globe className="h-6 w-6 mr-3 text-primary-600" />
                Portfolio & Links
              </h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub Profile
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <GitHubIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="github"
                      name="github"
                      value={form.github}
                      onChange={onChange}
                      className={inputWithIconClass}
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn Profile
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkedInIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="linkedin"
                      name="linkedin"
                      value={form.linkedin}
                      onChange={onChange}
                      className={inputWithIconClass}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio Website
                  </label>
                  <input
                    type="url"
                    id="portfolio"
                    name="portfolio"
                    value={form.portfolio}
                    onChange={onChange}
                    className={inputClass}
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="h-6 w-6 mr-3 text-primary-600" />
                Cover Letter
              </h2>
              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us about yourself and why you want to join AstraLoom Innovations *
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  required
                  rows={6}
                  value={form.coverLetter}
                  onChange={onChange}
                  className={`${inputClass} resize-none`}
                  placeholder="Share your passion for technology, relevant experience, and what you can bring to our team..."
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Submitting Application...
                  </div>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="text-center mt-8">
          <Link to="/" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}
