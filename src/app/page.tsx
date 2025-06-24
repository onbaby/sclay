import RotatingText from '../components/RotatingText'

export default function Home() {
  return (
    <main>
      <div className="flex justify-center my-8">
        <RotatingText
          texts={['React', 'Bits', 'Is', 'Cool!']}
          mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
      </div>

      <section id="process" className="py-20 bg-black">
        {/* Process section content */}
      </section>

      <div className="flex justify-center my-8">
        <RotatingText
          texts={['React', 'Bits', 'Is', 'Cool!']}
          mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
      </div>

      {/* Card Swap Section */}
      <section className="bg-black py-20 relative overflow-hidden">
        {/* Card Swap Section content */}
      </section>
    </main>
  )
} 