import { CSSProperties, useState } from "react";
// Import Swiper React components
import { SwiperSlide, Swiper } from "swiper/react";
import { type Swiper as SwiperState } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./imageSlide.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Image } from "antd";
import { getImageProduct } from "../../utils/getImage";
import { ProductImage } from "../../model/auction";

interface ImageSlideProps {
  image: ProductImage[];
}

export default function ImageSlide({ image }: ImageSlideProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperState | null>(null);
  return (
    <>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#000",
            "--swiper-pagination-color": "#000",
          } as CSSProperties
        }
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="imageSlide2"
      >
        {image?.map((element: ProductImage) => (
          <SwiperSlide key={element.id}>
            <Image className="rounded-lg" src={getImageProduct(element.url)} />
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
        {image?.map((element: ProductImage) => (
          <SwiperSlide className="cursor-pointer" key={element.id}>
            <img className="rounded-lg" src={getImageProduct(element.url)} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
