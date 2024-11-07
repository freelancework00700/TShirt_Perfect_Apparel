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
import { Filter, ICategories, IColor, IProduct, ISize } from "@/interface/types";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

function Product() {
  const [allData, setAllData] = useState<IProduct[]>([]);
  // console.log('allData', allData);
  const [categories, setCategories] = useState<ICategories[]>([]);
  // console.log('categories', categories);
  const [allColor, setAllColor] = useState<IColor[]>([]);
  const [allSize, setAllSize] = useState<ISize[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  // console.log('selectedCategories :>> ', selectedCategories);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [availableSizes, setAvailableSizes] = useState<ISize[]>([]);
  const [availableColors, setAvailableColors] = useState<IColor[] | undefined>([]);
  const [selectedColors, setSelectedColors] = useState<number[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [filter, setFilter] = useState<Filter>("T-Shirts");

  const filteredData =
    allData.filter((item) => item.Category.name === filter)
  // : allData.filter((item) => item.category_id === 1);

  const prices = allData.map((product) => parseFloat(product.price));
  const maxPrice = Math.max(...prices, 3000); // set default max of 3000 if no prices available
  const [selectedPrice, setSelectedPrice] = useState(maxPrice);

  const fabricOptions = Array.from(new Set(allData
    .map((product) => product.fabric?.toLowerCase().trim()) // Normalize to lowercase and trim whitespace
    .filter(Boolean)));
  // console.log('fabricOptions :>> ', fabricOptions);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);

  const handleFabricChange = (fabric: string) => {
    console.log('fabric :>> ', fabric);
    setSelectedFabrics((prev) => (
      console.log('prev :>> ', prev),
      prev.includes(fabric) ? prev.filter((f) => f !== fabric) : [...prev, fabric])
    );
  };



  const getProduct = async () => {
    try {
      const response = await axios.get("/api/product");
      const getData = response.data?.data;
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

  // useEffect(() => {
  //   const filteredData = allData.filter((val) => selectedCategories.includes(val.category_id));
  //   // console.log('filteredData :>> ', filteredData) ;

  //   const sizeFilter = filteredData.filter((val) =>
  //     val.size_ids.some((size) => selectedSizes.includes(size)));
  //   console.log('sizeFilter:::::', sizeFilter);

  //   const filteredPrice = sizeFilter.filter(
  //     (product) => parseFloat(product.price) <= selectedPrice
  //   );
  //   console.log('filteredPrice :>> ', filteredPrice);
  //   // const dataByPrice = sizeFilter.filter((val) => parseFloat(val.price) <= priceRange)
  //   // console.log('dataByPrice :>> ', dataByPrice);

  //   // const dataByPrice = sizeFilter.filter(
  //   //   (val) => parseFloat(val.price) >= priceRange[0] && parseFloat(val.price) <= priceRange[1]
  //   // );
  //   // console.log('dataByPrice :>> ', dataByPrice);

  // }, [allData, selectedCategories, allSize, selectedSizes])

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
      .flatMap((product) => product.Colors);

    const displayColor: any = Array.from(
      new Set(filteredColors.map((color) => color.id))
    ).map((id) => filteredColors.find((color) => color.id === id));
    setAvailableColors(displayColor);
  }, [selectedCategories, selectedSizes, allData]);

  useEffect(() => {
    const products = allData.filter(
      (product) =>
        selectedCategories.includes(product.category_id) &&
        product.size_ids?.some((sizeId) => selectedSizes.includes(sizeId)) &&
        product.color_ids?.some((colorId: any) => selectedColors.includes(colorId)) &&
        (selectedFabrics.length === 0 || selectedFabrics.includes(product.fabric?.toLowerCase().trim())) &&
        parseFloat(product.final_price) <= selectedPrice
    );
    console.log('products :>> ', products);
    setFilteredProducts(products);
  }, [selectedCategories, selectedSizes, selectedColors, selectedPrice, selectedFabrics, allData]);

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedFabrics([]);
    setSelectedPrice(3000);
    setFilteredProducts(allData);
  }

  const isActiveFilterData = selectedCategories.length > 0 || selectedSizes.length > 0 ||
    selectedColors.length > 0 || selectedFabrics.length > 0 || selectedPrice < 3000;

  return (
    <main className="max-[1024px]:mt-[77px] max-[767px]:mt-[50px] relative">
      <Header />
      <div className="min-h-[calc(100vh_-_385px)]">
        <div className="container mx-auto xl:max-w-8xl max-sm:px-4">
          <div className="grid grid-cols-12 gap-4 lg:py-10">
            <div className="xl:col-span-2 lg:col-span-3 col-span-12">
              <div className="mb-2 text-[24px] font-medium">Filter
                {
                  isActiveFilterData &&
                  <button onClick={handleResetFilters} className="ml-28 text-sm">Reset Filter</button>
                }
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Collection</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-3 mt-3">
                      {categories.map((item, index) => (
                        <>
                          <div key={index} className="flex items-center space-x-2">
                            <Checkbox
                              id={`category-${item.id}`}
                              checked={selectedCategories.includes(item.id)}
                              onCheckedChange={() =>
                                handleCheckboxChange(item.id)
                              }
                            />
                            <label
                              htmlFor={`category-${item.id}`}
                              className="text-base font-medium leading-none text-[#777]"
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
                      {/* {availableSizes.map((item, index) => {
                        return (
                          <>
                            <div key={index} className="flex items-center space-x-2">
                              <Checkbox
                                id={`size-${item.id}`}
                                checked={selectedSizes.includes(item.id)}
                                onCheckedChange={() =>
                                  handleSizeCheckboxChange(item.id)
                                }
                              />
                              <label htmlFor="terms2"
                                className="text-sm font-medium leading-none text-[#777]"
                              >
                                {item.name}
                              </label>
                            </div>
                          </>
                        );
                      })} */}
                      {allSize.map((item, index) => {
                        return (
                          <>
                            <div key={index} className="flex items-center space-x-2">
                              <Checkbox
                                id={`size-${item.id}`}
                                checked={selectedSizes.includes(item.id)}
                                onCheckedChange={() =>
                                  handleSizeCheckboxChange(item.id)
                                }
                              />
                              <label htmlFor="terms2"
                                className="text-base font-medium leading-none text-[#777]"
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
                      {allColor?.map((item, index) => {
                        return (
                          <>
                            <div key={index} className="flex items-center space-x-2">
                              <Checkbox
                                id={`color-${item.id}`}
                                checked={selectedColors.includes(item.id)}
                                onCheckedChange={() =>
                                  handleColorCheckboxChange(item.id)
                                }
                              />
                              <label
                                htmlFor="terms2"
                                className="text-base font-medium leading-none text-[#777]"
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

                <Label>Price</Label>
                <div className="flex flex-col gap-3 mt-3">
                  <Slider
                    onValueChange={(value) => setSelectedPrice(value[0])}
                    defaultValue={[maxPrice / 3]}
                    max={maxPrice}
                    step={1}
                  />
                  <span>Selected Price: {selectedPrice}</span>
                </div>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Fabric</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-3 mt-3">
                      {fabricOptions.map((fabric) => (
                        <label key={fabric} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedFabrics.includes(fabric)}
                            onChange={() => handleFabricChange(fabric)}
                          />
                          <span className="ml-2">{fabric}</span>
                        </label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="xl:col-span-10 lg:col-span-9 col-span-12">
              <div className="flex justify-between items-center lg:sticky lg:top-0 bg-white max-lg:flex-wrap max-md:mb-2">
                <div className="mb-4 text-[24px] font-medium">
                  {filter === "T-Shirts" ? "T-Shirts Collection" : "Track Pant Collection"}
                </div>
                <div
                  onClick={() => setFilter(filter === "T-Shirts" ? "Track-Pants" : "T-Shirts")}
                  className="py-1 px-5 rounded-[20px] text-base border border-black text-white bg-black flex items-center gap-2 cursor-pointer"
                >
                  {filter === "T-Shirts"
                    ? "T-Shirts Collection"
                    : "Track Pant Collection"}
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
                    <Link
                      key={index}
                      className="lg:col-span-3 md:col-span-6 col-span-12"
                      href={`/product/product-details?id=${item.id}`}
                    >
                      <div className="shadow-md h-full w-full rounded-lg">
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
                            <div className="font-bold text-base">{item.name}</div>
                            <div className="text-[#999] text-[14px]">{item.fit}</div>
                          </div>
                          <div className="text-[#000] text-[16px] py-1">
                            <div className="text-[#000] text-[16px] py-2 5px">
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
                          </div>
                          <div className="text-[#999] text-[14px]">
                            Color:{" "}
                            <span className="text-[#000]">
                              {item.Colors?.map((color) => color.name).join(", ")}
                            </span>
                          </div>
                          <div className="text-[#999] text-[14px]">
                            Size:{" "}
                            <span className="text-[#000]">
                              {item.Sizes.map((size) => size.name).join(", ")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : filteredData.length > 0 ? (
                  // If filteredProducts is not available, fallback to filteredData
                  filteredData.map((item, index) => (
                    <Link
                      key={index}
                      className={filter ? "lg:col-span-3 md:col-span-6 col-span-12" : "col-span-3"}
                      href={`/product/product-details?id=${item.id}`}
                    >
                      <div className="shadow-md h-full w-full rounded-lg">
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
                            <div className="text-[#999] text-[14px]">{item.fit}</div>
                          </div>
                          <div className="text-[#000] text-[16px] py-1">
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
                          </div>
                          <div className="text-[#999] text-[14px]">
                            Color:{" "}
                            <span className="text-[#000]">
                              {item.Colors.map((color) => color.name).join(", ")}
                            </span>
                          </div>
                          <div className="text-[#999] text-[14px]">
                            Size:{" "}
                            <span className="text-[#000]">
                              {item.Sizes.map((size) => size.name).join(", ")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  // Display a message when no products are available
                  <div className="col-span-12 text-center py-20">
                    No products available for the selected filters.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Product;
