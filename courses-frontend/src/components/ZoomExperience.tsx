import { useEffect, useRef, useState } from 'react'
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded'

interface ZoomExperienceProps {
  programId: string;
}

export default function ZoomExperience({ programId }: ZoomExperienceProps) {
  const zoomRootRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'idle' | 'initializing' | 'joining' | 'active' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    // We only want to initialize when the user explicitly clicks join,
    // but the component can prepare its DOM element.
    return () => {
      // Cleanup if unmounted
      const zoomRoot = document.getElementById('zoom-root-container')
      if (zoomRoot) {
        zoomRoot.innerHTML = ''
      }
    }
  }, [])

  const handleJoin = async () => {
    try {
      setStatus('initializing')
      
      // 1. Fetch the secure signature from the Django backend
      // Endpoint to be created in Django: POST /api/v1/programs/{programId}/zoom/join/
      // This endpoint MUST securely generate the SDK signature using the server-side ZOOM_SDK_SECRET.
      let signature = ''
      let sdkKey = ''
      
      try {
        const response = await fetch(`/api/v1/programs/${programId}/zoom/join/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({})
        })
        
        if (!response.ok) {
          throw new Error('Failed to obtain meeting signature from server.')
        }
        
        const data = await response.json()
        signature = data.signature
        sdkKey = data.sdkKey
        
        // Use dynamically returned meeting details
        var dynamicMeetingNumber = data.meetingNumber
        var dynamicPasscode = data.passcode
      } catch (err) {
        // For development fallback when backend isn't ready
        console.warn('Backend signature fetch failed. Ensure Django endpoint exists.', err)
        throw new Error('Live meeting configuration is not yet available.')
      }

      if (!signature || !sdkKey || !dynamicMeetingNumber) {
        throw new Error('Invalid meeting configuration received.')
      }

      // 2. Initialize the Zoom Meeting SDK
      const client = ZoomMtgEmbedded.createClient()
      
      setStatus('joining')
      
      client.init({
        zoomAppRoot: zoomRootRef.current as HTMLDivElement,
        language: 'en-US',
        customize: {
          meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
          video: {
            isResizable: true,
            viewSizes: {
              default: { width: Math.max(window.innerWidth - 40, 800), height: Math.max(window.innerHeight - 40, 600) },
              ribbon: { width: 300, height: 600 }
            }
          }
        }
      })

      // 3. Join the meeting
      await client.join({
        sdkKey: sdkKey,
        signature: signature,
        meetingNumber: dynamicMeetingNumber,
        password: dynamicPasscode,
        userName: userName.trim() || 'Guest Participant',
      })

      setStatus('active')

    } catch (err: any) {
      console.error('Zoom SDK Error:', err)
      setStatus('error')
      setErrorMsg(err.message || 'Failed to join the meeting.')
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-[#0a0a0c] overflow-hidden">
      {status === 'idle' && (
        <div className="relative z-10 text-center p-8">
           <div className="w-16 h-16 mx-auto bg-[#140b1e] border border-[#8442fa]/40 rounded-full flex items-center justify-center mb-6">
             <svg className="w-8 h-8 text-[#b48aff]" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
           </div>
           <h5 className="text-[#f4f2ee] font-bold text-lg mb-4">Secure Live Session</h5>
           <p className="text-gray-400 text-sm max-w-sm mx-auto mb-6">
             You are about to join the live broadcast. Please enter your name to continue.
           </p>
           
           <input 
             type="text" 
             value={userName}
             onChange={(e) => setUserName(e.target.value)}
             placeholder="Your Full Name" 
             className="w-full max-w-xs mx-auto mb-8 block bg-[#1a1025] border border-[#8442fa]/30 rounded-sm p-3 text-[#f4f2ee] text-center focus:outline-none focus:border-[#8442fa]" 
           />

           <button 
             onClick={handleJoin}
             disabled={!userName.trim()}
             className="btn-primary text-sm font-bold px-10 py-4 rounded-sm shadow-[0_4px_24px_-4px_rgba(132,66,250,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
           >
             Join Live Now
           </button>
        </div>
      )}

      {status === 'initializing' && (
        <div className="text-[#b48aff] animate-pulse font-mono text-sm uppercase tracking-widest z-10">
          Authenticating secure session...
        </div>
      )}

      {status === 'joining' && (
        <div className="text-[#b48aff] animate-pulse font-mono text-sm uppercase tracking-widest z-10">
          Connecting to broadcast...
        </div>
      )}

      {status === 'error' && (
        <div className="text-center z-10 p-8 max-w-md bg-[#1a1025] border border-red-500/20 rounded-sm">
          <svg className="w-8 h-8 text-red-500/80 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <div className="text-[#f4f2ee] font-bold mb-2">Connection Failed</div>
          <div className="text-red-400/80 text-sm mb-6">{errorMsg}</div>
          <button onClick={() => setStatus('idle')} className="px-6 py-2 border border-[#8442fa]/30 text-[#f4f2ee] text-sm hover:bg-[#8442fa]/10 transition-colors rounded-sm">Try Again</button>
        </div>
      )}

      {/* The actual Zoom SDK mounts here. We hide it until joining begins. */}
      <div 
        id="zoom-root-container" 
        ref={zoomRootRef} 
        className={`w-full h-full min-h-screen absolute inset-0 flex items-center justify-center bg-black ${(status === 'joining' || status === 'active') ? 'opacity-100 z-50' : 'opacity-0 -z-10 pointer-events-none'}`}
      ></div>
    </div>
  )
}
