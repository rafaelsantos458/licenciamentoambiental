import React from 'react';

// Specialized SVG replicas of the real client logos for maximum visual fidelity

export const AdlerLogo = ({ className = "h-auto" }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <img
      src="https://res.cloudinary.com/dgzkksdzi/image/upload/v1780103391/adler_rbdq13.webp"
      alt="Adler Andaimes e Escoramentos"
      className="h-5 xs:h-7 sm:h-10 md:h-12 w-auto object-contain max-w-full"
      referrerPolicy="no-referrer"
    />
  </div>
);

export const BrascabosLogo = ({ className = "h-auto" }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <img
      src="https://res.cloudinary.com/dgzkksdzi/image/upload/v1780103943/brascobos_rzjggz.webp"
      alt="Brascabos"
      className="h-5 xs:h-7 sm:h-10 md:h-12 w-auto object-contain max-w-full"
      referrerPolicy="no-referrer"
    />
  </div>
);

export const MontcalmLogo = ({ className = "h-auto" }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <img
      src="https://res.cloudinary.com/dgzkksdzi/image/upload/v1780104099/montcalm_wfdpya.webp"
      alt="Montcalm"
      className="h-5 xs:h-7 sm:h-10 md:h-12 w-auto object-contain max-w-full"
      referrerPolicy="no-referrer"
    />
  </div>
);

export const BentomarLogo = ({ className = "h-auto" }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <img
      src="https://res.cloudinary.com/dgzkksdzi/image/upload/v1780103721/bentomar_ddg1bn.webp"
      alt="Bentomar"
      className="h-5 xs:h-7 sm:h-10 md:h-12 w-auto object-contain max-w-full"
      referrerPolicy="no-referrer"
    />
  </div>
);

export const DnvLogo = ({ className = "h-auto" }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <img
      src="https://res.cloudinary.com/dgzkksdzi/image/upload/v1780104026/dnv_jwv6zf.webp"
      alt="DNV"
      className="h-5 xs:h-7 sm:h-10 md:h-12 w-auto object-contain max-w-full"
      referrerPolicy="no-referrer"
    />
  </div>
);

export const DecoLogo = ({ className = "h-auto" }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <img
      src="https://res.cloudinary.com/dgzkksdzi/image/upload/v1780251816/spool_brasil_vhtkik.webp"
      alt="Spool Brasil"
      className="h-5 xs:h-7 sm:h-10 md:h-12 w-auto object-contain max-w-full"
      referrerPolicy="no-referrer"
    />
  </div>
);

export default function ClientLogos() {
  return (
    <div className="grid grid-cols-6 gap-1.5 xs:gap-2.5 sm:gap-4 items-center justify-center pt-2 w-full">
      
      {/* Adler card */}
      <div className="bg-white rounded-lg xs:rounded-2xl sm:rounded-3xl p-1 sm:p-4 flex flex-col items-center justify-center h-10 xs:h-14 sm:h-24 md:h-28 shadow-md border border-slate-100 transition-transform duration-300 hover:scale-[1.03]">
        <AdlerLogo />
      </div>

      {/* Bentomar card */}
      <div className="bg-white rounded-lg xs:rounded-2xl sm:rounded-3xl p-1 sm:p-4 flex flex-col items-center justify-center h-10 xs:h-14 sm:h-24 md:h-28 shadow-md border border-slate-100 transition-transform duration-300 hover:scale-[1.03]">
        <BentomarLogo />
      </div>

      {/* Brascobos card */}
      <div className="bg-white rounded-lg xs:rounded-2xl sm:rounded-3xl p-1 sm:p-4 flex flex-col items-center justify-center h-10 xs:h-14 sm:h-24 md:h-28 shadow-md border border-slate-100 transition-transform duration-300 hover:scale-[1.03]">
        <BrascabosLogo />
      </div>

      {/* DNV card */}
      <div className="bg-white rounded-lg xs:rounded-2xl sm:rounded-3xl p-1 sm:p-4 flex flex-col items-center justify-center h-10 xs:h-14 sm:h-24 md:h-28 shadow-md border border-slate-100 transition-transform duration-300 hover:scale-[1.03]">
        <DnvLogo />
      </div>

      {/* Montcalm card */}
      <div className="bg-white rounded-lg xs:rounded-2xl sm:rounded-3xl p-1 sm:p-4 flex flex-col items-center justify-center h-10 xs:h-14 sm:h-24 md:h-28 shadow-md border border-slate-100 transition-transform duration-300 hover:scale-[1.03]">
        <MontcalmLogo />
      </div>

      {/* Deco card */}
      <div className="bg-white rounded-lg xs:rounded-2xl sm:rounded-3xl p-1 sm:p-4 flex flex-col items-center justify-center h-10 xs:h-14 sm:h-24 md:h-28 shadow-md border border-slate-100 transition-transform duration-300 hover:scale-[1.03]">
        <DecoLogo />
      </div>

    </div>
  );
}
