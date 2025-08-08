import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
  return (
    <div className="relative mt-24 overflow-hidden font-[Poppins]">
   
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="w-full hidden md:block object-cover max-h-[80vh]"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="w-full md:hidden object-cover max-h-[60vh]"
      />

      
      <div className="absolute inset-0 flex flex-col items-center md:items-end justify-end md:justify-center pt-16 md:pt-0 md:pr-24 pb-12 bg-gradient-to-t from-white/95 via-white/70 to-transparent">
        <div className="bg-white/90 p-6 md:p-8 rounded-3xl shadow-2xl backdrop-blur-md max-w-lg w-[90%] animate-fadeInUp space-y-5 transition-all duration-500">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-4 text-center md:text-right leading-snug tracking-tight drop-shadow-sm">
            Why We Are the Best?
          </h1>

          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-100/60 transition duration-300 group"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-10 h-10 md:w-12 md:h-12 drop-shadow-lg transition-transform group-hover:scale-105"
              />
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out both;
        }
      `}</style>
    </div>
  )
}

export default BottomBanner
