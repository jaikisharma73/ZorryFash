import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const SplitImageSection2 = () => {
  return (
    <section className="relative w-full min-h-[120vh] flex flex-col md:flex-row">
      {/* left */}
      <Link to="/product/6a0eebc9596a0ffbb99c486f" onClick={() => window.scrollTo(0, 0)} className="relative block w-full md:w-1/2 h-[70vh] md:h-auto cursor-pointer group">
        <img
          src={assets.g1}
          alt="Editorial split left"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md px-3 py-1.5 text-[9px] md:text-[10px] font-sans tracking-widest text-black uppercase">
          ₹2999
        </div>
      </Link>

      {/* right */}
      <Link to="/product/6a0eebc9596a0ffbb99c486f" onClick={() => window.scrollTo(0, 0)} className="relative block w-full md:w-1/2 h-[70vh] md:h-auto cursor-pointer group">
        <img
          src={assets.g2}
          alt="Editorial split right"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md px-3 py-1.5 text-[9px] md:text-[10px] font-sans tracking-widest text-black uppercase">
          ₹2999
        </div>
      </Link>
    </section>
  );
};

export default SplitImageSection2;
