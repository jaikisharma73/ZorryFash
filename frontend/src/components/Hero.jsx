import React, { useState, useEffect, useCallback } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const slides = [
  {
    image: assets.hero_img3,
    subtitle: 'Premium Collection',
    title: 'Crafted For\nThe Modern You',
    desc: 'Premium fabrics, contemporary cuts. Fashion that moves with you, designed for every occasion.',
  },
  {
    image: assets.hero_img,
    subtitle: 'New Season 2026',
    title: 'Redefine Your\nEveryday Style',
    desc: 'Discover curated fashion that blends comfort with elegance. Elevate your wardrobe with ZorryFash.',
  },
  {
    image: assets.hero_img2,
    subtitle: 'Trending Now',
    title: 'Bold Looks,\nTimeless Appeal',
    desc: 'From casual streetwear to refined essentials — find pieces that speak your style language.',
  },
]

const SLIDE_DURATION = 5000

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setProgress(0)
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [isTransitioning])

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length)
  }, [currentSlide, goToSlide])


  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide()
          return 0
        }
        return prev + (100 / (SLIDE_DURATION / 50))
      })
    }, 50)
    return () => clearInterval(interval)
  }, [nextSlide])

  const [animKey, setAnimKey] = useState(0)
  useEffect(() => {
    setAnimKey((prev) => prev + 1)
  }, [currentSlide])

  const marqueeItems = [
    'Free Shipping Over ₹999',
    'Handpicked Collections',
    'Premium Quality Fabrics',
    'Easy Returns & Exchanges',
    'New Arrivals Every Week',
    'Sustainable Fashion',
  ]

  return (
    <div>
      <div className="relative w-full h-screen mt-0 mb-10">
        <img
          src={assets.zorry}
          className="absolute inset-0 w-full h-full object-cover object-center"
          alt="Hero background"
        />


        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
          <h1 className="prata-regular text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 max-w-4xl" style={{ animation: 'heroTextReveal 0.8s ease-out 0.2s forwards', opacity: 0 }}>
          </h1>
          <div style={{ animation: 'heroTextReveal 0.8s ease-out 0.6s forwards', opacity: 0 }}>
            <Link to="/collection" className="bg-transparent hover:bg-transparent text-white px-8 py-3 transition-all duration-300 font-semibold tracking-wider uppercase inline-block border border-transparent hover:border-white mt-60">
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>

      {/* Section 2: Previous Hero Slider */}
      <div className="flex flex-col sm:flex-row mt-0 mb-10 overflow-hidden relative h-[80vh] sm:h-[76vh]">
        <div className="absolute inset-0 sm:hidden z-0">
          {slides.map((slide, index) => (
            <div
              key={`mobile-${index}`}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img
                src={slide.image}
                className="w-full h-full object-contain object-center"
                alt={slide.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/70 to-white/30" />
            </div>
          ))}
        </div>
        <div className="w-full sm:w-1/2 flex items-center justify-center p-8 sm:p-12 relative z-10 bg-transparent sm:bg-white h-full" key={animKey}>
          <div className="max-w-md w-full">
            <div className="flex items-center gap-2 mb-4" style={{ animation: 'heroTextReveal 0.8s ease-out 0s forwards', opacity: 0 }}>
              <p className="w-8 md:w-11 h-[2px] bg-[#b08a5b]"></p>
              <p className="font-medium text-sm md:text-base text-[#b08a5b] tracking-widest uppercase">{slides[currentSlide].subtitle}</p>
            </div>

            <h1 className="prata-regular text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6 text-gray-800" style={{ whiteSpace: 'pre-line', animation: 'heroTextReveal 0.8s ease-out 0.2s forwards', opacity: 0 }}>
              {slides[currentSlide].title}
            </h1>

            <p className="text-gray-600 sm:text-gray-500 mb-8 leading-relaxed font-medium sm:font-normal" style={{ animation: 'heroTextReveal 0.8s ease-out 0.4s forwards', opacity: 0 }}>
              {slides[currentSlide].desc}
            </p>

            <div style={{ animation: 'heroTextReveal 0.8s ease-out 0.6s forwards', opacity: 0 }}>
              <Link to="/collection" className="flex items-center gap-3 group cursor-pointer w-max">
                <p className="font-semibold text-sm md:text-base text-gray-800">SHOP NOW</p>
                <p className="w-8 md:w-11 h-[1px] bg-gray-800 transition-all duration-300 group-hover:w-16 group-hover:bg-[#b08a5b]"></p>
              </Link>
            </div>
          </div>


          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
            {slides.map((_, index) => (
              <button
                key={`dot-${index}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-[#b08a5b] scale-125' : 'bg-gray-300 sm:bg-gray-300/60'}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute bottom-0 left-0 h-[3px] bg-[#b08a5b] transition-all duration-75 z-20" style={{ width: `${progress}%` }} />
        </div>

        <div className="hidden sm:block w-full sm:w-1/2 h-full relative overflow-hidden bg-white">
          {slides.map((slide, index) => (
            <div
              key={`desktop-${index}`}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}
            >
              <img
                src={slide.image}
                className="w-full h-full object-contain object-center"
                alt={slide.title}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-banner">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span className="marquee-item" key={i}>
              <span className="dot" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero
