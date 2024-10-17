"use client"

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props{
  children:React.ReactNode,
  arrow?:any,
  dots?:any,
  slidetoshow?:any,
  autoplay?:any,
  sliderIndex?:number,
  setSliderIndex?:any
}

const ResponsiveCarousal = ({children,arrow,dots,slidetoshow,autoplay,sliderIndex,setSliderIndex}:Props) => {
const slider:any=useRef()

useEffect(()=>{
  console.log(sliderIndex)
  slider.current.slickGoTo(sliderIndex)
},[sliderIndex])

const handleActiveSlideIndex=(index:number)=>{
  setSliderIndex && setSliderIndex(index)
}
  const settings = {
    dots: dots,
    infinite: true,
    fade:true,
    arrows: arrow,
    speed: 500,
    autoplay: autoplay,
    autoplaySpeed: 12000,
    slidesToShow: slidetoshow,
    slidesToScroll: 1,
    centerMode:false,
    afterChange: (current: number) => handleActiveSlideIndex(current),
    responsive: [      
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <div>
       <Slider {...settings} ref={slider}>
        {children}
        </Slider>
    </div>
  )
}

export default ResponsiveCarousal