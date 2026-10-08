import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const container = 'w-full max-w-[1536px] mx-auto px-6 sm:px-12 lg:px-20'

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#0a0a0c]/90 backdrop-blur-md border-b border-[#8442fa]/20 shadow-sm' : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className={`${container} h-24 flex items-center justify-between`}>
          <Link to="/" className="flex items-center gap-6 shrink-0 group">
            <img 
              src="/pamho-logo.png" 
              alt="PAMHO Logo" 
              className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
          </Link>

          {/* Desktop Navigation - Core Items Only to avoid crowding */}
          <nav className="hidden lg:flex items-center gap-10 text-[13px] font-medium text-gray-400">
            <Link to="/about" className="hover:text-[#b48aff] transition-colors">About</Link>
            <Link to="/programs" className="hover:text-[#b48aff] transition-colors">Programs</Link>
            <Link to="/institute" className="hover:text-[#b48aff] transition-colors">Institute</Link>
            <Link to="/resources" className="hover:text-[#b48aff] transition-colors">Resources</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-6 shrink-0">
            {/* Global Menu Toggle for the full architecture */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="text-[13px] font-medium text-[#f4f2ee] hover:text-[#b48aff] transition-colors flex items-center gap-2"
            >
              Menu
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="flex items-center gap-4">
              <Link to="/donate" className="btn-primary text-[12px] font-bold px-7 py-3 rounded-sm shadow-[0_4px_20px_-5px_rgba(132,66,250,0.4)]">
                Donate
              </Link>
            </div>
          </div>

          <button 
            className="lg:hidden p-2 text-[#8442fa]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Full-Screen Overlay Menu (handles the 9-item architecture elegantly) */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#0a0a0c] transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        
        <div className={`${container} h-24 flex items-center justify-between relative z-10`}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
             <img src="/pamho-logo.png" alt="PAMHO Logo" className="h-14 w-auto" />
          </Link>
          <button 
            className="p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={`${container} mt-12 grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10 h-[calc(100vh-144px)] overflow-y-auto pb-20`}>
          <nav className="flex flex-col gap-6">
            <h4 className="text-[11px] font-mono text-[#8442fa] uppercase tracking-widest mb-4">Organization</h4>
            <Link to="/" className="text-3xl md:text-5xl font-bold text-[#f4f2ee] hover:text-[#b48aff] transition-colors">Home</Link>
            <Link to="/about" className="text-3xl md:text-5xl font-bold text-[#f4f2ee] hover:text-[#b48aff] transition-colors">About & Leadership</Link>
            <Link to="/programs" className="text-3xl md:text-5xl font-bold text-[#f4f2ee] hover:text-[#b48aff] transition-colors">Programs & Events</Link>
            <Link to="/resources" className="text-3xl md:text-5xl font-bold text-[#f4f2ee] hover:text-[#b48aff] transition-colors">Resources & News</Link>
          </nav>
          
          <nav className="flex flex-col gap-6">
            <h4 className="text-[11px] font-mono text-[#8442fa] uppercase tracking-widest mb-4">Community & Action</h4>
            <Link to="/institute" className="text-3xl md:text-5xl font-bold text-[#f4f2ee] hover:text-[#b48aff] transition-colors flex items-center gap-4">
              PAMHO Institute
              <span className="tag-solid !text-[9px] !py-1 !px-2 bg-[#8442fa]/20 text-[#b48aff] border border-[#8442fa]/30 relative -top-1">Learning</span>
            </Link>
            <Link to="/ambassadors" className="text-3xl md:text-5xl font-bold text-[#f4f2ee] hover:text-[#b48aff] transition-colors">Ambassadors</Link>
            <Link to="/membership" className="text-3xl md:text-5xl font-bold text-[#f4f2ee] hover:text-[#b48aff] transition-colors">Membership & Partners</Link>
            <Link to="/contact" className="text-3xl md:text-5xl font-bold text-[#f4f2ee] hover:text-[#b48aff] transition-colors">Contact / Get Involved</Link>
            
            <div className="mt-8 flex flex-col items-start gap-4">
              <Link to="/donate" className="inline-flex btn-primary text-sm font-bold px-10 py-4 rounded-sm shadow-[0_4px_24px_-4px_rgba(132,66,250,0.5)] mt-4">
                Make a Donation
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
