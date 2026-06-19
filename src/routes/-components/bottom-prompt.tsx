import { Church } from 'lucide-react'

export function BottomPrompt() {
  return (
    <div className="w-full h-full mx-auto max-w-7xl mt-10 p-8 bg-linear-to-l from-brand-blue to-brand-dark rounded-xl grid grid-cols-2 justify-items-center shadow-lg">
      <div>
        <p className="text-2xl font-bold text-brand-white">
          Bring your church manangement and your member engagement together.
        </p>
        <p className="text-sm text-gray-300 mt-2 hidden md:block">
          Join thousands of churches using FaithConnect to save time, increase
          engagement, and advance their mission.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 my-4">
          <button className="flex items-center justify-center gap-2 px-8 py-3 border-2 border-brand-white bg-brand-white text-brand-blue font-semibold rounded-lg hover:bg-transparent hover:text-brand-white transition-colors">
            Get Started
          </button>
          <button className="flex items-center justify-center gap-2 px-8 py-3 border-2 border-brand-white text-brand-white font-semibold rounded-lg hover:bg-brand-white hover:text-brand-blue transition-colors">
            Schedule a Demo
          </button>
        </div>
      </div>

      <div className="w-full h-full flex items-center justify-end block">
        <Church className="h-full w-auto text-brand-white" />
      </div>
    </div>
  )
}

export default BottomPrompt
