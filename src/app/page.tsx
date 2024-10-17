"use client";

import React, { useState } from "react";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import heroImage1 from "../../public/Images/5_WebBanner_1920x1080_4eacfb85-fcb6-4205-9741-ed79d7545780_1400x.webp";
import heroImage2 from "../../public/Images/3_WebBanner_1920x1080_76a24f61-cdd7-482b-ab80-52a350547e6b_1400x.webp";
import product1 from "../../public/Images/525eebd82dd31d96fd518e97e5234fe0_78eb7754-39e4-4adc-b66c-acbaa089bfe7.webp";
import track1 from "../../public/Images/pantTracks.png";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper/modules";

type SegmentKey = "newDrops" | "mostTrending";

export default function Home() {
  const [activeSegment, setActiveSegment] = useState<SegmentKey>("newDrops");

  const segments = {
    newDrops: {
      title: "New Drops",
    },
    mostTrending: {
      title: "Most Trending",
    },
  };

  return (
    <main className="max-[1024px]:mt-[77px] relative">
      <Header />
      <div className="container mx-auto xl:max-w-7xl">
        <div className="rounded-[20px] overflow-hidden">
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            modules={[Pagination, EffectFade]}
            pagination={true}
            effect={"fade"}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <div>
                <Image src={heroImage1} alt="heroImage1"></Image>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Image src={heroImage2} alt="heroImage2"></Image>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="py-10">
          <div className="flex justify-center items-center gap-2 py-7">
            {Object.keys(segments).map((key: string) => (
              <button
                key={key}
                onClick={() => setActiveSegment(key as SegmentKey)}
                className={`py-1 px-10 rounded-[20px] border border-black ${
                  activeSegment === key
                    ? "text-white bg-black"
                    : " text-black bg-white"
                }`}
              >
                {segments[key as SegmentKey].title}
              </button>
            ))}
          </div>
          {activeSegment === "newDrops" ? (
            <div className="trending-swiper">
              <Swiper
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 5 },
                  480: { slidesPerView: 1, spaceBetween: 5 },
                  768: { slidesPerView: 2.3, spaceBetween: 10 },
                  1024: { slidesPerView: 4.3, spaceBetween: 12 },
                }}
                modules={[Navigation]}
                navigation={true}
              >
                <SwiperSlide>
                  <div className="productImage rounded-[12px] overflow-hidden">
                    <Image src={product1} alt="product1"></Image>
                  </div>
                  <div className="pt-3">
                    <div>
                      <div className="font-bold">Blue Oversized T-shirt</div>
                      <div className="text-[#999] text-[14px]">
                        Blue Oversized T-shirt
                      </div>
                    </div>
                    <div className="text-[#000] text-[16px] py-2">$99.99</div>
                    <div className="text-[#999] text-[14px]">
                      Color: <span className="text-[#000]">Black</span>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="productImage rounded-[12px] overflow-hidden">
                    <Image src={product1} alt="product1"></Image>
                  </div>
                  <div className="pt-3">
                    <div>
                      <div className="font-bold">Blue Oversized T-shirt</div>
                      <div className="text-[#999] text-[14px]">
                        Blue Oversized T-shirt
                      </div>
                    </div>
                    <div className="text-[#000] text-[16px] py-2">$99.99</div>
                    <div className="text-[#999] text-[14px]">
                      Color: <span className="text-[#000]">Black</span>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="productImage rounded-[12px] overflow-hidden">
                    <Image src={product1} alt="product1"></Image>
                  </div>
                  <div className="pt-3">
                    <div>
                      <div className="font-bold">Blue Oversized T-shirt</div>
                      <div className="text-[#999] text-[14px]">
                        Blue Oversized T-shirt
                      </div>
                    </div>
                    <div className="text-[#000] text-[16px] py-2">$99.99</div>
                    <div className="text-[#999] text-[14px]">
                      Color: <span className="text-[#000]">Black</span>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="productImage rounded-[12px] overflow-hidden">
                    <Image src={product1} alt="product1"></Image>
                  </div>
                  <div className="pt-3">
                    <div>
                      <div className="font-bold">Blue Oversized T-shirt</div>
                      <div className="text-[#999] text-[14px]">
                        Blue Oversized T-shirt
                      </div>
                    </div>
                    <div className="text-[#000] text-[16px] py-2">$99.99</div>
                    <div className="text-[#999] text-[14px]">
                      Color: <span className="text-[#000]">Black</span>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="productImage rounded-[12px] overflow-hidden">
                    <Image src={product1} alt="product1"></Image>
                  </div>
                  <div className="pt-3">
                    <div>
                      <div className="font-bold">Blue Oversized T-shirt</div>
                      <div className="text-[#999] text-[14px]">
                        Blue Oversized T-shirt
                      </div>
                    </div>
                    <div className="text-[#000] text-[16px] py-2">$99.99</div>
                    <div className="text-[#999] text-[14px]">
                      Color: <span className="text-[#000]">Black</span>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          ) : (
            <>
              <div className="trending-swiper">
                <Swiper
                  breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 5 },
                    480: { slidesPerView: 1, spaceBetween: 5 },
                    768: { slidesPerView: 2.3, spaceBetween: 10 },
                    1024: { slidesPerView: 4.3, spaceBetween: 12 },
                  }}
                  modules={[Navigation]}
                  navigation={true}
                >
                  <SwiperSlide>
                    <div className="productImage rounded-[12px] overflow-hidden">
                      <Image src={product1} alt="product1"></Image>
                    </div>
                    <div className="pt-3">
                      <div>
                        <div className="font-bold">Blue Oversized T-shirt</div>
                        <div className="text-[#999] text-[14px]">
                          Blue Oversized T-shirt
                        </div>
                      </div>
                      <div className="text-[#000] text-[16px] py-2">$99.99</div>
                      <div className="text-[#999] text-[14px]">
                        Color: <span className="text-[#000]">Black</span>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="productImage rounded-[12px] overflow-hidden">
                      <Image src={product1} alt="product1"></Image>
                    </div>
                    <div className="pt-3">
                      <div>
                        <div className="font-bold">Blue Oversized T-shirt</div>
                        <div className="text-[#999] text-[14px]">
                          Blue Oversized T-shirt
                        </div>
                      </div>
                      <div className="text-[#000] text-[16px] py-2">$99.99</div>
                      <div className="text-[#999] text-[14px]">
                        Color: <span className="text-[#000]">Black</span>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="productImage rounded-[12px] overflow-hidden">
                      <Image src={product1} alt="product1"></Image>
                    </div>
                    <div className="pt-3">
                      <div>
                        <div className="font-bold">Blue Oversized T-shirt</div>
                        <div className="text-[#999] text-[14px]">
                          Blue Oversized T-shirt
                        </div>
                      </div>
                      <div className="text-[#000] text-[16px] py-2">$99.99</div>
                      <div className="text-[#999] text-[14px]">
                        Color: <span className="text-[#000]">Black</span>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="productImage rounded-[12px] overflow-hidden">
                      <Image src={product1} alt="product1"></Image>
                    </div>
                    <div className="pt-3">
                      <div>
                        <div className="font-bold">Blue Oversized T-shirt</div>
                        <div className="text-[#999] text-[14px]">
                          Blue Oversized T-shirt
                        </div>
                      </div>
                      <div className="text-[#000] text-[16px] py-2">$99.99</div>
                      <div className="text-[#999] text-[14px]">
                        Color: <span className="text-[#000]">Black</span>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </>
          )}
        </div>
        <div className="py-10">
          <div className="mb-8 text-[30px] font-medium text-center">
            Perfect Apparels Collection
          </div>
          <div className="flex justify-center flex-wrap items-center gap-5 w-full">
            <div className="flex-1 flex justify-start items-center bg-[url('../../public/Images/how-should-a-t-shirt-fit.png')] bg-cover px-20 py-24 rounded-[16px]">
              <div>
                <h1 className="text-3xl font-bold mb-4 text-white">T-Shirt</h1>
                <p className="mb-6 w-72 text-white">
                  T-shirts are a versatile and essential part of any wardrobe,
                  known for their comfort and adaptability.
                </p>
                <button className="bg-black text-white px-6 py-2 rounded-full">
                  Show Catagories
                </button>
              </div>
            </div>
            <div className="flex-1 flex justify-start items-center bg-[url('../../public/Images/track-pants.png')] bg-cover px-20 py-24 rounded-[16px]">
              <div>
                <h1 className="text-3xl font-bold mb-4">Track Pants</h1>
                <p className="mb-6 w-72">
                  Track pants are a popular type of athletic wear, often made of
                  soft, stretchy materials like polyester, cotton blends, or
                  fleece.
                </p>
                <button className="bg-black text-white px-6 py-2 rounded-full">
                  Show Catagories
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="py-10">
          <div className="mb-8 text-[30px] font-medium text-center">
            Trending T-Shirt Collection
          </div>
          <div className="trending-swiper">
            <Swiper
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 5 },
                480: { slidesPerView: 1, spaceBetween: 5 },
                768: { slidesPerView: 2.3, spaceBetween: 10 },
                1024: { slidesPerView: 4.3, spaceBetween: 12 },
              }}
              modules={[Navigation]}
              navigation={true}
            >
              <SwiperSlide>
                <div className="productImage rounded-[12px] overflow-hidden">
                  <Image src={product1} alt="product1"></Image>
                </div>
                <div className="pt-3">
                  <div>
                    <div className="font-bold">Blue Oversized T-shirt</div>
                    <div className="text-[#999] text-[14px]">
                      Blue Oversized T-shirt
                    </div>
                  </div>
                  <div className="text-[#000] text-[16px] py-2">$99.99</div>
                  <div className="text-[#999] text-[14px]">
                    Color: <span className="text-[#000]">Black</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="productImage rounded-[12px] overflow-hidden">
                  <Image src={product1} alt="product1"></Image>
                </div>
                <div className="pt-3">
                  <div>
                    <div className="font-bold">Blue Oversized T-shirt</div>
                    <div className="text-[#999] text-[14px]">
                      Blue Oversized T-shirt
                    </div>
                  </div>
                  <div className="text-[#000] text-[16px] py-2">$99.99</div>
                  <div className="text-[#999] text-[14px]">
                    Color: <span className="text-[#000]">Black</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="productImage rounded-[12px] overflow-hidden">
                  <Image src={product1} alt="product1"></Image>
                </div>
                <div className="pt-3">
                  <div>
                    <div className="font-bold">Blue Oversized T-shirt</div>
                    <div className="text-[#999] text-[14px]">
                      Blue Oversized T-shirt
                    </div>
                  </div>
                  <div className="text-[#000] text-[16px] py-2">$99.99</div>
                  <div className="text-[#999] text-[14px]">
                    Color: <span className="text-[#000]">Black</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="productImage rounded-[12px] overflow-hidden">
                  <Image src={product1} alt="product1"></Image>
                </div>
                <div className="pt-3">
                  <div>
                    <div className="font-bold">Blue Oversized T-shirt</div>
                    <div className="text-[#999] text-[14px]">
                      Blue Oversized T-shirt
                    </div>
                  </div>
                  <div className="text-[#000] text-[16px] py-2">$99.99</div>
                  <div className="text-[#999] text-[14px]">
                    Color: <span className="text-[#000]">Black</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="productImage rounded-[12px] overflow-hidden">
                  <Image src={product1} alt="product1"></Image>
                </div>
                <div className="pt-3">
                  <div>
                    <div className="font-bold">Blue Oversized T-shirt</div>
                    <div className="text-[#999] text-[14px]">
                      Blue Oversized T-shirt
                    </div>
                  </div>
                  <div className="text-[#000] text-[16px] py-2">$99.99</div>
                  <div className="text-[#999] text-[14px]">
                    Color: <span className="text-[#000]">Black</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="productImage rounded-[12px] overflow-hidden">
                  <Image src={product1} alt="product1"></Image>
                </div>
                <div className="pt-3">
                  <div>
                    <div className="font-bold">Blue Oversized T-shirt</div>
                    <div className="text-[#999] text-[14px]">
                      Blue Oversized T-shirt
                    </div>
                  </div>
                  <div className="text-[#000] text-[16px] py-2">$99.99</div>
                  <div className="text-[#999] text-[14px]">
                    Color: <span className="text-[#000]">Black</span>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="py-10">
          <div className="mb-8 text-[30px] font-medium text-center">
            Trending Track Pants Collection
          </div>
          <div className="trending-swiper">
            <Swiper
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 5 },
                480: { slidesPerView: 1, spaceBetween: 5 },
                768: { slidesPerView: 2.3, spaceBetween: 10 },
                1024: { slidesPerView: 4.3, spaceBetween: 12 },
              }}
              modules={[Navigation]}
              navigation={true}
            >
              <SwiperSlide>
                <div className="productImage rounded-[12px] overflow-hidden">
                  <Image src={track1} alt="track1"></Image>
                </div>
                <div className="pt-3">
                  <div>
                    <div className="font-bold">Blue Oversized T-shirt</div>
                    <div className="text-[#999] text-[14px]">
                      Blue Oversized T-shirt
                    </div>
                  </div>
                  <div className="text-[#000] text-[16px] py-2">$99.99</div>
                  <div className="text-[#999] text-[14px]">
                    Color: <span className="text-[#000]">Gray</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="productImage rounded-[12px] overflow-hidden">
                  <Image src={track1} alt="track1"></Image>
                </div>
                <div className="pt-3">
                  <div>
                    <div className="font-bold">Blue Oversized T-shirt</div>
                    <div className="text-[#999] text-[14px]">
                      Blue Oversized T-shirt
                    </div>
                  </div>
                  <div className="text-[#000] text-[16px] py-2">$99.99</div>
                  <div className="text-[#999] text-[14px]">
                    Color: <span className="text-[#000]">Gray</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="productImage rounded-[12px] overflow-hidden">
                  <Image src={track1} alt="track1"></Image>
                </div>
                <div className="pt-3">
                  <div>
                    <div className="font-bold">Blue Oversized T-shirt</div>
                    <div className="text-[#999] text-[14px]">
                      Blue Oversized T-shirt
                    </div>
                  </div>
                  <div className="text-[#000] text-[16px] py-2">$99.99</div>
                  <div className="text-[#999] text-[14px]">
                    Color: <span className="text-[#000]">Gray</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="productImage rounded-[12px] overflow-hidden">
                  <Image src={track1} alt="track1"></Image>
                </div>
                <div className="pt-3">
                  <div>
                    <div className="font-bold">Blue Oversized T-shirt</div>
                    <div className="text-[#999] text-[14px]">
                      Blue Oversized T-shirt
                    </div>
                  </div>
                  <div className="text-[#000] text-[16px] py-2">$99.99</div>
                  <div className="text-[#999] text-[14px]">
                    Color: <span className="text-[#000]">Gray</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="productImage rounded-[12px] overflow-hidden">
                  <Image src={track1} alt="track1"></Image>
                </div>
                <div className="pt-3">
                  <div>
                    <div className="font-bold">Blue Oversized T-shirt</div>
                    <div className="text-[#999] text-[14px]">
                      Blue Oversized T-shirt
                    </div>
                  </div>
                  <div className="text-[#000] text-[16px] py-2">$99.99</div>
                  <div className="text-[#999] text-[14px]">
                    Color: <span className="text-[#000]">Gray</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="productImage rounded-[12px] overflow-hidden">
                  <Image src={track1} alt="track1"></Image>
                </div>
                <div className="pt-3">
                  <div>
                    <div className="font-bold">Blue Oversized T-shirt</div>
                    <div className="text-[#999] text-[14px]">
                      Blue Oversized T-shirt
                    </div>
                  </div>
                  <div className="text-[#000] text-[16px] py-2">$99.99</div>
                  <div className="text-[#999] text-[14px]">
                    Color: <span className="text-[#000]">Gray</span>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
