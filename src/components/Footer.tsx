"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Footer = () => {
  const router = usePathname();
  const [email, setEmail] = useState<string>('')
  const [phone, setPhoneNumber] = useState<string>('')


  const postInformation = async () => {
    const response = await axios.post('/api/get-in-touch',
      {
        email, phone,
      })
    console.log('response :>> ', response.data);
    setEmail("")
    setPhoneNumber("")
  }


  return (
    <>
      <footer className="bg-[#fff] pt-[50px]">
        <div
          className="
            w-full bg-gray-100 py-10 max-md:py-5"
        >
          <div className="container mx-auto xl:max-w-7xl max-sm:px-4">
            <div className="grid grid-cols-12">
              <div className="col-span-12 text-[30px] font-medium text-center mb-4">
                Get In Touch
              </div>
              <div className="col-span-12">
                <div className="flex justify-center gap-3 max-md:flex-wrap">
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full min-w-80 h-[52px]"
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full min-w-80 h-[52px]"
                    />
                  </div>
                  <Button onClick={postInformation} className="rounded-full px-10 h-[52px]">
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto xl:max-w-7xl max-sm:px-4">
            <div className="flex justify-between items-center flex-wrap max-md:justify-center">
              <div className="font-bold xl:me-[2rem] text-[24px]">Perfect Apparels</div>
              <ul className="flex items-center flex-wrap xl:gap-10 md:gap-5 gap-3 xl:ml-5">
                <li className=" py-[23px] cursor-pointer">
                  <Link
                    href="/"
                    className={`text-sm uppercase font-medium leading-[16px]  hover:text-[#f8a25b] ${router === "/" ? "text-[#f8a25b]" : "text-[#000]"
                      }`}
                  >
                    Home
                  </Link>
                </li>
                <li className=" py-[23px] cursor-pointer">
                  <Link
                    href="/product"
                    className={`text-sm uppercase font-medium leading-[16px]  hover:text-[#f8a25b] ${router === "/product" ? "text-[#f8a25b]" : "text-[#000]"
                      }`}
                  >
                    Product
                  </Link>
                </li>
                <li className=" py-[23px] cursor-pointer">
                  <Link
                    href="/customer-service"
                    className={`text-sm uppercase font-medium leading-[16px]  hover:text-[#f8a25b] ${router === "/service" ? "text-[#f8a25b]" : "text-[#000]"
                      }`}
                  >
                    Customer Service
                  </Link>
                </li>
                <li className=" py-[23px] cursor-pointer">
                  <Link
                    href="/privacy-policy"
                    className={`text-sm uppercase font-medium leading-[16px]  hover:text-[#f8a25b] ${router === "/privacy-policy"
                      ? "text-[#f8a25b]"
                      : "text-[#000]"
                      }`}
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        <div
          className="
           w-full bg-gray-100"
        >
          <div className="container mx-auto xl:max-w-7xl max-sm:px-4">
            <div className="text-sm text-center py-4">
              © 2025 Perfect Apparels. All rights reserved
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
