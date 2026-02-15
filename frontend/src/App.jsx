import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";

function App() {
  return (
  <Box minH={"100vh"} bg={useColorModeValue("gray.100","gray.900")}>
    <Navbar />
    <Routes>
      <Route path ="/" element ={<Homepage />} />
      <Route path ="/create" element ={<CreatePage />} />

    </Routes>
  </Box>
  );
}

export default App;
