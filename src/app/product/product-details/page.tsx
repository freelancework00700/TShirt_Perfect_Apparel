"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import sizeChartIcon from "../../../../public/Images/sizeChartIcon.svg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { IProduct } from "@/interface/types";
import Link from "next/link";

const ProductDetail = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const searchParams = useSearchParams();
  const search = searchParams?.get("id");
  const searchNumber = search ? Number(search) : null;
  const [productData, setProductData] = useState<IProduct[]>([]);

  const getIdWiseProduct = async () => {
    try {
      const response = await axios.get(`/api/product`);
      const productData = response.data?.data;
      const findData = productData?.find(
        (val: { id: number }) => val.id === searchNumber
      );
      setProductData([findData]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (search) {
      getIdWiseProduct();
    }
  }, []);

  return (
    <main className="max-[1024px]:mt-[77px] relative">
      <Header />
      <div className="min-h-[calc(100vh_-_385px)]">
        <div className="container mx-auto xl:max-w-8xl max-sm:px-4 py-5">
          <div className="grid grid-cols-12 gap-4">
            <div className="xl:col-span-6 lg:col-span-6 col-span-12">
              {productData.map((item, index) => {
                return (
                  <Swiper
                    key={index}
                    style={{
                      "--swiper-navigation-color": "#000",
                      "--swiper-pagination-color": "#000",
                    }}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                  >
                    {item.ProductImages.map((item, index) => (
                      <SwiperSlide
                        key={index}
                        className="border rounded-xl mb-2"
                      >
                        <Image
                          src={`/product-image/${item.sysFileName}`}
                          width={200}
                          height={200}
                          alt="product1"
                          className="max-h-[65vh] h-[613px] w-full object-contain"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                );
              })}

              {productData.map((item) => (
                <Swiper
                  key={item.id}
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper"
                >
                  {item.ProductImages.map((img, index) => (
                    <SwiperSlide key={index} className="shadow-md m-1">
                      <Image
                        src={`/product-image/${img.sysFileName}`}
                        width={200}
                        height={200}
                        alt="product1"
                        className="max-h-[165px] h-[100px] w-full object-contain"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ))}
            </div>
            {productData?.map((item, index) => {
              return (
                <>
                  <div key={index} className="xl:col-span-1 max-md:hidden" />
                  <div className="xl:col-span-5 lg:col-span-5 col-span-12">
                    <div className="mb-4">
                      <div className="text-2xl font-semibold tracking-normal text-black font-gotham md:text-3xl">
                        {item.name}
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="flex items-center gap-x-2 text-xl text-gray-900 font-semibold mt-3">
                            ₹{item.price}
                          </div>
                          <div className="text-[#999] text-[14px] ">
                            (incl. of all taxes)
                          </div>
                        </div>
                        <div className="pe-8 lg:pe-0 max-lg:hidden">
                          <Link
                            href="/contactUs"
                            className="bg-[#000] hover:bg-[#222] hover:text-[#f8885b] transition ease-in-out duration-200 rounded-full text-base flex items-center font-bold 
                          text-[#fff] py-2 px-6 max-[1023px]:hidden button button--nanuk button--border-thin button--round-s"
                          >
                            <span>Product Inquiry</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="text-[#999] text-[16px]">
                      Color:{" "}
                      <span className="text-[#000]">
                        {item.Colors.map((item) => item.name).join(", ")}
                      </span>
                    </div>
                    <div className="text-[#999] text-[16px] mt-4 pt-4 border-t border-[#ddd] flex items-center gap-3">
                      Select A Size
                      <div className="flex items-center">
                        <div className="flex items-center bg-[#eee] rounded-full px-3 cursor-pointer">
                          <Image
                            src={sizeChartIcon}
                            alt="sizeChart"
                            className="h-[16px] w-[16px] mr-2"
                          ></Image>
                          <span className="text-black text-[14px]">
                            Size Chart
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start gap-2 mt-2">
                      {item.Sizes.map((item, index) => (
                        <div
                          key={index}
                          className="border border-black hover:bg-[#000] hover:text-white cursor-pointer rounded-md text-base h-[30px] w-[30px] flex justify-center items-center"
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                    <div className="text-[#000] text-[20px] mt-4 pt-4 border-t border-[#ddd]">
                      Product Details
                    </div>
                    <div className="flex justify-start gap-2 mt-2">
                      <div className="grid grid-cols-12 w-full">
                        <div className="col-span-4">
                          <div className="text-base font-semibold">Type</div>
                          <div className="text-base font-semibold">Sleeve</div>
                          <div className="text-base font-semibold">Fit</div>
                          <div className="text-base font-semibold">Fabric</div>
                          <div className="text-base font-semibold">
                            Sales Package
                          </div>
                          <div className="text-base font-semibold">Pack of</div>
                          <div className="text-base font-semibold">
                            Style Code
                          </div>
                          <div className="text-base font-semibold">
                            Neck Type
                          </div>
                          <div className="text-base font-semibold">
                            Ideal For
                          </div>
                          <div className="text-base font-semibold">Pattern</div>
                          <div className="text-base font-semibold">
                            Suitable For
                          </div>
                          <div className="text-base font-semibold">
                            Reversible
                          </div>
                          <div className="text-base font-semibold">
                            Fabric Care
                          </div>
                          <div className="text-base font-semibold">
                            Net Quantity
                          </div>
                        </div>
                        <div className="col-span-8">
                          <div className="text-base font-normal">
                            {item.type}
                          </div>
                          <div className="text-base font-normal">
                            {item.sleeve}
                          </div>
                          <div className="text-base font-normal">
                            {item.fit}
                          </div>
                          <div className="text-base font-normal">
                            {item.fabric}
                          </div>
                          <div className="text-base font-normal">
                            {item.sales_package}
                          </div>
                          <div className="text-base font-normal">
                            {item.pack_of}
                          </div>
                          ``
                          <div className="text-base font-normal">
                            {item.style_code}
                          </div>
                          <div className="text-base font-normal">
                            {item.neck_type}
                          </div>
                          <div className="text-base font-normal">
                            {item.ideal_for}
                          </div>
                          <div className="text-base font-normal">
                            {item.pattern}
                          </div>
                          <div className="text-base font-normal">
                            {item.suitable_for}
                          </div>
                          <div className="text-base font-normal">
                            {item.reversible}
                          </div>
                          <div className="text-base font-normal">
                            {item.fabric_care}
                          </div>
                          <div className="text-base font-normal">
                            {item.net_quantity}
                          </div>
                        </div>
                        <div className="col-span-12 text-base mt-6">
                          Create a cool and lasting impression in thi hip hop,
                          attitude, Loose fit, Round Neck, Half sleeves,
                          printed, Oversized t-shirt, Back Printed T-shirts for
                          men. Beautifully Crafted with a cotton fabric and a
                          trendy loose fitting, drop shoulder t-shirts.
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ProductDetail;
