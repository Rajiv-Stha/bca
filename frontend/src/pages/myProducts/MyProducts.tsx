'use client'

import { useState } from 'react'
import { Button } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import { FormLabel } from "@chakra-ui/react"
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Badge } from "@chakra-ui/react"
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import { Select } from "@chakra-ui/react"

// Types for the product and the form data
interface Product {
  id: number;
  name: string;
  price: number;
  status: 'pending' | 'approved';
  description: string;
  category: string;
}

interface ProductFormProps {
  product: Product | null;
  onSubmit: (updatedProduct: Product) => void;
}

const initialProducts: Product[] = [
  { id: 1, name: 'Vintage Chair', price: 50, status: 'pending', description: 'A beautiful vintage chair', category: 'Furniture' },
  { id: 2, name: 'Antique Lamp', price: 75, status: 'approved', description: 'An elegant antique lamp', category: 'Lighting' },
  { id: 3, name: 'Retro Radio', price: 100, status: 'pending', description: 'A classic retro radio', category: 'Electronics' },
]

const categories: string[] = ['Furniture', 'Lighting', 'Electronics', 'Clothing', 'Books', 'Other']

export default function MyProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDelete = (id: number) => {
    setProducts(products.filter(product => product.id !== id))
  }

  const handleUpdate = (updatedProduct: Product) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ))
    setEditingProduct(null)
    onClose()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>
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
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.name}</Td>
              <Td>{product.category}</Td>
              <Td>NRs. {product.price}</Td>
              <Td>
                <Badge colorScheme={product.status === 'approved' ? 'green' : 'orange'}>
                  {product.status}
                </Badge>
              </Td>
              <Td>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={() => { setEditingProduct(product); onOpen() }}>
                    <EditIcon />
                  </Button>
                  <Button colorScheme="red" size="sm" onClick={() => handleDelete(product.id)}>
                    <DeleteIcon />
                  </Button>
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
              <ProductForm product={editingProduct} onSubmit={handleUpdate} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

function ProductForm({ product, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>(product || {
    id: 0,
    name: '',
    price: 0,
    status: 'pending',
    description: '',
    category: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'price' ? parseFloat(value) : value
    }))
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prevData => ({
      ...prevData,
      category: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <FormLabel htmlFor="category">Category</FormLabel>
        <Select id="category" name="category" value={formData.category} onChange={handleCategoryChange} placeholder="Select category">
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <FormLabel htmlFor="price">Price</FormLabel>
        <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
      </div>
      <div>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input id="description" name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <Button colorScheme="blue" type="submit">
        Update Product
      </Button>
    </form>
  )
}
