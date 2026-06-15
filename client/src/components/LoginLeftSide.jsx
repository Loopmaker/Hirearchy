import { useEffect, useState } from "react"
import { Building2Icon } from "lucide-react"
import login1 from "../assets/login1.jpg"
import login2 from "../assets/login2.jpg"
import login3 from "../assets/login3.jpg"

const slides = [
  {
    image: login1, 
    title: "Manage your workforce with ease",
    subtitle: "Track attendance, approve leave, and run payroll — all in one place.",
  },
  {
    image: login2, 
    title: "Stay on top of attendance",
    subtitle: "Real-time check-ins and clear records for every employee.",
  },
  {
    image: login3,
    title: "Payroll, simplified",
    subtitle: "Generate and share payslips in just a few clicks.",
  },
]

const AUTO_PLAY_INTERVAL = 5000

const LoginLeftside = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, AUTO_PLAY_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  const activeSlide = slides[activeIndex]

  return (
    <div className="hidden md:flex w-1/2 relative overflow-hidden bg-slate-800">

      {slides.map((slide, index) => (
        <img
          key={slide.title}
          src={slide.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{ opacity: index === activeIndex ? 1 : 0 }}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute top-8 left-8 flex items-center gap-3 z-10">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
          <Building2Icon className="size-5 text-slate-900" />
        </div>
        <span className="text-sm font-semibold text-white">Hirearchy</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 p-12 lg:p-16">
        <div key={activeIndex} className="animate-slide-up">
          <h1 className="text-3xl lg:text-4xl font-semibold text-white mb-3 leading-tight tracking-tight">
            {activeSlide.title}
          </h1>
          <p className="text-slate-200/90 text-base max-w-md leading-relaxed mb-6">
            {activeSlide.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === activeIndex ? "w-8 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoginLeftside