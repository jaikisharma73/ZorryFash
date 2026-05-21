import React, { useState, useEffect, useCallback } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const slides = [
  {
    image: assets.hero_img3,
    subtitle: "Premium Collection",
    title: "CRAFTED FOR\nTHE MODERN YOU",
    desc: "Premium fabrics, contemporary cuts. Fashion that moves with you, designed for every occasion.",
  },
  {
    image: assets.hero_img,
    subtitle: "New Season 2026",
    title: "REDEFINE YOUR\nEVERYDAY STYLE",
    desc: "Discover curated fashion that blends comfort with elegance. Elevate your wardrobe with ZorryFash.",
  },
  {
    image: assets.hero_img2,
    subtitle: "Trending Now",
    title: "BOLD LOOKS,\nTIMELESS APPEAL",
    desc: "From casual streetwear to refined essentials — find pieces that speak your style language.",
  },
];

const SLIDE_DURATION = 5000;

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      setCurrentSlide(index);
      setProgress(0);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 1200);
    },
    [isTransitioning],
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }

        return prev + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [nextSlide]);

  const marqueeItems = [
    "Free Shipping Over ₹999",
    "Handpicked Collections",
    "Premium Quality Fabrics",
    "Easy Returns & Exchanges",
    "New Arrivals Every Week",
    "Luxury Streetwear",
  ];

  return (
    <div className="bg-white overflow-hidden">
      <div className="relative w-full min-h-screen bg-black overflow-hidden">
        <picture>
          <source media="(max-width: 640px)" srcSet={assets.zorryPort} />

          <img
            src={assets.zorry}
            alt="Hero background"
            className="
    absolute inset-0
    w-full h-full
    object-cover
    object-center
    sm:object-center
    scale-[1.02]
  "
          />
        </picture>

        <div className="absolute inset-0 bg-black/10 z-10" />

      <div className="absolute inset-0 z-20 flex flex-col justify-end items-center text-center px-6 pb-[40px] sm:pb-[40px]">
          <Link
            to="/collection"
            className="
              border
              border-white
              text-white
              px-8
              sm:px-10
              py-3
              sm:py-4
              text-xs
              sm:text-sm
              uppercase
              tracking-[4px]
              font-medium
              hover:bg-white
              hover:text-black
              transition-all
              duration-500
              backdrop-blur-sm
            "
          >
            SHOP NOW
          </Link>
        </div>
      </div>

      <section className="w-full py-16 sm:py-24 lg:py-28 overflow-hidden bg-white">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            <div
              key={currentSlide}
              className="
                order-2 lg:order-1
                transition-all
                duration-1000
                ease-out
                animate-[fadeUp_1s_ease]
              "
            >
              <p
                className="
                  uppercase
                  tracking-[6px]
                  text-[10px]
                  sm:text-xs
                  text-neutral-500
                  mb-5
                  font-medium
                "
              >
                {slides[currentSlide].subtitle}
              </p>

              <h1
                className="
                  text-[34px]
                  sm:text-[72px]
                  lg:text-[95px]
                  leading-[0.95]
                  tracking-[-2px]
                  text-black
                  mb-8
                  font-light
                "
                style={{
                  whiteSpace: "pre-line",
                  // fontFamily: "Prata, serif",
                }}
              >
                {slides[currentSlide].title}
              </h1>

              <p
                className="
                  text-neutral-600
                  text-sm
                  sm:text-base
                  leading-relaxed
                  max-w-xl
                  mb-10
                "
              >
                {slides[currentSlide].desc}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/collection"
                  className="
                    bg-black
                    text-white
                    px-8
                    sm:px-10
                    py-3
                    sm:py-4
                    uppercase
                    tracking-[4px]
                    text-[11px]
                    sm:text-xs
                    hover:bg-neutral-800
                    transition-all
                    duration-500
                  "
                >
                  Shop Now
                </Link>

                <Link
                  to="/collection"
                  className="
                    border
                    border-black
                    text-black
                    px-8
                    sm:px-10
                    py-3
                    sm:py-4
                    uppercase
                    tracking-[4px]
                    text-[11px]
                    sm:text-xs
                    hover:bg-black
                    hover:text-white
                    transition-all
                    duration-500
                  "
                >
                  Explore
                </Link>
              </div>

              <div className="flex items-center gap-4 mt-14">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`
                      transition-all duration-500
                      ${
                        index === currentSlide
                          ? "w-16 h-[2px] bg-black"
                          : "w-8 h-[2px] bg-neutral-300 hover:bg-black"
                      }
                    `}
                  />
                ))}
              </div>

              <div
                className="mt-5 h-[2px] bg-black transition-all duration-100"
                style={{
                  width: `${progress}%`,
                  maxWidth: "220px",
                }}
              />
            </div>

            <div className="order-1 lg:order-2 relative flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-[420px] sm:h-[620px] lg:h-[760px]">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`
                      absolute inset-0
                      transition-all
                      duration-[1600ms]
                      ease-out
                      ${
                        index === currentSlide
                          ? "opacity-100 translate-x-0 scale-100 z-10"
                          : "opacity-0 translate-x-16 scale-[1.03] z-0"
                      }
                    `}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="
                        w-full
                        h-full
                        object-contain
                        sm:object-cover
                        object-center
                        transition-all
                        duration-[2500ms]
                        ease-out
                        hover:scale-[1.02]
                      "
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-neutral-200 py-5 bg-white">
        <div className="animate-marquee flex whitespace-nowrap gap-12 w-max">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="
          flex
          items-center
          gap-3
          text-[10px]
          sm:text-xs
          uppercase
          tracking-[4px]
          text-neutral-700
          flex-shrink-0
        "
            >
              <span className="w-2 h-2 rounded-full bg-black" />

              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
