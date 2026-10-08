import { Outlet } from 'react-router-dom'
import InstituteNavbar from '../components/InstituteNavbar'
import Footer from '../components/Footer'

export default function InstituteLayout() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-[#8442fa]/30 selection:text-[#f4f2ee]">
      <InstituteNavbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
