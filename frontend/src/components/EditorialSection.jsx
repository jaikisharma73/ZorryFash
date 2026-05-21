// EditorialSection.jsx – Luxury fashion editorial layout for ZORRYFASH
import React from "react";
import { assets } from "../assets/assets";
import { Link } from 'react-router-dom';
import SplitImageSection from "./SplitImageSection";

const ImageBlock = ({ src, alt, align, title, text }) => {
  const isRight = align === "right";

  return (
    <div className={`flex flex-col md:flex-row ${isRight ? 'md:flex-row-reverse' : ''} justify-start items-end w-full mb-32`}>
      {/* Image Container */}
      <Link to="/collection" onClick={() => window.scrollTo(0, 0)} className="relative block w-full md:w-auto md:max-w-[550px] flex-shrink-0 cursor-pointer">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover transition-transform duration-700 ease-out hover:scale-105"
        />
        {alt && (
          <div className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-sm px-3 py-1 text-sm font-sans tracking-widest text-neutral-800">
            {alt}
          </div>
        )}
      </Link>

      {/* Text Container */}
      <div className={`hidden md:flex w-full max-w-xs flex-col justify-end mt-8 md:mt-0 ${isRight ? 'items-end text-right pr-6 lg:pr-12' : 'items-start text-left pl-6 lg:pl-12'} pb-8`}>
        {title && <h3 className="font-serif text-base text-black mb-1">{title}</h3>}
        {text && <p className="font-sans text-neutral-400 leading-relaxed text-[9px] uppercase tracking-[0.2em]">{text}</p>}
      </div>
    </div>
  );
};

const EditorialSection = () => {
  return (
    <section className="relative overflow-hidden bg-neutral-100 text-neutral-900">

      {/* Hero‑style fullscreen editorial background */}
      {/* Hero-style fullscreen editorial background */}
      <Link to="/collection" onClick={() => window.scrollTo(0, 0)} className="relative flex overflow-hidden min-h-[120vh] md:min-h-[135vh] items-center justify-end pr-12 md:pr-24 lg:pr-32 cursor-pointer">
        <img
          src={assets.z11}
          alt="Editorial backdrop"
          className="absolute inset-0 w-full h-full object-cover scale-110 brightness-75"
        />

        {/* Luxury cinematic overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

        {/* ZORRY overlay inside hero image */}
        <div className="absolute inset-0 flex items-end justify-end pr-4 md:pr-12 pointer-events-none">
          <div className="text-right mr-4 mb-[180px]">
            <h1
              className="font-serif text-5xl md:text-7xl lg:text-9xl text-white leading-none mb-2"
              style={{ lineHeight: 1.0 }}
            >
              ZORRY
            </h1>

            <p className="font-sans uppercase tracking-[0.4em] text-white text-sm md:text-base">
              SUMMER 2026
            </p>
          </div>
        </div>
      </Link>
      <SplitImageSection />

      {/* Content sections */}
      <div className="w-full py-24 space-y-24">
        <ImageBlock
          src={assets.z22}
          alt=""
          align="left"
          title="MODERN ELEGANCE"
          text="A curated selection of timeless pieces designed to redefine your everyday wardrobe with effortless sophistication."
        />
        <ImageBlock
          src={assets.z33}
          alt=""
          align="right"
          title="THE NEW SILHOUETTE"
          text="Bold proportions meet classic tailoring, creating a striking balance between structure and fluidity."
        />
        <ImageBlock
          src={assets.z44}
          alt=""
          align="left"
          title="REFINED TEXTURES"
          text="Luxurious fabrics and meticulous craftsmanship converge to deliver an unparalleled tactile experience."
        />
      </div>
    </section>
  );
};

export default EditorialSection;
