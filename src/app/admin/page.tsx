"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ICategories, IProduct, ISubCategories } from "@/interface/types";


function Admin() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [adminShow, setAdminShow] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [allProduct, setAllProduct] = useState<IProduct[]>([]);
  const [category, setCategory] = useState("")
  const [subCategory, setSubCategory] = useState("")
  const [allCategory, setAllCategory] = useState<ICategories[]>([]);
  const [allSubCategory, setAllSubCategory] = useState<ISubCategories[]>([]);
  const [openModel, setOpenModel] = useState(false);


  // const loginCredentials = [{ email: 'abc@gmail.com', password: 'Abc@123' },
  // { email: 'test@gmail.com', password: 'test@123' }]

  const handleLogin = () => {
    // e.preventDefault();
    setAdminShow(true)

    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    // const findData = loginCredentials.find((value) => value.email === email || value.password === password)
    // if (findData) {
    //   setAdminShow(true)
    // }
    setError("");
    setEmail("");
    setPassword("");
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getAllProduct = async () => {
    const response = await axios.get('/api/product')
    setAllProduct(response.data.data)
  }

  const getAllCategory = async () => {
    const response = await axios.get(`/api/category`)
    setAllCategory(response.data.data)
  }

  const getAllSubCategory = async () => {
    // const response = await axios.get(`/api/sub-category`)
    // setAllSubCategory(response.data.data)
  }

  useEffect(() => {
    getAllProduct();
    getAllCategory();
    getAllSubCategory();
  }, [])

  const handleAddCategory = async () => {
    await axios.post('/api/category', { name: category })
  }

  const handleDeleteCategory = async (id: number) => {
    console.log('id :>> ', id);
    await axios.delete(`/api/category?id=${id}`)
    await axios.get(`/api/category`)
  }

  const handleEditCategory = async (item: ICategories) => {
    console.log('item :>> ', item);
  }


  const handleAddSubCategory = async () => {
    await axios.post('/api/sub-category', { name: subCategory })
  }


  const formik = useFormik({
    initialValues: {
      category_id: "",
      name: "",
      price: "",
      type: "",
      sleeve: "",
      fit: "",
      fabric: "",
      sales_package: "",
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
    },
    validationSchema: Yup.object({
      category_id: Yup.string().min(1).max(3).required("Enter category_id"),
      name: Yup.string().min(1).max(3).required("Enter category_id"),
      price: Yup.string().min(1).max(3).required("Enter category_id"),
      type: Yup.string().min(1).max(3).required("Enter category_id"),
      sleeve: Yup.string().min(1).max(3).required("Enter category_id"),
      fit: Yup.string().min(1).max(3).required("Enter category_id"),
      fabric: Yup.string().min(1).max(3).required("Enter category_id"),
      sales_package: Yup.string().min(1).max(3).required("Enter category_id"),
      pack_of: Yup.string().min(1).max(3).required("Enter category_id"),
      style_code: Yup.string().min(1).max(3).required("Enter category_id"),
      neck_type: Yup.string().min(1).max(3).required("Enter category_id"),
      ideal_for: Yup.string().min(1).max(3).required("Enter category_id"),
      pattern: Yup.string().min(1).max(3).required("Enter category_id"),
      suitable_for: Yup.string().min(1).max(3).required("Enter category_id"),
      reversible: Yup.string().min(1).max(3).required("Enter category_id"),
      fabric_care: Yup.string().min(1).max(3).required("Enter category_id"),
      net_quantity: Yup.string().min(1).max(3).required("Enter category_id"),
      status: Yup.string().min(1).max(3).required("Enter category_id"),
    }),
    onSubmit: async (values) => {
      console.log('values :>> ', values);
    }
  })


  return (
    <>
      <main className="relative max-h-[100vh]">
        {!adminShow ? (
          <div className="bg-gray-100 h-[100vh]">
            <div className="container mx-auto xl:max-w-7xl">
              <div
                className="login-form max-w-[600px] w-[450px] mx-auto absolute top-[50%] left-[50%]"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <div className="font-bold xl:me-[2rem] text-[24px] text-center mb-5">
                  Perfect Apparels
                </div>
                <form
                  // onSubmit={formik.handleSubmit}
                  className="m-2 p-10 rounded-md shadow-lg bg-white"
                >
                  <div>
                    <label className="text-sm">Email</label>
                    <Input
                      type="email"
                      placeholder="Email"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label className="text-sm">Password</label>
                    <Input
                      type="password"
                      placeholder="password"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <div className="mt-5">
                    <Button
                      type="submit"
                      className="px-10"
                      // onClick={() => setAdminShow(true)}
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
              <div
                className="h-[100vh] w-[300px] min-w-[280px] max-w-[280px] bg-black text-white sticky flex flex-col top-0 min-h-[100vh] max-h-[100vh] z-[200]"
                style={{ flex: "1 0 auto" }}
              >
                <div className="font-bold text-[24px] p-[10px]">
                  Perfect Apparels
                </div>
                <div className="p-3 flex flex-col gap-3">
                  <div onClick={() => setPage(0)} className="bg-[#222] hover:bg-[#141414] p-2 px-5 rounded-md cursor-pointer">
                    Product
                  </div>
                  <div className="hover:bg-[#141414] p-2 px-5 rounded-md cursor-pointer">
                    Collection
                  </div>
                  <div onClick={() => setPage(2)} className="hover:bg-[#141414] p-2 px-5 rounded-md cursor-pointer">
                    Categories
                  </div>
                  <div onClick={() => setPage(3)} className="hover:bg-[#141414] p-2 px-5 rounded-md cursor-pointer">
                    Sub Categories
                  </div>
                </div>
              </div>
              <div className="w-full p-5 max-h-[100vh] bg-[#eee]">
                {
                  page === 0 &&
                  <>
                    <div className="flex justify-between items-center pb-5">
                      <div className="text-2xl font-bold">Product</div>
                      <Dialog>
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
                            <div className="grid grid-cols-12 gap-4 gap-y-2 pb-4 px-5 pt-2">
                              <div className="col-span-4">
                                <Label>Category</Label>
                                <Input
                                  id="category_id"
                                  placeholder="Category"
                                  className=""
                                  value={formik.values.category_id}
                                  onChange={formik.handleChange} />
                                {formik.errors.category_id && formik.touched.category_id &&
                                  (<p className="text-red-500">{formik.errors.category_id}</p>)}
                              </div>
                              <div className="col-span-4">
                                <Label>SubCategory</Label>
                                <Input
                                  id="SubCategory"
                                  placeholder="SubCategory"
                                  className="col-span-3" />
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
                                <Label>Color</Label>
                                <Input
                                  id="Color"
                                  placeholder="Color"
                                  className="col-span-3" />
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
                                <Label>Price</Label>
                                <Input
                                  id="price"
                                  placeholder="price"
                                  className="col-span-3"
                                  value={formik.values.price}
                                  onChange={formik.handleChange} />
                                {formik.errors.price && formik.touched.price &&
                                  (<p className="text-red-500">{formik.errors.price}</p>)}
                              </div>
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
                              <div className="col-span-4">
                                <Label>Size</Label>
                                <Input
                                  id="size"
                                  placeholder="size"
                                  className="col-span-3" />
                              </div>
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
                            </div>
                            <DialogFooter className="px-5 pb-5">
                              <Button type="submit">Save changes</Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div><Paper sx={{ width: '100%', overflow: 'hidden' }}>
                      <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Id</TableCell>
                              <TableCell>Name</TableCell>
                              <TableCell>status</TableCell>
                              <TableCell>Price</TableCell>
                              <TableCell>Fit</TableCell>
                              <TableCell>Fabric</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {/* {
                              allData
                            } */}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      {/* <TablePagination
    rowsPerPageOptions={[10, 25, 100]}
    component="div"
    count={rows.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  /> */}
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
                            Add Category
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] p-5">
                          <DialogHeader>
                            <DialogTitle className="px-5 pt-5">New Product</DialogTitle>
                            <DialogDescription className="px-5 pt-1">
                              Upload your New Category Here
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={formik.handleSubmit}>
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
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="bg-[#fff] rounded-lg overflow-hidden ">
                      <div className="relative w-full overflow-auto h-[calc(100vh_-_140px)]">
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                          <TableContainer sx={{ maxHeight: 440 }}>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Category ID</TableCell>
                                  <TableCell>Name</TableCell>
                                  <TableCell>Action</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {
                                  allCategory.map((item, index) => (
                                    <TableRow key={index}>
                                      <TableCell>{item.id}</TableCell>
                                      <TableCell>{item.name}</TableCell>
                                      <TableCell>
                                        <Button onClick={() => handleEditCategory(item)}>Edit</Button>
                                        <Button onClick={() => handleDeleteCategory(item.id)}>Delete</Button>
                                      </TableCell>
                                    </TableRow>
                                  ))
                                }
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Paper>
                      </div>
                    </div>
                  </>
                }

                {
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
                            <DialogTitle className="px-5 pt-5">New Product</DialogTitle>
                            <DialogDescription className="px-5 pt-1">
                              Upload your New Sub Category Here
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={formik.handleSubmit}>
                            <div className="grid grid-cols-12 gap-4 gap-y-2 pb-4 px-5 pt-2">
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
                    <div className="bg-[#fff] rounded-lg overflow-hidden ">
                      <div className="relative w-full overflow-auto h-[calc(100vh_-_140px)]">
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                          <TableContainer sx={{ maxHeight: 440 }}>
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
                                {
                                  allSubCategory.map((item, index) => (
                                    <TableRow key={index}>
                                      <TableCell>{item.category_id}</TableCell>
                                      <TableCell>{item.id}</TableCell>
                                      <TableCell>{item.name}</TableCell>
                                      <TableCell>
                                        {/* <Button onClick={() => handleEditCategory(item)}>Edit</Button>
                                        <Button onClick={() => handleDeleteCategory(item.id)}>Delete</Button> */}
                                      </TableCell>
                                    </TableRow>
                                  ))
                                }
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Paper>
                      </div>
                    </div>
                  </>
                }
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default Admin;
