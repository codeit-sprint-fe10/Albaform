'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import IconEllipse480 from '@/public/icons/ellipse-480.svg';
import IconEllipse481 from '@/public/icons/ellipse-481.svg';
import { Recruitment } from '@/types/recruitment';

type CarouselProps = Pick<Recruitment, 'imageUrls'>;

const Carousel = ({ imageUrls }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % imageUrls.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [imageUrls.length]);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % imageUrls.length);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? imageUrls.length - 1 : prevSlide - 1,
    );
  };

  return (
    <div className="relative w-full h-[260px] lg:h-[560px]">
      <Image
        src={imageUrls[currentSlide]}
        alt=""
        fill
        className="object-cover"
      />
      <div className="hidden lg:block absolute bottom-6 left-1/2">
        <div className="flex justify-between items-center gap-[15px]">
          {imageUrls.map((url, index) =>
            index === currentSlide ? (
              <IconEllipse480 key={url} />
            ) : (
              <IconEllipse481 key={url} />
            ),
          )}
        </div>
      </div>
      <div className="text-gray-100 text-xs lg:text-2lg font-regular absolute bottom-3 lg:bottom-4 right-3 lg:right-4 bg-[rgba(0,0,0,0.2)] rounded-[100px] flex justify-center gap-[4px] lg:gap-[8px] px-[10px] lg:px-[16px] py-[2px] lg:py-[8px]">
        <span className="font-semibold">{currentSlide + 1}</span>
        <span>/</span>
        <span>{imageUrls.length}</span>
      </div>
      <button
        onClick={goToPreviousSlide}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-[rgba(0,0,0,0.5)] text-white p-2 rounded-full"
      >
        ←
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[rgba(0,0,0,0.5)] text-white p-2 rounded-full"
      >
        →
      </button>
    </div>
  );
};

export default Carousel;
