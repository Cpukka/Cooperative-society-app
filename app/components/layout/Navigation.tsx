// app/components/layout/Navigation.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { 
  Home, Users, DollarSign, HandCoins, Calendar, 
  FileText, Settings, Menu, X, Building2,
  ChevronDown, Bell, Search, LogOut, User as UserIcon,
  Shield, Lock, TrendingUp, Award
} from 'lucide-react'
import { ThemeToggle } from '../ui/ThemeToggle'
import { cn } from '../../../lib/classNames'
import { Button } from '../ui/Button'
import { signOut } from 'next-auth/react'

const navItems = [
  { name: 'Dashboard', href: '/', icon: Home, roles: ['SUPER_ADMIN', 'ADMIN', 'FINANCE_OFFICER', 'LOAN_OFFICER', 'MEMBER'] },
  { name: 'Members', href: '/members', icon: Users, roles: ['SUPER_ADMIN', 'ADMIN', 'FINANCE_OFFICER', 'LOAN_OFFICER'] },
  { name: 'Contributions', href: '/contributions', icon: DollarSign, roles: ['SUPER_ADMIN', 'ADMIN', 'FINANCE_OFFICER', 'MEMBER'] },
  { name: 'Loans', href: '/loans', icon: HandCoins, roles: ['SUPER_ADMIN', 'ADMIN', 'LOAN_OFFICER', 'MEMBER'] },
  { name: 'Meetings', href: '/meetings', icon: Calendar, roles: ['SUPER_ADMIN', 'ADMIN', 'MEMBER'] },
  { name: 'Reports', href: '/reports', icon: FileText, roles: ['SUPER_ADMIN', 'ADMIN', 'FINANCE_OFFICER'] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: ['SUPER_ADMIN', 'ADMIN'] },
]

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'SUPER_ADMIN':
      return <Shield className="w-3 h-3 text-red-500" />
    case 'ADMIN':
      return <Shield className="w-3 h-3 text-purple-500" />
    case 'FINANCE_OFFICER':
      return <TrendingUp className="w-3 h-3 text-green-500" />
    case 'LOAN_OFFICER':
      return <HandCoins className="w-3 h-3 text-blue-500" />
    case 'MEMBER':
      return <UserIcon className="w-3 h-3 text-gray-500" />
    default:
      return <Award className="w-3 h-3" />
  }
}

const getRoleName = (role: string) => {
  switch (role) {
    case 'SUPER_ADMIN': return 'Super Admin'
    case 'ADMIN': return 'Administrator'
    case 'FINANCE_OFFICER': return 'Finance Officer'
    case 'LOAN_OFFICER': return 'Loan Officer'
    case 'MEMBER': return 'Member'
    default: return 'User'
  }
}

export function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(item => {
    if (!session?.user?.role) return false
    return item.roles.includes(session.user.role)
  })

  // User initials for avatar
  const getUserInitials = () => {
    if (!session?.user?.name) return 'U'
    return session.user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-linear-to-br from-blue-500 to-violet-600 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">CooperativePro</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {session ? getRoleName(session.user?.role || 'MEMBER') : 'Modern Society Platform'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {session ? (
              filteredNavItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-l-4 border-blue-600"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })
            ) : (
              <div className="p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Please sign in to access the platform
                </p>
                <div className="mt-4 space-y-2">
                  <Link href="/auth/signin">
                    <Button className="w-full" variant="outline" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button className="w-full" size="sm">
                      Register
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </nav>

          {/* Bottom Section - Only show when logged in */}
          {session && (
            <div className="border-t border-gray-200 dark:border-gray-800 p-4">
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                      {getUserInitials()}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-30">
                        {session.user?.name || 'User'}
                      </p>
                      <div className="flex items-center gap-1">
                        {getRoleIcon(session.user?.role || 'MEMBER')}
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {getRoleName(session.user?.role || 'MEMBER')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="font-medium text-gray-900 dark:text-white truncate">{session.user?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{session.user?.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {getRoleIcon(session.user?.role || 'MEMBER')}
                        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full">
                          {getRoleName(session.user?.role || 'MEMBER')}
                        </span>
                      </div>
                    </div>

                    <div className="py-2">
                      <Link
                        href="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                      >
                        <UserIcon className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-700 pt-2">
                      <button
                        onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                        className="flex items-center gap-3 px-4 py-2 w-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-end">
                <ThemeToggle />
              </div>
            </div>
          )}

          {/* Bottom Section - When not logged in */}
          {!session && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex justify-end">
                <ThemeToggle />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-linear-to-br from-blue-500 to-violet-600 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">CooperativePro</h1>
          </div>
          
          <div className="flex items-center gap-2">
            {session ? (
              <>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="w-8 h-8 bg-linear-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold"
                  >
                    {getUserInitials()}
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <p className="font-medium text-gray-900 dark:text-white truncate">{session.user?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{session.user?.email}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          href="/profile"
                          onClick={() => {
                            setIsUserMenuOpen(false)
                            setIsMobileMenuOpen(false)
                          }}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <UserIcon className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>
                        <button
                          onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                          className="flex items-center gap-3 px-4 py-2 w-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg max-h-[calc(100vh-64px)] overflow-y-auto">
            <nav className="p-4 space-y-1">
              {session ? (
                filteredNavItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                        isActive
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )
                })
              ) : (
                <div className="p-4 space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Please sign in to access the platform
                  </p>
                  <div className="space-y-2">
                    <Link href="/auth/signin" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full" variant="outline">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full">
                        Register
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {/* User info in mobile menu */}
              {session && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                      {getUserInitials()}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{session.user?.name}</p>
                      <div className="flex items-center gap-2">
                        {getRoleIcon(session.user?.role || 'MEMBER')}
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {getRoleName(session.user?.role || 'MEMBER')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <UserIcon className="w-5 h-5" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <Settings className="w-5 h-5" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        signOut({ callbackUrl: '/auth/signin' })
                      }}
                      className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </>
  )
}