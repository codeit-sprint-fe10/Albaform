'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import IconEllipse480 from '@/public/icons/ellipse-480.svg';
import IconEllipse481 from '@/public/icons/ellipse-481.svg';
import { Alba } from '@/types/alba';

type CarouselProps = Pick<Alba, 'imageUrls'>;

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

  const handleIndicatorClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[260px] lg:h-[560px]">
      <Image
        src={imageUrls[currentSlide]}
        alt=""
        fill
        className="object-cover xl:rounded-lg"
      />
      <div className="hidden lg:block absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex justify-between items-center gap-[15px]">
          {imageUrls.map((url, index) =>
            index === currentSlide ? (
              <button
                type="button"
                key={url}
                onClick={() => handleIndicatorClick(index)}
                aria-label={`${index + 1}번 사진보기`}
              >
                <IconEllipse480 />
              </button>
            ) : (
              <button
                type="button"
                key={url}
                onClick={() => handleIndicatorClick(index)}
                aria-label={`${index + 1}번 사진보기`}
              >
                <IconEllipse481 />
              </button>
            ),
          )}
        </div>
      </div>
      <div className="text-gray-100 text-xs lg:text-2lg font-regular absolute bottom-3 lg:bottom-4 right-3 lg:right-4 bg-[rgba(0,0,0,0.2)] rounded-3xl flex justify-center gap-1 lg:gap-2 px-2.5 lg:px-4 py-0.5 lg:py-2">
        <span className="font-semibold">{currentSlide + 1}</span>
        <span>/</span>
        <span>{imageUrls.length}</span>
      </div>
      <button
        onClick={goToPreviousSlide}
        className="absolute left-0 top-0 w-10 lg:w-20 h-full text-black-200 font-bold text-2xl lg:text-3xl"
        aria-label="이전 이미지 보기"
      >
        &lt;
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-0 top-0 w-10 lg:w-20 h-full text-black-200 font-bold text-2xl lg:text-3xl "
        aria-label="다음 이미지 보기"
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
