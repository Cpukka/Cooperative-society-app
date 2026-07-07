// app/auth/register/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Building2, Mail, Lock, User, Phone, Calendar, 
  MapPin, Briefcase, Users, AlertCircle, Loader2, Eye, EyeOff 
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    dateOfBirth: '',
    
    // Step 2: Member Details
    occupation: '',
    monthlyIncome: '',
    address: '',
    city: '',
    state: '',
    emergencyContact: '',
    relationship: 'Spouse',
    
    // Agreement
    agreeToTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const validateStep1 = () => {
    const errors = []

    if (!formData.email) errors.push('Email is required')
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.push('Email is invalid')

    if (!formData.password) errors.push('Password is required')
    else if (formData.password.length < 8) errors.push('Password must be at least 8 characters')

    if (formData.password !== formData.confirmPassword) errors.push('Passwords do not match')

    if (!formData.name) errors.push('Full name is required')

    if (!formData.phone) errors.push('Phone number is required')

    if (!formData.dateOfBirth) errors.push('Date of birth is required')
    else {
      const dob = new Date(formData.dateOfBirth)
      const age = new Date().getFullYear() - dob.getFullYear()
      if (age < 18) errors.push('You must be at least 18 years old')
    }

    return errors
  }

  const validateStep2 = () => {
    const errors = []

    if (!formData.occupation) errors.push('Occupation is required')
    if (!formData.monthlyIncome) errors.push('Monthly income is required')
    if (!formData.address) errors.push('Address is required')
    if (!formData.city) errors.push('City is required')
    if (!formData.state) errors.push('State is required')
    if (!formData.emergencyContact) errors.push('Emergency contact is required')
    if (!formData.relationship) errors.push('Relationship is required')

    return errors
  }

  const handleNextStep = () => {
    if (step === 1) {
      const errors = validateStep1()
      if (errors.length > 0) {
        setError(errors.join(', '))
        return
      }
    } else if (step === 2) {
      const errors = validateStep2()
      if (errors.length > 0) {
        setError(errors.join(', '))
        return
      }
    }
    
    setError('')
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Register API call
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          occupation: formData.occupation,
          monthlyIncome: parseFloat(formData.monthlyIncome),
          address: formData.address,
          city: formData.city,
          state: formData.state,
          emergencyContact: formData.emergencyContact,
          relationship: formData.relationship,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      // Redirect to login page with success message
      router.push('/auth/signin?registered=true')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  const relationshipOptions = [
    { value: 'Spouse', label: 'Spouse' },
    { value: 'Parent', label: 'Parent' },
    { value: 'Sibling', label: 'Sibling' },
    { value: 'Child', label: 'Child' },
    { value: 'Friend', label: 'Friend' },
    { value: 'Other', label: 'Other' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-violet-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            CooperativePro
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Register for a cooperative membership
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  stepNumber === step
                    ? 'bg-blue-600 text-white'
                    : stepNumber < step
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    stepNumber < step ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <Input
                      name="name"
                      placeholder="John Doe"
                      icon={<User className="w-5 h-5" />}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      icon={<Mail className="w-5 h-5" />}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      name="phone"
                      placeholder="+1 234 567 8900"
                      icon={<Phone className="w-5 h-5" />}
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date of Birth *
                    </label>
                    <Input
                      name="dateOfBirth"
                      type="date"
                      icon={<Calendar className="w-5 h-5" />}
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="At least 8 characters"
                        icon={<Lock className="w-5 h-5" />}
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        icon={<Lock className="w-5 h-5" />}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Member Details */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Member Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Occupation *
                    </label>
                    <Input
                      name="occupation"
                      placeholder="Teacher, Engineer, etc."
                      icon={<Briefcase className="w-5 h-5" />}
                      value={formData.occupation}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Monthly Income *
                    </label>
                    <Input
                      name="monthlyIncome"
                      type="number"
                      placeholder="50000"
                      icon={<span className="text-sm">$</span>}
                      value={formData.monthlyIncome}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address *
                    </label>
                    <Input
                      name="address"
                      placeholder="123 Main Street"
                      icon={<MapPin className="w-5 h-5" />}
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City *
                    </label>
                    <Input
                      name="city"
                      placeholder="Nairobi"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      State *
                    </label>
                    <Input
                      name="state"
                      placeholder="Nairobi County"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Emergency Contact *
                    </label>
                    <Input
                      name="emergencyContact"
                      placeholder="+1 234 567 8900"
                      icon={<Users className="w-5 h-5" />}
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Relationship *
                    </label>
                    <Select
                      name="relationship"
                      options={relationshipOptions}
                      value={formData.relationship}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Agreement */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Terms & Conditions
                </h2>

                <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg max-h-60 overflow-y-auto">
                  <h3 className="font-bold text-lg mb-4">Cooperative Membership Agreement</h3>
                  
                  <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                      By registering as a member of our cooperative, you agree to:
                    </p>
                    
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Make regular monthly contributions as agreed</li>
                      <li>Attend general meetings when possible</li>
                      <li>Follow cooperative bylaws and regulations</li>
                      <li>Maintain active membership status</li>
                      <li>Provide accurate personal information</li>
                      <li>Participate in cooperative activities</li>
                    </ul>

                    <p>
                      Membership fees and contributions are non-refundable. The cooperative 
                      reserves the right to suspend or terminate membership for violation 
                      of terms.
                    </p>

                    <p>
                      All personal information will be kept confidential and used only 
                      for cooperative purposes as outlined in our Privacy Policy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
                    required
                  />
                  <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                    I have read and agree to the Terms & Conditions, Privacy Policy, 
                    and Cooperative Bylaws.
                  </label>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Note:</strong> Your application will be reviewed by the 
                    cooperative committee. You will receive an email once your membership 
                    is approved. This process may take 2-3 business days.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={isLoading}
                >
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  disabled={isLoading}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading || !formData.agreeToTerms}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Registering...
                    </>
                  ) : (
                    'Complete Registration'
                  )}
                </Button>
              )}
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                href="/auth/signin"
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Need help? Contact us at{' '}
            <a href="mailto:support@cooperative.org" className="underline">
              support@cooperative.org
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}