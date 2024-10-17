"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState } from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { productData, tracksData } from "@/components/Product-data/ProductData";

function Product() {
  const [toggleData, setToggleData] = useState(true);
  return (
    <main className="max-[1024px]:mt-[77px] max-[767px]:mt-[50px] relative">
      <Header />
      <div className="container mx-auto xl:max-w-7xl max-sm:px-4">
        <div className="grid grid-cols-12 gap-4 lg:py-10">
          <div className="lg:col-span-3 col-span-12 lg:pt-10 lg:sticky lg:top-0">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Size Filter</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-3 mt-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms2" />
                      <label
                        htmlFor="terms2"
                        className="text-sm font-medium leading-none text-[#777]"
                      >
                        S
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms2" />
                      <label
                        htmlFor="terms2"
                        className="text-sm font-medium leading-none text-[#777]"
                      >
                        M
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms2" />
                      <label
                        htmlFor="terms2"
                        className="text-sm font-medium leading-none text-[#777]"
                      >
                        L
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms2" />
                      <label
                        htmlFor="terms2"
                        className="text-sm font-medium leading-none text-[#777]"
                      >
                        XL
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms2" />
                      <label
                        htmlFor="terms2"
                        className="text-sm font-medium leading-none text-[#777]"
                      >
                        XXL
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms2" />
                      <label
                        htmlFor="terms2"
                        className="text-sm font-medium leading-none text-[#777]"
                      >
                        XXXL
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Collection</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-3 mt-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms2" />
                      <label
                        htmlFor="terms2"
                        className="text-sm font-medium leading-none text-[#777]"
                      >
                        T-shirts
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms2" />
                      <label
                        htmlFor="terms2"
                        className="text-sm font-medium leading-none text-[#777]"
                      >
                        Track Pants
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Colors</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-3 mt-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms2" />
                      <label
                        htmlFor="terms2"
                        className="text-sm font-medium leading-none text-[#777]"
                      >
                        Red
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms2" />
                      <label
                        htmlFor="terms2"
                        className="text-sm font-medium leading-none text-[#777]"
                      >
                        Black
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms2" />
                      <label
                        htmlFor="terms2"
                        className="text-sm font-medium leading-none text-[#777]"
                      >
                        Yellow
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms2" />
                      <label
                        htmlFor="terms2"
                        className="text-sm font-medium leading-none text-[#777]"
                      >
                        White
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="lg:col-span-9 col-span-12">
            <div className="flex justify-between items-center lg:sticky lg:top-0 bg-white max-lg:flex-wrap">
              <div className="mb-4 text-[24px] font-medium">
                {toggleData ? "T-Shirts Collection" : "Track Pan Collection"}
              </div>
              <div
                onClick={() => setToggleData(!toggleData)}
                className="py-1 px-5 rounded-[20px] text-sm border border-black text-white bg-black flex items-center gap-2 cursor-pointer"
              >
                {!toggleData ? "T-Shirts Collection" : "Track Pan Collection"}
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 gap-y-10">
              {toggleData
                ? productData.map((item, index) => (
                    <Link
                      key={index}
                      className="lg:col-span-3 md:col-span-6 col-span-12"
                      href={`/product/product-details?id=${item.id}`}
                    >
                      <div className="productImage rounded-[12px] overflow-hidden max-h-[400px]">
                        <Image src={item.img} alt="product1"></Image>
                      </div>
                      <div className="pt-3">
                        <div>
                          <div className="font-bold">{item.name}</div>
                          <div className="text-[#999] text-[14px]">
                            {item.description}
                          </div>
                        </div>
                        <div className="text-[#000] text-[16px] py-2">
                          $99.99
                        </div>
                        <div className="text-[#999] text-[14px]">
                          Color:{" "}
                          <span className="text-[#000]">{item.color}</span>
                        </div>
                      </div>
                    </Link>
                  ))
                : tracksData.map((item, index) => (
                    <Link
                      key={index}
                      className="col-span-3"
                      href={`/product/product-details?id=${item.id}`}
                    >
                      <div className="productImage rounded-[12px] overflow-hidden">
                        <Image src={item.img} alt="product1"></Image>
                      </div>
                      <div className="pt-3">
                        <div>
                          <div className="font-bold">{item.name}</div>
                          <div className="text-[#999] text-[14px]">
                            {item.description}
                          </div>
                        </div>
                        <div className="text-[#000] text-[16px] py-2">
                          $99.99
                        </div>
                        <div className="text-[#999] text-[14px]">
                          Color:{" "}
                          <span className="text-[#000]">{item.color}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Product;
