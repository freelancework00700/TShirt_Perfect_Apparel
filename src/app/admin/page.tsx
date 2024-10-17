"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
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

interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}
const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number,
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

function Admin() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [adminShow, setAdminShow] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }
    setError("");
    setEmail("");
    setPassword("");
  };

  // const invoices = [
  //   {
  //     invoice: "INV001",
  //     Category: "T-shirt",
  //     SubCategory: "$250.00",
  //     Color: "Black",
  //     Size: "M",
  //   },
  //   {
  //     invoice: "INV002",
  //     Category: "Tracks",
  //     SubCategory: "$250.00",
  //     Color: "Red",
  //     Size: "L",
  //   },
  //   {
  //     invoice: "INV003",
  //     Category: "Tracks",
  //     SubCategory: "$250.00",
  //     Color: "Blue",
  //     Size: "S",
  //   },
  //   {
  //     invoice: "INV004",
  //     Category: "T-shirt",
  //     SubCategory: "$250.00",
  //     Color: "Purple",
  //     Size: "2XL",
  //   },
  //   {
  //     invoice: "INV005",
  //     Category: "Tracks",
  //     SubCategory: "$250.00",
  //     Color: "GREY",
  //     Size: "XL",
  //   },
  //   {
  //     invoice: "INV006",
  //     Category: "Tracks",
  //     SubCategory: "$250.00",
  //     Color: "Yellow",
  //     Size: "XS",
  //   },
  //   {
  //     invoice: "INV007",
  //     Category: "T-shirt",
  //     SubCategory: "$250.00",
  //     Color: "Violent",
  //     Size: "S",
  //   },
  //   {
  //     invoice: "INV008",
  //     Category: "Tracks",
  //     SubCategory: "$250.00",
  //     Color: "Green",
  //     Size: "3XL",
  //   },
  //   {
  //     invoice: "INV001",
  //     Category: "T-shirt",
  //     SubCategory: "$250.00",
  //     Color: "Black",
  //     Size: "M",
  //   },
  //   {
  //     invoice: "INV002",
  //     Category: "Tracks",
  //     SubCategory: "$250.00",
  //     Color: "Red",
  //     Size: "L",
  //   },
  //   {
  //     invoice: "INV003",
  //     Category: "Tracks",
  //     SubCategory: "$250.00",
  //     Color: "Blue",
  //     Size: "S",
  //   },
  //   {
  //     invoice: "INV004",
  //     Category: "T-shirt",
  //     SubCategory: "$250.00",
  //     Color: "Purple",
  //     Size: "2XL",
  //   },
  //   {
  //     invoice: "INV005",
  //     Category: "Tracks",
  //     SubCategory: "$250.00",
  //     Color: "GREY",
  //     Size: "XL",
  //   },
  //   {
  //     invoice: "INV006",
  //     Category: "Tracks",
  //     SubCategory: "$250.00",
  //     Color: "Yellow",
  //     Size: "XS",
  //   },
  //   {
  //     invoice: "INV007",
  //     Category: "T-shirt",
  //     SubCategory: "$250.00",
  //     Color: "Violent",
  //     Size: "S",
  //   },
  //   {
  //     invoice: "INV008",
  //     Category: "Tracks",
  //     SubCategory: "$250.00",
  //     Color: "Green",
  //     Size: "3XL",
  //   },
  // ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                  onSubmit={handleLogin}
                  className="m-2 p-10 rounded-md shadow-lg bg-white"
                >
                  <div>
                    <label className="text-sm">Email</label>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label className="text-sm">Password</label>
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
                      onClick={() => setAdminShow(true)}
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
                  <div className="bg-[#222] hover:bg-[#141414] p-2 px-5 rounded-md cursor-pointer">
                    Product
                  </div>
                  <div className="hover:bg-[#141414] p-2 px-5 rounded-md cursor-pointer">
                    Collection
                  </div>
                  <div className="hover:bg-[#141414] p-2 px-5 rounded-md cursor-pointer">
                    Categories
                  </div>
                </div>
              </div>
              <div className="w-full p-5 max-h-[100vh] bg-[#eee]">
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
                            clip-rule="evenodd"
                          />
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
                      <div className="grid grid-cols-12 gap-4 gap-y-2 pb-4 px-5 pt-2">
                        <div className="col-span-4">
                          <Label>Category</Label>
                          <Input
                            id="Category"
                            placeholder="Category"
                            className=""
                          />
                        </div>
                        <div className="col-span-4">
                          <Label>SubCategory</Label>
                          <Input
                            id="SubCategory"
                            placeholder="SubCategory"
                            className="col-span-3"
                          />
                        </div>
                        <div className="col-span-4">
                          <Label>Product Name</Label>
                          <Input
                            id="productName"
                            placeholder="Product Name"
                            className="col-span-3"
                          />
                        </div>
                        <div className="col-span-4">
                          <Label>Color</Label>
                          <Input
                            id="Color"
                            placeholder="Color"
                            className="col-span-3"
                          />
                        </div>
                        <div className="col-span-4">
                          <Label>fabric</Label>
                          <Input
                            id="fabric"
                            placeholder="fabric"
                            className="col-span-3"
                          />
                        </div>
                        <div className="col-span-4">
                          <Label>Fabric Care</Label>
                          <Input
                            id="fabricCare"
                            placeholder="fabric Care"
                            className="col-span-3"
                          />
                        </div>
                        <div className="col-span-4">
                          <Label>Fit</Label>
                          <Input
                            id="fit"
                            placeholder="fit"
                            className="col-span-3"
                          />
                        </div>
                        <div className="col-span-4">
                          <Label>Ideal For</Label>
                          <Input
                            id="fit"
                            placeholder="Ideal For"
                            className="col-span-3"
                          />
                        </div>
                        <div className="col-span-4">
                          <Label>Neck Type</Label>
                          <Input
                            id="neck_type"
                            placeholder="Neck Type"
                            className="col-span-3"
                          />
                        </div>
                        <div className="col-span-4">
                          <Label>Pack Of</Label>
                          <Input
                            id="Pack Of"
                            placeholder="Pack Of"
                            className="col-span-3"
                          />
                        </div>
                        <div className="col-span-4">
                          <Label>Pattern</Label>
                          <Input
                            id="pattern"
                            placeholder="pattern"
                            className="col-span-3"
                          />
                        </div>
                        <div className="col-span-4">
                          <Label>Price</Label>
                          <Input
                            id="price"
                            placeholder="price"
                            className="col-span-3"
                          />
                        </div>
                        <div className="col-span-4">
                          <Label>Reversible</Label>
                          <Input
                            id="reversible"
                            placeholder="reversible"
                            className="col-span-3"
                          />
                        </div>
                        <div className="col-span-4">
                          <Label>Size</Label>
                          <Input
                            id="size"
                            placeholder="size"
                            className="col-span-3"
                          />
                        </div>
                        <div className="col-span-4">
                          <Label>Sleeve</Label>
                          <Input
                            id="sleeve"
                            placeholder="sleeve"
                            className="col-span-3"
                          />
                        </div>
                        <div className="col-span-4">
                          <Label>Style Code</Label>
                          <Input
                            id="style_code"
                            placeholder="Style Code"
                            className="col-span-3"
                          />
                        </div>
                        <div className="col-span-4">
                          <Label>Suitable For</Label>
                          <Input
                            id="suitable_for"
                            placeholder="Suitable For"
                            className="col-span-3"
                          />
                        </div>
                        <div className="col-span-4">
                          <Label>type</Label>
                          <Input
                            id="type"
                            placeholder="type"
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter className="px-5 pb-5">
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>


                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => {
                            return (
                              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell key={column.id} align={column.align}>
                                      {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>


                <div className="bg-[#fff] rounded-lg overflow-hidden ">
                  <div className="relative w-full overflow-auto h-[calc(100vh_-_140px)]">
                  {/* <ScrollArea className=" w-[calc(100vw_-_325px)] rounded-md">
                    <Table>
                      <TableHeader className="bg-[#000] text-white">
                        <TableRow>
                          <TableHead className="w-[100px] text-white min-w-[130px]">Invoice</TableHead>
                          <TableHead className="text-white min-w-[130px]">Category</TableHead>
                          <TableHead className="text-white min-w-[130px]">SubCategory</TableHead>
                          <TableHead className="text-white min-w-[130px]">Product Name</TableHead>
                          <TableHead className="text-white min-w-[130px]">Color</TableHead>
                          <TableHead className="text-white min-w-[130px]">fabric</TableHead>
                          <TableHead className="text-white min-w-[130px]">Fabric Care</TableHead>
                          <TableHead className="text-white min-w-[130px]">Fit</TableHead>
                          <TableHead className="text-white min-w-[130px]">Ideal For</TableHead>
                          <TableHead className="text-white min-w-[130px]">Neck Type</TableHead>
                          <TableHead className="text-white min-w-[130px]">Pack Of</TableHead>
                          <TableHead className="text-white min-w-[130px]">Pattern</TableHead>
                          <TableHead className="text-white min-w-[130px]">Price</TableHead>
                          <TableHead className="text-white min-w-[130px]">Reversible</TableHead>
                          <TableHead className="text-white min-w-[130px]">Size</TableHead>
                          <TableHead className="text-white min-w-[130px]">Sleeve</TableHead>
                          <TableHead className="text-white min-w-[130px]">Style Code</TableHead>
                          <TableHead className="text-white min-w-[130px]">Suitable For</TableHead>
                          <TableHead className="text-white min-w-[130px]">Type</TableHead>
                          <TableHead className="text-right text-white">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoices.map((invoice) => (
                          <TableRow key={invoice.invoice}>
                            <TableCell className="font-medium">{invoice.invoice}</TableCell>
                            <TableCell>{invoice.Category}</TableCell>
                            <TableCell>{invoice.SubCategory}</TableCell>
                            <TableCell>{invoice.Color}</TableCell>
                            <TableCell>{invoice.Size}</TableCell>
                            <TableCell>{invoice.Size}</TableCell>
                            <TableCell>{invoice.Size}</TableCell>
                            <TableCell>{invoice.Size}</TableCell>
                            <TableCell>{invoice.Size}</TableCell>
                            <TableCell>{invoice.Size}</TableCell>
                            <TableCell>{invoice.Size}</TableCell>
                            <TableCell>{invoice.Size}</TableCell>
                            <TableCell>{invoice.Size}</TableCell>
                            <TableCell>{invoice.Size}</TableCell>
                            <TableCell>{invoice.Size}</TableCell>
                            <TableCell>{invoice.Size}</TableCell>
                            <TableCell>{invoice.Size}</TableCell>
                            <TableCell>{invoice.Size}</TableCell>
                            <TableCell>{invoice.Size}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button className="bg-transparent hover:bg-transparent px-0">
                                  <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="#64a6db"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </Button>
                                <Button className="bg-transparent hover:bg-transparent px-0">
                                  <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="#51bb2b"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                                      clip-rule="evenodd"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </Button>
                                <Button className="bg-transparent hover:bg-transparent px-0">
                                  <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="#e0384a"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    </ScrollArea> */}
                  </div>
                </div>
                <Pagination>
                  <PaginationContent className="pb-2 pt-2">
                    <PaginationItem>
                      <PaginationPrevious href="#"/>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis/>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#"/>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default Admin;
