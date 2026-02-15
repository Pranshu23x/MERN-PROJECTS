import React, { useState } from "react";
import {
  VStack,
  Container,
  Heading,
  Box,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import { useProductStore } from "@/store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const bg = useColorModeValue("white", "gray.800");
  const { createProduct } = useProductStore();
  
 const toast = useToast()
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if(!success){
      toast({
        title: "Error",
        description: message,
        status:"error",
        duration:4000,
        isClosable:true
      })
    }
    else{
      toast({
        title: "Success",
        description: message,
        status:"success",
        duration:4000,
        isClosable:true
      })
    }
    setNewProduct({name:"" , price:"",image:""})

  };


  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          Create New Product
        </Heading>

        <Box w="full" bg={bg} p={6} rounded="lg" shadow="md">
          <VStack spacing={6}>
            <Input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            <Input
              placeholder="Product Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            <Input
              placeholder="Product Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
          </VStack>

          <Button colorScheme="blue" onClick={handleAddProduct} w="full" mt={6}>
            Add Product
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
