import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { IoMdSunny } from "react-icons/io";
import { MdNightsStay } from "react-icons/md";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="1440px" px={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          <Link to="/">Product Store 🛒</Link>
        </Text>

        <HStack spacing={2}>
          <Link to="/create">
            <Button>
              <CiCirclePlus />
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MdNightsStay /> : <IoMdSunny />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}
