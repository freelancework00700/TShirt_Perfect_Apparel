"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import mainLogo from "../../public/images/PerfectApparels.png";

const Footer = () => {
  const router = usePathname();
  const [loading, setLoading] = useState(false);
  const APIURL = process.env.NEXT_PUBLIC_API_URL

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Invalid email"
        )
        .required("Email required!"),
      phone: yup
        .number()
        .typeError("Only digits are allowed!")
        .required("Phone number required!")
        .test(
          "isTenDigits",
          "Mobile number must be exactly 10 digits",
          (value: any) => {
            return value && /^\d{10}$/.test(value.toString());
          }
        ),
      message: yup.string().min(10).max(100).required("Enter the message"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const response = await axios.post(APIURL + "get-in-touch", values);
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
        resetForm();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <footer className="bg-[#fff]">
        <div className="w-full bg-gray-100 py-10 max-md:py-5">
          <div className="container mx-auto xl:max-w-7xl max-[1024px]:px-4">
            <div className="grid grid-cols-12">
              <div className="col-span-12 text-[30px] max-sm:text-[18px] max-sm:mb-2 font-medium text-center mb-4 ">
                Get In Touch
              </div>
              <div className="col-span-12">
                <form onSubmit={formik.handleSubmit}>
                  {loading ? (
                    <div className="flex flex-col gap-3">
                      {/* Skeleton for email input */}
                      <Skeleton className="w-full h-[52px] rounded-md" />
                      {/* Skeleton for phone input */}
                      {/* Skeleton for submit button */}
                      {/* <Skeleton className="w-full h-[52px] rounded-md" />
                      <Skeleton className="w-full h-[52px] rounded-full" /> */}
                    </div>
                  ) : (
                    <div className="flex justify-center gap-3 flex-wrap">
                      <div className="max-sm:w-full">
                        <Input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          className="w-full min-w-80 h-[52px]"
                        />
                        {formik.errors.email && formik.touched.email && (
                          <p className="text-red-500">{formik.errors.email}</p>
                        )}
                      </div>
                      <div className="max-sm:w-full">
                        <Input
                          type="text"
                          name="phone"
                          placeholder="Phone"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          className="w-full min-w-80 h-[52px]"
                        />
                        {formik.errors.phone && formik.touched.phone && (
                          <p className="text-red-500">{formik.errors.phone}</p>
                        )}
                      </div>
                      <div className="max-sm:w-full">
                        <Input
                          type="text"
                          name="message"
                          placeholder="Message"
                          value={formik.values.message}
                          onChange={formik.handleChange}
                          className="w-full min-w-80 h-[52px]"
                        />
                        {formik.errors.message && formik.touched.message && (
                          <p className="text-red-500">
                            {formik.errors.message}
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="rounded-full px-10 h-[52px] max-sm:w-full"
                      >
                        Submit
                      </Button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto xl:max-w-7xl max-[1024px]:px-4">
          <div className="flex justify-between items-center flex-wrap max-md:justify-center">
            <div className="font-bold xl:me-[2rem] text-[24px] max-sm:pt-5">
              <Link href="/">
                <Image src={mainLogo} alt="PerfectApparels" className="h-8 w-full object-contain"></Image>
              </Link>
            </div>
            <ul className="flex items-center flex-wrap xl:gap-10 md:gap-5 gap-3 xl:ml-5">
              <li className=" py-[23px] cursor-pointer">
                <Link
                  href="/"
                  className={`text-base uppercase font-medium leading-[16px]  hover:text-[#7ab01e] ${router === "/" ? "text-[#7ab01e]" : "text-[#000]"
                    }`}
                >
                  Home
                </Link>
              </li>
              <li className=" py-[23px] cursor-pointer">
                <Link
                  href="/product"
                  className={`text-base uppercase font-medium leading-[16px]  hover:text-[#7ab01e] ${router === "/product" ? "text-[#7ab01e]" : "text-[#000]"
                    }`}
                >
                  Product
                </Link>
              </li>
              <li className=" py-[23px] cursor-pointer">
                <Link
                  href="/customer-service"
                  className={`text-base uppercase font-medium leading-[16px]  hover:text-[#7ab01e] ${router === "/service" ? "text-[#7ab01e]" : "text-[#000]"
                    }`}
                >
                  Customer Service
                </Link>
              </li>
              <li className=" py-[23px] cursor-pointer">
                <Link
                  href="/privacy-policy"
                  className={`text-base uppercase font-medium leading-[16px]  hover:text-[#7ab01e] ${router === "/privacy-policy"
                    ? "text-[#7ab01e]"
                    : "text-[#000]"
                    }`}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full bg-gray-100">
          <div className="container mx-auto xl:max-w-8xl max-sm:px-4">
            <div className="text-base text-center py-4">
              © 2025 Perfect Apparels. All rights reserved
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
