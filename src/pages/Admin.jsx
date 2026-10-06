import { Link } from 'react-router-dom'
import { ArrowLeft, Code, Cloud, Database, Lock, Smartphone } from 'lucide-react'

export default function Admin() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container-max section-padding py-20">
        <Link
          to="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex items-center space-x-1">
              <img
                src="/logo.png"
                alt="AstraLoom"
                className="h-10 w-auto object-contain"
              />
            </div>
            <span className="text-xl font-bold gradient-text">AstraLoom</span>
          </div>

          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
              <p className="text-sm text-gray-600">Sign in to manage site content</p>
            </div>
          </div>

          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault()
              alert('Admin dashboard will be available when the backend is connected.')
            }}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="admin@astraloom.pro"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full btn-primary">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
