"use client"
import StarBorder from '../components/StarBorder'

export default function TestPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <StarBorder
        as="div"
        className="w-[300px]"
        color="#22c55e"
        speed="6s"
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Test Card</h2>
          <p className="text-gray-400">This is a test card with the star border animation.</p>
          <button className="bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-400 transition-colors">
            Click me
          </button>
        </div>
      </StarBorder>
    </main>
  )
} 
