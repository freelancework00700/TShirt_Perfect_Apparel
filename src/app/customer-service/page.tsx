"use client"

import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from "axios";
import { toast } from "react-toastify";


function CustomerService() {
  const router = useRouter();

  const handleRetrunBack = () => {
    router.push('/product')
  }

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: yup.object({
      message: yup.string().min(10).max(200).required("Enter the message"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log('values :>> ', values);
      try {
        const response = await axios.post('/api/bulk-order-discuss', values)
        toast.success(response.data.message, {
          position: "top-right",
          closeOnClick: true,
          draggable: true,
        });
      } catch (error) {
        console.error(error)
      } finally {
        setSubmitting(false)
        resetForm()
      }
    }
  })



  return (
    <main className="max-[1024px]:mt-[58px] relative">
      <Header />
      <div className="min-h-[calc(100vh_-_385px)]">
        <div className="container mx-auto xl:max-w-8xl max-[1024px]:px-4 lg:mb-20 mb-5">
          <div className="py-10 max-sm:pt-5 pb-0">
            <div className="my-4 text-[30px] font-medium text-center">
              Welcome to Customer Service
            </div>
            <div className="mb-4 text-[16px] font-medium text-center">
              How can we help you today?
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 py-10 pt-0 lg:px-20">
            <div className="lg:col-span-6 col-span-12 lg:pt-10">
              <div className="shadow-md p-10 m-1 rounded-[10px]">
                <svg
                  className="w-10 h-10 mb-6 mx-auto text-[#7ab01e] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.535 7.677c.313-.98.687-2.023.926-2.677H17.46c.253.63.646 1.64.977 2.61.166.487.312.953.416 1.347.11.42.148.675.148.779 0 .18-.032.355-.09.515-.06.161-.144.3-.243.412-.1.111-.21.192-.324.245a.809.809 0 0 1-.686 0 1.004 1.004 0 0 1-.324-.245c-.1-.112-.183-.25-.242-.412a1.473 1.473 0 0 1-.091-.515 1 1 0 1 0-2 0 1.4 1.4 0 0 1-.333.927.896.896 0 0 1-.667.323.896.896 0 0 1-.667-.323A1.401 1.401 0 0 1 13 9.736a1 1 0 1 0-2 0 1.4 1.4 0 0 1-.333.927.896.896 0 0 1-.667.323.896.896 0 0 1-.667-.323A1.4 1.4 0 0 1 9 9.74v-.008a1 1 0 0 0-2 .003v.008a1.504 1.504 0 0 1-.18.712 1.22 1.22 0 0 1-.146.209l-.007.007a1.01 1.01 0 0 1-.325.248.82.82 0 0 1-.316.08.973.973 0 0 1-.563-.256 1.224 1.224 0 0 1-.102-.103A1.518 1.518 0 0 1 5 9.724v-.006a2.543 2.543 0 0 1 .029-.207c.024-.132.06-.296.11-.49.098-.385.237-.85.395-1.344ZM4 12.112a3.521 3.521 0 0 1-1-2.376c0-.349.098-.8.202-1.208.112-.441.264-.95.428-1.46.327-1.024.715-2.104.958-2.767A1.985 1.985 0 0 1 6.456 3h11.01c.803 0 1.539.481 1.844 1.243.258.641.67 1.697 1.019 2.72a22.3 22.3 0 0 1 .457 1.487c.114.433.214.903.214 1.286 0 .412-.072.821-.214 1.207A3.288 3.288 0 0 1 20 12.16V19a2 2 0 0 1-2 2h-6a1 1 0 0 1-1-1v-4H8v4a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2v-6.888ZM13 15a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div className="text-center text-[24px] mb-6 font-medium">
                  Bulk order Discuss
                </div>
                <div className="text-center text-[16px] mb-6">
                  Direct contact and follow-up with customers are crucial steps in
                  managing bulk orders effectively.
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <Textarea placeholder="Type your message here."
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.message && formik.touched.message &&
                    (<p className="text-red-500">{formik.errors.message}</p>)}
                  <div className="flex justify-center mt-6">
                    <Button type="submit" disabled={formik.isSubmitting}
                      className="px-10 rounded-full">
                      {formik.isSubmitting ? "Submitting..." : "Send message"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <div className="lg:col-span-6 col-span-12 lg:pt-10">
              <div className="shadow-md p-10 m-1 rounded-[10px] h-full">
                <svg
                  className="w-10 h-10 mb-6 mx-auto text-[#7ab01e] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.248 19C3.22 15.77 5.275 8.232 12.466 8.232V6.079a1.025 1.025 0 0 1 1.644-.862l5.479 4.307a1.108 1.108 0 0 1 0 1.723l-5.48 4.307a1.026 1.026 0 0 1-1.643-.861v-2.154C5.275 13.616 4.248 19 4.248 19Z"
                  />
                </svg>
                <div className="text-center text-[24px] mb-6 font-medium">
                  Return Policy
                </div>
                <div className="text-center text-[16px] mb-6">
                  Thank you for shopping with Perfect Apparels. We take pride in
                  the quality of our t-shirts and aim to ensure our customers are
                  fully satisfied. If you are not completely happy with your
                  purchase, we are here to help.
                </div>
                <div className="flex justify-center mt-6">
                  <Button onClick={handleRetrunBack} className="px-10 rounded-full">Go to Product</Button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 col-span-12 lg:pt-10">
              <div className="shadow-md p-10 m-1 rounded-[10px] h-full">
                <svg
                  className="w-10 h-10 mb-6 mx-auto text-[#7ab01e] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="2"
                    d="M4.37 7.657c2.063.528 2.396 2.806 3.202 3.87 1.07 1.413 2.075 1.228 3.192 2.644 1.805 2.289 1.312 5.705 1.312 6.705M20 15h-1a4 4 0 0 0-4 4v1M8.587 3.992c0 .822.112 1.886 1.515 2.58 1.402.693 2.918.351 2.918 2.334 0 .276 0 2.008 1.972 2.008 2.026.031 2.026-1.678 2.026-2.008 0-.65.527-.9 1.177-.9H20M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <div className="text-center text-[24px] mb-6 font-medium">
                  Contact US
                </div>
                <div className="text-center text-[16px] mb-3">
                  Address: Plot No.40 GF, Shidhi Park Society, L.H.Road, Varachha,
                  Surat, 395006
                </div>
                <div className="text-center text-[16px] mb-6">
                  Call or WhatsApp: +91 94268 66467 / +91 94281 49160
                </div>
                <div className="text-center text-[16px] mb-6">
                  Email: pravinbudheliya99@gmail.com
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 col-span-12 lg:pt-10">
              <div className="shadow-md rounded-[10px] h-full overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.5463767329775!2d72.85479911133164!3d21.21017188040356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f045d3372d3%3A0x9de6cb505990773a!2sLambe%20Hanuman%20Rd%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1728383501964!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default CustomerService;
