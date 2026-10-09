import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#030303] pt-32 pb-12 border-t border-[rgba(245,242,233,0.1)] relative z-10">
      <div className="canvas-container">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-32">

          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <img src="/pamho-logo.png" alt="PAMHO" style={{ height: '115px', width: '105px' }} className="mb-12 brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" />
              <h2 className="font-serif text-3xl md:text-5xl text-[#F5F2E9] leading-tight max-w-sm font-light">
                Convening Africa's Mental Health Future.
              </h2>
            </div>

            <div className="mt-16 lg:mt-0">
              <a href="mailto:info@pamho.org" className="label-tracking text-[#8442FA] hover:text-[#F5F2E9] transition-colors">
                info@pamho.org
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="label-tracking text-[rgba(245,242,233,0.3)] mb-8">Organization</h4>
            <ul className="space-y-6">
              <li><Link to="/about" className="text-sm font-sans font-light text-[rgba(245,242,233,0.7)] hover:text-[#8442FA] transition-colors tracking-wide">Manifesto</Link></li>
              <li><Link to="/programs" className="text-sm font-sans font-light text-[rgba(245,242,233,0.7)] hover:text-[#8442FA] transition-colors tracking-wide">Strategic Programs</Link></li>
              <li><Link to="/ambassadors" className="text-sm font-sans font-light text-[rgba(245,242,233,0.7)] hover:text-[#8442FA] transition-colors tracking-wide">The Network</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="label-tracking text-[rgba(245,242,233,0.3)] mb-8">Resources</h4>
            <ul className="space-y-6">
              <li><Link to="/institute" className="text-sm font-sans font-light text-[rgba(245,242,233,0.7)] hover:text-[#8442FA] transition-colors tracking-wide">PAMHO Institute</Link></li>
              <li><Link to="/news" className="text-sm font-sans font-light text-[rgba(245,242,233,0.7)] hover:text-[#8442FA] transition-colors tracking-wide">Editorial</Link></li>
              <li><Link to="/contact" className="text-sm font-sans font-light text-[rgba(245,242,233,0.7)] hover:text-[#8442FA] transition-colors tracking-wide">Inquiries</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="label-tracking text-[rgba(245,242,233,0.3)] mb-8">Support</h4>
            <ul className="space-y-6">
              <li><Link to="/donate" className="text-sm font-sans font-light text-[#8442FA] hover:text-[#F5F2E9] transition-colors tracking-wide">Fund the Mission</Link></li>
              <li><Link to="/partners" className="text-sm font-sans font-light text-[rgba(245,242,233,0.7)] hover:text-[#8442FA] transition-colors tracking-wide">Partnerships</Link></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[rgba(245,242,233,0.1)]">
          <p className="label-tracking !text-[10px] text-[rgba(245,242,233,0.3)] mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Pan-African Mental Health Organization.
          </p>
          <div className="flex space-x-8">
            <Link to="/privacy" className="label-tracking !text-[10px] text-[rgba(245,242,233,0.3)] hover:text-[#F5F2E9]">Privacy Policy</Link>
            <Link to="/terms" className="label-tracking !text-[10px] text-[rgba(245,242,233,0.3)] hover:text-[#F5F2E9]">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
