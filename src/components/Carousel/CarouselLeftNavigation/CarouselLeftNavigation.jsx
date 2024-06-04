import React, {useEffect, useState}from 'react'
import {useSwiper} from 'swiper/react';
import styles from './CarouselLeftNavigation.module.css';
import {ReactComponent as LeftArrow} from '../../../assets/LeftArrow.svg';
const CarouselLeftNavigation = () => {
    const swiper = useSwiper();
    const [isBegining,setIsBegining] = useState(swiper.isBeginning);
   
    useEffect(() => {
      swiper.on("slideChange",() => {
        setIsBegining(swiper.isBeginning)
      })
    },[]);
  return (
    <div className={styles.leftNavigation}>
      {!isBegining && <LeftArrow onClick={() => swiper.slidePrev()}/>}
    </div>
  )
}

export default CarouselLeftNavigation
