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
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";


function Product() {
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [allColor, setAllColor] = useState<IColor[]>([]);
  const [allSize, setAllSize] = useState<ISize[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [availableSizes, setAvailableSizes] = useState<ISize[]>([]);
  const [availableColors, setAvailableColors] = useState<IColor[] | undefined>([]);
  const [selectedColors, setSelectedColors] = useState<number[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [allFilterData, setAllFilterData] = useState<IProduct[]>([]);
  const prices = allData.map((product) => parseFloat(product.price));
  const maxPrice = Math.max(...prices, 3000);
  const [selectedPrice, setSelectedPrice] = useState<[number, number]>([100, maxPrice / 2]);

  const fabricOptions = Array.from(new Set(allData
    .map((product) => product.fabric?.toLowerCase().trim()) // Normalize to lowercase and trim whitespace
    .filter(Boolean)));
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);

  const handleFabricChange = (fabric: string) => {
    setSelectedFabrics((prev) => (
      prev.includes(fabric) ? prev.filter((f) => f !== fabric) : [...prev, fabric])
    );
  };

  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/product");
      const getData = response.data?.data;
      setAllData(getData);

      const apiFindData = await axios.get(`/api/product?${selectedCategories}`)
      setAllFilterData(apiFindData.data.data)

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    const allCategoryIds = categories.map((category) => category.id);
    setSelectedCategories(allCategoryIds);
  }, [categories]);

  const handleCheckboxChange = (id: number) => {
    setSelectedCategories((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id); // Deselect if already selected
      } else {
        return [...prev, id]; // Select if not selected
      }
    });
  };

  useEffect(() => {
    const getCategoriesWiseData = async () => {
      try {
        // const apiFindData = await axios.get(`/api/product?${selectedCategories}`)
        // setAllFilterData(apiFindData.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    getCategoriesWiseData();
  }, [])

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
    const stockCheck = allFilterData.filter((val) => val.inStock === true)
    const products = selectedCategories.length === 0
      ? [] // If no categories are selected, display no products
      : stockCheck.filter((product) => {
        // Check if product matches selected categories, or no category is selected
        const matchesCategory = selectedCategories.includes(product.category_id);

        const matchesSize =
          selectedSizes.length === 0 || product.size_ids?.some((sizeId) => selectedSizes.includes(sizeId));

        const matchesColor =
          selectedColors.length === 0 || product.color_ids?.some((colorId: any) => selectedColors.includes(colorId));

        const matchesFabric =
          selectedFabrics.length === 0 || selectedFabrics.includes(product.fabric?.toLowerCase().trim());

        const matchesPrice =
          parseFloat(product.final_price) >= selectedPrice[0] &&
          parseFloat(product.final_price) <= selectedPrice[1];

        return matchesCategory && matchesSize && matchesColor && matchesFabric && matchesPrice;
      });

    console.log('products :>> ', products);
    setFilteredProducts(products);
  }, [selectedCategories, selectedSizes, selectedColors, selectedPrice, selectedFabrics, allData, allFilterData]);

  const handleResetFilters = () => {
    setSelectedCategories(categories.map((val) => val.id));
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedFabrics([]);
    setSelectedPrice([100, maxPrice / 2]);
    setFilteredProducts(allData);
  }

  const isActiveFilterData = selectedCategories.length !== categories.length ||
    selectedSizes.length > 0 || selectedColors.length > 0 || selectedFabrics.length > 0 ||
    selectedPrice[1] < maxPrice / 2;

  return (
    <main className="max-[1024px]:mt-[77px] max-[767px]:mt-[50px] relative">
      <Header />
      <div className="min-h-[calc(100vh_-_385px)]">
        <div className="container mx-auto xl:max-w-7xl max-[1024px]:px-4">
          <div className="grid grid-cols-12 gap-4 lg:py-10">
            <div className="xl:col-span-2 lg:col-span-3 col-span-12 max-md:py-5">
              <div className="flex justify-between items-center w-full">
                <div className="text-[24px] font-medium">Filter</div>
                <div>
                  {
                    isActiveFilterData &&
                    <button onClick={handleResetFilters} className="text-sm">Reset Filter</button>
                  }
                </div>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Price</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-3 mt-3">
                      <Slider
                        onValueChange={(value) => setSelectedPrice(value as [number, number])}
                        defaultValue={[100, maxPrice / 2]}
                        min={100}
                        max={maxPrice}
                        step={1}
                      />
                      <span>Selected Price: {selectedPrice[0]} - {selectedPrice[1]}</span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
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
                <AccordionItem value="item-3">
                  <AccordionTrigger>Size</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-3 mt-3">
                      {availableSizes.map((item, index) => {
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
                <AccordionItem value="item-4">
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
                <AccordionItem value="item-5">
                  <AccordionTrigger>Fabric</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-3 mt-3">
                      {fabricOptions.map((fabric) => (
                        <label key={fabric} className="flex items-center">
                          <Checkbox
                            checked={selectedFabrics.includes(fabric)}
                            onCheckedChange={() => handleFabricChange(fabric)}
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
                  Product ({filteredProducts.length})
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 gap-y-5 max-md:pb-10">
                {loading
                    ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                      <div key={item} className="lg:col-span-3 md:col-span-6 col-span-12">
                        <Skeleton className="h-[245px] w-full" />
                        <div className="py-3 px-4">
                          <Skeleton className="h-[14px] w-[180px]" />
                          <Skeleton className="h-[10px] w-[80px] mt-1" />
                          <Skeleton className="h-[20px] w-[100px] my-4" />
                          <Skeleton className="h-[14px] w-[100px]" />
                          <Skeleton className="h-[14px] w-[80px] mt-1" />
                        </div>
                      </div>
                    ))
                    :  filteredProducts.length > 0 ? (
                  // Display filteredProducts when data is available
                  filteredProducts.map((item, index) => (
                    <>
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
                    </>
                  ))
                )
                  : (
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
