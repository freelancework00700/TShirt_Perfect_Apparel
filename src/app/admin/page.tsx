"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from "axios";
import { ICategories, IColor, Inquiry, IProduct, ISize, ProductInquiry } from "@/interface/types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";




function Admin() {

  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [adminShow, setAdminShow] = useState(false);
  const [viewProduct, setViewProduct] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [allProduct, setAllProduct] = useState<IProduct[]>([]);
  const [category, setCategory] = useState("")
  // const [subCategory, setSubCategory] = useState("")
  const [colors, setColors] = useState("")
  const [allCategory, setAllCategory] = useState<ICategories[]>([]);
  const [allColors, setAllColors] = useState<ICategories[]>([]);
  // const [allSubCategory, setAllSubCategory] = useState<ISubCategories[]>([]);
  const [openModel, setOpenModel] = useState(false);
  const [size, setSize] = useState('')
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedSizeId, setSelectedSizeId] = useState<number | string | null>(null);
  const [selectedColorId, setSelectedColorId] = useState<number | string | null>(null);
  const [allSize, setAllSize] = useState<ISize[]>([])
  const [filteredSize, setFilteredSize] = useState<ISize[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [id, setId] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [viewProductData, setViewProductData] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageOfInquiry, setCurrentPageOfInquiry] = useState(1);
  const [currentPageOfSize, setCurrentPageOfSize] = useState(1);
  const [currentPageOfColor, setCurrentPageOfColor] = useState(1);
  const [currentPageOfProductInquiry, setCurrentPageOfProductInquiry] = useState(1);
  const recordsPerPage = 10;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteSizeDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allInquiry, setAllInquiry] = useState<Inquiry[]>([]);
  const [productInquiry, setProductInquiry] = useState<ProductInquiry[]>([])
  const [openProductInquiry, setOpenProductInquiry] = useState(false);
  const [openGetInTouchInquiry, setGetInTouchInquiry] = useState(false);
  const [selectedProductInquiry, setSelectedProductInquiry] = useState<number | null>(null);
  const [selectedGetInTouchInquiry, setSelectedGetInTouchInquiry] = useState<number | null>(null);
  const router = useRouter();
  const [isTrackPants, setIsTrackPants] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const APIURL = process.env.NEXT_PUBLIC_API_URL
  const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSizeButtonDisabled, setIsSizeButtonDisabled] = useState(false);
  const [sizeChartData, setSizeChartData] = useState<any>();
  const [searchQuery, setSearchQuery] = useState('');



  const loginCredentials = [{ email: 'abc@gmail.com', password: 'Abc@123' },
  { email: 'test@gmail.com', password: 'test@123' }]

  useEffect(() => {
    const storedData = localStorage.getItem("loginCredentials");
    if (storedData) {
      setAdminShow(true); // User is logged in
    }
  }, []);


  const handleLogin = () => {
    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    const findData = loginCredentials.find((value) => value.email === email &&
      value.password === password)

    if (findData) {
      localStorage.setItem("loginCredentials", JSON.stringify(findData));
      setAdminShow(true);
    }
    setError("");
    setEmail("");
    setPassword("");
  };

  const handleLogout = () => {
    localStorage.removeItem('loginCredentials')
    setAdminShow(false)
  }

  const getAllProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(APIURL + `product`)
      setAllProduct(response.data.data)
    } catch (error) {
      console.log('error :>> ', error);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   // Filter products based on switch selection
  //   const category = isTrackPants ? 'Cargo/Track-Pants' : 'T-Shirts';
  //   const filtered = allProduct.filter((product) => product.Category.name === category);
  //   setFilteredProducts(filtered);
  // }, [isTrackPants, allProduct]);

  useEffect(() => {
    // Filter products based on search query
    const filtered = allProduct.filter((product) => {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.price.includes(query) ||
        product.category_id.toString().includes(query) ||
        product.discount_price.toString().includes(query) ||
        (product.style_code && product.style_code.toLowerCase().includes(query))
      );
    });

    setFilteredProducts(filtered);
  }, [searchQuery, allProduct]);

  const getAllCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(APIURL + `category`)
      setAllCategory(response.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }
  }

  const getAllSize = async () => {
    setLoading(true)
    try {
      const response = await axios.get(APIURL + `size`)
      setAllSize(response.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getAllColor = async () => {
    setLoading(true)
    try {
      const colorResponse = await axios.get(APIURL + `color`)
      setAllColors(colorResponse.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getAllInquiry = async () => {
    setLoading(true);
    try {
      const response = await axios.get(APIURL + 'get-in-touch')
      setAllInquiry(response.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getProductInquiry = async () => {
    setLoading(true);
    try {
      const response = await axios.get(APIURL + 'product-inquiry')
      setProductInquiry(response.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getApiPage = async () => {
    try {
      await getAllSize();
      await getAllCategory();
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (page === 1) {
      getAllProduct();
    } else if (page === 2) {
      getAllCategory();
    } else if (page === 3) {
      // getAllSubCategory();
    } else if (page === 4) {
      getApiPage();
    } else if (page === 5) {
      getAllColor();
    } else if (page === 6) {
      getProductInquiry();
    } else {
      getAllInquiry();
    }
  }, [page])

  const handleEditCategory = async (item: ICategories) => {
    setOpenModel(true)
    setCategory(item.name)
    setSelectedCategoryId(item.id)
  }

  const openDeleteCategoryDialog = (id: number) => {
    setSelectedCategoryId(id);
    setIsCategoryDialogOpen(true);
  };

  const handleAddCategory = async () => {
    if (!category.trim()) {
      return;
    }

    setIsAddingCategory(true);
    try {
      if (selectedCategoryId) {
        const editResponse = await axios.put(APIURL + `category`, { id: selectedCategoryId, name: category })
        console.log('editResponse :>> ', editResponse);
        setOpenModel(false)
        toast.success(editResponse.data.message, {
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
        getAllCategory();
      } else {
        const response = await axios.post(APIURL + '/category', { name: category })
        setOpenModel(false)
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
        getAllCategory();
      }
    } catch (error: any) {
      setIsAddingCategory(false);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || "Something went wrong", {
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
      } else {
        // Handle other errors (optional)
        toast.error("An unexpected error occurred", {
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
      }
    } finally {
      setIsAddingCategory(false);
    }
  }

  const handleDeleteCategory = async () => {
    try {
      const response = await axios.delete(APIURL + `category?id=${selectedCategoryId}`)
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
      getAllCategory();
    } catch (error) {
      console.error(error)
    }
  }

  // const handleAddSubCategory = async () => {
  //   try {
  //     await axios.post('/api/sub-category', { name: subCategory, category_id: selectedCategoryId })
  //     setOpenModel(false)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const handleEditSize = async (item: ISize) => {
    setOpenModel(true)
    setSize(item.name)
    setSelectedSizeId(item.id)
    setSelectedCategory(item.Category)
  }

  const openSizeDialog = (id: number) => {
    setSelectedSizeId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleAddSize = async () => {
    if (!size || !selectedCategory) {
      return
    }
    setIsSizeButtonDisabled(true)
    try {
      if (selectedSizeId) {
        const editSizeResponse = await axios.put(APIURL + `size`, { id: selectedSizeId, name: size, category_id: selectedCategory.id })
        toast.success(editSizeResponse.data.message, {
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
        getAllSize();
      } else {
        const sizeResponse = await axios.post(APIURL + `size`, { name: size, category_id: selectedCategory?.id })
        toast.success(sizeResponse.data.message, {
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
        getAllSize();
      }
      setOpenModel(false)
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || "Something went wrong", {
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
      } else {
        // Handle other errors (optional)
        toast.error("An unexpected error occurred", {
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
      }
    } finally {
      setIsSizeButtonDisabled(false)
    }
  }

  const handleDeleteSize = async () => {
    try {
      const response = await axios.delete(APIURL + `size?id=${selectedSizeId}`)
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
      getAllSize();
    } catch (error) {
      console.error(error)
    }
  }

  const openDeleteProductDialog = (id: number) => {
    setSelectedProductId(id)
    setIsProductDialogOpen(true);
  }

  const handleDeleteProduct = async () => {
    try {
      const response = await axios.delete(APIURL + `product?id=${selectedProductId}`)
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
      getAllProduct();
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditColor = async (item: IColor) => {
    setOpenModel(true)
    setColors(item.name)
    setSelectedColorId(item.id)
  }

  const openDeleteDialog = (id: number) => {
    setSelectedColorId(id);
    setIsDialogOpen(true);
  };

  const handleAddColor = async () => {
    if (!colors.trim()) {
      return;
    }
    setIsLoading(true);
    try {
      if (selectedColorId) {
        const editResponse = await axios.put(APIURL + `color`, { id: selectedColorId, name: colors })
        setOpenModel(false)
        toast.success(editResponse.data.message, {
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
        getAllColor();
      } else {
        const colorResponse = await axios.post(APIURL + `color`, { name: colors })
        setOpenModel(false)
        toast.success(colorResponse.data.message, {
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
        getAllColor();
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || "Something went wrong", {
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
      } else {
        // Handle other errors (optional)
        toast.error("An unexpected error occurred", {
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
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteColor = async (id: any) => {
    try {
      const response = await axios.delete(APIURL + `color?id=${selectedColorId}`)
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      getAllColor();
    } catch (error) {
      console.error(error)
    } finally {
      setIsDialogOpen(false);
      setSelectedColorId(null);
    }
  }

  const handleViewProduct = async (item: IProduct) => {
    setViewProductData([item]);
    setViewProduct(true)
  }


  const formik = useFormik({
    initialValues: {
      category_id: "",
      // subcategory_id: "",
      color_ids: "",
      size_ids: "",
      name: "",
      price: "",
      type: "",
      sleeve: "",
      fit: "",
      fabric: "",
      pack_of: "",
      style_code: "",
      neck_type: "",
      ideal_for: "",
      pattern: "",
      suitable_for: "",
      reversible: "",
      fabric_care: "",
      net_quantity: "",
      status: "",
      sales_package: "",
      images: [] as File[],
      description: "",
      discount_price: "",
      final_price: "",
      inStock: true,
      isHideFields: false,
      size_chart: [
        {
          size_id: "",
          chest: "",
          length_inch: "",
          shoulder: "",
          sleeve: "",
          waist: "",
          length_cm: "",
          hip: "",
        },
      ],
    },
    validationSchema: yup.object({
      category_id: yup.string().required("Select a category"),
      // subcategory_id: yup.string().required("Select a sub category"),
      color_ids: yup.string().required("Select a color"),
      size_ids: yup.string().required("Select a size"),
      name: yup.string().min(1).max(100).required("Enter product name"),
      price: yup.string().min(1).max(30).required("Enter price"),
      type: yup.string().min(1).max(30).required("Enter type"),
      sleeve: yup.string().when("isHidenFields", {
        is: (value: boolean) => value === false,
        then: (schema) => schema.required("Enter sleeve"),
        otherwise: (schema) => schema.notRequired(),
      }),
      fit: yup.string().min(1).max(30).required("Enter fit"),
      fabric: yup.string().min(1).max(30).required("Enter fabric"),
      pack_of: yup.string().min(1).max(30).required("Enter pack of"),
      style_code: yup.string().min(1).max(30).required("Enter style code"),
      // neck_type: yup.string().min(1).max(30).required("Enter neck type"),
      neck_type: yup.string().when("isHidenFields", {
        is: (value: boolean) => value === false,
        then: (schema) => schema.required("Enter neck_type"),
        otherwise: (schema) => schema.notRequired(),
      }),
      ideal_for: yup.string().min(1).max(30).required("Enter ideal for"),
      pattern: yup.string().min(1).max(30).required("Enter pattern"),
      suitable_for: yup.string().min(1).max(30).required("Enter suitable for"),
      // reversible: yup.string().min(1).max(30).required("Enter reversible"),
      reversible: yup.string().when("isHidenFields", {
        is: (value: boolean) => value === false,
        then: (schema) => schema.required("Enter reversible"),
        otherwise: (schema) => schema.notRequired(),
      }),
      fabric_care: yup.string().min(1).max(30).required("Enter fabric care"),
      net_quantity: yup.string().min(1).max(30).required("Enter net quantity"),
      status: yup.string().min(1).max(30).required("Enter status"),
      sales_package: yup.string().min(1).max(30).required("Enter status"),
      images: yup.array().min(1, "At least one file is required").required("Required"),
      description: yup.string().min(10).max(500).required("Enter the description"),
      discount_price: yup.number().required("Enter the discount price"),
      final_price: yup.string().required("Enter the final price"),
      inStock: yup.boolean().required(),
      size_chart: yup.array().of(
        yup.object().shape({
          size_id: yup
            .string()
            .required("Size ID is required")
            .typeError("Size ID must be a number"),
          chest: yup.string(),
          length_inch: yup.string(),
          shoulder: yup.string(),
          sleeve: yup.string(),
          waist: yup.string(),
          length_cm: yup.string(),
          hip: yup.string(),
        })
      ),
    }),
    onSubmit: async (values) => {
      console.log('values: ', values);
      const formData = new FormData();
      formData.append("category_id", values.category_id)
      // formData.append("subcategory_id", values.subcategory_id)
      formData.append("color_ids", values.color_ids)
      formData.append("size_ids", values.size_ids)
      formData.append("name", values.name)
      formData.append("discount_price", values.discount_price)
      formData.append("price", values.price)
      formData.append("final_price", values.final_price)
      formData.append("type", values.type)
      formData.append("sleeve", values.sleeve)
      formData.append("fit", values.fit)
      formData.append("fabric", values.fabric)
      formData.append("pack_of", values.pack_of)
      formData.append("style_code", values.style_code)
      formData.append("neck_type", values.neck_type)
      formData.append("ideal_for", values.ideal_for)
      formData.append("pattern", values.pattern)
      formData.append("suitable_for", values.suitable_for)
      formData.append("reversible", values.reversible)
      formData.append("fabric_care", values.fabric_care)
      formData.append("net_quantity", values.net_quantity)
      formData.append("status", values.status)
      formData.append("sales_package", values.sales_package)
      formData.append("inStock", values.inStock.toString())
      values.images.forEach((images) => {
        formData.append("images", images)
      })
      formData.append("description", values.description)
      formData.append("size_chart", JSON.stringify(values.size_chart));


      if (id) {
        formData.append("id", id.toString())
        try {
          const response = await axios.put(APIURL + `product?id=${id}`, formData, {
            headers: { 'content-type': 'multipart/form-data' }
          })
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
          getAllProduct();
        } catch (error) {
          console.error(error)
        }
      } else {
        try {
          const productResponse = await axios.post(APIURL + `product/`, formData, {
            headers: { 'content-type': 'multipart/form-data' }
          })
          toast.success(productResponse.data.message, {
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
          getAllProduct();
        } catch (error) {
          console.error(error)
        }
      }
      setOpenModel(false)
    },
  });


  const changeFinalPrice = (discountValue: number) => {
    const price = Number(formik.values.price);
    const discount = Number(discountValue);

    if (price && discount >= 0) {
      const final_price = discount === 0 ? price : price - (price * discount) / 100;
      formik.setFieldValue("final_price", final_price.toFixed(0));
    }
  };

  const handleEditProduct = async (item: IProduct) => {
    console.log('item: ', item);
    getAllCategory();
    getAllSize();
    getAllColor();
    setOpenModel(true)
    setId(item.id.toString())
    formik.setFieldValue("category_id", item.category_id)
    // formik.setFieldValue("subcategory_id", item.subcategory_id)
    formik.setFieldValue("color_ids", item.color_ids?.toString())
    formik.setFieldValue("size_ids", item.size_ids.toString())
    formik.setFieldValue("name", item.name)
    formik.setFieldValue("discount_price", item.discount_price)
    formik.setFieldValue("price", item.price)
    formik.setFieldValue("final_price", item.final_price)
    formik.setFieldValue("type", item.type)
    formik.setFieldValue("sleeve", item.sleeve)
    formik.setFieldValue("fit", item.fit)
    formik.setFieldValue("fabric", item.fabric)
    formik.setFieldValue("pack_of", item.pack_of)
    formik.setFieldValue("style_code", item.style_code)
    formik.setFieldValue("neck_type", item.neck_type)
    formik.setFieldValue("ideal_for", item.ideal_for)
    formik.setFieldValue("pattern", item.pattern)
    formik.setFieldValue("suitable_for", item.suitable_for)
    formik.setFieldValue("reversible", item.reversible)
    formik.setFieldValue("fabric_care", item.fabric_care)
    formik.setFieldValue("net_quantity", item.net_quantity)
    formik.setFieldValue("status", item.status)
    formik.setFieldValue("sales_package", item.sales_package)
    const imageFilenames: any = item.ProductImages.map((image) => image.fileName);
    formik.setFieldValue("images", imageFilenames);
    setSelectedImages(imageFilenames)
    formik.setFieldValue("description", item.description)
    formik.setFieldValue("inStock", item.inStock)

    if (item.SizeCharts && item.SizeCharts.length > 0) {
      const updatedSizeChart = item.SizeCharts.map((size) => ({
        size_id: size.size_id || '',
        chest: size.chest || '',
        length_inch: size.length_inch || '',
        shoulder: size.shoulder || '',
        sleeve: size.sleeve || '',
        waist: size.waist || '',
        length_cm: size.length_cm || '',
        hip: size.hip || '',
      }));
      formik.setFieldValue("size_chart", updatedSizeChart);
    }
  }

  useEffect(() => {
    // Filter subcategories based on selected category
    const getSubCategoryData = async () => {
      try {
        if (formik.values.category_id.toString()) {
          // const subCategoryResponse = await axios.get(`/api/sub-category?id=${formik.values.category_id}`)
          // const data = subCategoryResponse.data.data
          // setAllSubCategory(data)
          // console.log('allSize :>> ', allSize);
          // const filteredData = allSize.filter((item) => item.Category.id.toString() === formik.values.category_id.toString());
          const filteredData = allSize.filter((item) => item.category_id.toString() === formik.values.category_id.toString());
          setFilteredSize(filteredData)
        }
        // else {
        //   setAllSubCategory(allSubCategory);
        // }
      } catch (error) {
        console.error(error)
      }
    }
    getSubCategoryData();
  }, [allSize, category, formik.values.category_id]);

  const handleChangeChooseFile = async (e: any) => {
    const { type, files } = e.target;
    if (type === "file") {
      const selectedFiles: any = Array.from(files);
      console.log('selectedFiles: ', selectedFiles);
      setSelectedImages(selectedFiles);
      formik.setFieldValue("images", selectedFiles);
    } else {
      formik.handleChange(e);
    }
  };

  const removeImage = (item: number) => {
    console.log('item :>> ', item);
    const updatedImages = selectedImages.filter((_, i) => i !== item);
    setSelectedImages(updatedImages);
    formik.setFieldValue("images", updatedImages);
  }

  const handleUpdateStatus = async (item: IProduct, value: string) => {
    const formData = new FormData();
    formData.append("id", item.id.toString());
    formData.append("category_id", item.category_id.toString());
    // formData.append("subcategory_id", item.subcategory_id.toString());
    formData.append("color_ids", item.color_ids.toString());
    formData.append("size_ids", item.size_ids.toString());
    formData.append("name", item.name);
    formData.append("discount_price", item.discount_price.toString());
    formData.append("price", item.price);
    formData.append("final_price", item.final_price);
    formData.append("type", item.type);
    formData.append("sleeve", item.sleeve);
    formData.append("fit", item.fit);
    formData.append("fabric", item.fabric);
    formData.append("pack_of", item.pack_of);
    formData.append("style_code", item.style_code);
    formData.append("neck_type", item.neck_type);
    formData.append("ideal_for", item.ideal_for);
    formData.append("pattern", item.pattern);
    formData.append("suitable_for", item.suitable_for);
    formData.append("reversible", item.reversible);
    formData.append("fabric_care", item.fabric_care);
    formData.append("net_quantity", item.net_quantity);
    formData.append("status", value);
    formData.append("sales_package", item.sales_package);
    item.ProductImages.forEach((image) => {
      formData.append("images", image.fileSize);
    });
    formData.append("description", item.description);
    formData.append("inStock", item.inStock.toString());

    try {
      const response = await axios.put(APIURL + `product?id=${item.id}`, formData)
      console.log('response: ', response.data.data);
      getAllProduct();
    } catch (error) {
      console.error(error)
    }
  }

  const handleCheckboxChange = async (id: string) => {
    // console.log(id, "iddddd")
    const selectedIds = new Set(formik.values.size_ids.split(',').filter(Boolean)); // Use a Set to handle uniqueness
    if (selectedIds.has(id)) {
      selectedIds.delete(id);
    } else {
      selectedIds.add(id);
    }
    formik.setFieldValue('size_ids', Array.from(selectedIds).join(',')); // Convert back to string

    // formik.setFieldValue("size_ids", id)
    // formik.setFieldValue('size_ids', (prev: string) => {
    //   const selectedIds = prev.split(',').filter(Boolean); // Split and filter empty strings
    //   if (selectedIds.includes(id)) {
    //     return selectedIds.filter((sizeId) => sizeId !== id).join(','); // Remove ID and join
    //   } else {
    //     return [...selectedIds, id].join(','); // Add ID and join
    //   }
    // });
  }

  const handleColorCheckBoxChange = async (id: string) => {
    const selectedIds = new Set(formik.values.color_ids?.split(',').filter(Boolean));
    if (selectedIds.has(id)) {
      selectedIds.delete(id);
    } else {
      selectedIds.add(id);
    }
    formik.setFieldValue('color_ids', Array.from(selectedIds).join(','));
  }

  const handleOpenDialog = (id: number) => {
    setSelectedProductInquiry(id)
    setOpenProductInquiry(true)
  }

  const handleCloseDialog = () => {
    setOpenProductInquiry(false)
    setSelectedProductInquiry(null)
  }

  const handleDeleteInquiry = async () => {
    if (selectedProductInquiry) {
      // onDelete(selectedProductInquiry) // Call delete function, pass the selected product ID
      try {
        const response = await axios.delete(APIURL + `product-inquiry?id=${selectedProductInquiry}`)
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
        getProductInquiry();
      } catch (error) {
        console.error(error)
      }
      handleCloseDialog()
    }
  }

  const handleOpenInquiryDialog = (id: number) => {
    setGetInTouchInquiry(true)
    setSelectedGetInTouchInquiry(id)
  }

  const handleDeleteGetInTouchInquiry = async () => {
    if (selectedGetInTouchInquiry) {
      try {
        const response = await axios.delete(APIURL + `get-in-touch?id=${selectedGetInTouchInquiry}`)
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        getAllInquiry();
      } catch (error) {
        console.error(error)
      }
    }
  }


  const totalPages = Math.ceil(filteredProducts.length / recordsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  // Handler to go to the next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handler to go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handler to go to a specific page
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // size pagination
  const totalPagesOfSize = Math.ceil(allSize.length / recordsPerPage)
  const currentSize = allSize.slice(
    (currentPageOfSize - 1) * recordsPerPage,
    currentPageOfSize * recordsPerPage)

  const nextPageofSize = () => {
    if (currentPageOfSize < totalPagesOfSize) {
      setCurrentPageOfSize(currentPageOfSize + 1)
    }
  }

  const previousPageOfSize = () => {
    if (totalPagesOfSize > 1) {
      setCurrentPageOfSize(currentPageOfSize - 1);
    }
  }

  const gotoPageOfSize = (page: number) => {
    setCurrentPageOfSize(page);
  }

  // color pagination
  const totalPagesOfColor = Math.ceil(allColors.length / recordsPerPage)
  const currentColor = allColors.slice((currentPageOfColor - 1) * recordsPerPage,
    currentPageOfColor * recordsPerPage)

  const nextPageOfColor = () => {
    if (currentPageOfColor < totalPagesOfColor) {
      setCurrentPageOfColor(currentPageOfColor + 1)
    }
  }

  const previousPageOfColor = () => {
    if (totalPagesOfColor > 1) {
      setCurrentPageOfColor(currentPageOfColor - 1)
    }
  }

  const gotoPageOfColor = (page: number) => {
    setCurrentPageOfColor(page)
  }

  //product-inquiry pagination
  const totalPageOfProductInquiry = Math.ceil(productInquiry.length / recordsPerPage)
  const currentProductInquiry = productInquiry.slice((currentPageOfProductInquiry - 1)
    * recordsPerPage, currentPageOfInquiry * recordsPerPage)

  const nextPageOfProductInquiry = () => {
    if (currentPageOfProductInquiry < totalPageOfProductInquiry) {
      setCurrentPageOfProductInquiry(currentPageOfProductInquiry + 1)
    }
  }

  const previousPageOfProductInquiry = () => {
    if (totalPageOfProductInquiry > 1) {
      setCurrentPageOfProductInquiry(currentPageOfProductInquiry - 1)
    }
  }

  const gotoPageProductInquiry = (page: number) => {
    setCurrentPageOfProductInquiry(page)
  }

  //inquiry pagination 
  const totalPagesOfInquiry = Math.ceil(allInquiry.length / recordsPerPage)
  const currentInquiry = allInquiry.slice(
    (currentPageOfInquiry - 1) * recordsPerPage,
    currentPageOfInquiry * recordsPerPage
  );

  const nextPageOfInquiry = () => {
    if (currentPageOfInquiry < totalPagesOfInquiry) {
      setCurrentPageOfInquiry(currentPageOfInquiry + 1)
    }
  }

  const previousPageOfInquiry = () => {
    if (currentPageOfInquiry > 1) {
      setCurrentPageOfInquiry(currentPageOfInquiry - 1);
    }
  }

  const gotoPageOfInquiry = (page: number) => {
    setCurrentPageOfInquiry(page)
  }

  const trackPantsCategoryId = allCategory.find((cat) => cat.name === "Cargo/Track-Pants" || cat.name === "Jeans")?.id.toString();

  const trackPantsId = allCategory.find(val => val.name === "Cargo/Track-Pants")?.id.toString();
  const jeansId = allCategory.find(val => val.name === "Jeans")?.id.toString();

  const handleDynamicInputChange = (field: string, value: string, sizeId: number) => {
    const updated = [...(formik.values?.size_chart || [])];

    const filteredUpdated = updated.filter(item => {
      const sizeIdStr = item.size_id ? item.size_id.toString() : '';
      return sizeIdStr.trim() !== '';
    });


    const sizeChartObject = filteredUpdated.reduce((acc: any, item) => {
      acc[item.size_id] = { ...item };
      return acc;
    }, {});

    if (sizeChartObject[sizeId]) {
      sizeChartObject[sizeId][field] = value;
    } else {
      sizeChartObject[sizeId] = { size_id: sizeId, [field]: value };
    }
    const updatedSizeChartArray = Object.values(sizeChartObject);

    // Update the state
    setSizeChartData(sizeChartObject);
    formik.setFieldValue('size_chart', updatedSizeChartArray);

    // formik.setFieldValue('size_chart', sizeChartData);


    // setSizeChartData((prev) => {
    //   const updated = [...prev];
    //   console.log('updated: ', updated);

    //   //index object find
    //   const index = updated.findIndex((data) => data.size_id === sizeId);
    //   if (index > -1) {
    //     updated[index] = { ...updated[index], [field]: value };
    //   } else {
    //     updated.push({ size_id: sizeId, [field]: value });
    //   }

    //   if (updated) {
    //     formik.setFieldValue('size_chart', updated);
    //   }
    //   return updated;
    // });
  };

  return (
    <>
      <ToastContainer />
      <main className="relative max-h-[100vh]">
        {!adminShow ? (
          <div className="bg-gray-100 h-[100vh]">
            <div className="container mx-auto xl:max-w-8xl">
              <div
                className="login-form max-w-[600px] w-[450px] mx-auto absolute top-[50%] left-[50%]"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <div className="font-bold xl:me-[2rem] text-[24px] text-center mb-5">
                  Perfect Apparels
                </div>
                <form className="m-2 p-10 rounded-md shadow-lg bg-white">
                  <div>
                    <label className="text-base">Email</label>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label className="text-base">Password</label>
                    <Input
                      type="password"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <div className="mt-5">
                    <Button
                      type="submit"
                      className="px-10"
                      onClick={() => handleLogin()}
                    >
                      Login
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="relative flex w-full" style={{ flex: "1 1 auto" }}>
              <div className="h-[100vh] w-[300px] min-w-[280px] max-w-[280px] bg-black text-white sticky flex flex-col top-0 min-h-[100vh] max-h-[100vh] z-[200]"
                style={{ flex: "1 0 auto" }}>
                <div className="font-bold text-[24px] p-[10px]">
                  Perfect Apparels
                </div>
                <div className="p-3 flex flex-col justify-between gap-3 h-full">
                  <div className="max-h-[calc(100vh_-_180px)]">
                    <div onClick={() => setPage(1)} className={`${page === 1 && "bg-[#222]"} hover:bg-[#141414] p-2 px-5 rounded-md cursor-pointer`}>
                      Product
                    </div>
                    <div onClick={() => setPage(2)} className={`${page === 2 && "bg-[#222]"} hover:bg-[#141414] p-2 px-5 rounded-md cursor-pointer`}>
                      Categories
                    </div>
                    {/* <div onClick={() => setPage(3)} className={`${page === 3 && "bg-[#222]"} hover:bg-[#141414] p-2 px-5 rounded-md cursor-pointer`}>
                    Sub Categories
                  </div> */}
                    <div onClick={() => setPage(4)} className={`${page === 4 && "bg-[#222]"} hover:bg-[#141414] p-2 px-5 rounded-md cursor-pointer`}>
                      Size
                    </div>
                    <div onClick={() => setPage(5)} className={`${page === 5 && "bg-[#222]"} hover:bg-[#141414] p-2 px-5 rounded-md cursor-pointer`}>
                      Color
                    </div>
                    <div onClick={() => setPage(6)} className={`${page === 6 && "bg-[#222]"} hover:bg-[#141414] p-2 px-5 rounded-md cursor-pointer`}>
                      Product Inquiry
                    </div>
                    <div onClick={() => setPage(7)} className={`${page === 7 && "bg-[#222]"} hover:bg-[#141414] p-2 px-5 rounded-md cursor-pointer`}>
                      Get in Touch
                    </div>
                  </div>
                  <div>
                    <div onClick={handleLogout} className="p-2 px-5 rounded-md cursor-pointer text-lg font-semibold">
                      Logout
                    </div>
                    <div onClick={() => router.push('/')}
                      className="p-2 px-5 rounded-md cursor-pointer text-lg font-semibold">
                      Back To Website
                    </div>
                  </div>
                </div>
              </div>
              {viewProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                  <div className="w-[700px] p-7 max-h-[600px] mt-20 bg-white rounded-lg shadow-lg relative overflow-y-auto">
                    <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
                    {
                      viewProductData?.map((item) => (
                        <>
                          <div className="grid grid-cols-12 gap-2 gap-y-2">
                            <div className="mb-2 col-span-6">
                              <span className="font-bold text-gray-500">Category:</span> {item.Category?.name}
                            </div>
                            <div className="mb-2 col-span-6">
                              <span className="font-bold text-gray-500">Name: </span>{item.name}
                            </div>
                            <div className="mb-2 col-span-6">
                              <span className="font-bold text-gray-500">Price: </span>{item.price}
                            </div>
                            <div className="mb-2 col-span-6">
                              <span className="font-bold text-gray-500">Colors: </span>{item.Colors.map(color => color.name).join(',')}
                            </div>
                            <div className="mb-2 col-span-6">
                              <span className="font-bold text-gray-500">Size: </span>{item.Sizes.map(size => size.name).join(',')}
                            </div>
                            <div className="mb-2 col-span-6">
                              <span className="font-bold text-gray-500">Type: </span>{item.sleeve}
                            </div>
                            <div className="mb-2 col-span-6">
                              <span className="font-bold text-gray-500">Fabric: </span>{item.sleeve}
                            </div>
                            <div className="mb-2 col-span-6">
                              <span className="font-bold text-gray-500">Sales Package:</span>{item.sales_package}
                            </div>
                            <div className="mb-2 col-span-6">
                              <span className="font-bold text-gray-500">Style Code: </span>{item.style_code}
                            </div>
                            <div className="mb-2 col-span-6">
                              <span className="font-bold text-gray-500">Neck Type: </span>{item.neck_type}
                            </div>
                            <div className="mb-2 col-span-6">
                              <span className="font-bold text-gray-500">Pattern: </span>{item.pattern}
                            </div>
                            <div className="mb-2 col-span-6">
                              <span className="font-bold text-gray-500">Fabric Care: </span>{item.fabric_care}
                            </div>
                            <div className="mb-2 col-span-6">
                              <span className="font-bold text-gray-500">Net Quantity: </span>{item.net_quantity}
                            </div>
                            <div className="mb-2 col-span-6">
                              <span className="font-bold text-gray-500">Status: </span>{item.status}
                            </div>
                            <div className="mb-2 col-span-6">
                              <span className="font-bold text-gray-500">Description: </span>{item.description}
                            </div>
                            <div className="mb-2 col-span-12">
                              <span className="font-bold text-gray-500">Images:</span>
                              <div className="grid grid-cols-12 gap-2 gap-y-2">
                                {item.ProductImages.map((image, index) => (
                                  <div key={index} className="col-span-2 shadow rounded-md my-5 overflow-hidden">
                                    <Image src={imageURL + `product-image/${image.sysFileName}`}
                                      width={200} height={200} alt="Product image" className="w-full h-full object-cover max-h-[90px]"
                                    />
                                  </div>
                                ))
                                }
                              </div>
                            </div>
                          </div>
                        </>
                      ))
                    }
                    <button onClick={() => setViewProduct(false)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                      ✖️
                    </button>
                  </div>
                </div>
              )}

              <div className="w-full p-5 max-h-[100vh] bg-[#eee]">

                {
                  page === 1 &&
                  <>
                    <div className="flex justify-between items-center pb-5">
                      <div className="text-2xl font-bold">Product</div>
                      <div>
                        <Input
                          type="text"
                          placeholder="Search by stylecode, name, category, price"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="border border-gray-300 p-3 rounded-md mb-4 w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                        />
                      </div>
                      {/* <div className="flex items-center space-x-2">
                        <Label>T-Shirts</Label>
                        <Switch checked={isTrackPants}
                          onCheckedChange={(checked) => {
                            setIsTrackPants(checked)
                            setCurrentPage(1)
                          }}
                        />
                        <Label>Cargo/Track-Pants</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label>Jeans</Label>
                        <Switch checked={isTrackPants}
                          onCheckedChange={(checked) => {
                            setIsTrackPants(checked)
                            setCurrentPage(1)
                          }}
                        />
                        <Label>Shirt</Label>
                      </div> */}
                      <Dialog open={openModel} onOpenChange={(state) => setOpenModel(state)}>
                        <DialogTrigger asChild>
                          <Button className="rounded-full pr-5" onClick={async () => {
                            setId(null)
                            setSelectedImages([])
                            formik.resetForm()
                            try {
                              await getAllCategory();
                              await getAllColor();
                              await getAllSize();
                            } catch (error) {
                              console.error(error)
                            }
                          }}>
                            <svg
                              className="w-6 h-6 text-gray-800 dark:text-white mr-2"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="#fff"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                                clip-rule="evenodd" />
                            </svg>
                            Add Product
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] p-5">
                          <DialogHeader>
                            <DialogTitle className="px-5 pt-5">New Product</DialogTitle>
                            <DialogDescription className="px-5 pt-1">
                              Upload your New Product Here
                            </DialogDescription>
                          </DialogHeader>

                          <form onSubmit={formik.handleSubmit}>
                            <div className="max-h-[calc(100vh_-_190px)] overflow-auto">
                              <div className="grid grid-cols-12 gap-4 gap-y-2 pb-4 px-5 pt-2">
                                <div className="col-span-4">
                                  <Label>Category</Label>
                                  <Select value={formik.values.category_id.toString()}
                                    onValueChange={(value) => {
                                      formik.setFieldValue("category_id", value);
                                      if (value === trackPantsCategoryId) {
                                        formik.setFieldValue("sleeve", '');
                                        formik.setFieldValue("neck_type", '');
                                        formik.setFieldValue("reversible", '');
                                      }
                                      const findName = allCategory.find((item) => item.id.toString() === value)?.name || "";
                                      if (findName === "Cargo/Track-Pants" || findName === "Jeans") {
                                        formik.setFieldValue('isHideFields', true)
                                      }
                                      formik.setFieldValue("size_ids", '')
                                    }}
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        {allCategory.map((item, index) => (
                                          <SelectItem key={index} value={item.id.toString()}>{item.name}</SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                  {formik.errors.category_id && formik.touched.category_id && (
                                    <p className="text-red-500">{formik.errors.category_id}</p>)}
                                </div>

                                {/* <div className="col-span-4">
                                  <Label>Sub Category</Label>
                                  <Select value={formik.values.subcategory_id?.toString()}
                                    onValueChange={(value) =>
                                      formik.setFieldValue('subcategory_id', value)
                                    }>
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue placeholder="Select sub-category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Sub Category</SelectLabel>
                                        {allSubCategory.map((item, index) => (
                                          <SelectItem key={index} value={item.id.toString()}>
                                            {item.name}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                  {formik.errors.subcategory_id && formik.touched.subcategory_id &&
                                    (<p className="text-red-500">{formik.errors.subcategory_id}</p>)}
                                </div> */}

                                <div className="col-span-4">
                                  <Label>Color</Label>
                                  <div className="w-full">
                                    <div className="border rounded p-2">
                                      <Popover>
                                        <PopoverTrigger>
                                          <button type="button">
                                            {formik.values.color_ids && formik.values.color_ids.length > 0
                                              ? formik.values.color_ids.split(',').map((colorId) => {
                                                const selectedColor = allColors.find((color) => color.id.toString() === colorId);
                                                return selectedColor ? selectedColor.name : '';
                                              }).join(', ')
                                              : 'Color'}
                                          </button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                          {allColors.map((item) => (
                                            <label key={item.id} className="flex items-center">
                                              <input
                                                type="checkbox"
                                                value={item.id.toString()}
                                                checked={formik.values.color_ids?.split(',').includes(item.id.toString())}
                                                onChange={() => handleColorCheckBoxChange(item.id.toString())}
                                                className="mr-2"
                                              />
                                              {item.name}
                                            </label>
                                          ))}
                                        </PopoverContent>
                                      </Popover>
                                    </div>
                                  </div>
                                  {formik.errors.color_ids && formik.touched.color_ids &&
                                    (<p className="text-red-500">{formik.errors.color_ids}</p>)}
                                </div>

                                <div className="col-span-4">
                                  <Label>Size</Label>
                                  <div className="w-full">
                                    <div className="border rounded p-2">
                                      <Popover>
                                        <PopoverTrigger>
                                          <button type="button">
                                            {formik.values.size_ids && formik.values.size_ids.length > 0
                                              ? formik.values.size_ids.split(',').map((sizeId) => {
                                                const selectedSize = allSize.find((size) => size.id.toString() === sizeId);
                                                return selectedSize ? selectedSize.name : '';
                                              }).join(', ')
                                              : 'Size'}
                                          </button>
                                        </PopoverTrigger>
                                        {/* <PopoverContent>
                                          {filteredSize.map((item) => (
                                            <label key={item.id} className="flex items-center">
                                              <input
                                                type="checkbox"
                                                value={item.id.toString()}
                                                checked={formik.values.size_ids.split(',').includes(item.id.toString())}
                                                onChange={() => handleCheckboxChange(item.id.toString())}
                                                className="mr-2"
                                              />
                                              {item.name}
                                            </label>
                                          ))}
                                        </PopoverContent> */}

                                        <PopoverContent className="max-h-80 overflow-y-auto">
                                          {filteredSize.map((item: any, index) => {
                                            const isSelected = formik.values.size_ids.split(',').includes(item.id.toString());

                                            return (
                                              <div key={item.id} className="flex flex-col items-start">
                                                <label className="flex items-center">
                                                  <input
                                                    type="checkbox"
                                                    value={item.id.toString()}
                                                    checked={isSelected}
                                                    onChange={() => handleCheckboxChange(item.id.toString())}
                                                    className="mr-2"
                                                  />
                                                  {item.name}
                                                </label>

                                                {/* Cargo/Track-Pants Fields */}
                                                {isSelected && (item?.Category?.name === 'Cargo/Track-Pants' || item?.Category?.name === 'Jeans') && (
                                                  <>
                                                    <Input
                                                      id={`size_chart[${item.id}].waist`}
                                                      placeholder="Waist"
                                                      className="mt-2 p-1 border border-gray-300 rounded"
                                                      value={formik.values.size_chart?.find((size) => size.size_id === item.id)?.waist || ''}
                                                      onChange={(e) => handleDynamicInputChange('waist', e.target.value, item.id)}
                                                    />
                                                    <Input
                                                      id={`size_chart[${item.id}].length_cm`}
                                                      placeholder="Length (cm)"
                                                      className="mt-2 p-1 border border-gray-300 rounded"
                                                      value={formik.values.size_chart?.find((size) => size.size_id === item.id)?.length_cm || ''}
                                                      onChange={(e) => handleDynamicInputChange('length_cm', e.target.value, item.id)}
                                                    />
                                                    <Input
                                                      id={`size_chart[${item.id}].hip`}
                                                      placeholder="Hip"
                                                      className="mt-2 p-1 border border-gray-300 rounded"
                                                      value={formik.values.size_chart?.find((size) => size.size_id === item.id)?.hip || ''}
                                                      onChange={(e) => handleDynamicInputChange('hip', e.target.value, item.id)}
                                                    />
                                                  </>
                                                )}

                                                {/* T-Shirts Fields */}
                                                {isSelected && item?.Category?.name === 'T-Shirts' && (
                                                  <>
                                                    <Input
                                                      id={`size_chart[${item.id}].chest`}
                                                      placeholder="Chest"
                                                      className="mt-2 p-1 border border-gray-300 rounded"
                                                      value={formik.values.size_chart?.find((size) => size.size_id === item.id)?.chest || ''}
                                                      onChange={(e) => handleDynamicInputChange('chest', e.target.value, item.id)}
                                                    />
                                                    <Input
                                                      id={`size_chart[${item.id}].sleeve`}
                                                      placeholder="Sleeve"
                                                      className="mt-2 p-1 border border-gray-300 rounded"
                                                      value={formik.values.size_chart?.find((size) => size.size_id === item.id)?.sleeve || ''}
                                                      onChange={(e) => handleDynamicInputChange('sleeve', e.target.value, item.id)}
                                                    />
                                                    <Input
                                                      id={`size_chart[${item.id}].shoulder`}
                                                      placeholder="Shoulder"
                                                      className="mt-2 p-1 border border-gray-300 rounded"
                                                      value={formik.values.size_chart?.find((size) => size.size_id === item.id)?.shoulder || ''}
                                                      onChange={(e) => handleDynamicInputChange('shoulder', e.target.value, item.id)}
                                                    />
                                                    <Input
                                                      id={`size_chart[${item.id}].length_inch`}
                                                      placeholder="Length (inch)"
                                                      className="mt-2 p-1 border border-gray-300 rounded"
                                                      value={formik.values.size_chart?.find((size) => size.size_id === item.id)?.length_inch || ''}
                                                      onChange={(e) => handleDynamicInputChange('length_inch', e.target.value, item.id)}
                                                    />
                                                  </>
                                                )}
                                              </div>
                                            );
                                          })}
                                        </PopoverContent>

                                      </Popover>
                                    </div>
                                  </div>
                                  {formik.errors.size_ids && formik.touched.size_ids &&
                                    (<p className="text-red-500">{formik.errors.size_ids}</p>)}
                                </div>

                                <div className="col-span-4">
                                  <Label>Product Name</Label>
                                  <Input
                                    id="name"
                                    placeholder="Product Name"
                                    className="col-span-3"
                                    value={formik.values.name}
                                    onChange={formik.handleChange} />
                                  {formik.errors.name && formik.touched.name &&
                                    (<p className="text-red-500">{formik.errors.name}</p>)}
                                </div>

                                <div className="col-span-4">
                                  <Label>Price</Label>
                                  <Input
                                    id="price"
                                    placeholder="Enter price"
                                    className="col-span-3"
                                    type="number"
                                    value={formik.values.price}
                                    onChange={(e) => {
                                      formik.handleChange(e);
                                    }}
                                  />
                                  {formik.errors.price && formik.touched.price && (
                                    <p className="text-red-500">{formik.errors.price}</p>
                                  )}
                                </div>

                                <div className="col-span-4">
                                  <Label>Discount Percentage</Label>
                                  <Input
                                    id="discount_price"
                                    placeholder="Enter discount %"
                                    className="col-span-3"
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={formik.values.discount_price}
                                    onChange={(e) => {
                                      const value = Math.min(Math.max(Number(e.target.value), 0), 100);
                                      formik.setFieldValue("discount_price", value);
                                      changeFinalPrice(value);
                                    }}
                                  />
                                  {formik.errors.discount_price && formik.touched.discount_price && (
                                    <p className="text-red-500">{formik.errors.discount_price}</p>
                                  )}
                                </div>

                                <div className="col-span-4">
                                  <Label>Final Price</Label>
                                  <Input
                                    id="final_price"
                                    placeholder="Calculated final price"
                                    className="col-span-3"
                                    value={formik.values.final_price}
                                    readOnly
                                  />
                                  {formik.errors.final_price && formik.touched.final_price && (
                                    <p className="text-red-500">{formik.errors.final_price}</p>
                                  )}
                                </div>

                                <div className="col-span-4">
                                  <Label>type</Label>
                                  <Input
                                    id="type"
                                    placeholder="type"
                                    className="col-span-3"
                                    value={formik.values.type}
                                    onChange={formik.handleChange} />
                                  {formik.errors.type && formik.touched.type &&
                                    (<p className="text-red-500">{formik.errors.type}</p>)}
                                </div>

                                {
                                  // formik.values.category_id.toString() !== allCategory.find(val => val.name === "Cargo/Track-Pants")?.id.toString()
                                  formik.values.category_id.toString() !== trackPantsId &&
                                  formik.values.category_id.toString() !== jeansId
                                  && (
                                    <div className="col-span-4">
                                      <Label>Sleeve</Label>
                                      <Input
                                        id="sleeve"
                                        placeholder="sleeve"
                                        className="col-span-3"
                                        value={formik.values.sleeve}
                                        onChange={formik.handleChange} />
                                      {formik.errors.sleeve && formik.touched.sleeve &&
                                        (<p className="text-red-500">{formik.errors.sleeve}</p>)}
                                    </div>
                                  )}

                                <div className="col-span-4">
                                  <Label>Fit</Label>
                                  <Input
                                    id="fit"
                                    placeholder="fit"
                                    className="col-span-3"
                                    value={formik.values.fit}
                                    onChange={formik.handleChange} />
                                  {formik.errors.fit && formik.touched.fit &&
                                    (<p className="text-red-500">{formik.errors.fit}</p>)}
                                </div>

                                <div className="col-span-4">
                                  <Label>fabric</Label>
                                  <Input
                                    id="fabric"
                                    placeholder="fabric"
                                    className="col-span-3"
                                    value={formik.values.fabric}
                                    onChange={formik.handleChange} />
                                  {formik.errors.fabric && formik.touched.fabric &&
                                    (<p className="text-red-500">{formik.errors.fabric}</p>)}
                                </div>

                                <div className="col-span-4">
                                  <Label>Pack Of</Label>
                                  <Input
                                    id="pack_of"
                                    placeholder="Pack Of"
                                    className="col-span-3"
                                    value={formik.values.pack_of}
                                    onChange={formik.handleChange} />
                                  {formik.errors.pack_of && formik.touched.pack_of &&
                                    (<p className="text-red-500">{formik.errors.pack_of}</p>)}
                                </div>

                                <div className="col-span-4">
                                  <Label>Style Code</Label>
                                  <Input
                                    id="style_code"
                                    placeholder="Style Code"
                                    className="col-span-3"
                                    value={formik.values.style_code}
                                    onChange={formik.handleChange} />
                                  {formik.errors.style_code && formik.touched.style_code &&
                                    (<p className="text-red-500">{formik.errors.style_code}</p>)}
                                </div>

                                {
                                  formik.values.category_id.toString() !== trackPantsId &&
                                  formik.values.category_id.toString() !== jeansId && (
                                    <div className="col-span-4">
                                      <Label>Neck Type</Label>
                                      <Input
                                        id="neck_type"
                                        placeholder="Neck Type"
                                        className="col-span-3"
                                        value={formik.values.neck_type}
                                        onChange={formik.handleChange} />
                                      {formik.errors.neck_type && formik.touched.neck_type &&
                                        (<p className="text-red-500">{formik.errors.neck_type}</p>)}
                                    </div>
                                  )
                                }

                                <div className="col-span-4">
                                  <Label>Ideal For</Label>
                                  <Input
                                    id="ideal_for"
                                    placeholder="Ideal For"
                                    className="col-span-3"
                                    value={formik.values.ideal_for}
                                    onChange={formik.handleChange} />
                                  {formik.errors.ideal_for && formik.touched.ideal_for &&
                                    (<p className="text-red-500">{formik.errors.ideal_for}</p>)}
                                </div>

                                <div className="col-span-4">
                                  <Label>Pattern</Label>
                                  <Input
                                    id="pattern"
                                    placeholder="pattern"
                                    className="col-span-3"
                                    value={formik.values.pattern}
                                    onChange={formik.handleChange} />
                                  {formik.errors.pattern && formik.touched.pattern &&
                                    (<p className="text-red-500">{formik.errors.pattern}</p>)}
                                </div>

                                <div className="col-span-4">
                                  <Label>Suitable For</Label>
                                  <Input
                                    id="suitable_for"
                                    placeholder="Suitable For"
                                    className="col-span-3"
                                    value={formik.values.suitable_for}
                                    onChange={formik.handleChange} />
                                  {formik.errors.suitable_for && formik.touched.suitable_for &&
                                    (<p className="text-red-500">{formik.errors.suitable_for}</p>)}
                                </div>

                                {
                                  formik.values.category_id.toString() !== trackPantsId &&
                                  formik.values.category_id.toString() !== jeansId && (
                                    <div className="col-span-4">
                                      <Label>Reversible</Label>
                                      <Input
                                        id="reversible"
                                        placeholder="reversible"
                                        className="col-span-3"
                                        value={formik.values.reversible}
                                        onChange={formik.handleChange} />
                                      {formik.errors.reversible && formik.touched.reversible &&
                                        (<p className="text-red-500">{formik.errors.reversible}</p>)}
                                    </div>
                                  )
                                }

                                <div className="col-span-4">
                                  <Label>Fabric Care</Label>
                                  <Input
                                    id="fabric_care"
                                    placeholder="fabric Care"
                                    className="col-span-3"
                                    value={formik.values.fabric_care}
                                    onChange={formik.handleChange} />
                                  {formik.errors.fabric_care && formik.touched.fabric_care &&
                                    (<p className="text-red-500">{formik.errors.fabric_care}</p>)}
                                </div>

                                <div className="col-span-4">
                                  <Label>Net Quantity</Label>
                                  <Input
                                    id="net_quantity"
                                    placeholder="Net Quantity"
                                    className="col-span-3"
                                    value={formik.values.net_quantity}
                                    onChange={formik.handleChange} />
                                  {formik.errors.net_quantity && formik.touched.net_quantity &&
                                    (<p className="text-red-500">{formik.errors.net_quantity}</p>)}
                                </div>

                                <div className="col-span-4">
                                  <Label>Status</Label>
                                  <Select
                                    value={formik.values.status}
                                    onValueChange={(value) => formik.setFieldValue("status", value)}
                                  >
                                    <SelectTrigger className="col-span-3">
                                      <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="New Drops">New Drops</SelectItem>
                                      <SelectItem value="Most Trending">Most Trending</SelectItem>
                                      <SelectItem value="Not Display">Not Display</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  {formik.errors.status && formik.touched.status && (
                                    <p className="text-red-500">{formik.errors.status}</p>
                                  )}
                                </div>

                                <div className="col-span-4">
                                  <Label>Sales Package</Label>
                                  <Input
                                    id="sales_package"
                                    placeholder="Sale Package"
                                    className="col-span-3"
                                    value={formik.values.sales_package}
                                    onChange={formik.handleChange} />
                                  {formik.errors.sales_package && formik.touched.sales_package &&
                                    (<p className="text-red-500">{formik.errors.sales_package}</p>)}
                                </div>

                                <div className="col-span-4">
                                  <Label>Image Upload</Label>
                                  <Input
                                    type="file"
                                    name="images"
                                    ref={fileInputRef}
                                    onChange={handleChangeChooseFile}
                                    placeholder="Choose File"
                                    multiple
                                  />
                                  {formik.touched.images && formik.errors.images && (
                                    <p className="text-red-500">
                                      {Array.isArray(formik.errors.images)
                                        ? formik.errors.images.join(', ') // Join the error messages if it's an array
                                        : formik.errors.images}
                                    </p>
                                  )}

                                  {
                                    selectedImages.length > 0 && (
                                      <div className="mt-2">
                                        <ul>
                                          {selectedImages.map((file, index) => (
                                            <>
                                              <li key={index} className="flex items-center justify-between">
                                                <div className="flex justify-between w-full">
                                                  <div className="whitespace-nowrap overflow-hidden text-ellipsis">{typeof file === 'string' ? file : file.name}</div>
                                                  <button type="button" onClick={() => removeImage(index)}
                                                    className="text-red-500 ml-4">✖️</button>
                                                </div>
                                              </li>
                                            </>
                                          ))}
                                        </ul>
                                      </div>
                                    )
                                  }
                                </div>

                                <div className="col-span-12">
                                  <Label>Product Description</Label>
                                  <Textarea
                                    placeholder="type your message here."
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                  />
                                  {formik.errors.description && formik.touched.description &&
                                    (<p className="text-red-500">{formik.errors.description}</p>)}
                                </div>

                                <div className="col-span-12 flex items-center">
                                  <Switch checked={formik.values.inStock}
                                    onCheckedChange={(checked) => formik.setFieldValue("inStock", checked)} />
                                  <Label className="ml-2">InStock</Label>
                                </div>
                              </div>
                            </div >
                            <DialogFooter className="px-5 pb-5">
                              <Button type="submit" disabled={formik.isSubmitting}>
                                {id ? "Save changes" : formik.isSubmitting ? "Submitting..." : "Add product"}
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '12px' }}>
                      <TableContainer className="table-scrollable h-[calc(100vh_-_180px)] overflow-auto">
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Category</TableCell>
                              <TableCell className="text-center">Name</TableCell>
                              <TableCell>Price</TableCell>
                              <TableCell>Discount Price</TableCell>
                              <TableCell>Final Price</TableCell>
                              <TableCell>Fabric</TableCell>
                              <TableCell>Type</TableCell>
                              <TableCell>Color</TableCell>
                              <TableCell>Size</TableCell>
                              <TableCell>Status</TableCell>
                              <TableCell>Style Code</TableCell>
                              <TableCell>Pattern</TableCell>
                              <TableCell>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {loading
                              ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                <TableRow key={item}>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                </TableRow>
                              ))
                              :
                              currentProducts.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.Category?.name}</TableCell>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell>{item.price}</TableCell>
                                  <TableCell>{item.discount_price}</TableCell>
                                  <TableCell>{item.final_price}</TableCell>
                                  <TableCell>{item.fabric}</TableCell>
                                  <TableCell>{item.type}</TableCell>
                                  <TableCell>{item.Colors.map(color => color.name).join(',')}</TableCell>
                                  <TableCell>{item.Sizes.map(size => size.name).join(',')}</TableCell>
                                  <TableCell>
                                    <RadioGroup value={item.status}
                                      onValueChange={(value) => handleUpdateStatus(item, value)}
                                    >
                                      <div className="flex gap-1 items-center whitespace-nowrap">
                                        <RadioGroupItem value="New Drops" />New Drops
                                      </div>
                                      <div className="flex gap-1 items-center whitespace-nowrap">
                                        <RadioGroupItem value="Most Trending" />Most Trending
                                      </div>
                                      <div className="flex gap-1 items-center whitespace-nowrap">
                                        <RadioGroupItem value="Not Display" />Not Display
                                      </div>
                                    </RadioGroup>
                                  </TableCell>
                                  <TableCell>{item.style_code}</TableCell>
                                  <TableCell>{item.pattern}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-1">
                                      <svg onClick={() => handleViewProduct(item)}
                                        className="cursor-pointer w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                        <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                      </svg>
                                      <div onClick={() => handleEditProduct(item)}>
                                        <svg className="cursor-pointer w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                        </svg>
                                      </div>
                                      <AlertDialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                                        <AlertDialogTrigger>
                                          <svg onClick={() => openDeleteProductDialog(item.id)}
                                            className="cursor-pointer w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                          </svg>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure you want to delete this product</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              Are you sure you want to delete this product? This action cannot be undone.
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogFooter>
                                              <AlertDialogCancel onClick={() => setIsProductDialogOpen(false)}>Cancel</AlertDialogCancel>
                                              <AlertDialogAction onClick={handleDeleteProduct}>Confirm</AlertDialogAction>
                                            </AlertDialogFooter>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                            }
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <div className="flex justify-center my-4 space-x-2">
                        <button
                          onClick={prevPage}
                          disabled={currentPage === 1}
                          className={`px-4 py-2 text-base font-medium border rounded-md ${currentPage === 1
                            ? 'cursor-not-allowed opacity-50'
                            : 'hover:bg-gray-200'
                            }`}
                        >
                          Previous
                        </button>

                        {/* Render page numbers */}
                        {Array.from({ length: totalPages }, (_, index) => (
                          <button
                            key={index}
                            onClick={() => goToPage(index + 1)}
                            className={`px-4 py-2 text-base font-medium border rounded-md ${currentPage === index + 1
                              ? 'font-bold bg-gray-300'
                              : 'hover:bg-gray-200'
                              }`}
                          >
                            {index + 1}
                          </button>
                        ))}

                        <button
                          onClick={nextPage}
                          disabled={currentPage === totalPages}
                          className={`px-4 py-2 text-base font-medium border rounded-md ${currentPage === totalPages
                            ? 'cursor-not-allowed opacity-50'
                            : 'hover:bg-gray-200'
                            }`}
                        >
                          Next
                        </button>
                      </div>
                    </Paper>
                  </>
                }

                {
                  page === 2 &&
                  <>
                    <div className="flex justify-between items-center pb-5">
                      <div className="text-2xl font-bold">Category</div>
                      <Dialog open={openModel} onOpenChange={(state) => setOpenModel(state)}>
                        <DialogTrigger asChild>
                          <Button className="rounded-full pr-5" onClick={() => {
                            setCategory("")
                            setSelectedCategoryId(null)
                          }}>
                            <svg
                              className="w-6 h-6 text-gray-800 dark:text-white mr-2"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="#fff"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            Add Category
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] p-5">
                          <DialogHeader>
                            <DialogTitle className="px-5 pt-5">New Category</DialogTitle>
                            <DialogDescription className="px-5 pt-1">
                              Upload your New Category Here
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid grid-cols-12 gap-4 gap-y-2 pb-4 px-5 pt-2">
                            <div className="col-span-4">
                              <Label>Category</Label>
                              <Input
                                id="category"
                                placeholder="Category"
                                className=""
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter className="px-5 pb-5">
                            <Button type="submit" onClick={handleAddCategory} disabled={isAddingCategory}>
                              {
                                isAddingCategory ? 'Saving...' : 'Save changes'
                              }
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '12px' }}>
                      <TableContainer className="table-scrollable h-[calc(100vh_-_100px)] overflow-auto">
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Category ID</TableCell>
                              <TableCell>Name</TableCell>
                              <TableCell>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {loading ? (
                              Array.from({ length: 5 }).map((_, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    <Skeleton className="h-4 w-[100px]" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-4 w-[250px]" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-4 w-[100px]" />
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              allCategory.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.id}</TableCell>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-1">
                                      <svg onClick={() => handleEditCategory(item)} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                      </svg>
                                      <AlertDialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                                        <AlertDialogTrigger>
                                          <svg onClick={() => openDeleteCategoryDialog(item.id)} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                          </svg>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>
                                              Are you sure you want to delete this category
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                              Are you sure you want to delete this category
                                              ? This action cannot be undone.
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel onClick={() => setIsCategoryDialogOpen(false)}>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteCategory()}>Continue</AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </>
                }

                <div>
                  {/* {
                  page === 3 &&
                  <>
                    <div className="flex justify-between items-center pb-5">
                      <div className="text-2xl font-bold">Sub Category</div>
                      <Dialog open={openModel} onOpenChange={(state) => setOpenModel(state)}>
                        <DialogTrigger asChild>
                          <Button className="rounded-full pr-5">
                            <svg
                              className="w-6 h-6 text-gray-800 dark:text-white mr-2"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="#fff"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            Add Sub Category
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] p-5">
                          <DialogHeader>
                            <DialogTitle className="px-5 pt-5">New Sub Category</DialogTitle>
                            <DialogDescription className="px-5 pt-1">
                              Upload your New Sub Category Here
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={formik.handleSubmit}>
                            <div className="grid grid-cols-12 gap-4 gap-y-2 pb-4 px-5 pt-2">

                              <div className="col-span-4">
                                <Label>Select Category</Label>
                                <Select value={selectedCategoryId}
                                  onValueChange={(value) => setSelectedCategoryId(value)}>
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>Category</SelectLabel>
                                      {allCategory.map((item, index) => (
                                        <SelectItem key={index} value={item.id.toString()}>{item.name}</SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="col-span-4">
                                <Label>Sub Category</Label>
                                <Input
                                  id="category"
                                  placeholder="Category"
                                  className=""
                                  value={subCategory}
                                  onChange={(e) => setSubCategory(e.target.value)}
                                />
                              </div>
                            </div>
                            <DialogFooter className="px-5 pb-5">
                              <Button type="submit" onClick={handleAddSubCategory}>Save changes</Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '12px' }}>
                      <TableContainer className="table-scrollable h-[calc(100vh_-_100px)] overflow-auto">
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Category ID</TableCell>
                              <TableCell>Sub Category ID</TableCell>
                              <TableCell>Name</TableCell>
                              <TableCell>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {allSubCategory.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.category_id}</TableCell>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </>
                } */}
                </div>

                {
                  page === 4 &&
                  <>
                    <div className="flex justify-between items-center pb-5">
                      <div className="text-2xl font-bold">Size</div>
                      <Dialog open={openModel} onOpenChange={(state) => setOpenModel(state)}>
                        <DialogTrigger asChild>
                          <Button className="rounded-full pr-5" onClick={() => {
                            setSelectedCategory(null);
                            setSize('');
                            setSelectedSizeId(null);
                          }}>
                            <svg
                              className="w-6 h-6 text-gray-800 dark:text-white mr-2"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="#fff"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            Add Size
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] p-5">
                          <DialogHeader>
                            <DialogTitle className="px-5 pt-5">New Size</DialogTitle>
                            <DialogDescription className="px-5 pt-1">
                              Upload your New Size Here
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid grid-cols-12 gap-4 gap-y-2 pb-4 px-5 pt-2">
                            <div className="col-span-4">
                              <Label>Select Category</Label>
                              <Select value={selectedCategory ? selectedCategory.name : ""}
                                onValueChange={(name) => {
                                  const selected = allCategory.find(item => item.name === name);
                                  console.log('selected :>> ', selected);
                                  if (selected) {
                                    console.log('selected :>> ', selected);
                                    setSelectedCategory(selected);
                                  }
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  {
                                    allCategory.map((item, index) => (
                                      <SelectItem key={index} value={item.name}>
                                        {item.name}
                                      </SelectItem>
                                    ))
                                  }
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="col-span-4">
                              <Label>Size</Label>
                              <Input
                                id="size"
                                placeholder="Size"
                                className=""
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter className="px-5 pb-5">
                            <Button type="submit" onClick={handleAddSize}
                              disabled={isSizeButtonDisabled || !size || !selectedCategory}>
                              Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '12px' }}>
                      <TableContainer className="table-scrollable h-[calc(100vh_-_180px)] overflow-auto">
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Size ID</TableCell>
                              <TableCell>Category ID</TableCell>
                              <TableCell>Category Name</TableCell>
                              <TableCell>Size Name</TableCell>
                              <TableCell>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {loading ? (
                              Array.from({ length: 5 }).map((_, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    <Skeleton className="h-4 w-[100px]" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-4 w-[250px]" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-4 w-[100px]" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-4 w-[100px]" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-4 w-[100px]" />
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              currentSize.map((item, index) => {
                                return (
                                  <>
                                    <TableRow key={index}>
                                      <TableCell>{item.id}</TableCell>
                                      <TableCell>{item.Category?.id}</TableCell>
                                      <TableCell>{item.Category?.name}</TableCell>
                                      <TableCell>{item.name}</TableCell>
                                      <TableCell>
                                        <div className="flex items-center gap-1">
                                          <svg onClick={() => handleEditSize(item)} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                          </svg>
                                          <AlertDialog open={isDeleteSizeDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                                            <AlertDialogTrigger>
                                              <svg onClick={() => openSizeDialog(item.id)} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                              </svg>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                              <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure you want to delete this size?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                  Are you sure you want to delete this size? This action cannot be undone.
                                                </AlertDialogDescription>
                                              </AlertDialogHeader>
                                              <AlertDialogFooter>
                                                <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleDeleteSize}>Continue</AlertDialogAction>
                                              </AlertDialogFooter>
                                            </AlertDialogContent>
                                          </AlertDialog>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  </>
                                )
                              })
                            )}

                          </TableBody>
                        </Table>
                      </TableContainer>
                      <div className="flex justify-center my-4 space-x-2">
                        <button
                          onClick={previousPageOfSize}
                          disabled={currentPageOfSize === 1}
                          className={`px-4 py-2 text-base font-medium border rounded-md ${currentPageOfSize === 1
                            ? 'cursor-not-allowed opacity-50'
                            : 'hover:bg-gray-200'
                            }`}
                        >
                          Previous
                        </button>
                        {/* Render page numbers */}
                        {Array.from({ length: totalPagesOfSize }, (_, index) => (
                          <button
                            key={index}
                            onClick={() => gotoPageOfSize(index + 1)}
                            className={`px-4 py-2 text-base font-medium border rounded-md ${currentPageOfSize === index + 1
                              ? 'font-bold bg-gray-300'
                              : 'hover:bg-gray-200'
                              }`}
                          >
                            {index + 1}
                          </button>
                        ))}
                        <button
                          onClick={nextPageofSize}
                          disabled={currentPageOfSize === totalPagesOfSize}
                          className={`px-4 py-2 text-base font-medium border rounded-md ${currentPageOfSize === totalPagesOfSize
                            ? 'cursor-not-allowed opacity-50'
                            : 'hover:bg-gray-200'
                            }`}
                        >
                          Next
                        </button>
                      </div>
                    </Paper>
                  </>
                }

                {
                  page === 5 &&
                  <>
                    <div className="flex justify-between items-center pb-5">
                      <div className="text-2xl font-bold">Color</div>
                      <Dialog open={openModel} onOpenChange={(state) => setOpenModel(state)}>
                        <DialogTrigger asChild>
                          <Button className="rounded-full pr-5" onClick={() => {
                            setColors("")
                            setSelectedColorId(null)
                          }}>
                            <svg
                              className="w-6 h-6 text-gray-800 dark:text-white mr-2"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="#fff"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            Add Color
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] p-5">
                          <DialogHeader>
                            <DialogTitle className="px-5 pt-5">New Color</DialogTitle>
                            <DialogDescription className="px-5 pt-1">
                              Upload your New Color Here
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid grid-cols-12 gap-4 gap-y-2 pb-4 px-5 pt-2">
                            <div className="col-span-4">
                              <Label>Colors</Label>
                              <Input
                                id="color"
                                placeholder="color"
                                className=""
                                value={colors}
                                onChange={(e) => setColors(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter className="px-5 pb-5">
                            <Button type="submit" onClick={handleAddColor} disabled={isLoading || !colors.trim()}>{isLoading ? "Saving..." : "Save changes"}</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '12px' }}>
                      <TableContainer className="table-scrollable h-[calc(100vh_-_100px)] overflow-auto">
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Color ID</TableCell>
                              <TableCell>Name</TableCell>
                              <TableCell>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {loading ? (
                              Array.from({ length: 5 }).map((_, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    <Skeleton className="h-4 w-[100px]" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-4 w-[250px]" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-4 w-[100px]" />
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              currentColor.map((item, index) => {
                                return (
                                  <TableRow key={index}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-1">
                                        <svg onClick={() => handleEditColor(item)} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                          xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                          fill="none" viewBox="0 0 24 24">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                        </svg>
                                        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                          <AlertDialogTrigger>
                                            <svg onClick={() => openDeleteDialog(item.id)} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                              xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                              fill="none" viewBox="0 0 24 24">
                                              <path stroke="currentColor" stroke-linecap="round"
                                                stroke-linejoin="round" stroke-width="2"
                                                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                            </svg>
                                          </AlertDialogTrigger>
                                          <AlertDialogContent>
                                            <AlertDialogHeader>
                                              <AlertDialogTitle>Are you sure you want to delete this color?</AlertDialogTitle>
                                              <AlertDialogDescription>
                                                Are you sure you want to delete the color? This action cannot be undone.
                                              </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                              <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel>
                                              <AlertDialogAction onClick={() => handleDeleteColor(item)}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialog>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                )
                              })
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <div className="flex justify-center my-4 space-x-2">
                        <button
                          onClick={previousPageOfColor}
                          disabled={currentPageOfColor === 1}
                          className={`px-4 py-2 text-base font-medium border rounded-md ${currentPageOfColor === 1
                            ? 'cursor-not-allowed opacity-50'
                            : 'hover:bg-gray-200'
                            }`}
                        >
                          Previous
                        </button>

                        {/* Render page numbers */}
                        {Array.from({ length: totalPagesOfColor }, (_, index) => (
                          <button
                            key={index}
                            onClick={() => gotoPageOfColor(index + 1)}
                            className={`px-4 py-2 text-base font-medium border rounded-md ${currentPageOfColor === index + 1
                              ? 'font-bold bg-gray-300'
                              : 'hover:bg-gray-200'
                              }`}
                          >
                            {index + 1}
                          </button>
                        ))}

                        <button
                          onClick={nextPageOfColor}
                          disabled={currentPageOfColor === totalPagesOfColor}
                          className={`px-4 py-2 text-base font-medium border rounded-md ${currentPageOfColor === totalPagesOfColor
                            ? 'cursor-not-allowed opacity-50'
                            : 'hover:bg-gray-200'
                            }`}
                        >
                          Next
                        </button>
                      </div>
                    </Paper>
                  </>
                }

                {
                  page === 6 &&
                  <>
                    <div className="flex justify-between items-center pb-5">
                      <div className="text-2xl font-bold">Product Inquiry</div>
                    </div>
                    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '12px' }}>
                      <TableContainer className="table-scrollable h-[calc(100vh_-_100px)] overflow-auto">
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>ID</TableCell>
                              <TableCell>Date</TableCell>
                              <TableCell>Name</TableCell>
                              <TableCell>Email</TableCell>
                              <TableCell>Mobile Number</TableCell>
                              <TableCell>Message</TableCell>
                              <TableCell>Product Name</TableCell>
                              <TableCell>Quntity</TableCell>
                              <TableCell>Price</TableCell>
                              <TableCell>Color</TableCell>
                              <TableCell>Size</TableCell>
                              <TableCell>Address</TableCell>
                              <TableCell>City</TableCell>
                              <TableCell>State</TableCell>
                              <TableCell>Pincode</TableCell>
                              <TableCell>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {loading
                              ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                <TableRow key={item}>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                </TableRow>
                              )) : (
                                currentProductInquiry.map((item, index) => {
                                  const filteredDataofSize = item.Sizes.filter((val) => item.size_ids.includes(val.id))
                                  const filteredColorData = item.Colors.filter(val => item.color_ids.includes(val.id))
                                  const formattedDate = format(new Date(item.createdAt), "d/MM/yyyy");
                                  return (
                                    <TableRow key={index}>
                                      <TableCell>{item.id}</TableCell>
                                      <TableCell>{formattedDate}</TableCell>
                                      <TableCell>{item.name}</TableCell>
                                      <TableCell>{item.email}</TableCell>
                                      <TableCell>{item.mobile_no}</TableCell>
                                      <TableCell>{item.inquiry_message}</TableCell>
                                      <TableCell>{item.Product.name}</TableCell>
                                      <TableCell>{item.quantity}</TableCell>
                                      <TableCell>{item.Product.final_price}</TableCell>
                                      <TableCell>{filteredColorData.map((item) => item.name).join(', ')}
                                      </TableCell>
                                      <TableCell>{filteredDataofSize.map((item) => item.name).join(', ')}
                                      </TableCell>
                                      <TableCell>{item.address}</TableCell>
                                      <TableCell>{item.city}</TableCell>
                                      <TableCell>{item.state}</TableCell>
                                      <TableCell>{item.pincode}</TableCell>
                                      <TableCell>
                                        <AlertDialog open={openProductInquiry}>
                                          <AlertDialogTrigger>
                                            <svg
                                              className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                                              aria-hidden="true"
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              onClick={() => handleOpenDialog(item.id)}
                                            >
                                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                            </svg>
                                          </AlertDialogTrigger>
                                          <AlertDialogContent>
                                            <AlertDialogHeader>
                                              <AlertDialogTitle>Are you sure you want to delete this Inquiry?</AlertDialogTitle>
                                              <AlertDialogDescription>
                                                Are you sure you want to delete the inquiry? This action cannot be undone.
                                              </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                              <AlertDialogCancel onClick={() => handleCloseDialog()}>Cancel</AlertDialogCancel>
                                              <AlertDialogAction onClick={() => handleDeleteInquiry()}>Confirm</AlertDialogAction>
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialog>
                                      </TableCell>
                                    </TableRow>
                                  )
                                })
                              )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <div className="flex justify-center my-4 space-x-2">
                        <button
                          onClick={previousPageOfProductInquiry}
                          disabled={currentPageOfProductInquiry === 1}
                          className={`px-4 py-2 text-base font-medium border rounded-md ${currentPageOfProductInquiry === 1
                            ? 'cursor-not-allowed opacity-50'
                            : 'hover:bg-gray-200'
                            }`}
                        >
                          Previous
                        </button>

                        {/* Render page numbers */}
                        {Array.from({ length: totalPageOfProductInquiry }, (_, index) => (
                          <button
                            key={index}
                            onClick={() => gotoPageProductInquiry(index + 1)}
                            className={`px-4 py-2 text-base font-medium border rounded-md ${currentPageOfProductInquiry === index + 1
                              ? 'font-bold bg-gray-300'
                              : 'hover:bg-gray-200'
                              }`}
                          >
                            {index + 1}
                          </button>
                        ))}

                        <button
                          onClick={nextPageOfProductInquiry}
                          disabled={currentPageOfProductInquiry === totalPageOfProductInquiry}
                          className={`px-4 py-2 text-base font-medium border rounded-md ${currentPageOfProductInquiry === totalPageOfProductInquiry
                            ? 'cursor-not-allowed opacity-50'
                            : 'hover:bg-gray-200'
                            }`}
                        >
                          Next
                        </button>
                      </div>
                    </Paper>
                  </>
                }

                {
                  page === 7 &&
                  <>
                    <div className="flex justify-between items-center pb-5">
                      <div className="text-2xl font-bold">Inquiry</div>
                    </div>

                    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '12px' }}>
                      <TableContainer className="table-scrollable h-[calc(100vh_-_100px)] overflow-auto">
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>ID</TableCell>
                              <TableCell>Date</TableCell>
                              <TableCell>Email</TableCell>
                              <TableCell>Mobile Number</TableCell>
                              <TableCell>Message</TableCell>
                              <TableCell>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {loading
                              ? [1, 2, 3, 4, 5, 6].map((item) => (
                                <TableRow key={item}>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-[14px] w-full" />
                                  </TableCell>
                                </TableRow>
                              )) : (
                                currentInquiry.map((item, index) => {
                                  const date = format(new Date(item.createdAt), "d/MM/yyyy");
                                  return (
                                    <TableRow key={index}>
                                      <TableCell>{item.id}</TableCell>
                                      <TableCell>{date}</TableCell>
                                      <TableCell>{item.email}</TableCell>
                                      <TableCell>{item.phone}</TableCell>
                                      <TableCell>{item.message}</TableCell>
                                      <TableCell>
                                        <AlertDialog>
                                          <AlertDialogTrigger>
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                              onClick={() => handleOpenInquiryDialog(item.id)}
                                            >
                                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                            </svg>
                                          </AlertDialogTrigger>
                                          <AlertDialogContent>
                                            <AlertDialogHeader>
                                              <AlertDialogTitle>Are you sure you want to delete this Inquiry?</AlertDialogTitle>
                                              <AlertDialogDescription>
                                                Are you sure you want to delete the inquiry? This action cannot be undone.
                                              </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                              <AlertDialogCancel onClick={() => {
                                                setGetInTouchInquiry(false)
                                                setSelectedGetInTouchInquiry(null)
                                              }}>Cancel</AlertDialogCancel>
                                              <AlertDialogAction onClick={() => handleDeleteGetInTouchInquiry()}>Confirm</AlertDialogAction>
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialog>
                                      </TableCell>
                                    </TableRow>
                                  )
                                })
                              )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <div className="flex justify-center my-4 space-x-2">
                        <button
                          onClick={previousPageOfInquiry}
                          disabled={currentPageOfInquiry === 1}
                          className={`px-4 py-2 text-base font-medium border rounded-md ${currentPageOfInquiry === 1
                            ? 'cursor-not-allowed opacity-50'
                            : 'hover:bg-gray-200'
                            }`}
                        >
                          Previous
                        </button>

                        {/* Render page numbers */}
                        {Array.from({ length: totalPagesOfInquiry }, (_, index) => (
                          <button
                            key={index}
                            onClick={() => gotoPageOfInquiry(index + 1)}
                            className={`px-4 py-2 text-base font-medium border rounded-md ${currentPageOfInquiry === index + 1
                              ? 'font-bold bg-gray-300'
                              : 'hover:bg-gray-200'
                              }`}
                          >
                            {index + 1}
                          </button>
                        ))}

                        <button
                          onClick={nextPageOfInquiry}
                          disabled={currentPageOfInquiry === totalPagesOfInquiry}
                          className={`px-4 py-2 text-base font-medium border rounded-md ${currentPageOfInquiry === totalPagesOfInquiry
                            ? 'cursor-not-allowed opacity-50'
                            : 'hover:bg-gray-200'
                            }`}
                        >
                          Next
                        </button>
                      </div>
                    </Paper>
                  </>
                }

              </div>
            </div>
          </>
        )
        }
      </main>
    </>
  );
}

export default Admin;
