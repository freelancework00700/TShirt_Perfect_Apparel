"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState } from "react";
import product1 from "../../../../public/Images/525eebd82dd31d96fd518e97e5234fe0_78eb7754-39e4-4adc-b66c-acbaa089bfe7.webp";
import Image from "next/image";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ProductDetail = () => {
  const id = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <main className="max-[1024px]:mt-[77px] relative">
      <Header />
      <div className="container mx-auto xl:max-w-7xl max-sm:px-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="xl:col-span-6 lg:col-span-6 col-span-12">
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              <SwiperSlide>
                <Image
                  src={product1}
                  alt="product1"
                  className="max-h-[65vh] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={product1}
                  alt="product1"
                  className="max-h-[65vh] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={product1}
                  alt="product1"
                  className="max-h-[65vh] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={product1}
                  alt="product1"
                  className="max-h-[65vh] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={product1}
                  alt="product1"
                  className="max-h-[65vh] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={product1}
                  alt="product1"
                  className="max-h-[65vh] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={product1}
                  alt="product1"
                  className="max-h-[65vh] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={product1}
                  alt="product1"
                  className="max-h-[65vh] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={product1}
                  alt="product1"
                  className="max-h-[65vh] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={product1}
                  alt="product1"
                  className="max-h-[65vh] object-cover"
                />
              </SwiperSlide>
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              <SwiperSlide>
                <Image
                  src={product1}
                  alt="product1"
                  className="max-h-[165px] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={product1}
                  alt="product1"
                  className="max-h-[165px] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={product1}
                  alt="product1"
                  className="max-h-[165px] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={product1}
                  alt="product1"
                  className="max-h-[165px] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={product1}
                  alt="product1"
                  className="max-h-[165px] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={product1}
                  alt="product1"
                  className="max-h-[165px] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={product1}
                  alt="product1"
                  className="max-h-[165px] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={product1}
                  alt="product1"
                  className="max-h-[165px] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={product1}
                  alt="product1"
                  className="max-h-[165px] object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={product1}
                  alt="product1"
                  className="max-h-[165px] object-cover"
                />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="xl:col-span-1 max-md:hidden"></div>
          <div className="xl:col-span-5 lg:col-span-5 col-span-12">
            <div className="mb-4">
              <div className="text-2xl font-semibold tracking-normal text-black font-gotham md:text-3xl">
                Novelty Town Lavender Oversized T-Shirt
              </div>
              <div className="flex items-center gap-x-2 text-xl text-gray-900 font-semibold mt-4">
                $99.99
              </div>
              <div className="text-[#999] text-[14px] ">
                (incl. of all taxes)
              </div>
            </div>
            <div className="text-[#999] text-[14px]">
              Color: <span className="text-[#000]">Black</span>
            </div>
            <div className="text-[#999] text-[14px] mt-4 pt-4 border-t border-[#ddd]">
              Select A Size
            </div>
            <div className="flex justify-start gap-2 mt-2">
              <div className="border border-black rounded-md px-3 py-2 text-sm h-[40px] w-[36px] flex justify-center items-center">
                S
              </div>
              <div className="border border-black rounded-md px-3 py-2 text-sm h-[40px] w-[36px] flex justify-center items-center">
                M
              </div>
              <div className="border border-black rounded-md px-3 py-2 text-sm h-[40px] w-[36px] flex justify-center items-center">
                L
              </div>
            </div>
            <div className="text-[#000] text-[18px] mt-4 pt-4 border-t border-[#ddd]">
              Product Details
            </div>
            <div className="flex justify-start gap-2 mt-2">
              <div className="grid grid-cols-12 w-full">
                <div className="col-span-4">
                  <div className="text-base font-semibold">Type</div>
                  <div className="text-base font-semibold">Sleeve</div>
                  <div className="text-base font-semibold">Fit</div>
                  <div className="text-base font-semibold">Fabric</div>
                  <div className="text-base font-semibold">Sales Package</div>
                  <div className="text-base font-semibold">Pack of</div>
                  <div className="text-base font-semibold">Style Code</div>
                  <div className="text-base font-semibold">Neck Type</div>
                  <div className="text-base font-semibold">Ideal For</div>
                  <div className="text-base font-semibold">Size</div>
                  <div className="text-base font-semibold">Pattern</div>
                  <div className="text-base font-semibold">Suitable For</div>
                  <div className="text-base font-semibold">Reversible</div>
                  <div className="text-base font-semibold">Fabric Care</div>
                  <div className="text-base font-semibold">Net Quantity</div>
                </div>
                <div className="col-span-8">
                  <div className="text-base font-normal">Round Neck</div>
                  <div className="text-base font-normal">Half Sleeve</div>
                  <div className="text-base font-normal">
                    Oversized, Loose, Boxy
                  </div>
                  <div className="text-base font-normal">Pure Cotton</div>
                  <div className="text-base font-normal">
                    1 Back Printed T-shirt
                  </div>
                  <div className="text-base font-normal">1</div>
                  <div className="text-base font-normal">T-29-1st</div>
                  <div className="text-base font-normal">Round Neck</div>
                  <div className="text-base font-normal">Men</div>
                  <div className="text-base font-normal">M</div>
                  <div className="text-base font-normal">Printed</div>
                  <div className="text-base font-normal">Western Wear</div>
                  <div className="text-base font-normal">No</div>
                  <div className="text-base font-normal">
                    Regular Machine Wash
                  </div>
                  <div className="text-base font-normal">1</div>
                </div>
                <div className="col-span-12 text-sm mt-6">Create a cool and lasting impression in thi hip hop, attitude, Loose fit, Round Neck, Half sleeves, printed, Oversized t-shirt, Back Printed
                  T-shirts for men. Beautifully Crafted with a cotton fabric and a trendy loose fitting, drop shoulder t-shirts.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ProductDetail;
