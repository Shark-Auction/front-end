import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./imageSlide.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Image } from "antd";

interface ImageSlideProps {
  image: string[];
}

export default function ImageSlide({ image }: ImageSlideProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="imageSlide2"
      >
        {image?.map((element: string, index: number) => (
          <SwiperSlide key={index}>
            <Image src={element} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="imageSlide"
      >
        {image?.map((element: string, index: number) => (
          <SwiperSlide className="cursor-pointer" key={index}>
            <img src={element} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
