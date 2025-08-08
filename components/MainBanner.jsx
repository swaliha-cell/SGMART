import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const MainBanner = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const endTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative h-[70vh] md:h-[80vh] bg-cover bg-center font-[Poppins] flex items-center"
      style={{
        backgroundImage: `url(${assets.new_main_banner})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
     
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent z-10" />

      <div className="relative z-20 px-6 md:px-16 lg:px-28 text-white max-w-3xl space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg animate-fadeInUp">
          Freshness You Can Trust,
          <br />
          <span className="text-green-400">Savings You'll Love!</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 font-medium animate-fadeInUp delay-100">
          🕒 Hurry! Sale ends in:
          <span className="ml-2 font-semibold text-white bg-black/30 px-4 py-1 rounded-full">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 animate-fadeInUp delay-200">
          <Link
            to="/products"
            className="group flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm rounded-full shadow-lg transition-all duration-300"
          >
            Shop Now
            <img
              src={assets.white_arrow_icon}
              alt="arrow"
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            />
          </Link>

          <Link
            to="/products"
            className="group flex items-center gap-2 px-6 py-3 bg-white hover:bg-white/90 text-gray-900 font-semibold text-sm rounded-full shadow-lg transition-all duration-300"
          >
            Explore Deals
            <img
              src={assets.black_arrow_icon}
              alt="arrow"
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>

     
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out both;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
};

export default MainBanner;












