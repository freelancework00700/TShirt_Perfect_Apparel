import Header from '@/pages/components/Header'
import Link from 'next/link'
import React from 'react'

const Sitemap = () => {
  return (
    <>
      <Header />
      <div className=" project-bg py-[100px] max-lg:py-[70px] max-sm:py-[50px] overflow-hidden">
        <div className="container mx-auto">
          <h3 className="text-center text-[42px] font-bold text-[#222] leading-[50px] max-xl:text-[30px] max-xl:leading-[42px]">
            Sitemap
          </h3>
        </div>
      </div>
      <div className="container">
        <h3 className="text-[30px] font-bold text-[#222] leading-[40px] mt-[30px]">
          Sitemap
        </h3>
        <ul className='pl-[30px] list-disc'>
          <li className="py-2">
            <Link href="/" className="text-base font-medium leading-[16px] text-[#000] hover:text-[#f8a25b] cursor-pointer ">
              Home
            </Link>
          </li>
          <li className="py-2">
            <Link href="http://visionblinds.in/about" className="text-base font-medium leading-[16px] text-[#000] hover:text-[#f8a25b] cursor-pointer ">
              About
            </Link>
          </li>
          <li className="py-2">
            <Link href="http://visionblinds.in/services" className="text-base font-medium leading-[16px] text-[#000] cursor-pointer ">
              Services
              <ul className='ml-10 mt-3 list-square'>
                <li className="py-2">
                  <Link href="http://visionblinds.in/services" className="text-base font-medium leading-[16px] text-[#000] hover:text-[#f8a25b] cursor-pointer ">
                    Web Development
                  </Link>
                </li>
                <li className="py-2">
                  <Link href="http://visionblinds.in/services" className="text-base font-medium leading-[16px] text-[#000] hover:text-[#f8a25b] cursor-pointer ">
                  Mobile App Development
                  </Link>
                </li>
                <li className="py-2">
                  <Link href="http://visionblinds.in/services" className="text-base font-medium leading-[16px] text-[#000] hover:text-[#f8a25b] cursor-pointer ">
                  Cloud Service
                  </Link>
                </li>
                <li className="py-2">
                  <Link href="http://visionblinds.in/services" className="text-base font-medium leading-[16px] text-[#000] hover:text-[#f8a25b] cursor-pointer ">
                  IT Consulting
                  </Link>
                </li>
              </ul>
            </Link>
          </li>
          <li className="py-2">
            <Link href="/contactUs" className="text-base font-medium leading-[16px] text-[#000] hover:text-[#f8a25b] cursor-pointer ">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sitemap