import ZoomExperience from '../components/ZoomExperience'

export default function LiveZoomPage() {
  // For this implementation, we will use the program slug
  const programId = "pan-african-conversation"

  return (
    <div className="w-screen h-screen bg-[#0a0a0c] overflow-hidden">
      <ZoomExperience
        programId={programId}
      />
    </div>
  )
}
