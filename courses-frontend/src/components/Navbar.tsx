import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-[#030303]/90 backdrop-blur-md py-4' : 'bg-transparent py-8'
      }`}>
      <div className="canvas-container">
        <div className="flex justify-between items-center">

          <Link to="/" className="flex-shrink-0 relative z-50">
            <img src="/pamho-logo.png" alt="PAMHO" style={{ height: '115px', width: 'auto' }} className="brightness-0 invert opacity-90 transition-opacity hover:opacity-100" />
          </Link>

          <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {[
              ['About', '/about'],
              ['Programs', '/programs'],
              ['Ambassadors', '/ambassadors'],
              ['Membership', '/membership'],
              ['Resources', '/resources'],
              ['Institute', '/institute']
            ].map(([label, path]) => (
              <Link
                key={label}
                to={path}
                className="label-tracking text-[rgba(245,242,233,0.7)] hover:text-[#F5F2E9] transition-colors relative group whitespace-nowrap"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/contact" className="label-tracking text-[rgba(245,242,233,0.7)] hover:text-[#F5F2E9] transition-colors">Contact</Link>
            <Link to="/register-conversation" className="label-tracking text-[#D1893D] hover:text-[#F5F2E9] transition-colors">Register</Link>
            <Link to="/donate" className="label-tracking !text-[#D1893D] hover:!text-[#F5F2E9] transition-colors">Donate</Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center relative z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#F5F2E9] focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Cinematic Full-Screen Mobile Menu */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-[#030303] z-40 flex flex-col justify-center items-center transition-all duration-700 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
        <div className="flex flex-col space-y-6 text-center">
          {[
            ['Home', '/'],
            ['About', '/about'],
            ['Programs', '/programs'],
            ['Ambassadors', '/ambassadors'],
            ['Membership', '/membership'],
            ['Resources', '/resources'],
            ['Institute', '/institute'],
            ['Contact', '/contact'],
            ['Register', '/register-conversation'],
            ['Donate', '/donate']
          ].map(([label, path], idx) => (
            <Link
              key={label}
              to={path}
              style={{ transitionDelay: isOpen ? `${idx * 40 + 100}ms` : '0ms' }}
              className={`font-serif text-3xl md:text-4xl text-[#F5F2E9] hover:text-[#D1893D] transition-all duration-500 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
