import React, { useEffect } from 'react'
import  {Swiper,useSwiper,SwiperSlide} from 'swiper/react';
import 'swiper/css';
import styles from './Carousel.module.css';
import { Navigation} from 'swiper/modules';
import CarouselLeftNavigation from './CarouselLeftNavigation/CarouselLeftNavigation';
import CarouselRightNavigation from './CarouselRightNavigation/CarousalRightNavigation';


const Controls = ({data}) => {
   const swiper = useSwiper();

   useEffect(()=>{
    swiper.slideTo(0);
   },[data])

   return <></>
}
const Carousel = ({data, renderCardComponent}) => {
  return (
    <div  className={styles.wrapper}>
        <Swiper initialSlide={0} module={Navigation} slidesPerView={"auto"} spaceBetween={40} allowTouchMove>
           <Controls data={data}/>
           <CarouselLeftNavigation/>
           <CarouselRightNavigation/>
           {
            data.map((item)=>(
                <SwiperSlide>{renderCardComponent(item)}</SwiperSlide>
            ))
           }
        </Swiper>
    </div>
  )
}

export default Carousel;
