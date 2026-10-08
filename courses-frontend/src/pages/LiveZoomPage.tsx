import ZoomExperience from '../components/ZoomExperience'

export default function LiveZoomPage() {
  // Pull credentials from localStorage or URL params, or just use the fixed ones for now
  // For this implementation, we will use the credentials from the old PAMHO site
  const meetingId = "9332105985"
  const passcode = "tcW3rK"
  const programId = "pan-african-conversation"

  return (
    <div className="w-screen h-screen bg-[#0a0a0c] overflow-hidden">
      <ZoomExperience
        meetingNumber={meetingId}
        passcode={passcode}
        programId={programId}
      />
    </div>
  )
}
