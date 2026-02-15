import { Center, Container, Text,VStack } from '@chakra-ui/react'
import { SimpleGrid } from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import { useEffect } from 'react'
import React from 'react'
import ProductCard from '@/components/ProductCard'
import { useProductStore } from "@/store/product";
export default function Homepage() {
    const {fetchProduct , products}= useProductStore();
    
    useEffect(() => {
      fetchProduct();
    }, []);

  
  return (
   <>
   <Container maxW="container.xl" py={12}>
   <VStack spacing={8}>
      <Text
    fontSize={"30"}
    fontWeight={"bold"}
    bgGradient={"linear(to-r, cyan.400, blue.500)"}
    bgClip={"text"}
    textAlign={"center"}
    
  >Current Products 🚀</Text>
  <SimpleGrid 
   columns={{
     base:1,
     md:2,
     lg:3,
   }}
   spacing={10}
   w={"full"}
   >

  
  {products.map((product)=>{
    return <ProductCard key={product._id} product={product} />
  })}


  </SimpleGrid>

  //if there is no product, only then run this:

 {products.length===0 &&(
   <Text fontSize={"xl"} textAlign="center" fontWeight={"bold"} color={'gray.500'}>
    No Product Found {""}
    <Link to={"/create"}>
    <Text as='span' color={'blue.500'} _hover={{ textDecoration: "underline" }}>
      Create a product
    </Text>
    </Link>
  </Text>
 )}
   </VStack>
   </Container>
   </>
  )
}
