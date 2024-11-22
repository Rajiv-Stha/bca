"use client";

import { useState, useEffect } from "react";
import { allCategoryApi, getAllProductApi, TupdateProuductPayload, updateProductById } from "../../utils/api";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Badge,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import axiosInstance from "../../utils/axios";
import Navbar from "../../components/Navbar/Navbar";

// Types for the product and the form data
interface Product {
  _id: string;
  name: string;
  desc: string;
  owner: string;
  image: string;
  price: string;
  status: "pending" | "approved" | "rejected";
  category: string;
  quantity: number;
  gender: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductFormProps {
  product: Product | null;
  onSubmit: (updatedProduct: Product) => void;
}

// const initialProducts: Product[] = [
//   { _id: "1", name: 'Vintage Chair', price: "50", status: 'pending',  desc: 'A beautiful vintage chair', category: 'Furniture' },
// ]

const categories: string[] = [
  "Furniture",
  "Lighting",
  "Electronics",
  "Clothing",
  "Books",
  "Other",
];

export default function AdminDashboard() {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(allProducts);

  const handleDelete = async (id: string) => {
    const response = await axiosInstance.delete(`/product/${id}`);

    if (response.status === 200) {
      setAllProducts(allProducts.filter((product) => product._id !== id));
    }
  };

  const handleApprove = async (id: string) => {
    try {

      
      // Make an API request to approve the product on the server
      const response = await axiosInstance.put(`/product/${id}`, { status: "approved" });
      
      // If the request is successful, update the local state
      if (response.status === 200) {
        setAllProducts(
          allProducts.map((product) =>
            product._id === id ? { ...product, status: "approved" } : product
          )
        );
      } else {
        console.error("Failed to approve the product.");
      }
    } catch (error) {
      console.error("Error approving the product:", error);
    }
  };
  

 

  const fetchProducts = async () => {
    try {
      const { status, data } = await getAllProductApi();
      if (status === 200) {
        setAllProducts(data.message);
      } else {
        throw new Error("something went wrong");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (<>
  <Navbar/>
 
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Second Hand Store Admin Dashboard
      </h1>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th>Price</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {allProducts.map((product) => (
            <Tr key={product._id}>
              <Td>{product.name}</Td>
              <Td>{product.category}</Td>
              <Td>NRs. {product.price}</Td>
              <Td>
                <Badge
                  colorScheme={
                    product.status === "approved" ? "green" : "yellow"
                  }
                >
                  {product.status}
                </Badge>
              </Td>
              <Td>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => {
                      setEditingProduct(product);
                      onOpen();
                    }}
                    leftIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(product._id)}
                    leftIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                  {product.status === "pending" && (
                    <Button
                      colorScheme="blue"
                      onClick={() => handleApprove(product._id)}
                    >
                      Approve
                    </Button>
                  )}
                </div>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {editingProduct && (
              <ProductForm product={editingProduct}  onSuccess={()=>{onClose() ; fetchProducts()}} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
    </>
  );
}

function ProductForm({ 
  product, 
  onSuccess
}: { 
  product: TupdateProuductPayload; 
  onSuccess:()=>void

}) {
  const [formData, setFormData] = useState<TupdateProuductPayload>(product);
  const [allCategory, setAllCategory] = useState([])
  useEffect(()=>{
    categoryFetching()
  },[])
  const categoryFetching = async()=>{
    try {
      const {data, status} = await allCategoryApi()
      if(status===200){
        setAllCategory(data.message)
      }
    } catch (error:any) {
      console.log(error.message)
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'quantity' ? parseInt(value, 10) : value, // Parse `quantity` as number
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      category: e.target.value,
    }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
    await  updateProductById(product._id as string, formData)
    onSuccess()
    } catch (error) {
      
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <FormLabel htmlFor="category">Category</FormLabel>
        <Select 
          id="category" 
          name="category" 
          value={formData.category} 
          onChange={handleCategoryChange} 
          placeholder="Select category"
        >
          {allCategory.map((category) => (
            <option key={category} value={category.categoryName}>
              {category.categoryName}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <FormLabel htmlFor="price">Price</FormLabel>
        <Input 
          id="price" 
          name="price" 
          type="text" 
          value={formData.price} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <FormLabel htmlFor="desc">Description</FormLabel>
        <Input 
          id="desc" 
          name="desc" 
          value={formData.desc} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <FormLabel htmlFor="quantity">Quantity</FormLabel>
        <Input 
          id="quantity" 
          name="quantity" 
          type="number" 
          value={formData.quantity} 
          onChange={handleChange} 
          required 
        />
      </div>
      <Button colorScheme="blue" type="submit">
        Update Product
      </Button>
    </form>
  );
}