"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import axios from "axios";
import { ICategories, IColor, IProduct, ISize } from "@/interface/types";

function Product() {
  const [toggleData, setToggleData] = useState(true);
  const [allData, setAllData] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [allColor, setAllColor] = useState<IColor[]>([]);
  console.log("allColor :>> ", allColor);
  const [allSize, setAllSize] = useState<ISize[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [availableSizes, setAvailableSizes] = useState<ISize[]>([]);
  const [availableColors, setAvailableColors] = useState<IColor[] | undefined>(
    []
  );
  const [selectedColors, setSelectedColors] = useState<number[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  const filteredData = toggleData
    ? allData.filter((item) => item.category_id === 2)
    : allData.filter((item) => item.category_id === 1);

  const getProduct = async () => {
    try {
      const response = await axios.get("/api/product");
      const getData = response.data?.data;
      console.log("getData :>> ", getData);
      setAllData(getData);

      const categoriesResponse = await axios.get("/api/category");
      const categoriesData = categoriesResponse.data?.data;
      setCategories(categoriesData);

      const colorResponse = await axios.get("/api/color");
      const colorData = colorResponse.data?.data;
      setAllColor(colorData);

      const sizeResponse = await axios.get("/api/size");
      const sizeData = sizeResponse.data?.data;
      setAllSize(sizeData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleCheckboxChange = (id: number) => {
    setSelectedCategories((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id); // Deselect if already selected
      } else {
        return [...prev, id]; // Select if not selected
      }
    });
  };

  const handleSizeCheckboxChange = (id: number) => {
    setSelectedSizes((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleColorCheckboxChange = (id: number) => {
    setSelectedColors((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id); // Deselect if already selected
      } else {
        return [...prev, id]; // Select if not selected
      }
    });
  };

  useEffect(() => {
    const filteredSizes = allSize.filter((size) =>
      selectedCategories.includes(size.Category.id)
    );
    setAvailableSizes(filteredSizes);
  }, [selectedCategories, allSize, allData]);

  useEffect(() => {
    // Filter colors based on selected sizes and categories
    const filteredColors = allData
      .filter(
        (product) =>
          selectedCategories.includes(product.category_id) &&
          product.size_ids?.some((sizeId) => selectedSizes.includes(sizeId))
      )
      .map((product) => product.Color);
    console.log("filteredColors: ", filteredColors);

    // Remove duplicates and set available colors
    const displayColor: any = Array.from(
      new Set(filteredColors.map((color) => color.id))
    ).map((id) => filteredColors.find((color) => color.id === id));
    console.log("displayColor: ", displayColor);
    setAvailableColors(displayColor);
  }, [selectedCategories, selectedSizes, allData]);

  useEffect(() => {
    // Filter products based on selected categories, sizes, and colors
    const products = allData.filter(
      (product) =>
        selectedCategories.includes(product.category_id) &&
        product.size_ids?.some((sizeId) => selectedSizes.includes(sizeId)) &&
        selectedColors.includes(product.color_id)
    );
    setFilteredProducts(products);
  }, [selectedCategories, selectedSizes, selectedColors, allData]);

  return (
    <main className="max-[1024px]:mt-[77px] max-[767px]:mt-[50px] relative">
      <Header />
      <div className="container mx-auto xl:max-w-7xl max-sm:px-4">
        <div className="grid grid-cols-12 gap-4 lg:py-10">
          <div className="lg:col-span-3 col-span-12 lg:pt-10 lg:sticky lg:top-0">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Collection</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-3 mt-3">
                    {categories.map((item, index) => (
                      <>
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`category-${item.id}`}
                            checked={selectedCategories.includes(item.id)}
                            onCheckedChange={() =>
                              handleCheckboxChange(item.id)
                            }
                          />
                          <label
                            htmlFor={`category-${item.id}`}
                            className="text-sm font-medium leading-none text-[#777]"
                          >
                            {item?.name}
                          </label>
                        </div>
                      </>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Size</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-3 mt-3">
                    {availableSizes.map((item, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`size-${item.id}`}
                              checked={selectedSizes.includes(item.id)}
                              onCheckedChange={() =>
                                handleSizeCheckboxChange(item.id)
                              }
                            />
                            <label
                              htmlFor="terms2"
                              className="text-sm font-medium leading-none text-[#777]"
                            >
                              {item.name}
                            </label>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Colors</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-3 mt-3">
                    {availableColors?.map((item, index) => (
                      <>
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`color-${item.id}`}
                            checked={selectedColors.includes(item.id)}
                            onCheckedChange={() =>
                              handleColorCheckboxChange(item.id)
                            }
                          />
                          <label
                            htmlFor="terms2"
                            className="text-sm font-medium leading-none text-[#777]"
                          >
                            {item.name}
                          </label>
                        </div>
                      </>
                    ))}
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
              {filteredProducts.length > 0 ? (
                // Display filteredProducts when data is available
                filteredProducts.map((item, index) => (
                  <>
                    <Link
                      key={index}
                      className="lg:col-span-3 md:col-span-6 col-span-12"
                      href={`/product/product-details?id=${item.id}`}
                    >
                      <div className="shadow-md h-full w-full m-2 rounded-lg">
                        <div className="productImage rounded-[12px] overflow-hidden max-h-[400px] flex justify-center">
                          <Image
                            src={`/product-image/${item.ProductImages[0]?.sysFileName}`}
                            width={200}
                            height={200}
                            alt={item.name}
                            className="min-h-[245px] max-h-[245px] object-cover"
                          />
                        </div>
                        <div className="py-3 px-4">
                          <div>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-[#999] text-[14px]">
                              {item.fit}
                            </div>
                          </div>
                          <div className="text-[#000] text-[16px] py-2">
                            ₹{item.price}
                          </div>
                          <div className="text-[#999] text-[14px]">
                            Color:{" "}
                            <span className="text-[#000]">
                              {item.Color.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </>
                ))
              ) : filteredData.length > 0 ? (
                // If filteredProducts is not available, fallback to filteredData
                filteredData.map((item, index) => (
                  <>
                    <Link
                      key={index}
                      className={
                        toggleData
                          ? "lg:col-span-3 md:col-span-6 col-span-12"
                          : "col-span-3"
                      }
                      href={`/product/product-details?id=${item.id}`}
                    >
                      <div className="shadow-md h-full w-full m-2 rounded-lg">
                        <div className="productImage rounded-[12px] overflow-hidden max-h-[400px] flex justify-center">
                          <Image
                            src={`/product-image/${item.ProductImages[0]?.sysFileName}`}
                            width={200}
                            height={200}
                            alt={item.name}
                            className="min-h-[245px] max-h-[245px] object-cover"
                          />
                        </div>
                        <div className="py-3 px-4">
                          <div>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-[#999] text-[14px]">
                              {item.fit}
                            </div>
                          </div>
                          <div className="text-[#000] text-[16px] py-2">
                            ₹{item.price}
                          </div>
                          <div className="text-[#999] text-[14px]">
                            Color:{" "}
                            <span className="text-[#000]">
                              {item.Color.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </>
                ))
              ) : (
                // Display a message when no products are available
                <div className="col-span-12 text-center py-20">No products available for the selected filters.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Product;
