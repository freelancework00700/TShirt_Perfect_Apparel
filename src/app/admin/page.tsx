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
  const recordsPerPage = 10;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteSizeDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allInquiry, setAllInquiry] = useState<Inquiry[]>([]);
  const [productInquiry, setProductInquiry] = useState<ProductInquiry[]>([])
  const [openProductInquiry, setOpenProductInquiry] = useState(false);
  const [selectedProductInquiry, setSelectedProductInquiry] = useState<number | null>(null);
  const router = useRouter();
  const [isTrackPants, setIsTrackPants] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);


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
      const response = await axios.get(`/api/product`)
      setAllProduct(response.data.data)
    } catch (error) {
      console.log('error :>> ', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Filter products based on switch selection
    const category = isTrackPants ? 'Track-Pants' : 'T-Shirts';
    const filtered = allProduct.filter((product) => product.Category.name === category);
    setFilteredProducts(filtered);
  }, [isTrackPants, allProduct]);

  const getAllCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/category`)
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
      const response = await axios.get(`/api/size`)
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
      const colorResponse = await axios.get(`/api/color`)
      setAllColors(colorResponse.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getAllInquiry = async () => {
    try {
      const response = await axios.get('/api/get-in-touch')
      setAllInquiry(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getProductInquiry = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/product-inquiry')
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
  }, [page, isTrackPants])

  const handleEditCategory = async (item: ICategories) => {
    console.log('item :>> ', item);
    setOpenModel(true)
    setCategory(item.name)
    setSelectedCategoryId(item.id)
  }

  const openDeleteCategoryDialog = (id: number) => {
    setSelectedCategoryId(id);
    setIsCategoryDialogOpen(true);
  };

  const handleAddCategory = async () => {
    try {
      if (selectedCategoryId) {
        const editResponse = await axios.put(`/api/category`, { id: selectedCategoryId, name: category })
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
        const response = await axios.post('/api/category', { name: category })
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
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteCategory = async () => {
    try {
      const response = await axios.delete(`/api/category?id=${selectedCategoryId}`)
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

  const handleEditSize = async (item: ICategories) => {
    setOpenModel(true)
    setSize(item.name)
    setSelectedSizeId(item.id)
  }

  const openSizeDialog = (id: number) => {
    setSelectedSizeId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleAddSize = async () => {
    try {
      if (selectedSizeId) {
        const editSizeResponse = await axios.put(`/api/size`, { id: selectedSizeId, name: size, category_id: selectedCategory.id })
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
        const sizeResponse = await axios.post(`/api/size`, { name: size, category_id: selectedCategory?.id })
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
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteSize = async () => {
    try {
      const response = await axios.delete(`/api/size?id=${selectedSizeId}`)
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
      const response = await axios.delete(`/api/product?id=${selectedProductId}`)
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
    try {
      if (selectedColorId) {
        const editResponse = await axios.put(`/api/color`, { id: selectedColorId, name: colors })
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
        const colorResponse = await axios.post(`/api/color`, { name: colors })
        console.log('colorResponse :>> ', colorResponse);
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
    } catch (error) {
      console.error(error)
      // toast.success(error, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   transition: Bounce,
      // });  
    }
  }

  const handleDeleteColor = async (id: number) => {
    if (selectedColorId !== null) {
      try {
        const response = await axios.delete(`/api/color?id=${id}`)
        console.log('response.data.message :>> ', response.data.message);
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
        getAllColor();
      } catch (error) {
        console.error(error)
      } finally {
        setIsDialogOpen(false);
        setSelectedColorId(null);
      }
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
      isHideFields: false
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
    }),
    onSubmit: async (values) => {
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
      formData.append("inStock", values.inStock)
      values.images.forEach((images) => {
        formData.append("images", images)
      })
      formData.append("description", values.description)


      if (id) {
        formData.append("id", id.toString())
        try {
          const response = await axios.put(`/api/product?id=${id}`, formData, {
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
          const productResponse = await axios.post(`/api/product/`, formData, {
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
  console.log('formik.errors :>> ', formik.errors);
  console.log('formik.values :>> ', formik.values);

  const changeFinalPrice = async (value: number, type: string) => {
    let price = 0;
    let discount_price = 0
    if (formik.values.price && formik.values.discount_price) {
      if (type == "price") {
        price = +value
        discount_price = +formik.values.discount_price
      } else if (type = "discount_price") {
        price = +formik.values.price
        discount_price = +value
      }
      const final_price = +price - ((+price * +discount_price) / 100)
      formik.setFieldValue("final_price", final_price);
    }
  };

  const handleEditProduct = async (item: IProduct) => {
    console.log('item :>> ', item);
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
    formData.append("discount_price", item.discount_price);
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
    formData.append("inStock", item.inStock);

    try {
      const response = await axios.put(`/api/product?id=${item.id}`, formData)
      console.log('response: ', response.data.data);
      getAllProduct();
    } catch (error) {
      console.error(error)
    }
  }

  const handleCheckboxChange = async (id: string) => {
    // console.log(id, "iddddd")
    const selectedIds = new Set(formik.values.size_ids.split(',').filter(Boolean)); // Use a Set to handle uniqueness
    // console.log('selectedIds: ', selectedIds);
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
    console.log('iddddd :>> ', id);
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
        const response = await axios.delete(`/api/product-inquiry?id=${selectedProductInquiry}`)
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

  const trackPantsCategoryId = allCategory.find((cat) => cat.name === "Track-Pants")?.id.toString();


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
                          <div key={item.id} className="mb-2">
                            <span className="font-bold">Category:</span> {item.Category?.name}
                          </div>
                          <div className="mb-2">
                            <span className="font-bold">Name:</span>{item.name}
                          </div>
                          <div className="mb-2">
                            <span className="font-bold">Price:</span>{item.price}
                          </div>
                          <div className="mb-2">
                            <span className="font-bold">Colors:</span>{item.Colors.map(color => color.name).join(',')}
                          </div>
                          <div className="mb-2">
                            <span className="font-bold">Size:</span>{item.Sizes.map(size => size.name).join(',')}
                          </div>
                          <div className="mb-2">
                            <span className="font-bold">Type:</span>{item.sleeve}
                          </div>
                          <div className="mb-2">
                            <span className="font-bold">Fabric:</span>{item.sleeve}
                          </div>
                          <div className="mb-2">
                            <span className="font-bold">Sales Package:</span>{item.sales_package}
                          </div>
                          <div className="mb-2">
                            <span className="font-bold">Style Code:</span>{item.style_code}
                          </div>
                          <div className="mb-2">
                            <span className="font-bold">Neck Type:</span>{item.neck_type}
                          </div>
                          <div className="mb-2">
                            <span className="font-bold">Pattern:</span>{item.pattern}
                          </div>
                          <div className="mb-2">
                            <span className="font-bold">Fabric Care:</span>{item.fabric_care}
                          </div>
                          <div className="mb-2">
                            <span className="font-bold">Net Quantity:</span>{item.net_quantity}
                          </div>
                          <div className="mb-2">
                            <span className="font-bold">Status:</span>{item.status}
                          </div>
                          <div className="mb-2">
                            <span className="font-bold">Description:</span>{item.description}
                          </div>
                          <div className="mb-2">
                            <span className="font-bold">Images:</span>
                            {
                              item.ProductImages.map((image, index) => (
                                <div key={index}>
                                  <Image src={`/product-image/${image.sysFileName}`}
                                    width={200} height={200} alt="Product image"
                                  />
                                </div>
                              ))
                            }
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
                      <div className="flex items-center space-x-2">
                        <Label>T-Shirts</Label>
                        <Switch checked={isTrackPants}
                          onCheckedChange={(checked) => setIsTrackPants(checked)}
                        />
                        <Label>Track Pants</Label>
                      </div>
                      <Dialog open={openModel} onOpenChange={(state) => setOpenModel(state)}>
                        <DialogTrigger asChild>
                          <Button className="rounded-full pr-5" onClick={async () => {
                            setId(null)
                            setSelectedImages([])
                            formik.resetForm()
                            await getAllCategory();
                            await getAllColor();
                            await getAllSize();
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
                                      if (findName === "Track-Pants") {
                                        formik.setFieldValue('isHideFields', true)
                                      }
                                    }}
                                  >
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
                                  <div className="w-[180px]">
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
                                  <div className="w-[180px]">
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
                                        <PopoverContent>
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
                                    placeholder="price"
                                    className="col-span-3"
                                    value={formik.values.price}
                                    onChange={(e) => {
                                      formik.handleChange(e); // Update Formik state
                                      changeFinalPrice(e.target.value, "price"); // Call custom function
                                    }}
                                    onInput={() => console.log("input change", formik.values.price)} />
                                  {formik.errors.price && formik.touched.price &&
                                    (<p className="text-red-500">{formik.errors.price}</p>)}
                                </div>

                                <div className="col-span-4">
                                  <Label>Discount Price</Label>
                                  <Input
                                    id="discount_price"
                                    placeholder="Discount Price"
                                    className="col-span-3"
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={formik.values.discount_price}
                                    onChange={(e) => {
                                      const value = Math.min(Math.max(e.target.value, 0), 100);
                                      formik.handleChange(e);
                                      changeFinalPrice(value, "discount_price");
                                    }}
                                  />
                                  {formik.errors.discount_price && formik.touched.discount_price &&
                                    (<p className="text-red-500">{formik.errors.discount_price}</p>)}
                                </div>

                                <div className="col-span-4">
                                  <Label>Final Price</Label>
                                  <Input
                                    id="final_price"
                                    placeholder="final price"
                                    className="col-span-3"
                                    value={formik.values.final_price}
                                    onChange={formik.handleChange}
                                    readOnly
                                  />
                                  {formik.errors.final_price && formik.touched.final_price &&
                                    (<p className="text-red-500">{formik.errors.final_price}</p>)}
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
                                  formik.values.category_id.toString() !== allCategory.find(val => val.name === "Track-Pants")?.id.toString() && (
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
                                  formik.values.category_id.toString() !== allCategory.find(val => val.name === "Track-Pants")?.id.toString() && (
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
                                  formik.values.category_id.toString() !== allCategory.find(val => val.name === "Track-Pants")?.id.toString() && (
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
                                  <Label>InStock</Label>
                                  <Switch checked={formik.values.inStock}
                                    onCheckedChange={(checked) => formik.setFieldValue("inStock", checked)} />
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
                              </div>
                            </div>
                            <DialogFooter className="px-5 pb-5">
                              <Button type="submit">
                                {id ? "Save changes" : "Add product"}
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                    {
                      loading ? (
                        <div className="w-full">
                          <TableHead className="w-full">
                            <TableCell className="flex justify-center">
                              <Skeleton className="h-5 w-20" />
                            </TableCell>
                            <TableCell className="flex justify-center">
                              <Skeleton className="h-5 w-40" />
                            </TableCell>
                            <TableCell className="flex justify-center">
                              <Skeleton className="h-5 w-20" />
                            </TableCell>
                            <TableCell className="flex justify-center">
                              <Skeleton className="h-5 w-20" />
                            </TableCell>
                            <TableCell className="flex justify-center">
                              <Skeleton className="h-5 w-20" />
                            </TableCell>
                            <TableCell className="flex justify-center">
                              <Skeleton className="h-5 w-20" />
                            </TableCell>
                            <TableCell className="flex justify-center">
                              <Skeleton className="h-5 w-20" />
                            </TableCell>
                            <TableCell className="flex justify-center">
                              <Skeleton className="h-5 w-20" />
                            </TableCell>
                            <TableCell className="flex justify-center">
                              <Skeleton className="h-5 w-20" />
                            </TableCell>
                            <TableCell className="flex justify-center">
                              <Skeleton className="h-5 w-20" />
                            </TableCell>
                            <TableCell className="flex justify-center">
                              <Skeleton className="h-5 w-20" />
                            </TableCell>
                            <TableCell className="flex justify-center">
                              <Skeleton className="h-5 w-20" />
                            </TableCell>
                          </TableHead>
                          <TableBody>
                            <TableRow className="w-full">
                              <TableCell className="flex justify-center">
                                <Skeleton className="h-5 w-20" />
                              </TableCell>
                              <TableCell className="flex justify-center">
                                <Skeleton className="h-5 w-40" />
                              </TableCell>
                              <TableCell className="flex justify-center">
                                <Skeleton className="h-5 w-20" />
                              </TableCell>
                              <TableCell className="flex justify-center">
                                <Skeleton className="h-5 w-20" />
                              </TableCell>
                              <TableCell className="flex justify-center">
                                <Skeleton className="h-5 w-20" />
                              </TableCell>
                              <TableCell className="flex justify-center">
                                <Skeleton className="h-5 w-20" />
                              </TableCell>
                              <TableCell className="flex justify-center">
                                <Skeleton className="h-5 w-20" />
                              </TableCell>
                              <TableCell className="flex justify-center">
                                <Skeleton className="h-5 w-20" />
                              </TableCell>
                              <TableCell className="flex justify-center">
                                <Skeleton className="h-5 w-20" />
                              </TableCell>
                              <TableCell className="flex justify-center">
                                <Skeleton className="h-5 w-20" />
                              </TableCell>
                              <TableCell className="flex justify-center">
                                <Skeleton className="h-5 w-20" />
                              </TableCell>
                              <TableCell className="flex justify-center">
                                <Skeleton className="h-5 w-20" />
                              </TableCell>
                            </TableRow>
                          </TableBody>

                        </div>
                      ) : (
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
                                {
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
                      )
                    }
                  </>
                }

                {
                  page === 2 &&
                  <>
                    <div className="flex justify-between items-center pb-5">
                      <div className="text-2xl font-bold">Category</div>
                      <Dialog open={openModel} onOpenChange={(state) => setOpenModel(state)}>
                        <DialogTrigger asChild>
                          <Button className="rounded-full pr-5" onClick={() => setCategory("")}>
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
                          {/* <form onSubmit={formik.handleSubmit}> */}
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
                            <Button type="submit" onClick={handleAddCategory}>Save changes</Button>
                          </DialogFooter>
                          {/* </form> */}
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
                                            <AlertDialogAction onClick={() => handleDeleteCategory(item)}>Continue</AlertDialogAction>
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

                {
                  page === 4 &&
                  <>
                    <div className="flex justify-between items-center pb-5">
                      <div className="text-2xl font-bold">Size</div>
                      <Dialog open={openModel} onOpenChange={(state) => setOpenModel(state)}>
                        <DialogTrigger asChild>
                          <Button className="rounded-full pr-5" onClick={() => {
                            setSize('');
                            setSelectedCategory(null);
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
                                  if (selected) {
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
                            <Button type="submit" onClick={handleAddSize}>Save changes</Button>
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
                              currentSize.map((item, index) => (
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
                              ))
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
                          <Button className="rounded-full pr-5" onClick={() => setColors("")}>
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
                            <Button type="submit" onClick={handleAddColor}>Save changes</Button>
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
                              allColors.map((item, index) => {
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
                                                Are you sure you want to delete the color <span className="font-extrabold">{item.name}</span>? This action cannot be undone.
                                              </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                              <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel>
                                              <AlertDialogAction onClick={() => handleDeleteColor(item.id)}>Continue</AlertDialogAction>
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
                              <TableCell>Name</TableCell>
                              <TableCell>Email</TableCell>
                              <TableCell>Mobile Number</TableCell>
                              <TableCell>Message</TableCell>
                              <TableCell>Product Name</TableCell>
                              <TableCell>Quntity</TableCell>
                              <TableCell>Price</TableCell>
                              <TableCell>Color</TableCell>
                              <TableCell>Size</TableCell>
                              <TableCell>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {loading ? (
                              Array.from(new Array(5)).map((_, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    <Skeleton className="h-4 w-[250px]" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-4 w-[250px]" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-4 w-[250px]" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-4 w-[250px]" />
                                  </TableCell>
                                  <TableCell>
                                    <Skeleton className="h-4 w-[250px]" />
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              productInquiry.map((item, index) => {
                                const filteredDataofSize = item.Sizes.filter((val) => item.size_ids.includes(val.id))
                                const filteredColorData = item.Colors.filter(val => item.color_ids.includes(val.id))
                                return (
                                  <TableRow key={index}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.mobile_no}</TableCell>
                                    <TableCell>{item.inquiry_message}</TableCell>
                                    <TableCell>{item.Product.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.Product.price}</TableCell>
                                    <TableCell>{filteredColorData.map((item) => item.name).join(', ')}
                                    </TableCell>
                                    <TableCell>{filteredDataofSize.map((item) => item.name).join(', ')}
                                    </TableCell>
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
                              <TableCell>Email</TableCell>
                              <TableCell>Mobile Number</TableCell>
                              <TableCell>Message</TableCell>
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
                              currentInquiry.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.id}</TableCell>
                                  <TableCell>{item.email}</TableCell>
                                  <TableCell>{item.phone}</TableCell>
                                  <TableCell>{item.message}</TableCell>
                                </TableRow>
                              ))
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
