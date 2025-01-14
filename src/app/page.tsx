"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import heroImage1 from "../../public/images/5_WebBanner_1920x1080_4eacfb85-fcb6-4205-9741-ed79d7545780_1400x.webp";
import heroImage2 from "../../public/images/3_WebBanner_1920x1080_76a24f61-cdd7-482b-ab80-52a350547e6b_1400x.webp";
import heroImage3 from "../../public/images/68c34295-2ca3-4f3a-84e9-e8d8dc08.webp";
import brandPartnerImage1 from "../../public/images/PerfectApparels.png";
import brandPartnerImage2 from "../../public/images/Maa_Bhavani_Apparels.png";
import brandPartnerImage3 from "../../public/images/MBA.png";
import leaf1 from "../../public/images/leaf2.png";
import leaf2 from "../../public/images/leaf3.png";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import axios from "axios";
import { ICategories, IProduct } from "@/interface/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastContainer } from "react-toastify";

type SegmentKey = "newDrops" | "mostTrending";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [activeSegment, setActiveSegment] = useState<SegmentKey>("newDrops");
  const [product, setProduct] = useState<IProduct[]>([]);
  const router = useRouter();
  const ShirtsData = product.filter((item) => item.Category.name === "Shirts");
  const JeansPants = product.filter((item) => item.Category.name === "Jeans");
  const TrackPants = product.filter((item) => item.Category.name === "Cargo/Track-Pants");
  const Tshirt = product.filter((item) => item.Category.name === "T-Shirts");
  const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL
  const APIURL = process.env.NEXT_PUBLIC_API_URL
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [isJeansAvailable, setIsJeansAvailable] = useState(false);
  const [isShirtsAvailable, setIsShirtsAvailable] = useState(false);

  const segments = {
    newDrops: {
      title: "New Drops",
    },
    mostTrending: {
      title: "Most Trending",
    },
  };

  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(APIURL + `product`);
      const getData = response.data?.data;
      setProduct(getData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetCategory = async () => {
    const categoriesResponse = await axios.get(APIURL + "category");
    const categoriesData = categoriesResponse.data?.data;
    setCategories(categoriesData);
  }

  useEffect(() => {
    const jeansExists = categories.some(
      (category) =>
        category.name.toLowerCase().replace(/[^a-z0-9 ]/gi, "") === "jeans"
    );
    setIsJeansAvailable(jeansExists);
    const shirtsExists = categories.some(
      (category) =>
        category.name.toLowerCase().replace(/[^a-z0-9 ]/gi, "") === "shirts"
    )
    setIsShirtsAvailable(shirtsExists)
  }, [categories]);

  useEffect(() => {
    getProduct();
    handleGetCategory();
  }, []);

  const handleShowCatagories = () => {
    router.push(`/product`);
  };

  return (
    <main className="max-[1024px]:mt-[58px] relative">
      <ToastContainer />
      <Header />
      <div className="min-h-[calc(100vh_-_385px)] relative">
        <div className="absolute top-[calc(100vh_+_150px)] -left-[175px] z-0 max-lg:hidden block">
          <Image src={leaf1} alt="leaf1" className="h-[450px] w-[450px] object-contain -rotate-[140deg]"></Image>
        </div>
        <div className="absolute top-[200vh] -right-[70px] z-0 max-lg:hidden block">
          <Image src={leaf2} alt="leaf1" className="h-[300px] w-[300px] object-contain rotate-[180deg]"></Image>
        </div>
        <div className="overflow-hidden relative z-10">
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            speed={100}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, EffectFade, Autoplay]}
            pagination={true}
            effect={"fade"}
            onSlideChange={() => console.log("slide change")}
            onSwiper={() => console.log()}
          >
            <SwiperSlide>
              <div>
                <Image
                  src={heroImage2}
                  alt="heroImage2"
                  className="w-full xl:h-[calc(100vh_-_70px)] h-auto object-cover"
                ></Image>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Image
                  src={heroImage3}
                  alt="heroImage3"
                  className="w-full xl:h-[calc(100vh_-_70px)] h-auto object-cover"
                ></Image>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Image
                  src={heroImage1}
                  alt="heroImage1"
                  className="w-full xl:h-[calc(100vh_-_70px)] h-auto object-cover"
                ></Image>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="container mx-auto xl:max-w-7xl max-[1024px]:px-4 relative z-10">
          <div className="py-10 max-sm:py-2">
            <div className="flex justify-center items-center gap-2 py-7 max-sm:py-3">
              {Object.keys(segments).map((key: string) => (
                <button
                  key={key}
                  onClick={() => setActiveSegment(key as SegmentKey)}
                  className={`py-1 px-10 max-[389px]:px-5 rounded-[20px] border border-black text-lg ${activeSegment === key
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
                  {loading
                    ? [1, 2, 3, 4, 5].map((item) => (
                      <SwiperSlide key={item} className="bg-white">
                        <Skeleton className="h-[245px] w-full" />
                        <div className="py-3 px-4">
                          <Skeleton className="h-[14px] w-[180px]" />
                          <Skeleton className="h-[10px] w-[80px] mt-1" />
                          <Skeleton className="h-[20px] w-[100px] my-4" />
                          <Skeleton className="h-[14px] w-[100px]" />
                          <Skeleton className="h-[14px] w-[80px] mt-1" />
                        </div>
                      </SwiperSlide>
                    ))
                    : product
                      .filter((item) => item.inStock === true)
                      .filter((item) => item.status === segments.newDrops.title)
                      .map((item) => (
                        <SwiperSlide key={item.id}>
                          <div className="shadow-md h-full w-full m-2 rounded-lg bg-white">
                            <Link
                              href={`/product/product-details?id=${item.id}`}
                            >
                              <div className="productImage flex justify-center rounded-[12px] overflow-hidden">
                                <Image
                                  src={imageURL + `product-image/${item.ProductImages[0]?.sysFileName}`}
                                  alt={item.name}
                                  width={200}
                                  height={200}
                                  className="min-h-[245px] max-h-[245px] object-cover"
                                />
                              </div>
                              <div className="py-3 px-4">
                                <div>
                                  <div className="font-bold line-clamp-1">
                                    {item.name}
                                  </div>
                                  <div className="text-[#999] text-[14px] line-clamp-1">
                                    {item.name}
                                  </div>
                                </div>
                                <div className="text-[#000] text-[16px] py-2">
                                  ₹{item.final_price}
                                  {item.discount_price > 0 && (
                                    <>
                                      <span className="line-through text-[12px] text-[#999] ml-1">
                                        ₹{item.price}
                                      </span>
                                      <span className="text-[#3fac45] text-[12px]">
                                        {item.discount_price}% off
                                      </span>
                                    </>
                                  )}
                                </div>
                                <div className="text-[#999] text-[14px]">
                                  Color:{" "}
                                  <span className="text-[#000]">
                                    {item.Colors?.map(
                                      (item) => item.name
                                    ).join(", ")}
                                  </span>
                                </div>
                                <div className="text-[#999] text-[14px]">
                                  Size:{" "}
                                  <span className="text-[#000]">
                                    {item.Sizes.map((item) => item.name).join(
                                      " , "
                                    )}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </SwiperSlide>
                      ))}
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
                    {loading
                      ? [1, 2, 3, 4, 5].map((item) => (
                        <SwiperSlide key={item} className="bg-white">
                          <Skeleton className="h-[245px] w-full" />
                          <div className="py-3 px-4">
                            <Skeleton className="h-[14px] w-[180px]" />
                            <Skeleton className="h-[10px] w-[80px] mt-1" />
                            <Skeleton className="h-[20px] w-[100px] my-4" />
                            <Skeleton className="h-[14px] w-[100px]" />
                            <Skeleton className="h-[14px] w-[80px] mt-1" />
                          </div>
                        </SwiperSlide>
                      ))
                      : product
                        .filter((item) => item.inStock === true)
                        .filter((item) => item.status === segments.mostTrending.title)
                        .map((item) => (
                          <>
                            <SwiperSlide key={item.id}>
                              <div className="shadow-md h-full w-full m-2 rounded-lg bg-white">
                                <Link
                                  href={`/product/product-details?id=${item.id}`}
                                >
                                  <div className="productImage flex justify-center rounded-[12px] overflow-hidden ">
                                    <Image
                                      src={imageURL + `product-image/${item.ProductImages[0]?.sysFileName}`}
                                      alt={item.name}
                                      width={200}
                                      height={200}
                                      className="min-h-[245px] max-h-[245px] object-cover"
                                    />
                                  </div>
                                  <div className="py-3 px-4">
                                    <div>
                                      <div className="font-bold line-clamp-1">
                                        {item.name}
                                      </div>
                                      <div className="text-[#999] text-[14px] line-clamp-1">
                                        {item.name}
                                      </div>
                                    </div>
                                    <div className="text-[#000] text-[16px] py-2">
                                      ₹{item.final_price}
                                      {item.discount_price > 0 && (
                                        <>
                                          <span className="line-through text-[12px] text-[#999] ml-1">
                                            ₹{item.price}
                                          </span>
                                          <span className="text-[#3fac45] text-[12px]">
                                            {item.discount_price}% off
                                          </span>
                                        </>
                                      )}
                                    </div>
                                    <div className="text-[#999] text-[14px]">
                                      Color:{" "}
                                      <span className="text-[#000]">
                                        {item.Colors?.map(
                                          (item) => item.name
                                        ).join(", ")}
                                      </span>
                                    </div>
                                    <div className="text-[#999] text-[14px]">
                                      Size:{" "}
                                      <span className="text-[#000]">
                                        {item.Sizes.map(
                                          (item) => item.name
                                        ).join(" , ")}
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </SwiperSlide>
                          </>
                        ))}
                  </Swiper>
                </div>
              </>
            )}
          </div>
          <div className="py-10 max-sm:py-5">
            <div className="mb-8 text-[30px] max-sm:text-[18px] max-sm:mb-4 font-medium text-center bg-gray-100 py-2 rounded-lg">
              Perfect Apparels Collection
            </div>
            <div className="flex justify-center flex-wrap items-center gap-5 w-full">
              <div
                className="flex-1 flex justify-start items-center 
              bg-[url('../../public/images/how-should-a-t-shirt-fit.png')] bg-cover px-20 max-lg:px-5 py-24 max-lg:py-5 rounded-[16px]"
              >
                <div>
                  <h1 className="text-3xl max-sm:text-[20px] max-sm:mb-2 font-bold mb-4 text-white">
                    T-Shirt
                  </h1>
                  <p className="mb-6 w-72 text-white max-sm:text-[16px]">
                    T-shirts are a versatile and essential part of any wardrobe,
                    known for their comfort and adaptability.
                  </p>
                  <button
                    className="bg-black text-white px-6 max-sm:py-1 py-2 rounded-full"
                    onClick={() => handleShowCatagories()}
                  >
                    Show Catagories
                  </button>
                </div>
              </div>
              <div
                className="flex-1 flex justify-start items-center 
              bg-[url('../../public/images/track-pants.png')] bg-cover px-20 max-lg:px-5 py-24 max-lg:py-5 rounded-[16px]"
              >
                <div>
                  <h1 className="text-3xl max-sm:text-[20px] max-sm:mb-2 font-bold mb-4">Cargo/Track Pants</h1>
                  <p className="mb-6 w-72 max-sm:text-[16px]">
                    Cargo/Track pants are a popular type of athletic wear, often made
                    of soft, stretchy materials like polyester, cotton blends,
                    or fleece.
                  </p>
                  <button
                    className="bg-black text-white px-6 max-sm:py-1 py-2 rounded-full"
                    onClick={() => handleShowCatagories()}
                  >
                    Show Catagories
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="py-10 max-sm:py-5">
            <div className="mb-8 text-[30px] max-sm:text-[18px] max-sm:mb-4 font-medium text-center bg-gray-100 py-2 rounded-lg">
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
                {loading
                  ? [1, 2, 3, 4, 5].map((item) => (
                    <SwiperSlide key={item} className="bg-white">
                      <Skeleton className="h-[245px] w-full" />
                      <div className="py-3 px-4">
                        <Skeleton className="h-[14px] w-[180px]" />
                        <Skeleton className="h-[10px] w-[80px] mt-1" />
                        <Skeleton className="h-[20px] w-[100px] my-4" />
                        <Skeleton className="h-[14px] w-[100px]" />
                        <Skeleton className="h-[14px] w-[80px] mt-1" />
                      </div>
                    </SwiperSlide>
                  ))
                  : Tshirt.filter((item) => item.inStock === true)
                    .map((item) => (
                      <>
                        <SwiperSlide key={item.id}>
                          <div className="shadow-md h-full w-full m-2 rounded-lg bg-white">
                            <Link
                              href={`/product/product-details?id=${item.id}`}
                            >
                              <div className="productImage flex justify-center rounded-[12px] overflow-hidden">
                                <Image
                                  src={imageURL + `product-image/${item.ProductImages[0]?.sysFileName}`}
                                  alt={item.name}
                                  width={200}
                                  height={200}
                                  className="min-h-[245px] max-h-[245px] object-cover"
                                />
                              </div>
                              <div className="py-3 px-4">
                                <div>
                                  <div className="font-bold line-clamp-1">
                                    {item.name}
                                  </div>
                                  <div className="text-[#999] text-[14px] line-clamp-1">
                                    {item.fit}
                                  </div>
                                </div>
                                <div className="text-[#000] text-[16px] py-2">
                                  ₹{item.final_price}
                                  {item.discount_price > 0 && (
                                    <>
                                      <span className="line-through text-[12px] text-[#999] ml-1">
                                        ₹{item.price}
                                      </span>
                                      <span className="text-[#3fac45] text-[12px]">
                                        {item.discount_price}% off
                                      </span>
                                    </>
                                  )}
                                </div>
                                <div className="text-[#999] text-[14px]">
                                  Color:{" "}
                                  <span className="text-[#000]">
                                    {item.Colors?.map((item) => item.name).join(
                                      ", "
                                    )}
                                  </span>
                                </div>
                                <div className="text-[#999] text-[14px]">
                                  Size:{" "}
                                  <span className="text-[#000]">
                                    {item.Sizes.map((item) => item.name).join(
                                      " , "
                                    )}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </SwiperSlide>
                      </>
                    ))}
              </Swiper>
            </div>
          </div>
          <div className="py-10 max-sm:py-5">
            <div className="mb-8 text-[30px] max-sm:text-[18px] max-sm:mb-4 font-medium text-center bg-gray-100 py-2 rounded-lg">
              Trending Cargo Pants Collection
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
                {loading
                  ? [1, 2, 3, 4, 5].map((item) => (
                    <SwiperSlide key={item} className="bg-white">
                      <Skeleton className="h-[245px] w-full" />
                      <div className="py-3 px-4">
                        <Skeleton className="h-[14px] w-[180px]" />
                        <Skeleton className="h-[10px] w-[80px] mt-1" />
                        <Skeleton className="h-[20px] w-[100px] my-4" />
                        <Skeleton className="h-[14px] w-[100px]" />
                        <Skeleton className="h-[14px] w-[80px] mt-1" />
                      </div>
                    </SwiperSlide>
                  ))
                  : TrackPants.filter((val) => val.inStock === true)
                    .map((item, index) => {
                      return (
                        <>
                          <SwiperSlide>
                            <div className="shadow-md h-full w-full m-2 rounded-lg bg-white">
                              <Link
                                href={`/product/product-details?id=${item.id}`}
                              >
                                <div
                                  key={index}
                                  className="productImage flex justify-center rounded-[12px] overflow-hidden"
                                >
                                  <Image
                                    src={imageURL + `product-image/${item.ProductImages[0]?.sysFileName}`}
                                    alt="track1"
                                    width={200}
                                    height={200}
                                    className="min-h-[245px] max-h-[245px] object-cover"
                                  ></Image>
                                </div>
                                <div className="py-3 px-4">
                                  <div>
                                    <div className="font-bold line-clamp-1">
                                      {item.name}
                                    </div>
                                    <div className="text-[#999] text-[14px] line-clamp-1">
                                      {item.fit}
                                    </div>
                                  </div>
                                  <div className="text-[#000] text-[16px] py-2">
                                    ₹{item.final_price}
                                    {item.discount_price > 0 && (
                                      <>
                                        <span className="line-through text-[12px] text-[#999] ml-1">
                                          ₹{item.price}
                                        </span>
                                        <span className="text-[#3fac45] text-[12px]">
                                          {item.discount_price}% off
                                        </span>
                                      </>
                                    )}
                                  </div>
                                  <div className="text-[#999] text-[14px]">
                                    Color:{" "}
                                    <span className="text-[#000]">
                                      {item.Colors?.map(
                                        (item) => item.name
                                      ).join(", ")}
                                    </span>
                                  </div>
                                  <div className="text-[#999] text-[14px]">
                                    Size:{" "}
                                    <span className="text-[#000]">
                                      {item.Sizes?.map(
                                        (item) => item.name
                                      ).join(",")}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </SwiperSlide>
                        </>
                      );
                    })}
              </Swiper>
            </div>
          </div>
          {isJeansAvailable && (
            <div className="py-10 max-sm:py-5">
              <div className="mb-8 text-[30px] max-sm:text-[18px] max-sm:mb-4 font-medium text-center bg-gray-100 py-2 rounded-lg">
                Trending Jeans Pants Collection
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
                  {loading
                    ? [1, 2, 3, 4, 5].map((item) => (
                      <SwiperSlide key={item} className="bg-white">
                        <Skeleton className="h-[245px] w-full" />
                        <div className="py-3 px-4">
                          <Skeleton className="h-[14px] w-[180px]" />
                          <Skeleton className="h-[10px] w-[80px] mt-1" />
                          <Skeleton className="h-[20px] w-[100px] my-4" />
                          <Skeleton className="h-[14px] w-[100px]" />
                          <Skeleton className="h-[14px] w-[80px] mt-1" />
                        </div>
                      </SwiperSlide>
                    ))
                    : JeansPants.filter((val) => val.inStock === true).map(
                      (item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <div className="shadow-md h-full w-full m-2 rounded-lg bg-white">
                              <Link
                                href={`/product/product-details?id=${item.id}`}
                              >
                                <div className="productImage flex justify-center rounded-[12px] overflow-hidden">
                                  <Image
                                    src={
                                      imageURL +
                                      `product-image/${item.ProductImages[0]?.sysFileName}`
                                    }
                                    alt="track1"
                                    width={200}
                                    height={200}
                                    className="min-h-[245px] max-h-[245px] object-cover"
                                  ></Image>
                                </div>
                                <div className="py-3 px-4">
                                  <div>
                                    <div className="font-bold line-clamp-1">
                                      {item.name}
                                    </div>
                                    <div className="text-[#999] text-[14px] line-clamp-1">
                                      {item.fit}
                                    </div>
                                  </div>
                                  <div className="text-[#000] text-[16px] py-2">
                                    ₹{item.final_price}
                                    {item.discount_price > 0 && (
                                      <>
                                        <span className="line-through text-[12px] text-[#999] ml-1">
                                          ₹{item.price}
                                        </span>
                                        <span className="text-[#3fac45] text-[12px]">
                                          {item.discount_price}% off
                                        </span>
                                      </>
                                    )}
                                  </div>
                                  <div className="text-[#999] text-[14px]">
                                    Color:{" "}
                                    <span className="text-[#000]">
                                      {item.Colors?.map(
                                        (item) => item.name
                                      ).join(", ")}
                                    </span>
                                  </div>
                                  <div className="text-[#999] text-[14px]">
                                    Size:{" "}
                                    <span className="text-[#000]">
                                      {item.Sizes?.map(
                                        (item) => item.name
                                      ).join(",")}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </SwiperSlide>
                        );
                      }
                    )}
                </Swiper>
              </div>
            </div>
          )}

          {isShirtsAvailable && (
            <div className="py-10 max-sm:py-5">
              <div className="mb-8 text-[30px] max-sm:text-[18px] max-sm:mb-4 font-medium text-center bg-gray-100 py-2 rounded-lg">
                Trending Shirts Collection
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
                  {loading
                    ? [1, 2, 3, 4, 5].map((item) => (
                      <SwiperSlide key={item} className="bg-white">
                        <Skeleton className="h-[245px] w-full" />
                        <div className="py-3 px-4">
                          <Skeleton className="h-[14px] w-[180px]" />
                          <Skeleton className="h-[10px] w-[80px] mt-1" />
                          <Skeleton className="h-[20px] w-[100px] my-4" />
                          <Skeleton className="h-[14px] w-[100px]" />
                          <Skeleton className="h-[14px] w-[80px] mt-1" />
                        </div>
                      </SwiperSlide>
                    ))
                    : ShirtsData.filter((val) => val.inStock === true).map(
                      (item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <div className="shadow-md h-full w-full m-2 rounded-lg bg-white">
                              <Link
                                href={`/product/product-details?id=${item.id}`}
                              >
                                <div className="productImage flex justify-center rounded-[12px] overflow-hidden">
                                  <Image
                                    src={
                                      imageURL +
                                      `product-image/${item.ProductImages[0]?.sysFileName}`
                                    }
                                    alt="track1"
                                    width={200}
                                    height={200}
                                    className="min-h-[245px] max-h-[245px] object-cover"
                                  ></Image>
                                </div>
                                <div className="py-3 px-4">
                                  <div>
                                    <div className="font-bold line-clamp-1">
                                      {item.name}
                                    </div>
                                    <div className="text-[#999] text-[14px] line-clamp-1">
                                      {item.fit}
                                    </div>
                                  </div>
                                  <div className="text-[#000] text-[16px] py-2">
                                    ₹{item.final_price}
                                    {item.discount_price > 0 && (
                                      <>
                                        <span className="line-through text-[12px] text-[#999] ml-1">
                                          ₹{item.price}
                                        </span>
                                        <span className="text-[#3fac45] text-[12px]">
                                          {item.discount_price}% off
                                        </span>
                                      </>
                                    )}
                                  </div>
                                  <div className="text-[#999] text-[14px]">
                                    Color:{" "}
                                    <span className="text-[#000]">
                                      {item.Colors?.map(
                                        (item) => item.name
                                      ).join(", ")}
                                    </span>
                                  </div>
                                  <div className="text-[#999] text-[14px]">
                                    Size:{" "}
                                    <span className="text-[#000]">
                                      {item.Sizes?.map(
                                        (item) => item.name
                                      ).join(",")}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </SwiperSlide>
                        );
                      }
                    )}
                </Swiper>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full bg-gray-100 py-10 pb-5 max-md:py-5 ">
        <div className="container mx-auto xl:max-w-8xl max-sm:px-4">
          <div className="mb-4 text-[30px] max-sm:text-[18px] max-sm:mb-0 font-medium text-center">
            Our Brand Partners
          </div>
          <div className="flex items-center justify-center flex-wrap gap-8 max-sm:gap-3 py-5">
            <div className="bg-white rounded-lg px-10 h-[110px] flex justify-center items-center max-sm:w-full">
              <Image
                src={brandPartnerImage1}
                alt="brandPartnerImage1"
                className="h-10 w-full object-contain"
              ></Image>
            </div>
            <div className="bg-white rounded-lg px-10 h-[110px] flex justify-center items-center max-sm:w-full">
              <Image
                src={brandPartnerImage2}
                alt="brandPartnerImage2"
                className="h-24 w-full object-contain"
              ></Image>
            </div>
            <div className="bg-white rounded-lg px-10 h-[110px] flex justify-center items-center max-sm:w-full">
              <Image
                src={brandPartnerImage3}
                alt="brandPartnerImage3"
                className="h-16 w-full object-contain"
              ></Image>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
