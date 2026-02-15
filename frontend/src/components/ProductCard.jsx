import React from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  useDisclosure,
    ModalHeader,
  ModalFooter
  
} from "@chakra-ui/react";
import { useProductStore } from "@/store/product";
import { FiTrash, FiEdit } from "react-icons/fi";
import { useState } from "react";


export default function ProductCard({ product }) {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  
  //delete function 
  const { deleteProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Item deleted",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  //update function
  const {updateProduct} =useProductStore()

  const handelUpdateProduct= async(pid, updatedProduct)=>{
   await updateProduct(pid, updatedProduct)
    onClose()
  }
  //-------------
  //fill the modal with pre-details
 const [updatedProduct, setUpdatedProduct]= useState(product)

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" mb={4} color={textColor}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton
            icon={<FiEdit />}
            colorScheme="blue"
            onClick={onOpen}
          />
          <IconButton
            icon={<FiTrash />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Heading as="h1" size="lg" textAlign="center" mb={4}>
                Edit Product
              </Heading>

              <Box w="full" bg={bg} p={6} rounded="lg" shadow="md">
                <VStack spacing={6}>
                  <Input placeholder="Product Name" 
                  name="name"
                  value={updatedProduct.name}
                 onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
                  }

                  
                  />
                     <Input placeholder="Product Price" 
                  name="Price"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                  />
                 <Input placeholder="Product Image" 
                  name="Image"
                  value={updatedProduct.image}
                  onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          image: e.target.value,
                        })
                      }
                  />
                </VStack>
              </Box>
            </VStack>
          </ModalBody>
             <ModalFooter>
              <Button colorScheme="blue" mr={2} onClick={()=>{handelUpdateProduct(product._id , updatedProduct)}}
              >Update</Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
