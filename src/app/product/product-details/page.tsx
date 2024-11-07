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
import { useFormik } from "formik";
import * as yup from "yup";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Label } from "@/components/ui/label";

const ProductDetail = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const searchParams = useSearchParams();
  const search = searchParams?.get("id");
  const searchNumber = search ? Number(search) : null;
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [sizeChart, setSizeChart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<IProduct | null>(null);

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

  const openSizeChart = () => {
    setSizeChart(true)
  }

  const closeSizeChart = () => {
    setSizeChart(false)
  }

  const openProductInquiryModal = async (id: number) => {
    const data = productData.find((val) => val.id === id);
    setFilteredData(data || null);
    setIsModalOpen(true);
  }

  const formik = useFormik({
    initialValues: {
      product_id: filteredData?.id || "",
      quantity: "",
      inquiry_message: "",
      name: "",
      email: "",
      mobile_no: "",
      size_ids: "",
      color_ids: "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      product_id: yup.string().required("Enter the product name"),
      quantity: yup.number().typeError("Only digits are allowed!")
        .required("Quantity is required").test("isDigits", "Quantity is required",
          (value: any) => {
            return value && /^\d{1,5}$/.test(value.toString())
          }),
      inquiry_message: yup.string().min(10).max(200).required("Enter the inquiry message"),
      name: yup.string().min(4).max(50).required("Enter the name"),
      email: yup.string().min(10).max(50).required("Enter the email"),
      mobile_no: yup.number().typeError("Only digits are allowed!")
        .required("Phone number required!").test("isTenDigits", "Mobile number must be exactly 10 digits", (value: any) => { return value && /^\d{10}$/.test(value.toString()); }),
      size_ids: yup.string().min(1, 'Select at least one size'),
      color_ids: yup.string().min(1, 'Select at least one color'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post('/api/product-inquiry', values)
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        resetForm()
        setIsModalOpen(false)
      } catch (error) {
        console.log(error)
      }
    }
  })

  useEffect(() => {
    if (filteredData) {
      formik.setFieldValue("size_ids", (filteredData.size_ids || []).join(","));
      formik.setFieldValue("color_ids", (filteredData.color_ids || []).join(","));
    }
  }, [filteredData]);

  const handleCheckboxChange = (id: string) => {
    const selectedIds = new Set(formik.values.size_ids.split(',').filter(Boolean)); // Split into set of IDs
    if (selectedIds.has(id)) {
      selectedIds.delete(id); // Remove if already selected
    } else {
      selectedIds.add(id); // Add if not selected
    }
    formik.setFieldValue('size_ids', Array.from(selectedIds).join(','));
  };

  const handleColorCheckboxChange = (id: string) => {
    const selectedIds = new Set(formik.values.color_ids.split(',').filter(Boolean));
    if (selectedIds.has(id)) {
      selectedIds.delete(id); // Remove if already selected
    } else {
      selectedIds.add(id); // Add if not selected
    }
    formik.setFieldValue('color_ids', Array.from(selectedIds).join(','));
  }

  return (
    <main className="max-[1024px]:mt-[77px] relative">
      <ToastContainer />
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

            {sizeChart && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
                  <button onClick={closeSizeChart} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                    ✖️
                  </button>

                  {productData.map((item, index) => (
                    <div key={index}>
                      <h2 className="text-lg font-semibold text-center">{item.name}</h2>
                      <p className="text-center text-sm text-gray-500">Size Charts</p>

                      <div className="mt-4">
                        {item.Category.name === "T-Shirts" ? (
                          <>
                            <h3 className="text-sm font-semibold">T-Shirt Measurements</h3>
                            <div className="overflow-x-auto mt-4">
                              <table className="w-full text-sm text-left text-gray-700">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-4 py-2 font-medium">Size</th>
                                    <th className="px-4 py-2 font-medium">Chest</th>
                                    <th className="px-4 py-2 font-medium">Length</th>
                                    <th className="px-4 py-2 font-medium">Shoulder</th>
                                    <th className="px-4 py-2 font-medium">Sleeve</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="px-4 py-2">XS</td>
                                    <td className="px-4 py-2">36</td>
                                    <td className="px-4 py-2">26</td>
                                    <td className="px-4 py-2">17</td>
                                    <td className="px-4 py-2">24 ¼</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </>
                        ) : item.Category.name === "Track-Pants" ? (
                          <>
                            <h3 className="text-sm font-semibold">Track Pants Measurements</h3>
                            <div className="overflow-x-auto mt-4">
                              <table className="w-full text-sm text-left text-gray-700">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-4 py-2 font-medium">Size</th>
                                    <th className="px-4 py-2 font-medium">Waist</th>
                                    <th className="px-4 py-2 font-medium">Length</th>
                                    <th className="px-4 py-2 font-medium">Hip</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="px-4 py-2">XS</td>
                                    <td className="px-4 py-2">28</td>
                                    <td className="px-4 py-2">38</td>
                                    <td className="px-4 py-2">36</td>
                                  </tr>
                                  {/* Add more sizes as needed */}
                                </tbody>
                              </table>
                            </div>
                          </>
                        ) : (
                          <p className="text-center text-sm text-gray-500">No size chart available.</p>
                        )}
                        <p className="mt-4 text-xs text-center text-gray-500">
                          If your measurements fall between sizes, we suggest that you size up for a better fit.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
                  <button onClick={() => setIsModalOpen(false)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                  >
                    ✖️
                  </button>
                  <h2 className="text-lg font-semibold text-center mb-4">Product Inquiry</h2>

                  <h3 className="text-lg font-semibold mb-4">Product Name: {filteredData?.name}</h3>

                  <form onSubmit={formik.handleSubmit}>
                    <input
                      type="text"
                      name="product_id"
                      value={formik.values.product_id}
                      onChange={formik.handleChange}
                      readOnly
                      className="w-full px-4 py-2 mb-4 border rounded-md text-gray-500 bg-gray-100"
                      placeholder="Product ID"
                    />
                    {formik.errors.product_id && formik.touched.product_id &&
                      (<p className="text-red-500">{formik.errors.product_id}</p>)}

                    <Label>Size:</Label>
                    {filteredData?.Sizes.map((size) => (
                      <label key={size.id} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          name="size_ids"
                          value={size.id.toString()}
                          checked={formik.values.size_ids.split(',').includes(size.id.toString())} // Check if size is in string
                          onChange={() => handleCheckboxChange(size.id.toString())}
                          className="mr-2"
                        />
                        {size.name}
                      </label>
                    ))}
                    {formik.errors.size_ids && formik.touched.size_ids && (
                      <p className="text-red-500">{formik.errors.size_ids}</p>
                    )}

                    <Label>Color:</Label>
                    {filteredData?.Colors.map((color) => (
                      <label key={color.id} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          name="color_ids"
                          value={color.id.toString()}
                          checked={formik.values.color_ids.split(',').includes(color.id.toString())}
                          onChange={() => handleColorCheckboxChange(color.id.toString())}
                          className="mr-2"
                        />
                        {color.name}
                      </label>
                    ))}
                    {formik.errors.color_ids && formik.touched.color_ids &&
                      (<p className="text-red-500">{formik.errors.color_ids}</p>)}

                    <input
                      type="text"
                      name="quantity"
                      value={formik.values.quantity}
                      onChange={formik.handleChange}
                      className="w-full px-4 py-2 mb-4 border rounded-md"
                      placeholder="Quantity"
                      required
                    />
                    {formik.errors.quantity && formik.touched.quantity &&
                      (<p className="text-red-500">{formik.errors.quantity}</p>)}

                    <textarea
                      name="inquiry_message"
                      value={formik.values.inquiry_message}
                      onChange={formik.handleChange}
                      className="w-full px-4 py-2 mb-4 border rounded-md"
                      placeholder="Inquiry Message"
                      rows="3"
                      required
                    ></textarea>
                    {formik.errors.inquiry_message && formik.touched.inquiry_message &&
                      (<p className="text-red-500">{formik.errors.inquiry_message}</p>)}

                    {/* Name */}
                    <input
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      className="w-full px-4 py-2 mb-4 border rounded-md"
                      placeholder="Name"
                      required
                    />
                    {formik.errors.name && formik.touched.name &&
                      (<p className="text-red-500">{formik.errors.name}</p>)}

                    {/* Email */}
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className="w-full px-4 py-2 mb-4 border rounded-md"
                      placeholder="Email"
                      required
                    />
                    {formik.errors.email && formik.touched.email &&
                      (<p className="text-red-500">{formik.errors.email}</p>)}

                    {/* Mobile Number */}
                    <input
                      type="text"
                      name="mobile_no"
                      value={formik.values.mobile_no}
                      onChange={formik.handleChange}
                      className="w-full px-4 py-2 mb-4 border rounded-md"
                      placeholder="Mobile No."
                      required
                    />
                    {formik.errors.mobile_no && formik.touched.mobile_no &&
                      (<p className="text-red-500">{formik.errors.mobile_no}</p>)}

                    <button type="submit"
                      className="w-full py-2 bg-[#000000] text-white font-semibold rounded-md hover:bg-[#272626] transition ease-in-out duration-200"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            )}

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
                            <div className="text-[#000] text-[16px] py-2">
                              ₹{item.final_price}
                              {
                                item.discount_price > 0 && (
                                  <>
                                    <span className="line-through text-[12px] text-[#999] ml-1">₹{item.price}
                                    </span>
                                    <span className="text-[#3fac45] text-[12px]">{item.discount_price}% off</span>
                                  </>
                                )
                              }
                            </div>
                          </div>
                          <div className="text-[#999] text-[14px] ">
                            (incl. of all taxes)
                          </div>
                        </div>
                        <div className="pe-8 lg:pe-0 max-lg:hidden">
                          <div onClick={() => openProductInquiryModal(item.id)}
                            className="bg-[#000] hover:bg-[#222] hover:text-[#f8885b] transition ease-in-out duration-200 rounded-full text-base flex items-center font-bold 
                          text-[#fff] py-2 px-6 max-[1023px]:hidden button button--nanuk button--border-thin button--round-s"
                          >
                            <span>Product Inquiry</span>
                          </div>
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
                      <div className="flex items-center" onClick={openSizeChart}>
                        <div className="flex items-center bg-[#eee] rounded-full px-3 cursor-pointer">
                          <Image src={sizeChartIcon}
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
                        <div key={index}
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
                          {item.description}
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
