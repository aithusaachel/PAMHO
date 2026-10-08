import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Course {
  id: number;
  slug: string;
  title: string;
  short_description: string;
  thumbnail: string;
  estimated_duration: string;
  difficulty: string;
}

function CourseInterfaceDemo() {
  return (
    <div className="ui-frame w-full flex flex-col md:flex-row h-[500px]">
      <div className="ui-sidebar w-full md:w-72 flex flex-col p-6 shrink-0 bg-[#0a0a0c]">
        <div className="mb-8">
          <h4 className="text-[11px] uppercase tracking-widest text-[#b48aff] mb-2">Current Module</h4>
          <h3 className="text-sm font-semibold text-[#f4f2ee]">Cultural Contexts of Mental Health</h3>
        </div>
        
        <div className="space-y-1">
          <div className="py-3 px-4 flex gap-4 text-sm text-gray-400 border-l-2 border-transparent">
            <span className="text-[10px] mt-1 font-mono">01</span>
            <span>Historical Perspectives</span>
          </div>
          <div className="ui-active-item py-3 px-4 flex gap-4 text-sm text-[#f4f2ee]">
            <span className="text-[10px] mt-1 font-mono text-[#b48aff]">02</span>
            <span>Stigma and Social Dynamics</span>
          </div>
          <div className="py-3 px-4 flex gap-4 text-sm text-gray-600 border-l-2 border-transparent">
            <span className="text-[10px] mt-1 font-mono">03</span>
            <span>Community Interventions</span>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-2">
            <span>PROGRESS</span>
            <span className="text-[#b48aff]">45%</span>
          </div>
          <div className="ui-progress-track">
            <div className="ui-progress-fill" style={{ width: '45%' }}></div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 bg-[#111115] p-6 md:p-10 flex flex-col">
        <div className="flex-1 bg-[#140b1e] border border-[#8442fa]/20 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-luminosity" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCJQATcOhqFYI3w4vk-o68YcNbkvs-VWQHW2qKzQmbAMHBm9BVTglSHNYAb4rTnYb_1sgjGz9toc-jmCGWW7K2wKUph69ShqMQD5rZlaNo1eDcwsjGevZd5fK5Yju92kQnczY4tB4IjUCgiAqhnPcImDjmMLyQhWEoQIXSR4e7Lj8ketxPBntmPAYLN7yZLZSIMqtqvTG_ScBBfheY0RVZ1KxPK9VrJo5cXSMnOFwrWNR52tz03JeP")' }}></div>
          <div className="absolute inset-0 bg-[#140b1e]/60"></div>
          <button className="relative z-10 w-16 h-16 bg-[#8442fa] text-white rounded-sm flex items-center justify-center transition-transform hover:bg-[#985eff]">
            <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </button>
        </div>
        <div className="mt-6 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-[#f4f2ee]">Stigma and Social Dynamics</h2>
            <p className="text-sm text-gray-500 mt-1">Instructor: Dr. ABC</p>
          </div>
          <div className="tag-outline border-[#8442fa]/30 text-[#b48aff]">Video • 24 Min</div>
        </div>
      </div>
    </div>
  )
}

export default function Institute() {
  const container = 'w-full max-w-[1536px] mx-auto px-6 sm:px-12 lg:px-20'
  const [courses, setCourses] = useState<Course[]>([]);
  
  useEffect(() => {
    fetch('/api/v1/courses/')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCourses(data);
        } else if (data.results) {
          setCourses(data.results);
        }
      })
      .catch(err => console.error("Failed to load courses", err));
  }, []);

  return (
    <div className="flex flex-col">
      {/* ============================================================ */}
      {/* TYPOGRAPHIC HERO                                             */}
      {/* ============================================================ */}
      <section className={`pt-40 pb-32 ${container} relative bg-[#0a0a0c]`}>
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-[#140b1e] via-transparent to-transparent pointer-events-none -z-10"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex gap-3 mb-8">
               <div className="tag-outline self-start text-[#b48aff] border-[#8442fa]/30">PAMHO Ecosystem</div>
               <div className="tag-outline self-start text-gray-400 border-white/10">Learning Platform</div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-[#f4f2ee] tracking-tight leading-[1.05]">
              Structured education.<br />
              <span className="text-[#8442fa]">For African development.</span>
            </h1>
            <p className="mt-10 text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed font-light">
              We provide practical learning and professional development through a growing catalog of structured courses. Our platform bridges the gap between theoretical knowledge and real-world application.
            </p>
            <div className="mt-12 flex items-center gap-6">
              <a href="#curriculum" className="btn-primary text-sm font-bold px-8 py-4 rounded-sm shadow-[0_4px_20px_-5px_rgba(132,66,250,0.4)]">View Catalog</a>
              <a href="#platform" className="text-sm font-medium text-gray-400 hover:text-[#b48aff] transition-colors">Explore the platform &rarr;</a>
            </div>
          </div>
          
          <div className="lg:col-span-5 h-full hidden lg:flex items-center justify-end relative">
            <div className="w-full aspect-square flex items-center justify-center relative">
              <div className="absolute inset-0 border border-[#8442fa]/5 rounded-full scale-100"></div>
              <div className="absolute inset-0 border border-[#8442fa]/10 rounded-full scale-75"></div>
              <div className="absolute inset-0 border border-[#8442fa]/20 rounded-full scale-50"></div>
              <div className="absolute inset-0 border border-[#8442fa]/40 rounded-full scale-[0.25]"></div>

              <div className="absolute top-1/2 left-0 w-full h-px bg-[#8442fa]/10 -translate-y-1/2"></div>
              <div className="absolute left-1/2 top-0 h-full w-px bg-[#8442fa]/10 -translate-x-1/2"></div>

              <div className="relative z-10 bg-[#0a0a0c] p-6 rounded-full border border-[#8442fa]/30 shadow-[0_0_40px_rgba(132,66,250,0.15)]">
                <img src="/pamho-logo.png" alt="PAMHO Mark" className="w-48 h-48 drop-shadow-md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PLATFORM DEMONSTRATION                                       */}
      {/* ============================================================ */}
      <section id="platform" className={`py-32 ${container} bg-[#111115]`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <h2 className="text-3xl md:text-5xl font-bold text-[#f4f2ee] tracking-tight max-w-2xl leading-tight">
            A focused environment for <br />structured learning.
          </h2>
          <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
            The platform is engineered to remove distraction. Sequential pathways, integrated discussions, and verifiable progression.
          </p>
        </div>
        
        <CourseInterfaceDemo />
      </section>

      {/* ============================================================ */}
      {/* CURRICULUM CATALOG (Intentional Empty State)                 */}
      {/* ============================================================ */}
      <section id="curriculum" className={`py-40 ${container} bg-[#140b1e] border-y border-[#8442fa]/10`}>
        <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h2 className="text-[11px] uppercase tracking-widest text-[#b48aff] font-bold mb-4">Course Catalog</h2>
            <h3 className="text-4xl font-bold text-[#f4f2ee]">Featured Curricula</h3>
          </div>
          <div className="text-sm text-gray-500 font-mono uppercase tracking-widest">
            Learning Opportunities
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="w-full bg-[#111115] border border-[#8442fa]/10 rounded-sm p-16 md:p-24 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(132,66,250,0.05)]">
             <div className="w-16 h-16 rounded-full border border-[#8442fa]/20 bg-[#140b1e] flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#8442fa]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
             </div>
             <h4 className="text-2xl font-bold text-[#f4f2ee] mb-4">Courses will appear here as they are published by PAMHO.</h4>
             <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
               Our educational catalog is expanding. New courses, modules, and professional development programs will be listed as soon as they become available.
             </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => (
              <Link 
                key={course.id} 
                to={`/institute/courses/${course.slug}`}
                className="group flex flex-col bg-[#111115] border border-[#8442fa]/10 rounded-sm overflow-hidden hover:border-[#8442fa]/30 transition-colors"
              >
                {course.thumbnail ? (
                  <div className="h-48 bg-[#140b1e] relative overflow-hidden">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity mix-blend-luminosity" />
                  </div>
                ) : (
                  <div className="h-48 bg-[#140b1e] border-b border-[#8442fa]/10 flex items-center justify-center">
                    <svg className="w-10 h-10 text-[#8442fa]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex gap-2 mb-3">
                    {course.difficulty && (
                      <span className="text-[10px] font-mono text-[#b48aff] bg-[#8442fa]/10 px-2 py-1 rounded-sm uppercase tracking-wider">
                        {course.difficulty}
                      </span>
                    )}
                    {course.estimated_duration && (
                      <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-1 rounded-sm uppercase tracking-wider">
                        {course.estimated_duration}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xl font-bold text-[#f4f2ee] mb-2 group-hover:text-[#b48aff] transition-colors">{course.title}</h4>
                  <p className="text-sm text-gray-500 line-clamp-3 mb-6 flex-1">
                    {course.short_description || "No description provided."}
                  </p>
                  <div className="mt-auto pt-4 border-t border-white/5 text-sm font-medium text-gray-400 group-hover:text-[#f4f2ee] transition-colors flex items-center justify-between">
                    <span>View Course</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/* FINAL CTA                                                    */}
      {/* ============================================================ */}
      <section className={`py-40 ${container} text-center relative overflow-hidden bg-[#1a1025] border-t border-[#8442fa]/30`}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        
        <h2 className="text-4xl md:text-6xl font-bold text-[#f4f2ee] tracking-tight mb-8 relative z-10">Prepare to learn.</h2>
        <p className="text-[#b48aff] text-lg max-w-xl mx-auto mb-12 relative z-10 font-medium">Create a student account to enroll in upcoming evidence-based curricula and join our learning network.</p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
          <Link to="/register" className="btn-primary text-sm font-bold px-10 py-4 rounded-sm shadow-[0_4px_24px_-4px_rgba(132,66,250,0.5)]">Create Account</Link>
        </div>
      </section>
    </div>
  )
}
