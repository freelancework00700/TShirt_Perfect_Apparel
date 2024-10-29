"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { Loader2 } from "lucide-react";

const GetInTouch = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobileNumber: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required!"),
      email: yup
        .string()
        .matches(
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          "Invalid email"
        )
        .required("Email required!"),
      mobileNumber: yup
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
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        const response = await axios.post("/api/contactUs", {
          name: values.name,
          email: values.email,
          mobileNumber: values.mobileNumber,
        });
        if (response?.data?.success) {
          resetForm();
          toast({
            description:
              response?.data?.message || "Request sent. Check you mail inbox.",
            className: "bg-green-300 border-green-300 text-black",
          });
        }
      } catch (error) {
        toast({
          description: "Failed to send request. Something went wrong!",
          className: "bg-red-400 border-red-400 text-white",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger>Get in touch +</DialogTrigger>
      <DialogContent>
        <DialogDescription>
          <div className="grid grid-cols-12 border-t-4 border-[#f8a25b]">
            <div className="col-span-12 max-md:col-span-12">
              <div className="p-6 py-10 text-center">
                <DialogTitle className="text-3xl text-[#102d5e]">
                  Get In Touch
                </DialogTitle>
              </div>
            </div>
            <div className="col-span-12 max-md:col-span-12 ">
              <form
                className="px-20 max-lg:px-10 pb-10"
                onSubmit={formik.handleSubmit}
              >
                <div className="mb-3 relative">
                  <Input
                    type="text"
                    placeholder="Name*"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.name && formik.touched.name && (
                    <p className="alert-text ml-2">{formik.errors.name}</p>
                  )}
                </div>
                <div className="mb-3 relative">
                  <Input
                    type="email"
                    placeholder="Email *"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="pl-4 py-6"
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className="alert-text ml-2">{formik.errors.email}</p>
                  )}
                </div>
                <div className="mb-3 relative">
                  <Input
                    type="number"
                    placeholder="Phone Number *"
                    name="mobileNumber"
                    value={formik.values.mobileNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.mobileNumber && formik.touched.mobileNumber && (
                    <p className="alert-text ml-2">
                      {formik.errors.mobileNumber}
                    </p>
                  )}
                </div>
                <div className="mb-3 pt-3">
                  <button
                    type="submit"
                    className="bg-[#f8a25b] rounded-md uppercase text-base flex w-full justify-center items-center font-semibold text-[#1d1c20] py-3 px-4"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default GetInTouch;
