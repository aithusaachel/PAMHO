import { Link } from 'react-router-dom'

export default function Footer() {
  const container = 'w-full max-w-[1536px] mx-auto px-6 sm:px-12 lg:px-20'
  
  return (
    <footer className="bg-[#111115] border-t border-[#8442fa]/20 py-20 mt-auto">
      <div className={container}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-2">
            <Link to="/">
              <img src="/pamho-logo.png" alt="PAMHO Logo" className="h-14 w-auto mb-6" />
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed mb-6">
              Pan African Mental Health Organization.<br/>
              Dedicated to improving access to support, reducing stigma, and empowering communities through education and advocacy across the continent.
            </p>
          </div>
          
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#f4f2ee] mb-6">Organization</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/about" className="hover:text-[#b48aff] transition-colors">About & Leadership</Link></li>
              <li><Link to="/programs" className="hover:text-[#b48aff] transition-colors">Programs & Events</Link></li>
              <li><Link to="/resources" className="hover:text-[#b48aff] transition-colors">Resources & News</Link></li>
              <li><Link to="/contact" className="hover:text-[#b48aff] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#f4f2ee] mb-6">Community</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/ambassadors" className="hover:text-[#b48aff] transition-colors">Ambassadors</Link></li>
              <li><Link to="/membership" className="hover:text-[#b48aff] transition-colors">Membership</Link></li>
              <li><Link to="/membership" className="hover:text-[#b48aff] transition-colors">Partnerships</Link></li>
              <li><Link to="/donate" className="hover:text-[#b48aff] transition-colors text-[#8442fa]">Make a Donation</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#f4f2ee] mb-6">Institute</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/institute" className="hover:text-[#b48aff] transition-colors">Learning Platform</Link></li>
              <li><Link to="/institute" className="hover:text-[#b48aff] transition-colors">Course Catalog</Link></li>
              <li><Link to="/institute" className="hover:text-[#b48aff] transition-colors">Instructors</Link></li>
              <li><Link to="/institute" className="hover:text-[#b48aff] transition-colors">Verification</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#8442fa]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500">
          <div>&copy; {new Date().getFullYear()} PAMHO. All rights reserved.</div>
          <div className="flex gap-6">
             <span className="text-gray-500 hover:text-[#b48aff] transition-colors cursor-pointer">Privacy Policy</span>
             <span className="text-gray-500 hover:text-[#b48aff] transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
