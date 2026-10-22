import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-[#8442fa]/30 selection:text-[#f4f2ee] w-full max-w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col w-full max-w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
