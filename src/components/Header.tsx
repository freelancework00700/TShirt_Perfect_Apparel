"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import menu from "../../public/Images/menu.png";
import close from "../../public/Images/close.png";
import mainLogo from "../../public/Images/PerfectApparels.png";

const Header = () => {
  const [menuShowResponsive, setMenuShowResponsive] = useState(false);
  const router = usePathname();
  return (
    <>
      <div
        className="max-[1024px]:fixed max-[1024px]:top-0 max-[1024px]:z-50 max-[1024px]:w-full overflow-hidden bg-white"
      >
        <div className="container mx-auto xl:max-w-7xl max-[1024px]:px-4">
          <div className="flex items-center justify-between max-lg:p-3">
            <div className="flex items-center">
              <div className="mr-3">
                <Link href="/">
                  <Image src={mainLogo} alt="PerfectApparels" className="h-8 w-full object-contain"></Image>
                </Link>
              </div>
              <div className="hidden lg:flex">
                <nav>
                  <ul className="flex items-center xl:gap-10 md:gap-5 lg:ml-5">
                    <li className=" py-[23px] cursor-pointer">
                      <Link
                        href="/"
                        className={`text-base uppercase font-bold leading-[16px]  hover:text-[#7ab01e] ${router === "/" ? "text-[#7ab01e]" : "text-[#000]"
                          }`}
                      >
                        Home
                      </Link>
                    </li>
                    <li className=" py-[23px] cursor-pointer">
                      <Link
                        href="/product"
                        className={`text-base uppercase font-bold leading-[16px]  hover:text-[#7ab01e] ${router === "/product"
                          ? "text-[#7ab01e]"
                          : "text-[#000]"
                          }`}
                      >
                        Product
                      </Link>
                    </li>
                    <li className=" py-[23px] cursor-pointer">
                      <Link
                        href="/customer-service"
                        className={`text-base uppercase font-bold leading-[16px]  hover:text-[#7ab01e] ${router === "/service"
                          ? "text-[#7ab01e]"
                          : "text-[#000]"
                          }`}
                      >
                        Customer Service
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="flex items-center">
              <div className="ps-4 pe-8 lg:pe-0 max-lg:hidden">
                <Link
                  href="tel:+91 94268 66467"
                  className="bg-[#7ab01e] hover:bg-[#000] hover:text-[#7ab01e] transition ease-in-out duration-200 rounded-full text-base flex items-center  font-bold text-[#000] py-2 px-4 max-[1023px]:hidden button button--nanuk button--border-thin button--round-s"
                >
                  <span>Contact Us: +91 94268 66467</span>
                </Link>
              </div>
              <div
                className="bg-[#fefefe26] rounded-sm p-2 lg:hidden flex"
                onClick={() => setMenuShowResponsive(!menuShowResponsive)}
              >
                {!menuShowResponsive ? (
                  <>
                    <Image
                      src={menu}
                      alt="menu-icon"
                      width={18}
                      height={18}
                      className="cursor-pointer"
                    />
                  </>
                ) : (
                  <>
                    <Image
                      src={close}
                      alt="menu-icon-new"
                      width={18}
                      height={18}
                      className="cursor-pointer"
                    />
                  </>
                )}
              </div>
            </div>

            {menuShowResponsive && (
              <div className="fixed w-full left-0 top-[58px] lg:hidden z-20 h-[calc(100vh_-_58px)]">
                <div className="bg-[#fff] p-3 px-5 shadow-md h-full">
                  <nav>
                    <ul className="flex items-center flex-col">
                      <li className="py-4">
                        <Link
                          href="/"
                          className="text-base uppercase font-medium leading-[16px] text-[#000] hover:text-[#7ab01e] cursor-pointer "
                        >
                          Home
                        </Link>
                      </li>
                      <li className="py-4">
                        <Link
                          href="/product"
                          className={`text-base uppercase font-bold leading-[16px]  hover:text-[#7ab01e] ${router === "/product"
                            ? "text-[#7ab01e]"
                            : "text-[#000]"
                            }`}
                        >
                          Product
                        </Link>
                      </li>
                      <li className="py-4">
                        <Link
                          href="/customer-service"
                          className={`text-base uppercase font-bold leading-[16px]  hover:text-[#7ab01e] ${router === "/service"
                            ? "text-[#7ab01e]"
                            : "text-[#000]"
                            }`}
                        >
                          Customer Service
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
