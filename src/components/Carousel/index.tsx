import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface CarouselProps {
  data: any[];
  numberOfSlide?: number;
  component: (item: any) => React.ReactElement;
  type: "Category";
}

const Carousel = ({ data, numberOfSlide = 1, component, type }: CarouselProps) => {
  const [groupedData, setGroupedData] = useState<any[][]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const chunkSize = isMobile ? 8 : 14;
    const newGroupedData = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      newGroupedData.push(data.slice(i, i + chunkSize));
    }
    setGroupedData(newGroupedData);
  }, [data, isMobile]);

  return (
    <Swiper
      navigation={!isMobile} // Hide navigation on mobile
      slidesPerView={numberOfSlide}
      modules={[Navigation]}
      className="carousel-container"
    >
      {type === "Category" &&
        groupedData.map((group, groupIndex) => (
          <SwiperSlide key={groupIndex}>
            <div className={`grid ${isMobile ? "grid-cols-4" : "grid-cols-4 md:grid-cols-7"}`}>
              {group.map((item, index) => (
                <React.Fragment key={index}>{component(item)}</React.Fragment>
              ))}
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Carousel;
