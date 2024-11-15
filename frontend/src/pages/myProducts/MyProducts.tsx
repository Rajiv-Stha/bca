'use client'

import { useState, useEffect, useContext } from 'react'
import { Button, Input, FormLabel, Table, Tbody, Td, Th, Thead, Tr, Badge, Select } from "@chakra-ui/react"
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
import { getProductByUserId } from '../../utils/api' // Adjust the import path
import { ThriftContext } from '../../context/Context' // Adjust the import path
import { UserType } from '../../utils/Type'


import { ProductType } from '../../utils/Type'

export default function MyProducts() {
  const [products, setProducts] = useState<ProductType[]>([])
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { state: { user } } = useContext(ThriftContext)

  useEffect(() => {
    if (user && user._id) {
      // Fetch user's transactions using API
      getProductByUserId(user._id)
        .then((response) => {
          setProducts(response.data); // Assuming response.data contains the list of products
        })
        .catch((err) => {
          console.error("Error fetching transactions:", err);
        });
    }
  }, [user]);

  const handleDelete = (id: string) => {
    setProducts(products.filter(product => product._id !== id))
  }

  const handleUpdate = (updatedProduct: ProductType) => {
    setProducts(products.map(product => 
      product._id === updatedProduct._id ? updatedProduct : product
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
          {products?.map((product) => (
            <Tr key={product._id}>
              <Td>{product.name}</Td>
              <Td>{product.category}</Td>
              <Td>NRs. {product.price}</Td>
              <Td>
                <Badge colorScheme={
                  product.status=="approved"?"green":product.status=="pending"?"yellow":"red"
                }>
                  {product.status} {/* Placeholder as product.status is not defined in ProductType */}
                </Badge>
              </Td>
              <Td>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={() => { setEditingProduct(product); onOpen() }}>
                    <EditIcon />
                  </Button>
                  <Button colorScheme="red" size="sm" onClick={() => handleDelete(product._id)}>
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

function ProductForm({ product, onSubmit }: { product: ProductType; onSubmit: (updatedProduct: ProductType) => void }) {
  const [formData, setFormData] = useState<ProductType>(product)

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
          {['Furniture', 'Lighting', 'Electronics', 'Clothing', 'Books', 'Other'].map((category) => (
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
        <FormLabel htmlFor="desc">Description</FormLabel>
        <Input id="desc" name="desc" value={formData.desc} onChange={handleChange} required />
      </div>
      <Button colorScheme="blue" type="submit">
        Update Product
      </Button>
    </form>
  )
}
